import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const UserGroupSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "User", required: true },
  group: { type: ObjectId, ref: "Group", required: true },
  rank: { type: Number, required: true },
});

const UserGroupModel = mongoose.model("UserGroup", UserGroupSchema);

export default UserGroupModel;