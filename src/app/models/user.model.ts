import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [true, "userName must provided and should be unique"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "email is required and should be unique"],
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: {
    type: String,
  },
  forgetPasswordExpiry: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    Date,
  },
});
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
