const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.json({
    message: " signed up successfully",
  });
});
userRouter.post("/signin", (req, res) => {
  res.json({
    message: " signed in successfully",
  });
});
userRouter.post("/purchases", (req, res) => {
  res.json({
    message: " all purchased  courses",
  });
});

module.exports = {
  userRouter: userRouter,
};
