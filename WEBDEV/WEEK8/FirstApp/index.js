const express = require("express");

const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/course", UserRouter);

app.listen(3000);
