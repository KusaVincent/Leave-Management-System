const DataLoader = require("dataloader");
const Leave = require("../../models/leave");
const Employee = require("../../models/employee");
const { dateToString } = require("../../helpers/date");

const leaveLoader = new DataLoader(leaveIds => {
  return leaves(leaveIds);
});

const employeeLoader = new DataLoader(employeeIds => {
  return Employee.find({ _id: { $in: employeeIds } });
});

const leaves = async leaveIds => {
  try {
    const leaves = await Leave.find({ _id: { $in: leaveIds } });
    leaves.sort((a, b) => {
      return (
        leaveIds.indexOf(a._id.toString()) - leaveIds.indexOf(b._id.toString())
      );
    });
    return leaves.map(leave => {
      return transformLeave(leave);
    });
  } catch (err) {
    throw err;
  }
};

const singleLeave = async leaveId => {
  try {
    const leave = await leaveLoader.load(leaveId.toString());
    return leave;
  } catch (err) {
    throw err;
  }
};

const employee = employeeId => {
  return employeeLoader
    .load(employeeId.toString())
    .then(employee => {
      return {
        ...employee._doc,
        id: employee.id,
        leavesApplied: () => leaveLoader.loadMany(employee._doc.leavesApplied)
      };
    })
    .catch(err => {
      throw err;
    });
};

const transformLeave = leave => {
  return {
    ...leave._doc,
    id: leave.id,
    date: leave._doc.date,
    applied_by: employee.bind(this, leave.applied_by)
  };
};

const transformAppliedLeave = appliedLeave => {
  return {
    ...appliedLeave._doc,
    _id: appliedLeave.id,
    employee: employee.bind(this, appliedLeave._doc.employee),
    leave: singleLeave.bind(this, appliedLeave._doc.leave),
    createdAt: dateToString(appliedLeave._doc.createdAt),
    updatedAt: dateToString(appliedLeave._doc.updatedAt)
  };
};

exports.transformLeave = transformLeave;
exports.transformAppliedLeave = transformAppliedLeave;

// exports.employee = employee;
// exports.leaves = leaves;
// exports.singleLeave = singleleave;
