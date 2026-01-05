const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/Errorhandler");
const { auth, requireRoles } = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const { incidentModel } = require("../Model/incidentSchema");
const { volunteerModel } = require("../Model/volenteerSchema");

const incidentRoute = express.Router();

// Public feed: approved incidents only
incidentRoute.get(
  "/feed",
  catchAsyncError(async (req, res) => {
    const { disasterType } = req.query;
    const query = { status: "approved" };
    if (disasterType) query.disasterType = disasterType;

    const items = await incidentModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(200);
    res.status(200).json({ status: true, data: items });
  })
);

// Reporter: view incidents submitted by the logged-in user (all statuses)
incidentRoute.get(
  "/my",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  catchAsyncError(async (req, res) => {
    const items = await incidentModel
      .find({ reporterId: req.user_id })
      .sort({ createdAt: -1 })
      .limit(200);
    res.status(200).json({ status: true, data: items });
  })
);

// NGO: take/claim an incident task
incidentRoute.post(
  "/:id/take",
  auth,
  requireRoles("ngo"),
  catchAsyncError(async (req, res, next) => {
    const incident = await incidentModel.findById(req.params.id);
    if (!incident) return next(new Errorhandler("Incident not found", 404));

    if (incident.status !== "approved") {
      return next(new Errorhandler("Incident is not approved", 400));
    }

    if (
      incident.assignedNgoId &&
      String(incident.assignedNgoId) !== String(req.user_id)
    ) {
      return next(new Errorhandler("Already claimed by another NGO", 409));
    }

    incident.assignedNgoId = req.user_id;
    incident.responseStatus = incident.assignedVolunteerId
      ? "assigned"
      : "claimed";
    await incident.save();

    res.status(200).json({ status: true, data: incident });
  })
);

// NGO: list volunteers available to assign (under this NGO or unassigned)
incidentRoute.get(
  "/ngo/volunteers",
  auth,
  requireRoles("ngo"),
  catchAsyncError(async (req, res) => {
    const volunteers = await volunteerModel
      .find({
        role: "volunteer",
        $or: [
          { ngoId: req.user_id },
          { ngoId: { $exists: false } },
          { ngoId: null },
        ],
      })
      .select("name email ngoId address profile")
      .sort({ name: 1 });

    res.status(200).json({ status: true, data: volunteers });
  })
);

// NGO: list incidents claimed by this NGO (to request volunteers)
incidentRoute.get(
  "/ngo/my",
  auth,
  requireRoles("ngo"),
  catchAsyncError(async (req, res) => {
    const items = await incidentModel
      .find({ assignedNgoId: req.user_id, status: "approved" })
      .sort({ createdAt: -1 })
      .limit(200);
    res.status(200).json({ status: true, data: items });
  })
);

// NGO: request a volunteer for a claimed incident (volunteer must accept)
const requestVolunteerForIncident = catchAsyncError(async (req, res, next) => {
  const { volunteerId } = req.body;
  if (!volunteerId) {
    return next(new Errorhandler("volunteerId is required", 400));
  }

  const incident = await incidentModel.findById(req.params.id);
  if (!incident) return next(new Errorhandler("Incident not found", 404));
  if (incident.status !== "approved") {
    return next(new Errorhandler("Incident is not approved", 400));
  }

  if (!incident.assignedNgoId) {
    return next(
      new Errorhandler("Take task before requesting a volunteer", 400)
    );
  }
  if (String(incident.assignedNgoId) !== String(req.user_id)) {
    return next(
      new Errorhandler("Not authorized to request for this incident", 403)
    );
  }

  if (incident.responseStatus === "resolved") {
    return next(new Errorhandler("Incident already resolved", 400));
  }

  if (incident.assignedVolunteerId) {
    return next(new Errorhandler("Incident already assigned", 409));
  }

  if (incident.volunteerRequest?.status === "pending") {
    return next(
      new Errorhandler("A volunteer request is already pending", 409)
    );
  }

  const volunteer = await volunteerModel.findById(volunteerId);
  if (!volunteer) return next(new Errorhandler("Volunteer not found", 404));
  if (volunteer.role !== "volunteer") {
    return next(new Errorhandler("Selected user is not a volunteer", 400));
  }

  if (volunteer.ngoId && String(volunteer.ngoId) !== String(req.user_id)) {
    return next(new Errorhandler("Volunteer belongs to another NGO", 409));
  }

  if (!volunteer.ngoId) {
    volunteer.ngoId = req.user_id;
    await volunteer.save();
  }

  incident.volunteerRequest = {
    volunteerId,
    requestedByNgoId: req.user_id,
    status: "pending",
    requestedAt: new Date(),
  };
  incident.responseStatus = "requested";
  await incident.save();

  res.status(200).json({ status: true, data: incident });
});

incidentRoute.post(
  "/:id/request-volunteer",
  auth,
  requireRoles("ngo"),
  requestVolunteerForIncident
);

// Backward-compatible alias (old UI calls this): now it sends a request
incidentRoute.post(
  "/:id/assign-volunteer",
  auth,
  requireRoles("ngo"),
  requestVolunteerForIncident
);

