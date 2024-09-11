import { connect } from "http2";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mydb");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;