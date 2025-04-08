let express = require("express");
const { volenteerSchema } = require("../Model/volenteerSchema");
let userRoute = express.Router();
const mongoose=require("mongoose")
require("dotenv").config()

const port=process.env.PORT



userRoute.post("/login", async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;

    if (email && password) {
      let newuser = new volenteerSchema({ email, password });
      await newuser.save();
      res.status(200).send({ message: "login is success" });
    } else {
      res.status(400).send({ message: "🤞invalid" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error",error });
    console.log(error)
  }
});


module.exports = { userRoute };