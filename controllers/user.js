import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";
export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exist!",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  user = {
    name,
    email,
    password: hashPassword,
  };
  const otp = Math.floor(Math.random() * 1000000);
  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.ACTIVATION_TOKEN,
    {
      expiresIn: "3m",
    }
  );
  const data = {
    name,
    otp,
  };
  await sendMail(email, "GetO Study", data);
  res.status(200).json({
    message: "OTP sent! Check your inbox.",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN);
  if (!verify) {
    return res.status(400).json({
      message: "OTP expired!",
    });
  }
  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Wrong OTP!",
    });
  }
  const newUser = await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SEC, {
    expiresIn: "15d",
  });
  res.json({
    message: "User registered succesfully!",
    token,
    user: newUser,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      message: "No account found with this email.",
    });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Wrong password.",
    });
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SEC,
    {
      expiresIn: "15d",
    }
  );
  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});
export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});
