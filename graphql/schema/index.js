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
        leave_type: String!
        leave_from: String!
        leave_to: String!
        applied_by: Employee!
    }

    type Employee {
        _id: ID!
        email: String!
        password: String
        employee_id: String!
        first_name: String!
        second_name: String!
        phone_number: String!
        supervisor_id: String!
        department: String!
        payroll_number: String!
        leavesApplied: [Leave!]
    }

    type AuthData {
        employeeId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input LeaveInput {
        leave_type: String!
        leave_from: String!
        leave_to: String!
    }

    input EmployeeInput {
        email: String!
        password: String!
        employee_id: String!
        first_name: String!
        second_name: String!
        phone_number: String!
        supervisor_id: String!
        department: String!
        payroll_number: String!
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
