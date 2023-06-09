import { Users } from "./../models/user.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign, verify } = jwt;

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with the same email already exists" });
    }
    const newUser = new Users({
      username,
      password: hashedPassword,
    });
    const result = await newUser.save();
    const { password, ...data } = result.toJSON();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const token = sign({ _id: user._id }, process.env.SECRET_KEY);
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    });
    res.status(200).send({ message: "SUCCESS" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const userLogout = async (_req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(201).send({ message: "SUCCESS" });
};

export const authUser = async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = verify(cookie, process.env.SECRET_KEY);
    if (!claims) {
      return res.status(401).send({ message: "unauthenticated" });
    }
    const user = await Users.findOne({ _id: claims._id });
    const { password, ...data } = user.toJSON();
    res.status(200).send(data);
  } catch (error) {
    return res.status(401).send({ message: "unauthenticated" });
  }
};
