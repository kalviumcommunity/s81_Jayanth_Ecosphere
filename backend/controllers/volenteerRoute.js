const express = require("express");
const { volunteerModel } = require("../Model/volenteerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const Errorhandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { auth, authorization } = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const path = require("path");

require("dotenv").config();

const volenteerRoute = express.Router();
const port = process.env.PORT;




volenteerRoute.get("/volunteer", auth, authorization, catchAsyncError(async (req, res, next) => {
  const userId = req.user_id;
  const user = await volunteerModel.findById(userId).select("name email role tasks assignedEvents hoursLogged profile achievements");

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  res.status(200).json({
    status: true,
    message: `Welcome, ${user.name}! You are a volunteer now.`,
    tasks: user.tasks || [],
    assignedEvents: user.assignedEvents || [],
    hoursLogged: user.hoursLogged || 0,
    profile: user.profile || {},
    achievements: user.achievements || [],
    profilePhoto: user.profilePhoto || ""
  });
}));




module.exports = { volenteerRoute };
