const inquirer = require("inquirer");
require("console.table");
const db = require('./db/database');


initialize();

function initialize() {
  console.log('Welcome to the Employee Manager!')
  mainPrompts()
};

function mainPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you wish to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update Employee Role",
          "Exit",
        ]
      }
    ])
    .then(answer => {
      let query = answer.choice;
      switch (query) {
        case "View All Departments":
          allDepartments();
          break;
        case "View All Roles":
          allRoles();
          break;
        case "View All Employees":
          allEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "Exit":
          exit();
          break;

        default:
          break;
      }
    })
}

function exit() {
  console.log('Goodbye');
};

function allDepartments() {
  let sql = `SELECT * FROM department`;
  db.query(sql, function(err, res) {
    if(err) throw err;
    console.table(res);
    mainPrompts();
  })
};
  
function addDepartment() {
  let sql = `INSERT INTO department `;
  db.promise().query(sql, function(err, res) {
    if(err) throw err;
    console.log(res.length + ' departments:');
    console.table(res);
  })
};

function allRoles() {
  let sql = `SELECT * FROM role`;
};

function addRole() {
  let sql = `INSERT INTO role`
};

function allEmployees() {
  let sql = `SELECT * FROM employee`
};
  
function addEmployee() {
  `INSERT INTO employee`
};
  
function updateEmployee() {
  `UPDATE employee.role to ? WHERE employee.id = ?`
};