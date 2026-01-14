import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  loginId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null
  },
  role: {
    type: String,
    default: 'user'
  },
  tickets: {
    type: Array,
    default: []
  }
});

export const userModel = mongoose.model("User", userSchema);
