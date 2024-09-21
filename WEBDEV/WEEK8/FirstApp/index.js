const express = require("express");
const app = express();

app.post("/user/signup", (req, res) => {
  res.json({
    message: " signed up successfully",
  });
});
app.post("/user/signin", (req, res) => {
  res.json({
    message: " signed in successfully",
  });
});
app.post("/user/purchase", (req, res) => {
  res.json({
    message: " purchase the course",
  });
});
app.post("/course.purchase", (req, res) => {
  res.json({
    message: " get all the course",
  });
});
app.get("/Courses", (req, res) => {
  res.json({
    message: " get all the course",
  });
});

app.listen(3000);
