const mongoose = require("mongoose");

const singleSchema = new mongoose.Schema({
  _id: String,
  name: String,
  typeInvitation: Boolean,
  attendance: Boolean,
  seen: Boolean,
  body: String,
  familyMembers: Number,
  members: Object,
  gender: Boolean,
});

const Single = mongoose.model("single", singleSchema);

module.exports = Single;
