const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    country: { type: String },
    city: { type: String },
    address: { type: String },
    pincode: { type: String },
    lat: { type: Number },
    lng: { type: Number },
  },
  { _id: false }
);

const assistanceRequestSchema = new mongoose.Schema(
  {
    victimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["medical", "food", "shelter", "rescue", "other"],
      default: "other",
      index: true,
    },
    description: { type: String, required: true },
    location: locationSchema,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
      index: true,
    },
    assignedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      index: true,
    },
    assignedToRole: {
      type: String,
      enum: ["volunteer", "ngo"],
    },
  },
  { timestamps: true }
);

const assistanceRequestModel = mongoose.model(
  "assistance_request",
  assistanceRequestSchema
);

module.exports = { assistanceRequestModel };
