import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isPublic: { type: Boolean, required: true },
  requireApproval: { type: Boolean, required: true },
  numMembers: { type: Number, required: true },
});

const GroupModel = mongoose.model("Group", GroupSchema);

export default GroupModel;