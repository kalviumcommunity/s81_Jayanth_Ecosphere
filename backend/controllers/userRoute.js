const express = require("express");
const { volenteerModel } = require("../Model/volenteerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const Errorhandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { auth, authorization } = require("../middleware/auth");

require("dotenv").config();

const userRoute = express.Router();
const port = process.env.PORT;





userRoute.post("/signup", catchAsyncError(async (req, res, next) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password) {
    return next(new Errorhandler("Name, email and password required ❌", 400));
  }

  const existingUser = await volenteerModel.findOne({ email });
  if (existingUser) {
    return next(new Errorhandler("User already exists 😵‍💫", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 7);
  const newUser = new volenteerModel({ name, email, password: hashedPassword });

  if (role === "volenteer") {
    newUser.role = "volenteer";
    newUser.address = address;
  }

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: "24h" });
  const activationUrl = `http://localhost:${port}/user/activation/${token}`;

  await sendMail({
    email: newUser.email,
    subject: "Activate your account",
    message: `Hello ${newUser.name}, please click the link to activate your account: ${activationUrl}`,
  });

  await newUser.save();
  res.status(201).json({ status: true, message: "Registration successful 👍" });
}));







userRoute.get("/activation/:token", catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new Errorhandler("Token not found 🥺", 404));
  }

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return next(new Errorhandler("Invalid token ❌", 400));

    await volenteerModel.findByIdAndUpdate(decoded.id, { isActivated: true });
    res.status(200).json({ status: true, message: "Activation completed 🤞" });
  });
}));








userRoute.post("/login", catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Email and password are required ❌", 400));
  }

  const user = await volenteerModel.findOne({ email });
  if (!user) {
    return next(new Errorhandler("Please signup 🥺", 400));
  }

  if (!user.isActivated) {
    return next(new Errorhandler("Please activate your account first 🥺", 403));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new Errorhandler("Password is incorrect 😅", 400));
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET, { expiresIn: "24h" });

  res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({ status: true, message: "Login successful 👍", token });
}));








userRoute.get("/checklogin", auth, catchAsyncError(async (req, res, next) => {
  
  const userId = req.user_id; 
  if (!userId) {
    return res.status(401).json({ status: false, message: "Not authorized" });
  }
  
  try {
    
    const user = await volenteerModel.findById(userId).select("name email role address profilePhoto");
    console.log(user)
    if (!user) {
     
      return res.status(404).json({ status: false, message: "User not found" });
    }

    
    res.status(200).json({ status: true, message: user });
  } catch (error) {
    
    console.error("Error fetching user:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}));








userRoute.put("/add-address", auth, authorization, catchAsyncError(async (req, res, next) => {
  const userId = req.user_id;
  const { country, city, address, pincode, addressType } = req.body;

  if (!country || !city || !address || !pincode || !addressType) {
    return next(new Errorhandler("All address fields are required", 400));
  }

  const updatedUser = await volenteerModel.findByIdAndUpdate(
    userId,
    { $push: { address: req.body } },
    { new: true }
  );

  res.status(200).json({ status: true, message: updatedUser });
}));







userRoute.get("/logout", catchAsyncError(async (req, res, next) => {
  res.clearCookie("accesstoken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    status: true,
    message: "Logout successful 👋"
  });
}));





userRoute.get("/volenteer-only", auth, authorization, catchAsyncError(async (req, res, next) => {
  const userId = req.user_id;
  const user = await volenteerModel.findById(userId).select("name email role");

  res.status(200).json({ status: true, message: `Welcome, ${user.name}! You have volenteer access.` });
}));

module.exports = { userRoute };
