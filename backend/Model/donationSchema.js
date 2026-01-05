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

    paymentProvider: { type: String, enum: ["stripe"], default: "stripe" },
    paymentStatus: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      index: true,
    },

    stripeSessionId: { type: String, index: true },
    stripePaymentIntentId: { type: String },
    transactionId: { type: String },

    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "volunteer" },
  },
  { timestamps: true }
);

const donationModel = mongoose.model("donation", donationSchema);

module.exports = { donationModel };
