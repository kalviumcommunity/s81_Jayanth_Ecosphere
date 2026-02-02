const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "volunteer" },
    donorEmail: { type: String, required: true },
    donorName: { type: String },

    itemKey: {
      type: String,
      enum: ["food_kit", "medical_kit", "shelter_kit", "water_pack", "custom"],
      required: true,
      index: true,
    },
    itemName: { type: String, required: true },
    amountInr: { type: Number, required: true },

    paymentProvider: {
      type: String,
      enum: ["razorpay", "stripe"],
      default: "razorpay",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      index: true,
    },

    // Legacy Stripe fields (kept to avoid breaking existing records)
    stripeSessionId: { type: String, index: true },
    stripePaymentIntentId: { type: String },

    // Razorpay fields
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    transactionId: { type: String },

    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "volunteer" },
  },
  { timestamps: true },
);

const donationModel = mongoose.model("donation", donationSchema);

module.exports = { donationModel };
