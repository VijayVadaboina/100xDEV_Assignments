const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/course.purchase", (req, res) => {
  res.json({
    message: " get all the course",
  });
});
courseRouter.get("/Courses", (req, res) => {
  res.json({
    message: " get all the course",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
