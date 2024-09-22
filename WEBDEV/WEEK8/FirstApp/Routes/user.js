const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, FirstName, LastName } = req.body;
  await userModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: " signed up successfully",
  });
});
userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    // Do cookie logic

    res.json({
      message: " signed in successfully",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: " all purchased  courses",
  });
});
exit;
module.exports = {
  userRouter: userRouter,
};
