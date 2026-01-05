const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/Errorhandler");
const { auth, requireRoles } = require("../middleware/auth");
const { volunteerModel } = require("../Model/volenteerSchema");

const adminRoute = express.Router();

adminRoute.get(
  "/users",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res) => {
    const users = await volunteerModel
      .find({})
      .select("name email role isActivated ngoVerified")
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: users });
  })
);

adminRoute.get(
  "/ngos",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res) => {
    const ngos = await volunteerModel
      .find({ $or: [{ role: "ngo" }, { ngoRequest: true }] })
      .select("name email role ngoVerified ngoRequest isActivated")
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: ngos });
  })
);

adminRoute.patch(
  "/ngos/:id/verify",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res, next) => {
    const ngo = await volunteerModel.findById(req.params.id);
    if (!ngo) return next(new Errorhandler("NGO not found", 404));

    const eligible = ngo.ngoRequest === true || ngo.role === "ngo";
    if (!eligible) {
      return next(
        new Errorhandler("User has not requested NGO verification", 400)
      );
    }

    ngo.ngoVerified = true;
    ngo.ngoRequest = false;
    ngo.role = "ngo";
    await ngo.save();

    res.status(200).json({ status: true, data: ngo });
  })
);

module.exports = { adminRoute };
