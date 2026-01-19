const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
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

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// Create Razorpay order
donationRoute.post(
  "/checkout",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(String(req.user_id))) {
      return next(new Errorhandler("Invalid session. Please login again.", 401));
    }

    const razorpay = getRazorpay();
    if (!razorpay)
      return next(new Errorhandler("Razorpay is not configured", 500));

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
      paymentProvider: "razorpay",
      paymentStatus: "created",
      ngoId: ngo?._id,
    });

    let order;
    try {
      order = await razorpay.orders.create({
        amount: amountInr * 100,
        currency: "INR",
        receipt: String(created._id),
        notes: {
          donationId: String(created._id),
          itemKey: String(itemKey),
          itemName: String(itemName),
          donorEmail: String(me.email),
        },
      });
    } catch (e) {
      // Avoid leaving orphaned "created" donation if order creation fails
      await donationModel.findByIdAndDelete(created._id).catch(() => {});
      return next(e);
    }

    created.razorpayOrderId = order.id;
    await created.save();

    res.status(200).json({
      status: true,
      razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        donationId: String(created._id),
        itemName,
        donorName: me.name,
        donorEmail: me.email,
      },
    });
  })
);

// Verify payment signature (called by frontend Razorpay handler)
donationRoute.post(
  "/verify",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(String(req.user_id))) {
      return next(new Errorhandler("Invalid session. Please login again.", 401));
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret)
      return next(new Errorhandler("Razorpay is not configured", 500));

    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body || {};

    if (!orderId || !paymentId || !signature)
      return next(
        new Errorhandler(
          "razorpay_order_id, razorpay_payment_id and razorpay_signature are required",
          400
        )
      );

    const donation = await donationModel.findOne({ razorpayOrderId: orderId });
    if (!donation) return next(new Errorhandler("Donation not found", 404));

    // Basic ownership check (admins can verify too)
    if (
      String(donation.donorId) !== String(req.user_id) &&
      req.user_role !== "admin"
    ) {
      return next(new Errorhandler("Not authorized", 403));
    }

    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expected !== signature)
      return next(new Errorhandler("Invalid payment signature", 400));

    if (donation.paymentStatus !== "paid") {
      donation.paymentStatus = "paid";
      donation.razorpayPaymentId = paymentId;
      donation.razorpaySignature = signature;
      donation.transactionId = paymentId;
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
        payment_status: donation.paymentStatus,
        donation,
      },
    });
  })
);

// Confirm endpoint (used by frontend success page)
donationRoute.get(
  "/confirm",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(String(req.user_id))) {
      return next(new Errorhandler("Invalid session. Please login again.", 401));
    }

    const { donation_id, order_id } = req.query;

    if (!donation_id && !order_id)
      return next(new Errorhandler("donation_id or order_id is required", 400));

    const donation = donation_id
      ? await donationModel.findById(String(donation_id))
      : await donationModel.findOne({ razorpayOrderId: String(order_id) });

    if (!donation) return next(new Errorhandler("Donation not found", 404));

    if (
      String(donation.donorId) !== String(req.user_id) &&
      req.user_role !== "admin"
    ) {
      return next(new Errorhandler("Not authorized", 403));
    }

    res.status(200).json({
      status: true,
      data: {
        payment_status: donation.paymentStatus,
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
