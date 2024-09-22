const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    message: " signed up successfully",
  });
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: " signed in successfully",
  });
});
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: " all purchased  courses",
  });
});

module.exports = {
  userRouter: userRouter,
};
