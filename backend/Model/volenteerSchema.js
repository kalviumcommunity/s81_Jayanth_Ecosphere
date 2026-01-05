const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
  },
  addressType: {
    type: String,
  },
});

const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "victim", "volunteer", "ngo", "admin"],
  },
  address: [{ type: addressSchema }],
  isActivated: {
    type: Boolean,
    default: false,
  },
  ngoVerified: {
    type: Boolean,
    default: false,
  },
  ngoRequest: {
    type: Boolean,
    default: false,
    index: true,
  },
  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "volunteer",
    index: true,
  },
  profilePhoto: {
    type: String,
  },
  tasks: [
    {
      taskType: {
        type: String,
        enum: ["assistance", "incident", "other"],
        default: "other",
      },
      refId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
      },
      title: String,
      completed: { type: Boolean, default: false },
    },
  ],

  assignedEvents: [
    {
      type: String,
    },
  ],

  hoursLogged: {
    type: Number,
    default: 0,
  },

  profile: {
    age: Number,
    phone: String,
    address: String,
  },

  achievements: [
    {
      type: String,
    },
  ],
});

const volunteerModel = mongoose.model("volunteer", VolunteerSchema);

module.exports = { volunteerModel };
