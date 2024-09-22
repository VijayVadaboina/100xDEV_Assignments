const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const verifyToken = jwt.verify(token, JWT_USER_PASSWORD);
  if (verifyToken) {
    req.userId = verifyToken.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};
