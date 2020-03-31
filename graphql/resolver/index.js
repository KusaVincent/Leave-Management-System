const authResolver = require("./auth");
const leaveResolver = require("./leaves");
const applicationResolver = require("./applications");

const rootResolver = {
  ...authResolver,
  ...leaveResolver,
  ...applicationResolver
};

module.exports = rootResolver;
