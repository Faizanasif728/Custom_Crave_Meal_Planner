const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "not_specified"],
    default: "not_specified",
  },
  age: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  activityLevel: {
    type: String,
    enum: [
      "sedentary",
      "light",
      "moderate",
      "active",
      "very_active",
      "not_specified",
    ],
    default: "not_specified", //Prevents undefined errors
  },
  goal: {
    type: String,
    enum: ["weight_loss", "weight_gain", "not_specified"],
    default: "not_specified", //Default value if not provided
  },
  dailyCalories: {
    type: Number,
    default: 0, //Default value ensures it's always present
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
