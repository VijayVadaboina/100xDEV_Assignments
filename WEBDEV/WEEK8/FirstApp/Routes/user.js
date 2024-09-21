const { Router } = require("express");
const userRouter = Router();

userRouter.post("/user/signup", (req, res) => {
  res.json({
    message: " signed up successfully",
  });
});
userRouter.post("/user/signin", (req, res) => {
  res.json({
    message: " signed in successfully",
  });
});
userRouter.post("/user/purchases", (req, res) => {
  res.json({
    message: " all purchased  courses",
  });
});

module.exports = {
  userRouter: userRouter,
};
