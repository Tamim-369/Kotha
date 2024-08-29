import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at least 8 characters long"],
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default:
        "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
