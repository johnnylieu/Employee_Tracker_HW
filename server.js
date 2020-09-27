var mysql = require('mysql');
var inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var connection = mysql.createConnection({
    host: "LocalHost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employee_trackerDB"
});

mainMenu();

function mainMenu() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'listOfOptions',
            choices: ['View All Employees', "View Departments", "View Roles", 'Create New Employee', 'Create Department', 'Create Role', 'Update Employee Role'],
            message: 'What would you like to do?'
        }, ])
        .then(function (answers) {
            if (answers.listOfOptions === 'View All Employees') {
                viewAll();
            } else if (answers.listOfOptions === 'View Departments') {
                viewDepartments();
            } else if (answers.listOfOptions === 'View Roles') {
                viewRoles();
            } else if (answers.listOfOptions === 'Create New Employee') {
                createEmployee();
            } else if (answers.listOfOptions === 'Create Department') {
                createDepartment();
            } else if (answers.listOfOptions === 'Create Role') {
                createRole();
            } else if (answers.listOfOptions === 'Update Employee Role') {
                updateEmployeeRole();
            } else { 
                connection.end();
            };
        })
};

function viewAll() {
    console.log("Loading employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        mainMenu();
    });
};

function viewDepartments() {
    console.log("Loading departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        mainMenu();
    });
};

function viewRoles() {
    console.log("Loading roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        mainMenu();
    });
};

function updateEmployeeRole() {
    console.log("updating employee");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);

        inquirer
            .prompt([{
                type: 'input',
                name: 'employeeID',
                message: 'What is the Employee ID?'
            }, {
                type: 'input',
                name: 'roleID',
                message: 'What is the Role ID?'
            }])
            .then(function (answers) {

                connection.query("UPDATE employee SET ? WHERE ?",
                    [{
                            role_id: answers.roleID
                        },
                        {
                            id: answers.employeeID
                        }
                    ],

                    function (err, res) {
                        if (err) throw err;
                        // Log all results of the SELECT statement
                        console.table(res);
                        console.log("Employee Role Updated... \n")
                        mainMenu();
                    });

            });
    });
};

function createEmployee() {
    console.log("Loading employees...\n");

    inquirer
        .prompt([{
            type: 'input',
            name: 'firstName',
            message: "What is employee's first name?"
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is employee's last name?"
        }, {
            type: 'input',
            name: 'roleID',
            message: "What is employee's role ID?"
        }, {
            type: 'input',
            name: 'managerID',
            message: "What is employee's manager's ID?"
        }])
        .then(function (answers) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleID,
                    manager_id: answers.managerID
                },
                function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    connection.query("SELECT * FROM employee", function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("Employee added")
                        mainMenu();
                    });
                }

            );
        });
};

function createDepartment() {
    console.log("Loading employees...\n");

    inquirer
        .prompt({
            type: 'input',
            name: 'departmentName',
            message: "What is the name of the department?"
        })
        .then(function (answers) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.departmentName 
                },
                function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    connection.query("SELECT * FROM department", function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("Department added")
                        mainMenu();
                    });
                }

            );
        });
};

function createRole() {
    console.log("Loading employees...\n");

    inquirer
        .prompt([{
            type: 'input',
            name: 'role',
            message: "What is the role title?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "How much are you paying them?"
        },
        {
            type: 'input',
            name: 'departmentID',
            message: "what is their department ID?"
        }
    ])
        .then(function (answers) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answers.role,
                    salary: answers.salary,
                    department_id: answers.departmentID 
                },
                function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    connection.query("SELECT * FROM role", function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("Role added")
                        mainMenu();
                    });
                }

            );
        });
};

app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});