const { Router } = require("express");
const adminRouter = Router();
adminRouter.post("/signup", (req, res) => {
  res.json({
    message: " signed up successfully",
  });
});
adminRouter.post("/signin", (req, res) => {
  res.json({
    message: " signed in successfully",
  });
});
adminRouter.post("/purchases", (req, res) => {
  res.json({
    message: " all purchased  courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
