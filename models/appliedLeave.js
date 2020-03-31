const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appliedLeaveSchema = new Schema(
  {
    leave: {
      type: Schema.Types.ObjectId,
      ref: "Leave"
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppliedLeave", appliedLeaveSchema);
