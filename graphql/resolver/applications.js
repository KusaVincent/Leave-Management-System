const Leave = require("../../models/leave");
const AppliedLeave = require("../../models/appliedLeave");
const { transformAppliedLeave, transformleave } = require("./merge");

module.exports = {
  appliedLeaves: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const appliedLeaves = await AppliedLeave.find({
        employee: req.employeeId
      });

      return appliedLeaves.map(appliedLeave => {
        return transformAppliedLeave(appliedLeave);
      });
    } catch (err) {
      throw err;
    }
  },

  applyLeave: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const fetchedLeave = await Leave.findOne({ _id: args.leaveId });

    const appliedLeave = new AppliedLeave({
      employee: req.employeeId,
      leave: fetchedLeave
    });

    const result = await appliedLeave.save();

    return transformAppliedLeave(result);
  },
  cancelAppliedLeave: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const appliedLeave = await AppliedLeave.findById(
        args.appliedLeaveId
      ).populate("leave");

      const leave = transformleave(appliedLeave.leave);

      await AppliedLeave.deleteOne({ _id: args.appliedLeaveId });

      return leave;
    } catch (err) {
      throw err;
    }
  }
};
