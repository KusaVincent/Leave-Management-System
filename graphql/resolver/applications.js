const Leave = require("../../models/leave");
const AppliedLeave = require("../../models/appliedLeave");
const { transformAppliedLeave, transformleave } = require("./merge");

const auth = "5e919c8cac5ba9047ce75287";

module.exports = {
  appliedLeaves: async (args, req) => {
    if (!auth) {
      // if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const appliedLeaves = await AppliedLeave.find({
        employee: auth,
      });

      return appliedLeaves.map((appliedLeave) => {
        return transformAppliedLeave(appliedLeave);
      });
    } catch (err) {
      throw err;
    }
  },

  applyLeave: async (args, req) => {
    if (!auth) {
      // if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    const fetchedLeave = await Leave.findOne({ _id: args.leaveId });

    const appliedLeave = new AppliedLeave({
      employee: auth,
      leave: fetchedLeave,
    });

    const result = await appliedLeave.save();

    return transformAppliedLeave(result);
  },
  cancelAppliedLeave: async (args, req) => {
    if (!auth) {
      // if (!req.isAuth) {
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
  },
};
