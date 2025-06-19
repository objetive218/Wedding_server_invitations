const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
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

const Notes = mongoose.model("notes", notesSchema);

module.exports = Notes;
