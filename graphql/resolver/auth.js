const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employee = require("../../models/employee");

module.exports = {
  createEmployee: (args) => {
    return Employee.findOne({ email: args.employeeInput.email })

      .then((employee) => {
        if (employee) {
          throw new Error("Employee already exist");
        }

        return bcrypt.hash(args.employeeInput.password, 12);
      })
      .then((hashedPassword) => {
        const employee = new Employee({
          email: args.employeeInput.email,
          password: hashedPassword,
          phoneNumber: args.employeeInput.phoneNumber,
          firstName: args.employeeInput.firstName,
          secondName: args.employeeInput.secondName,
          employeesId: args.employeeInput.employeesId,
          supervisorId: args.employeeInput.supervisorId,
          department: args.employeeInput.department,
          payrollNumber: args.employeeInput.payrollNumber,
        });

        return employee.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  login: async ({ email, password }) => {
    const employee = await Employee.findOne({ email: email });

    if (!employee) {
      throw new Error("employee don't exist");
    }

    const isEqual = await bcrypt.compare(password, employee.password);

    if (!isEqual) {
      throw new Error("password is incorrect");
    }

    const token = jwt.sign(
      { employeeId: employee.id, email: employee.email },
      "somesupersecretkey",
      {
        expiresIn: "1h",
      }
    );

    return { employeeId: employee.id, token: token, tokenExpiration: 1 };
  },
};
