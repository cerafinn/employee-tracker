const inquirer = require("inquirer");
require("console.table");
const db = require('./db/database');

initialize();

function initialize() {
  console.log('Welcome to the Employee Manager!');
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
      const query = answer.choice;
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
  const sql = `SELECT * FROM department`;
  db.query(sql, function(err, res) {
    if(err) throw err;
    console.table(res);
    mainPrompts();
  })
};
  
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the new department?"
      }
    ])
    .then(answer => {
      const department = answer;
      const sql = "INSERT INTO department SET ?";

      db.promise().query(sql, department, function(err, res) {
        if(err) throw err;
        console.log(`New Department Added: ${department.name}`);
      })
    })
    .then(
      mainPrompts()
    )
};

function allRoles() {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON department_id = department.id`;
  db.query(sql, function(err, res) {
    if(err) throw err;
    console.table(res);
    mainPrompts();
  })
};

function addRole() {

  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        message: "What is the salary of the new role?"
      },
      {
        name: "department",
        type: "list",
        message: "What department is the new role under?"
      }
    ])
    .then(answer => {
      const role = answer;
      const sql = "INSERT INTO role SET ?";

      db.promise().query(sql, role, function(err, res) {
        if(err) throw err;
      })
    })
    .then(
      mainPrompts()
    )
};

function allEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager
            FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`;
  db.query(sql, function(err, res) {
    if(err) throw err;
    console.table(res);
    mainPrompts();
  })
};

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        message: "What is the salary of the new role?"
      },
      {
        name: "department",
        type: "list",
        message: "What department is the new role under?"
      }
    ])
    .then(answer => {
      const employee = answer;
      const sql = "INSERT INTO employee SET ?";

      db.promise().query(sql, employee, function(err, res) {
        if(err) throw err;
      })
    })
    .then(
      mainPrompts()
    )
};

function updateEmployee() {
  `UPDATE employee.role to ? WHERE employee.id = ?`
};