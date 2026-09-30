const moderatorMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  if (req.user.role !== "moderator") {
    return res.status(403).json({
      message: "Moderator access required"
    });
  }

  next();
};

module.exports = moderatorMiddleware;