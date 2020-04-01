const express = require("express");
const bodyParser = require("body-parser");

const Leave = require("../../models/leave");
const Employee = require("../../models/employee");
const { dateToString } = require("../../helpers/date");
const { transformLeave } = require("./merge");

const app = express();
app.use(bodyParser.json());

module.exports = {
  leaves: () => {
    return Leave.find()
      .then(leaves => {
        return leaves.map(leave => {
          return transformLeave(leave);
        });
      })
      .catch(err => {
        throw err;
      });
  },

  createLeave: (args, req) => {
    let auth = "5e8238bd19f38b2718b8c3b9";
    // if (!req.isAuth) {
    if (!auth) {
      throw new Error("Unauthenticated");
    }
    const leave = new Leave({
      leave_type: args.leaveInput.leave_type,
      leave_from: dateToString(args.leaveInput.leave_from),
      leave_to: dateToString(args.leaveInput.leave_to),
      applied_by: auth
    });

    let leaveApplied;
    return leave
      .save()
      .then(result => {
        leaveApplied = transformLeave(result);
        return Employee.findById(auth);
      })
      .then(employee => {
        if (!employee) {
          throw new Error("Employee not found");
        }
        employee.leaveApplications.push(leave);
        return employee.save();
      })
      .then(result => {
        return leaveApplied;
      })
      .catch(err => {
        console.log(JSON.stringify(err));
        throw err;
      });
  }
};