// Volunteer: view incidents assigned to them
incidentRoute.get(
  "/volunteer/my",
  auth,
  requireRoles("volunteer"),
  catchAsyncError(async (req, res) => {
    const items = await incidentModel
      .find({ assignedVolunteerId: req.user_id, status: "approved" })
      .sort({ createdAt: -1 })
      .limit(200);
    res.status(200).json({ status: true, data: items });
  })
);

// Volunteer: view pending incident requests sent to them
incidentRoute.get(
  "/volunteer/requests",
  auth,
  requireRoles("volunteer"),
  catchAsyncError(async (req, res) => {
    const items = await incidentModel
      .find({
        status: "approved",
        "volunteerRequest.volunteerId": req.user_id,
        "volunteerRequest.status": "pending",
      })
      .sort({ createdAt: -1 })
      .limit(200);
    res.status(200).json({ status: true, data: items });
  })
);

// Volunteer: accept/reject a pending incident request
incidentRoute.patch(
  "/:id/volunteer/request",
  auth,
  requireRoles("volunteer"),
  catchAsyncError(async (req, res, next) => {
    const { action } = req.body;
    if (!action || !["accept", "reject"].includes(action)) {
      return next(new Errorhandler("Invalid action", 400));
    }

    const incident = await incidentModel.findById(req.params.id);
    if (!incident) return next(new Errorhandler("Incident not found", 404));

    if (
      !incident.volunteerRequest ||
      String(incident.volunteerRequest.volunteerId) !== String(req.user_id)
    ) {
      return next(new Errorhandler("No request for this volunteer", 403));
    }

    if (incident.volunteerRequest.status !== "pending") {
      return next(new Errorhandler("Request is not pending", 409));
    }

    if (incident.responseStatus === "resolved") {
      return next(new Errorhandler("Incident already resolved", 409));
    }

    if (action === "accept") {
      if (incident.assignedVolunteerId) {
        return next(new Errorhandler("Incident already assigned", 409));
      }
      incident.assignedVolunteerId = req.user_id;
      incident.responseStatus = "assigned";
      incident.volunteerRequest.status = "accepted";
      incident.volunteerRequest.respondedAt = new Date();
      await incident.save();
      return res.status(200).json({ status: true, data: incident });
    }

    // reject
    incident.volunteerRequest.status = "rejected";
    incident.volunteerRequest.respondedAt = new Date();
    incident.responseStatus = "claimed";
    await incident.save();
    res.status(200).json({ status: true, data: incident });
  })
);

// Volunteer: mark an assigned incident task as resolved
incidentRoute.patch(
  "/:id/volunteer/status",
  auth,
  requireRoles("volunteer"),
  catchAsyncError(async (req, res, next) => {
    const { responseStatus } = req.body;
    if (!responseStatus || !["resolved"].includes(responseStatus)) {
      return next(new Errorhandler("Invalid responseStatus", 400));
    }

    const incident = await incidentModel.findById(req.params.id);
    if (!incident) return next(new Errorhandler("Incident not found", 404));

    if (String(incident.assignedVolunteerId) !== String(req.user_id)) {
      return next(new Errorhandler("Not assigned to this incident", 403));
    }

    incident.responseStatus = "resolved";
    await incident.save();

    const achievementText = `Resolved incident: ${incident.title}`;
    await volunteerModel.updateOne(
      { _id: req.user_id },
      {
        $addToSet: {
          achievements: achievementText,
          tasks: {
            taskType: "incident",
            refId: incident._id,
            title: incident.title,
            completed: true,
          },
        },
      }
    );

    res.status(200).json({ status: true, data: incident });
  })
);

// Submit incident (authenticated)
incidentRoute.post(
  "/submit",
  auth,
  requireRoles("user", "victim", "volunteer", "ngo", "admin"),
  upload.array("media", 5),
  catchAsyncError(async (req, res, next) => {
    const { title, description, disasterType, locationText } = req.body;
    if (!title || !description) {
      return next(new Errorhandler("Title and description are required", 400));
    }

    const media = (req.files || []).map((f) => ({
      filename: f.filename,
      originalName: f.originalname,
      mimeType: f.mimetype,
      size: f.size,
    }));

    const created = await incidentModel.create({
      reporterId: req.user_id,
      title,
      description,
      disasterType,
      locationText,
      media,
      status: req.user_role === "admin" ? "approved" : "pending",
    });

    res.status(201).json({ status: true, data: created });
  })
);

// Admin: list pending incidents
incidentRoute.get(
  "/admin/pending",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res) => {
    const items = await incidentModel
      .find({ status: "pending" })
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: items });
  })
);

// Admin: approve/reject
incidentRoute.patch(
  "/admin/:id/status",
  auth,
  requireRoles("admin"),
  catchAsyncError(async (req, res, next) => {
    const { status, adminNote } = req.body;
    if (!status || !["approved", "rejected"].includes(status)) {
      return next(new Errorhandler("Invalid status", 400));
    }

    const updated = await incidentModel.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true }
    );

    if (!updated) return next(new Errorhandler("Incident not found", 404));
    res.status(200).json({ status: true, data: updated });
  })
);

module.exports = { incidentRoute };
