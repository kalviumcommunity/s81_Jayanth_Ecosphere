const express = require("express");
const { volenteerModel } = require("../Model/volenteerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/mail");
const Errorhandler = require("../utils/Errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { auth, authorization } = require("../middleware/auth");

require("dotenv").config();

const volenteerRoute = express.Router();
const port = process.env.PORT;


