const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  leaveType: { type: String, required: true },
  leaveFrom: { type: Date, required: true },
  leaveTo: { type: Date, required: true },
  appliedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
});

module.exports = mongoose.model("Leave", leaveSchema);
