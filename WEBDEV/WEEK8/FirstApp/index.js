const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;
//const MONGO_URL = process.env.MONGO_URL;
const { userRouter } = require("./Routes/user");
const { courseRouter } = require("./Routes/course");
const { adminRouter } = require("./Routes/admin");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => {
    console.log("database is connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
