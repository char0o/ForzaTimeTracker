import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./db";
import UserModel from "./dbmodel/UserModel";
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

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.sendStatus(401);
    }

    if (user.password !== password) {
      return res.sendStatus(401);
    }

    const token = generateToken({ id: user._id.toString(), email: user.email, displayName: null });
    return res.json({token});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/choosedisplayname", verifyToken, async (req, res) =>{
    try {
        const { displayName } = req.body;
        console.log(req.body);
        const userFound = await UserModel.findOne({ displayName: displayName });
        if (userFound) {
            console.log("User already exists");
            return res.sendStatus(401);
        }
        const user = await UserModel.findOne({ _id: req.body.user.id });
        if (!user) {
            console.log("User not found");
            return res.sendStatus(401);
        }
        user.displayName = displayName;
        await user.save();
        return res.sendStatus(201);
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

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.sendStatus(401);
    }

    await UserModel.create({ email, password });

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.post("/api/verify", verifyToken, async (req, res) => {
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Listening");
});
