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
      .then((leaves) => {
        return leaves.map((leave) => {
          return transformLeave(leave);
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createLeave: (args, req) => {
    const auth = "5e919c8cac5ba9047ce75287";
    // if (!req.isAuth) {
    if (!auth) {
      throw new Error("Unauthenticated");
    }

    const leave = new Leave({
      leaveType: args.leaveInput.leaveType,
      leaveFrom: dateToString(args.leaveInput.leaveFrom),
      leaveTo: dateToString(args.leaveInput.leaveTo),
      appliedBy: auth,
    });

    let leaveApplied;
    return leave
      .save()
      .then((result) => {
        leaveApplied = transformLeave(result);

        return Employee.findById(auth);
      })
      .then((employee) => {
        if (!employee) {
          throw new Error("Employee not found");
        }
        employee.leaveApplications.push(leave);

        return employee.save();
      })
      .then((result) => {
        return leaveApplied;
      })
      .catch((err) => {
        console.log(JSON.stringify(err));

        throw err;
      });
  },
};
