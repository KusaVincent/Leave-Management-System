const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
    // validate: value => {
    //   return validator.isEmail(value);
    // }
  },

  password: {
    type: String,
    required: true
  },

  employee_id: {
    type: String,
    unique: true,
    required: true
  },

  first_name: {
    type: String,
    uppercase: true,
    required: true
  },

  second_name: {
    type: String,
    uppercase: true,
    required: true
  },

  phone_number: {
    type: String,
    required: true
  },

  supervisor_id: {
    type: String,
    required: true
  },

  department: {
    type: String,
    uppercase: true,
    required: true
  },

  payroll_number: {
    type: String,
    unique: true,
    required: true
  },

  leaveApplications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Leave"
    }
  ]
});

module.exports = mongoose.model("Employee", employeeSchema);
