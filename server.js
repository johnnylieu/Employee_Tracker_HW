var mysql = require("mysql");
var inquirer = require("inquirer");
const express = require('express');
const cTable = require('console.table');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8080,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "ice_creamDB"
});

mainMenu();
function mainMenu () {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'listOfOptions',
            choices: ['View All Employees', 'Create New Employee', 'Update Employee'],
            message: 'What would you like to do?'
        },
    ])
    .then(function (answers) {
        if (answers.listOfOptions === 'View All Employees') {
            viewAll();
        } else if (answers.listOfOccupations === 'Create New Employee') {
            createEmployee();
        } else if (answers.listOfOccupations === 'Update Employee') {
            updateEmployee();
        } else {
            buildTeam();
        };
    })
};

function viewAll() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'viewEmployees',
            choices: ['View View Employees By Department', 'View All Employees By Manager', 'View All Employees By Job Title', 'View All Employees'],
            message: 'What would you like to do?'
        }
    ])
    .then(function (answers) {
        if (answers.viewEmployees === 'View View Employees By Department') {
            viewByDepartment();
        } else if (answers.viewEmployees === 'View All Employees By Manager') {
            viewByManager();
        } else if (answers.viewEmployees === 'View All Employees By Job Title') {
            viewByJobTitle();
        } else if (answers.viewEmployees === 'View All Employees') {
            viewAllEmployees();
        } else {
            buildTeam();
        };
    })
};

app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});

// function buildTeam() {
//     inquirer
//     .prompt([
//         {
//             type: 'list',
//             name: 'buildTeam',
//             choices: ['Build my team', 'Add another employee'],
//             message: 'Would you like to build your team or add another employee?'
//         },
//     ])
//     .then(function (answers) {
//         if (answers.buildTeam === 'Build my team') {
//             if (!fs.existsSync(OUTPUT_DIR)) {
//                 fs.mkdirSync(OUTPUT_DIR);
//             }
//             fs.writeFileSync(outputPath, render(employees));
//         } else {
//             mainMenu();
//         };
//     });
// };