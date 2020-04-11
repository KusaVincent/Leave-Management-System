const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type AppliedLeave {
        _id: ID!
        leave: Leave!
        employee: Employee!
        createdAt: String!
        updatedAt: String!
    }

    type Leave {
        _id: ID!
        leaveType: String!
        leaveFrom: String!
        leaveTo: String!
        appliedBy: Employee!
    }

    type Employee {
        _id: ID!
        email: String!
        password: String
        employeesId: String!
        firstName: String!
        secondName: String!
        phoneNumber: String!
        supervisorId: String!
        department: String!
        payrollNumber: String!
        leavesApplied: [Leave!]
    }

    type AuthData {
        employeeId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input LeaveInput {
        leaveType: String!
        leaveFrom: String!
        leaveTo: String!
    }

    input EmployeeInput {
        email: String!
        password: String!
        employeesId: String!
        firstName: String!
        secondName: String!
        phoneNumber: String!
        supervisorId: String!
        department: String!
        payrollNumber: String!
    }

    type RootQuery {
        leaves: [Leave!]!
        appliedLeaves: [AppliedLeave!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createLeave(leaveInput: LeaveInput): Leave
        createEmployee(employeeInput: EmployeeInput): Employee
        applyLeave(leaveId: ID!):AppliedLeave!
        cancelAppliedLeave(AppliedLeaveId: ID!):Leave!
    }

    schema {
        query:RootQuery
        mutation:RootMutation
    }
    
`);
