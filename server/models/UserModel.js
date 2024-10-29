const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "An email must be unique"],
    },
    googleId: {
      type: String,
    },
    image: {
      type: String,
    },
    password: { type: String, select: false },

    role: {
      type: String,
      enum: ["trader", "admin", "guest"],
      default: "guest",
    }, // Added role field
  },
  { timestamps: true }
);

UserSchema.statics.register = async function (username, email, password) {
  const exitUser = await this.findOne({ email });

  if (exitUser) {
    throw new Error("User is already exit!");
  }

  const salt = await bcrypt.genSalt();

  const hashValue = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashValue });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Please check your email and password");
  }

  const isCorrect = await bcrypt.compare(password, user?.password || "");

  if (!isCorrect) {
    throw new Error("Please check your email and password");
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
