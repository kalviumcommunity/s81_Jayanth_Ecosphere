let express = require("express");
const { volenteerModel } = require("../Model/volenteerSchema");
let userRoute = express.Router();
const bcrypt = require("bcrypt");
const catchAsyncError=require("../middleware/catchAsyncError")
const jwt = require("jsonwebtoken");
const Errorhandler = require("../utils/Errorhandler");
const { sendMail } = require("../utils/mail");
require("dotenv").config()

const port=process.env.PORT






userRoute.post("/signup", catchAsyncError(async(req,res,next)=>{
  

  try {
    console.log(req.body);

  const {name ,email ,password,address,role}=req.body;

  if(!email || !password || !name){
    return next(new Errorhandler("name , email and password required ❌",400))
  }

  let volenteer= await volenteerModel.findOne({email:email})
  if(volenteer){
    return next(new Errorhandler("user is already exist 😵‍💫",409))
  }

  bcrypt.hash(password,7,async(error,hash)=>{

    if (error){
      res.status(500).json({message:"Server Error 🪛"})
      console.log(error)
    }

    let newUser=new volenteerModel({ name , email , password: hash })


    if (role === "volenteer") {
      newUser.role = "volenteer";
      newUser.address = address;
    }


    let token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: 60 * 60 * 60 * 60860 })
    
    let activation_url = `http://localhost:${port}/user/activation/${token}`


    await sendMail(
      {
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.name},please click the link to activate your account:${activation_url}`,
      }
    )

    await newUser.save()
    res.status(201).json({ status: true, message: "registration sucessfull 👍" })
    
  })
  } catch (error) {
    return next(new Errorhandler("internal server error 🪛", 500))

      console.log(error)
    
  }

}))








userRoute.get("/activation/:token",catchAsyncError(async(req,res,next)=>{
  let token = req.params.token
  if (!token) {
    return next(new Errorhandler("token not found 🥺", 404))
  }
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return next(new Errorhandler("token is not valid ❌", 400))
    }
    let id = decoded.id
    await volenteerModel.findByIdAndUpdate(id, { isActivated: true })

    
    // res.redirect("http://localhost:5173/login")


    res.status(200).json({ status: true, message: "activation is completed 🤞" })



  });

}))








userRoute.post("/login", catchAsyncError(async (req, res , next) => {
  try {
    
    const { email, password } = req.body;
  console.log(email)
  if (!email || !password) {
    return next(new Errorhandler("email and password are required ❌", 400));
  }

  let user = await volenteerModel.findOne({ email });

  if (!user) {
    return next(new Errorhandler("Please Signup 🥺", 400));
  }

  if (!user.isActivated) {
    return next(new Errorhandler("Please Signup 🥺", 400));
  }

  await bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return next(new Errorhandler("internal server error 🪛", 500));
    }
    if (!result) {
      return next(new Errorhandler("password is incorrect 😅", 400));
    }
    
    let token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 1000 * 60 * 60 * 60 * 24,
    });
    res.cookie("accesstoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({ status: true, message: "login successful 👍", token })
  });

  } catch (error) {
    res.status(500).send({ message: "internal server error 🪛"});
    // console.log(error)
  }
  console.log(req.body)
}));






userRoute.get("/logout", catchAsyncError(async (req, res, next) => {
  try {
    res.clearCookie("accesstoken", {
      httpOnly: true,
      secure: false, 
      sameSite: "lax"
    });

    res.status(200).json({
      status: true,
      message: "Logout successful 👋"
    });
  } catch (error) {
    next(new Errorhandler("Logout failed ❌", 500));
  }
}));






module.exports = { userRoute };