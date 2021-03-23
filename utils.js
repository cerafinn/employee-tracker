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

function updateRole(role_id, employee_id) {
  return db.promise().query(`UPDATE employee.role to ? WHERE employee.id = ?;`, [role_id, employee_id]);
};

module.exports = { findAllDepartments, createRole, findAllRoles, createEmployee, findAllEmployees, updateRole }