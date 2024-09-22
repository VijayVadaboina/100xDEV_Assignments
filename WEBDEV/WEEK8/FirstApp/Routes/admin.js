const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const course = require("./course");
// const passwordValidation = new RegExp(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
// );
adminRouter.post("/signup", async function (req, res) {
  try {
    // const email = req.body.email;
    // const password = req.body.password;
    // const FirstName = req.body.FirstName;
    // const LastName = req.body.Lastname;
    const { email, password, FirstName, LastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const test = await adminModel.create({
      email: email,
      password: hashedPassword,
      FirstName: FirstName,
      LastName: LastName,
    });
    // console.log(JSON.stringify(test));
    res.send({
      message: "signed up successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: " error while signing up",
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const adminUser = await adminModel.findOne({
      email: email,
    });
    //console.log(JSON.stringify(adminUser));
    //console.log(email, password);
    //console.log("hashedpwd: " + adminUser.password);
    const passwordMatch = await bcrypt.compare(password, adminUser.password);
    if (adminUser && passwordMatch) {
      const token = jwt.sign(
        {
          id: adminUser._id.toString(),
        },
        JWT_SECRET
      );
      res.send({
        message: "signed in successfully",
        token: token,
      });
    } else {
      res.status(403).send({
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: " error while signing in",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  const verifyToken = jwt.verify(token, JWT_SECRET);
  if (verifyToken) {
    req.adminId = verifyToken.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}

adminRouter.post("/course", auth, async function (req, res) {
  try {
    const adminId = req.userId;
    const { title, description, price, imageUrl } = req.body;

    await courseModel.create({
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
      creatorId: adminId,
    });
    res.json({
      message: "Course added successfully",
      course: course._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "unable to create a course",
    });
  }
});

adminRouter.put("/course", auth, function (req, res) {
  res.json({
    message: "course updated successfully",
  });
});

adminRouter.get("/courses", auth, function (req, res) {
  res.json({
    message: "fetched all the courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
