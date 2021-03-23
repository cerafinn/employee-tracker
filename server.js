const inquirer = require("inquirer");
require("console.table");
const db = require('./db/database');
const { findAllDepartments, createRole, findAllRoles, findAllEmployees, updateRole, createEmployee } = require('./utils');

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
          updateEmployeeRole();
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
      mainPrompts();
    })
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
  findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const availableDepts = departments.map(({id, name}) => ({
      name: name,
      value: id
    }));

  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        name: "department_id",
        type: "list",
        message: "What department is the new role under?",
        choices: availableDepts
      }
    ])
    .then(answer => {
      createRole(answer)
      .then(() => mainPrompts())
    })
    })
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
  findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    const availableRoles = roles.map(({id, title}) => ({
      name: title,
      value: id
    }));

    inquirer
      .prompt([
        {
          name: "first_name",
          message: "What is the first name of the new employee?"
        },
        {
          name: "last_name",
          message: "What is the last name of the new employee?"
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the role of the new employee?",
          choices: availableRoles
        }
      ])
      .then(answers => {
        let first_name = answers.first_name;
        let last_name = answers.last_name;
        let role_id = answers.role_id;

        findAllEmployees()
          .then(([rows]) => {
            let managers = rows;
            const availableManagers = managers.map(({id, name}) => ({
              name: name,
              value: id
            }));

            availableManagers.push({name: "None", value: null})

            inquirer.prompt([
          {
            name: "manager_id",
            type: "list",
            message: "Who is the employee's manager?",
            choices: availableManagers
          }
      ])
      .then(answers => {
          const manager_id = answers.manager_id;
          const employee = {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
          }
          createEmployee(employee)
            mainPrompts()
          })
      });
    })
  })
};

function updateEmployeeRole() {
  findAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    const availableEmployees = employees.map(({id, name}) => ({
      name: name,
      value: id
    }));
    
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Which employee's role are you changing?",
        choices: availableEmployees
      },
    ])
    .then(answers => {
          let employee_id = answers.employee_id;
        
          findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const availableRoles = roles.map(({id, title}) => ({
            name: title,
            value: id
          }));
          inquirer.prompt([
            {
              name: "role_id",
              type: "list",
              message: "What is the employee's new role?",
              choices: availableRoles
            }
          ])
        .then( answers => {
          let role_id = answers.role_id;
          updateRole(role_id, employee_id);
          mainPrompts();
        })
      })
    })
  })
};