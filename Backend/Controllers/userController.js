import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send verification email
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our website",
      text: `Your account has been created with email: ${email}`,
    };

    await transporter.sendMail(mailOption);

    return res.status(201).json({
      success: true,
      data: user,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExists.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, data: userExists, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Your verification code is: ${otp}`,
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId or otp" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuthenticated =  (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User authenticated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your Otp for resetting your password is: ${otp}`,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email, otp or newPassword" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpiredAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
