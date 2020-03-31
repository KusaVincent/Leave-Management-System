const Leave = require("../../models/leave");
const Employee = require("../../models/employee");
const { dateToString } = require("../../helpers/date");
const { transformLeave } = require("./merge");

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
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated");
    // }
    const leave = new Leave({
      leave_type: args.leaveInput.leave_type,
      leave_from: args.leaveInput.leave_from,
      leave_to: args.leaveInput.leave_to,
      applied_by: req.employeeId
    });

    let leaveApplied;
    return leave
      .save()
      .then(result => {
        leaveApplied = transformLeave(result);
        return Employee.findById(req.employeeId);
      })
      .then(employee => {
        if (!employee) {
          throw new Error("employee not found");
        }
        // employee.leavesApplied.push(leave);
        return employee.save();
      })
      .then(result => {
        return leaveApplied;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
