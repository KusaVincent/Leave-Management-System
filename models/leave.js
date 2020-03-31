const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  leave_type: { type: String, required: true },
  leave_from: { type: Date, required: true },
  leave_to: { type: Date, required: true },
  applied_by: { type: Schema.Types.ObjectId, ref: "Employee" }
});

module.exports = mongoose.model("Leave", leaveSchema);
