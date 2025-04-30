const mongoose = require("mongoose");



const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  area: {
    type: String
  },
  addressType: {
    type: String
  }
});




const VolunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    // required: true
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "volunteer", "admin"]
  },
  address: [{ type: addressSchema }],
  isActivated: {
    type: Boolean,
    default: false
  },
   profilePhoto: {
     type: String 
    },
  tasks: [
    {
      title: String,
      completed: { type: Boolean, default: false }
    }
  ],

  assignedEvents: [
    {
      type: String
      
    }
  ],

  hoursLogged: {
    type: Number,
    default: 0
  },

  profile: {
    age: Number,
    phone: String,
    address: String
  },

  achievements: [
    {
      type: String
      
    }
  ]
});




const volunteerModel = mongoose.model("volunteer", VolunteerSchema);

module.exports = { volunteerModel };
