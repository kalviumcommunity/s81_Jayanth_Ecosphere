//app.js

const express = require("express");
const middleware = require("./middleware/error");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const path = require("path");
const passport = require("passport");
const { userRoute } = require("./controllers/userRoute");
const { volenteerRoute } = require("./controllers/volenteerRoute");
const { chatRoute } = require("./controllers/userChat.js"); // Adjust path if needed
const { assistanceRoute } = require("./controllers/assistanceRoute");
const { incidentRoute } = require("./controllers/incidentRoute");
const { donationRoute } = require("./controllers/donationRoute");
const { adminRoute } = require("./controllers/adminRoute");
require("./config/passport.js");

const app = express();
app.use(express.json());

app.use(passport.initialize());

const allowedOrigins = String(
  process.env.CORS_ORIGIN ||
    process.env.FRONTEND_BASE_URL ||
    "http://localhost:5173",
)
  .split(",")
  .map((s) => s.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser clients (no Origin header)
      if (!origin) return cb(null, true);
      const normalizedOrigin = origin.replace(/\/+$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(cookieparser());

app.get("/test", async (req, res) => {
  res.status(200).json({ message: "your running on machine" });
});

console.log(userRoute);
app.use("/user", userRoute);
app.use("/volen", volenteerRoute);
app.use("/chat", chatRoute); // Add chat routes
app.use("/assist", assistanceRoute);
app.use("/incidents", incidentRoute);
app.use("/donate", donationRoute);
app.use("/admin", adminRoute);

app.use("/profile-photo", express.static(path.join(__dirname, "upload")));
app.use("/uploads", express.static(path.join(__dirname, "upload")));

app.use(middleware);

module.exports = { app };
