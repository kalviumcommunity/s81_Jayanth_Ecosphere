const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user_id = decoded.id;
    req.user_role = decoded.role;
    next();
  });
};

const authorization = (req, res, next) => {
  const token = req.cookies.accesstoken;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (decoded.role === "volunteer") {
      req.user_id = decoded.id;
      next();
    } else {
      res
        .status(403)
        .json({ message: "You're not authorized to access this route" });
    }
  });
};

const requireRoles = (...roles) => {
  const allowed = roles.flat().filter(Boolean);
  return (req, res, next) => {
    const role = req.user_role;
    if (!role) return res.status(401).json({ message: "Role not found" });
    if (allowed.includes(role)) return next();
    return res
      .status(403)
      .json({ message: "You're not authorized to access this route" });
  };
};

module.exports = { auth, authorization, requireRoles };
