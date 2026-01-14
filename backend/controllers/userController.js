import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      loginId,
      password,
      confirmPassword,
      contactNo,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !loginId ||
      !password ||
      !confirmPassword ||
      !contactNo
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields!",
      });
    }
    const existingUser = await userModel.findOne({ loginId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Already have account with this id, please login!",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password not matched with confirm password!",
      });
    }
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      loginId,
      contactNo,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    newUser.confirmPassword = hashedPassword;
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Account registered successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { loginId, password } = req.body;
    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields!",
      });
    }
    const existingUser = await userModel.findOne({ loginId });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Please register first then try to login!",
      });
    }
    const isMatchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isMatchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Password not matched, please enter correct password",
      });
    }
    const token = jwt.sign({ loginId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    existingUser.token = token;
    await existingUser.save();
    return res.status(200).json({
      success: true,
      message: "Loggedin Successfully!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { loginId, password, confirmPassword } = req.body;
    if (!loginId || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required fields!",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password not matched with confirm password!",
      });
    }
    const existingUser = await userModel.findOne({ loginId });
    const newHashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userModel.findByIdAndUpdate(
      existingUser._id,
      {
        password: newHashedPassword,
        confirmpassword: newHashedPassword,
      },
      {
        new: true,
      }
    );
    await updatedUser.save();
    return res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token expired or please login again!",
      });
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ loginId: decodedUser.loginId });
    return res.status(200).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        loginId: user.loginId,
        email: user.email,
        contactNo: user.contactNo,
        role: user.role,
        id: user._id,
        tickets: user.tickets,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
