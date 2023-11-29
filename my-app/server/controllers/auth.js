import { SendEmailCommand } from "@aws-sdk/client-ses";
import * as config from "../config.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../models/auth.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

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
  });
};
// import { sesClient } from "@aws-sdk/client-ses";
export const welcome = (req, res) => {
  res.json({
    data: "hello api node js controllers ....",
  });
};

export const register = async (req, res) => {
  try {
    const { email, password,phone } = req.body;

    // important - check if user with that email already exist?
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "Email is already registered" });
    }
    if (password && password.length < 6) {
      return res.json({
        error: "Password should be at least 6 characters long",
      });
    }

    const userCheck = await User.findOne({ email });

    if (!userCheck) {
      const hashedPassword = await hashPassword(password);
      // create user and save
      const user = await new User({
        username: nanoid(6),
        email,
        password: hashedPassword,
        phone
      }).save();

      tokenAndUserResponse(req, res, user);
    } else {
      return res.json({ error: "Email is taken" });
    }
  } catch (error) {
    console.log(error);
    res.json("Something went wrong !");
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
    res.json(user);
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
