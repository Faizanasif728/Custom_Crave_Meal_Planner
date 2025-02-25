const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid"); // Auto-generate UUIDs

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: uuidv4, // Generates a UUID automatically
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true, // Prevent accidental spaces
    },
  },
  { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
