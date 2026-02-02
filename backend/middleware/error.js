// const Errorhandler=require("../utils/Errorhandler")

module.exports = (err, req, res, next) => {
  // Log server-side for debugging (avoid leaking secrets to client)
  try {
    console.error("[API ERROR]", {
      method: req.method,
      path: req.originalUrl,
      statusCode: err?.statusCode,
      message: err?.message,
      razorpay: err?.error?.description || err?.error?.code,
    });
  } catch (_) {}

  err.statusCode = err.statusCode || 500;
  err.message =
    err?.error?.description || err.message || "internal server error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
