const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  FirstName: String,
  LastName: String,
});
const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  FirstName: String,
  LastName: String,
});
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminModel",
    required: true,
  },
});
const purchaseSchema = new mongoose.Schema({
  userId: objectId,
  courseId: objectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel: courseModel,
  purchaseModel: purchaseModel,
};

//mongodb+srv://vijayvadaboina:4JQCinURVgZEMcIX@cluster0.4ietk.mongodb.net/
