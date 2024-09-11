import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const secretKey = "mysecretkey";

interface UserPayload {
  id: ObjectId;
  email: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.body.user = user;
    next();
  });
};

export const generateToken = (user: UserPayload) => {
  return jwt.sign(user, secretKey);
};
