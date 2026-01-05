const express = require("express");
const Stripe = require("stripe");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/Errorhandler");
const { auth, requireRoles } = require("../middleware/auth");
const { donationModel } = require("../Model/donationSchema");
const { volunteerModel } = require("../Model/volenteerSchema");
const { sendMail } = require("../utils/mail");
const { donationReceiptEmailHtml } = require("../utils/donationEmailTemplate");

const donationRoute = express.Router();

const DONATION_ITEMS = {
  food_kit: { itemName: "Food Kit", amountInr: 500 },
  medical_kit: { itemName: "Medical Aid Kit", amountInr: 1000 },
  shelter_kit: { itemName: "Emergency Shelter Kit", amountInr: 2500 },
  water_pack: { itemName: "Clean Water Pack", amountInr: 300 },
};

function getStripe() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return new Stripe(secret, { apiVersion: "2024-06-20" });
}

function getFrontendBaseUrl() {
  return process.env.FRONTEND_BASE_URL || "http://localhost:5173";
}

// Create Stripe checkout session
donationRoute.post(
  "/checkout",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    const stripe = getStripe();
    if (!stripe) return next(new Errorhandler("Stripe is not configured", 500));

    const { itemKey, customAmountInr } = req.body;
    if (!itemKey) return next(new Errorhandler("itemKey is required", 400));

    let itemName;
    let amountInr;
    if (itemKey === "custom") {
      const n = Number(customAmountInr);
      if (!Number.isFinite(n) || n <= 0)
        return next(new Errorhandler("Invalid amount", 400));
      itemName = "Custom Donation";
      amountInr = Math.round(n);
    } else if (DONATION_ITEMS[itemKey]) {
      itemName = DONATION_ITEMS[itemKey].itemName;
      amountInr = DONATION_ITEMS[itemKey].amountInr;
    } else {
      return next(new Errorhandler("Invalid itemKey", 400));
    }

    const me = await volunteerModel.findById(req.user_id).select("name email");
    if (!me) return next(new Errorhandler("User not found", 404));

    // Assign NGO (simple: first ngo in DB). Can be improved later.
    const ngo = await volunteerModel.findOne({ role: "ngo" }).select("_id");

    const created = await donationModel.create({
      donorId: req.user_id,
      donorEmail: me.email,
      donorName: me.name,
      itemKey,
      itemName,
      amountInr,
      paymentProvider: "stripe",
      paymentStatus: "created",
      ngoId: ngo?._id,
    });

    const base = getFrontendBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: me.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: itemName },
            unit_amount: amountInr * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        donationId: String(created._id),
      },
      success_url: `${base}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/donate?canceled=1`,
    });

    created.stripeSessionId = session.id;
    await created.save();

    res.status(200).json({ status: true, url: session.url });
  })
);

// Confirm endpoint (used by frontend after redirect)
donationRoute.get(
  "/confirm",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    const stripe = getStripe();
    if (!stripe) return next(new Errorhandler("Stripe is not configured", 500));

    const { session_id } = req.query;
    if (!session_id)
      return next(new Errorhandler("session_id is required", 400));

    const session = await stripe.checkout.sessions.retrieve(String(session_id));
    const donationId = session?.metadata?.donationId;
    if (!donationId)
      return next(new Errorhandler("Donation metadata missing", 400));

    const donation = await donationModel.findById(donationId);
    if (!donation) return next(new Errorhandler("Donation not found", 404));

    if (
      session.payment_status === "paid" &&
      donation.paymentStatus !== "paid"
    ) {
      donation.paymentStatus = "paid";
      donation.stripePaymentIntentId = session.payment_intent;
      donation.transactionId = session.payment_intent;
      await donation.save();

      // Send receipt email (best-effort)
      const html = donationReceiptEmailHtml({
        donorName: donation.donorName,
        itemName: donation.itemName,
        amountInr: donation.amountInr,
        transactionId: donation.transactionId,
      });

      sendMail({
        email: donation.donorEmail,
        subject: "EcoSphere Donation Receipt",
        message: `Thank you for donating ₹${donation.amountInr} for ${donation.itemName}. Transaction: ${donation.transactionId}`,
        html,
      }).catch(() => {});
    }

    res.status(200).json({
      status: true,
      data: {
        payment_status: session.payment_status,
        donation,
      },
    });
  })
);

// Donor: view own donations
donationRoute.get(
  "/my",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res) => {
    const items = await donationModel
      .find({ donorId: req.user_id })
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: items });
  })
);

// NGO: view assigned donations
donationRoute.get(
  "/ngo",
  auth,
  requireRoles("ngo"),
  catchAsyncError(async (req, res) => {
    const items = await donationModel
      .find({ ngoId: req.user_id, paymentStatus: "paid" })
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: items });
  })
);

// Admin: view all donations
donationRoute.get(
  "/admin/all",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res) => {
    const items = await donationModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: items });
  })
);

module.exports = { donationRoute };
