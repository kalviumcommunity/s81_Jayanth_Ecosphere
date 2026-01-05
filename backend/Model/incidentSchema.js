const mongoose = require("mongoose");

const incidentMediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: { type: String },
    mimeType: { type: String },
    size: { type: Number },
  },
  { _id: false }
);

const volunteerRequestSchema = new mongoose.Schema(
  {
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      index: true,
    },
    requestedByNgoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
    requestedAt: { type: Date, default: Date.now },
    respondedAt: { type: Date },
  },
  { _id: false }
);

const incidentSchema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    disasterType: {
      type: String,
      enum: [
        "flood",
        "cyclone",
        "earthquake",
        "wildfire",
        "landslide",
        "tsunami",
        "other",
      ],
      default: "other",
      index: true,
    },
    locationText: { type: String },
    media: [incidentMediaSchema],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    responseStatus: {
      type: String,
      enum: ["open", "claimed", "requested", "assigned", "resolved"],
      default: "open",
      index: true,
    },
    assignedNgoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      index: true,
    },
    assignedVolunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "volunteer",
      index: true,
    },

    volunteerRequest: volunteerRequestSchema,
    adminNote: { type: String },
  },
  { timestamps: true }
);

const incidentModel = mongoose.model("incident", incidentSchema);

module.exports = { incidentModel };
