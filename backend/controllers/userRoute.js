const express = require("express");
const { volunteerModel } = require("../Model/volenteerSchema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const Errorhandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { auth, authorization } = require("../middleware/auth")
const { upload } = require("../middleware/multer");
const path = require("path");
const passport = require('passport');


require("dotenv").config();

const userRoute = express.Router();
const port = process.env.PORT;





userRoute.post("/signup", catchAsyncError(async (req, res, next) => {
  const { name, email, password, address, role } = req.body;

  if (!name || !email || !password) {
    return next(new Errorhandler("Name, email and password required ❌", 400));
  }

  const existingUser = await volunteerModel.findOne({ email });
  if (existingUser) {
    return next(new Errorhandler("User already exists 😵‍💫", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 7);
  const newUser = new volunteerModel({ name, email, password: hashedPassword });

  if (role === "volunteer") {
    newUser.role = "volunteer";
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

      await volunteerModel.findByIdAndUpdate(decoded.id, { isActivated: true });
      res.status(200).json({ status: true, message: "Activation completed 🤞" });
    });
  }));








userRoute.post("/login", catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Email and password are required ❌", 400));
  }

  const user = await volunteerModel.findOne({ email });
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


    let userId = req.user_id
    if (!userId) {
      return next(new Errorhandler("user id not found", 400));
    }
    let user = await volunteerModel.findById(userId).select("name email role address profilePhoto");
    res.status(200).json({ status: true, message: user })
  }));








userRoute.put("/add-address", auth, authorization, catchAsyncError(async (req, res, next) => {
  const userId = req.user_id;
  const { country, city, address, pincode, addressType } = req.body;




  if (!country || !city || !address || !pincode || !addressType) {
    return next(new Errorhandler("All address fields are required", 400));
  }

  const updatedUser = await volunteerModel.findByIdAndUpdate(
    userId,
    { $push: { address: req.body } },
    { new: true }
  );



  res.status(200).json({ status: true, message: updatedUser });
}));






userRoute.post("/upload", auth, upload.single("photo"), catchAsyncError(async (req, res, next) => {
 
 

  if (!req.file) {
    return next(new Errorhandler("File not found", 400))
  }


  const userId = req.user_id
  if (!userId) {
    return next(new Errorhandler("userId not found", 400))
  }

  
  const fileName = path.basename(req.file.path)
  let updated = await volunteerModel.findByIdAndUpdate(userId, { profilePhoto: fileName }, { new: true })
  res.status(200).json({ message: updated })


}))





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





const googleAuthCallback = async (req, res) => {
  try {
    const { profile, user } = req.user;

    const { displayName, emails } = profile;
    if (!emails || emails.length === 0) {
      return res.status(400).json({ message: 'Email is required for authentication' });
    }


    const email = emails[0].value;
    const name = displayName;

    

    let existingUser = await volunteerModel.findOne({ email });
    if (!existingUser) {
      existingUser = new volunteerModel({
        name,
        email,
        password: null,
        role: 'user' ,
        isActivated: true,
      });
      await existingUser.save();
    }


   
    const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.SECRET, { expiresIn: "24h" });

    res.cookie("accesstoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.redirect(`http://localhost:5173/google-success?token=${token}`);

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Failed to authenticate with Google", error: err.message });
  }
};




  userRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


  userRoute.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/login" }),

    (req, res, next) => {
    
      console.log("User object:", req.user);
      next();
    },
    googleAuthCallback
  );


module.exports = { userRoute };
