const { UserModel, TodoModel } = require("./db");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const JWT_SECRET = "Vijay12345";
const mongoose = require("mongoose");
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);
mongoose.connect(
  "mongodb+srv://vijayvadaboina:lYqUwxQiAK8erRns@cluster0.4ietk.mongodb.net/todo-app-database"
);
const app = express();

app.use(express.json());

// async function bcrpytHash(password) {
//   //hashing password using bcrypt
//   const saltRounds = 10;
//   const salt = await bcrypt.genSalt(saltRounds, function (err, salt) {
//     console.log(err);
//   });
//   const hashedPassword = await bcrypt.hash(
//     password,
//     salt,
//     function (err, hash) {
//       console.log(hash);
//     }
//   );
//   return hashedPassword;
// }

app.post("/signup", async function (req, res) {
  // input validation using zod
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z
      .string()
      .min(5)
      .max(100)
      .regex(
        (passwordValidation,
        {
          message:
            "Your password is not valid - it has min length 0f 8 chars & upper case & lower case letter",
        })
      ),
    name: z.string().min(3).max(100),
  });
  //const parsedData = requiredBody.parse(req.body);
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect format of req body",
    });
    return;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const hashedPassword = await bcrypt.hash(password, 10);

  await UserModel.create({
    email: email,
    password: hashedPassword,
    name: name,
  });
  res.send({
    message: " signed up",
  });
});
app.post("/signin", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({
      email: email,
    });
    const passwordMatch = bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        JWT_SECRET
      );
      res.send({
        token: token,
      });
    } else {
      res.status(403).json({
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Error while signing up",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData) {
    req.userId = decodedData.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid token",
    });
  }
}
app.post("/addTodo", auth, (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  TodoModel.create({
    title: title,
    userId: userId,
    done: done,
  });
  res.send({
    userId: userId,
  });
});
app.get("/getTodos", auth, async function (req, res) {
  const userId = req.userId;
  const todos = await TodoModel.find({
    userId: userId,
  });

  res.json({
    todos,
  });
});
app.listen(3000, () => {
  console.log("server listening on port 3000");
});
