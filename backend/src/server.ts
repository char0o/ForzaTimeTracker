import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import LoginModel from "./dbmodel/LoginModel";
import { verifyToken, generateToken } from "./WebToken";
import jwt from "jsonwebtoken";
const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send();
    }

    const user = await LoginModel.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }

    if (user.password !== password) {
      return res.sendStatus(401);
    }

    const token = generateToken({ id: user._id, email: user.email });
    return res.json(token);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(401);
    }

    const user = await LoginModel.findOne({ email });
    if (user) {
      return res.sendStatus(401);
    }

    await LoginModel.create({ email, password });

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/verify", verifyToken, async (req, res) => {
  res.json({ message: "Welcome to the dashboard", user: req.body.user });
});

app.listen(5000, () => {
  console.log("Listening");
});
