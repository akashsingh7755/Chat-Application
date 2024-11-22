import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { uid, fullname, username, password, confirmPassword, gender } =
      req.body;
    console.log(req.body);
    console.log(uid, fullname, username, password, confirmPassword, gender);
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ message: "All the fields are required for register" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords did not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePhoto;
    if (gender === "male") {
      profilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    } else if (gender === "female") {
      profilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    } else {
      return res.status(400).json({ message: "Invalid gender" });
    }

    const newUser = await User.create({
      uid,
      fullname,
      username,
      password: hashedPassword,
      confirmPassword,
      gender,
      profilePhoto,
    });

    res.status(201).json({ message: "User  created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User logged in successfully",
        id: user._id,
        username: user.username,
        fullName: user.fullname,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User logged out successfully",
    });
  } catch (error) {}
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUser = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};

export default { register, login, logout, getOtherUsers };
