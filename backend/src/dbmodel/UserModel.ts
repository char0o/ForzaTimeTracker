import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: false },
});

const UserModel = mongoose.model("Login", UserSchema);

export default UserModel;
