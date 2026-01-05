const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/Errorhandler");
const { auth, requireRoles } = require("../middleware/auth");
const { assistanceRequestModel } = require("../Model/assistanceRequestSchema");
const { volunteerModel } = require("../Model/volenteerSchema");

const assistanceRoute = express.Router();

// Victim/user creates assistance request
assistanceRoute.post(
  "/requests",
  auth,
  requireRoles("user", "victim"),
  catchAsyncError(async (req, res, next) => {
    const { title, category, description, location } = req.body;
    if (!title || !description) {
      return next(new Errorhandler("Title and description are required", 400));
    }

    const created = await assistanceRequestModel.create({
      victimId: req.user_id,
      title,
      category,
      description,
      location,
    });

    res.status(201).json({ status: true, data: created });
  })
);

// Victim/user views own requests
assistanceRoute.get(
  "/my",
  auth,
  requireRoles("user", "victim"),
  catchAsyncError(async (req, res) => {
    const items = await assistanceRequestModel
      .find({ victimId: req.user_id })
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: items });
  })
);

// Volunteer/NGO lists pending requests (simple filter by city/category)
assistanceRoute.get(
  "/pending",
  auth,
  requireRoles("volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res) => {
    const { city, category } = req.query;

    const pendingQuery = { status: "pending" };
    if (category) pendingQuery.category = category;
    if (city) pendingQuery["location.city"] = city;

    // Volunteers/NGOs should also see tasks they already accepted
    // so they can complete/reject them from the same page.
    const acceptedAssignedToMe = {
      status: "accepted",
      assignedToId: req.user_id,
    };

    const query = { $or: [pendingQuery, acceptedAssignedToMe] };

    const items = await assistanceRequestModel
      .find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: items });
  })
);

// Volunteer/NGO accepts a request
assistanceRoute.post(
  "/requests/:id/accept",
  auth,
  requireRoles("volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    const requestId = req.params.id;

    const existing = await assistanceRequestModel.findById(requestId);
    if (!existing) return next(new Errorhandler("Request not found", 404));
    if (existing.status !== "pending") {
      return next(new Errorhandler("Request is not pending", 400));
    }

    existing.status = "accepted";
    existing.assignedToId = req.user_id;
    existing.assignedToRole =
      req.user_role === "admin" ? "volunteer" : req.user_role;

    await existing.save();

    res.status(200).json({ status: true, data: existing });
  })
);

// Assigned volunteer/NGO (or admin) updates status
assistanceRoute.patch(
  "/requests/:id/status",
  auth,
  requireRoles("volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res, next) => {
    const requestId = req.params.id;
    const { status } = req.body;
    if (!status) return next(new Errorhandler("status is required", 400));
    if (!["accepted", "rejected", "completed"].includes(status)) {
      return next(new Errorhandler("Invalid status", 400));
    }

    const existing = await assistanceRequestModel.findById(requestId);
    if (!existing) return next(new Errorhandler("Request not found", 404));

    const isAdmin = req.user_role === "admin";
    const isAssigned =
      existing.assignedToId &&
      String(existing.assignedToId) === String(req.user_id);
    if (!isAdmin && !isAssigned) {
      return next(new Errorhandler("Not assigned to this request", 403));
    }

    existing.status = status;
    await existing.save();

    // If a volunteer completes a task, reflect it on the volunteer dashboard
    if (status === "completed" && req.user_role === "volunteer") {
      const achievementText = `Completed task: ${existing.title}`;
      await volunteerModel.updateOne(
        { _id: req.user_id },
        {
          $addToSet: {
            achievements: achievementText,
            tasks: {
              taskType: "assistance",
              refId: existing._id,
              title: existing.title,
              completed: true,
            },
          },
        }
      );
    }

    res.status(200).json({ status: true, data: existing });
  })
);

// Get request details (victim/assigned/admin)
assistanceRoute.get(
  "/requests/:id",
  auth,
  catchAsyncError(async (req, res, next) => {
    const requestId = req.params.id;
    const item = await assistanceRequestModel.findById(requestId);
    if (!item) return next(new Errorhandler("Request not found", 404));

    const isAdmin = req.user_role === "admin";
    const isVictim = String(item.victimId) === String(req.user_id);
    const isAssigned =
      item.assignedToId && String(item.assignedToId) === String(req.user_id);

    if (!isAdmin && !isVictim && !isAssigned) {
      return next(new Errorhandler("Not authorized to view this request", 403));
    }

    res.status(200).json({ status: true, data: item });
  })
);

module.exports = { assistanceRoute };
