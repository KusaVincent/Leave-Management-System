const mongoose = require("mongoose");
let validator = require("validator");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
  },

  password: {
    type: String,
    required: true,
  },

  employeesId: {
    type: String,
    unique: true,
    required: true,
  },

  firstName: {
    type: String,
    uppercase: true,
    required: true,
  },

  secondName: {
    type: String,
    uppercase: true,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  supervisorId: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    uppercase: true,
    required: true,
  },

  payrollNumber: {
    type: String,
    unique: true,
    required: true,
  },

  leaveApplications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Leave",
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
