const db = require('./db/database')

function findAllDepartments() {
  return db.promise().query(`SELECT department.name, department.id FROM department;`)
};

function createRole(newRole) {
  return db.promise().query(`INSERT INTO role SET ?;`, newRole)
};

function findAllRoles() {
  return db.promise().query(`SELECT role.title, role.id FROM role;`)
};

function findAllEmployees() {
  return db.promise().query(`SELECT CONCAT(employee.first_name, " ", employee.last_name) AS name, employee.id FROM employee;`)
};

function createEmployee(newEmployee) {
  return db.promise().query(`INSERT INTO employee SET ?;`, newEmployee)
};

module.exports = { findAllDepartments, createRole, findAllRoles, createEmployee, findAllEmployees }