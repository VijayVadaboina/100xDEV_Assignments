const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: " get all the course",
  });
});
courseRouter.get("/preview", function (req, res) {
  res.json({
    message: " get all the course",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
