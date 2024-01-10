import * as config from "../config.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/auth.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const tokenAndUserResponse = (req, res, user) => {
  // create token
  const jwtToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
  // create refresh token
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  // hide fields
  user.password = undefined;
  user.resetCode = undefined;
  // send response
  return res.json({
    user,
    token: jwtToken,
    refreshToken,
    role: user.role[0],
  });
};
// import { sesClient } from "@aws-sdk/client-ses";
export const welcome = (req, res) => {
  res.json({
    data: "hello api node js controllers ....",
  });
};

export const preRegisrer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const token = jwt.sign({ email, password }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    //send mail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_FROM, // Email người gửi
        pass: config.EMAIL_PASS, // Mật khẩu hoặc mật khẩu ứng dụng
      },
    });

    let mailOptions = {
      from: "xuantuyenqwerty@gmail.com", // Địa chỉ email người gửi
      to: email, // Email người nhận được từ request
      subject: "Đăng ký tài khoản thành công",
      // text: "Chào mừng bạn đã đăng ký thành công!",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chúc mừng bạn đã đăng ký thành công!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
    }
    p {
      margin-bottom: 15px;
    }
    .continue-button {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      text-decoration: none;
    }
    .continue-button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Chào mừng bạn đã đến với website của chúng tôi !</h2>
    <p>Xin chào <strong>${email}</strong>,</p>
    <p>Cám ơn bạn đã đăng ký dịch vụ của chúng tôi. Thân ái !</p>
    <p>Hãy nhấn nút bên dưới để tiếp tục đăng kí </p>
    <a href="${config.CLIENT_URL}/auth/account-active/${token}" class="continue-button">Hoàn tất đăng kí</a>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json("Sent mail successfully");
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  try {
    const { email, password } = jwt.verify(req.body.token, config.JWT_SECRET);

    console.log("check mail and password", email, password);
    if (password && password.length < 6) {
      return res.status(400).json({
        error: "Password should be at least 6 characters long",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username: nanoid(6),
      email,
      password: hashedPassword,
    });

    await newUser.save();

    tokenAndUserResponse(req, res, newUser);
  } catch (error) {
    console.log(error);
    return res.json({ err: "Something went wrong !" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ error: "not found email ! Register first !" });
    }
    //compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "password is wrong" });
    }
    tokenAndUserResponse(req, res, user);
  } catch (error) {
    console.log(error);
    return res.json({ err: "Something went wrong !" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    console.log("you hit refresh token endpoint => ", req.headers);

    const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);

    const user = await User.findById(_id);

    tokenAndUserResponse(req, res, user);
  } catch (err) {
    console.log("===> ", err.name);
    return res.status(403).json({ error: "Refresh token failed" }); // 403 is important
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    console.log("===> ", user);
    // res.json(user);
    return res.json({
      user,
      role: user.role[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

export const publicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }
};
export const AdminPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.idUser });
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.json({ error: "Password is required" });
    }

    // check if password meets the requirement
    if (password && password?.length < 6) {
      return res.json({
        error: "Min 6 characters long password is required",
      });
    }

    const user = await User.findById(req.user._id);
    const hashedPassword = await hashPassword(password);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.status(403).json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauhorized" });
    }
  }
};
export const adminUpdateUser = async (req, res) => {
  try {
    const { idUser } = req.params;

    const user = await User.findByIdAndUpdate(
      idUser,
      {
        ...req.body,
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.status(403).json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauhorized" });
    }
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});

    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.status(403).json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauhorized" });
    }
  }
};
