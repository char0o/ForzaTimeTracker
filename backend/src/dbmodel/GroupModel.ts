import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const GroupModel = mongoose.model("Group", GroupSchema);

export default GroupModel;