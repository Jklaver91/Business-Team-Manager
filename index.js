const mysql = require('mysql2');
const inquirer = require("inquirer");
const addQuestions = require('./src/addQuestions');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lamwil10',
    database: 'manage_db'
});
// displays depertment table
function getDepartment() {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
}
//displays role table
function getRole() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
}
//displays employee table
function getEmployee() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
}
//joins and displays all tables
function getAll() {
    db.query('SELECT * FROM department JOIN role ON department.id = role.id JOIN employee ON role.id = employee.id;', (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
}
//add an entire entry
function addEntry() {

    inquirer.prompt(addQuestions)
        .then(function ({ inputDepartment, inputTitle, inputSalary, inputFirst, inputLast }) {
            var newDepartment = inputDepartment;
            var newTitle = inputTitle;
            var newSalary = inputSalary;
            var newFirst = inputFirst;
            var newLast = inputLast;
            //inserts answers to table
            db.query('INSERT INTO department (department) VALUES ("' + newDepartment + '")');
            getDepartment();
            db.query('INSERT INTO role (title, salary) VALUES ("' + newTitle + '","' + newSalary + '")');
            getRole();
            db.query('INSERT INTO employee (first_name, last_name) VALUES ("' + newFirst + '","' + newLast + '")');
            getAll();
            startProgram();
        });
}

// allows user to update a row
function updateEntry() {
    // choose which section to update
    inquirer.prompt([
        {
            name: 'update',
            type: 'rawlist',
            message: 'Please select which table you wish to update.',
            choices: ["Department", "Role", "Employee"]
        }
    ])
        .then(function ({ update }) {
            if (update === "Department") {
                inquirer.prompt([{
                    name: 'updateDepartment',
                    type: 'input',
                    message: 'Please enter the row id you you wish to update?.',
                    validate: inpDepInput => {
                        if (inpDepInput) {
                            return true;
                        } else {
                            console.log('Please enter row id you wish to update!');
                            return false;
                        }
                    }
                },
                {
                    name: 'departmentText',
                    type: 'input',
                    message: 'Please enter what you want the row to be updated to?',
                    validate: depInput => {
                        if (depInput) {
                            return true;
                        } else {
                            console.log('Please enter what you want the row to be updated to!');
                            return false;
                        }
                    }
                }
                ])
                    //updates department with new information
                    .then(function ({ updateDepartment, departmentText }) {
                        db.query(`UPDATE department SET department = '${departmentText}' WHERE id = (${updateDepartment});`, (err, result) => {
                            if (err) console.log(err);
                            console.log(result);
                        })
                        getDepartment();
                        startProgram();
                    });

            }
            else if (update === "Role") {
                inquirer.prompt([{
                    name: 'updateRole',
                    type: 'input',
                    message: 'Please enter the row id you you wish to update?.',
                    validate: inpRoleInput => {
                        if (inpRoleInput) {
                            return true;
                        } else {
                            console.log('Please enter row id you wish to update!');
                            return false;
                        }
                    }
                },
                {
                    name: 'roleSelect',
                    type: 'rawlist',
                    message: 'Please choose which section of the role table you wish to update.',
                    choices: ["Title", "Salary"]

                },
                {
                    name: 'roleText',
                    type: 'input',
                    message: 'Please enter what you want the row to be updated to?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please enter what you want the row to be updated to!');
                            return false;
                        }
                    }
                }
                ])
                    //uodates title to new information
                    .then(function ({ updateRole, roleText, roleSelect }) {
                        if (roleSelect === 'Title') {
                            db.query(`UPDATE role SET title = '${roleText}' WHERE id = (${updateRole});`, (err, result) => {
                                if (err) console.log(err);
                                console.log(result);
                            })
                        }
                        else {
                            db.query(`UPDATE role SET salary = '${roleText}' WHERE id = (${updateRole});`, (err, result) => {
                                if (err) console.log(err);
                                console.log(result);
                            })
                        }
                        getRole();
                        startProgram();
                    });
            }
            else {
                inquirer.prompt([{
                    name: 'updateEmployee',
                    type: 'input',
                    message: 'Please enter the row id you you wish to update?.',
                    validate: inpEmpInput => {
                        if (inpEmpInput) {
                            return true;
                        } else {
                            console.log('Please enter row id you wish to update!');
                            return false;
                        }
                    }
                },
                {
                    name: 'employeeSelect',
                    type: 'rawlist',
                    message: 'Please choose which section of the employee table you wish to update.',
                    choices: ["First Name", "Last Name"]

                },
                {
                    name: 'employeeText',
                    type: 'input',
                    message: 'Please enter what you want the row to be updated to?',
                    validate: employeeInput => {
                        if (employeeInput) {
                            return true;
                        } else {
                            console.log('Please enter what you want the row to be updated to!');
                            return false;
                        }
                    }
                }
                ])
                    //updates employee with new information
                    .then(function ({ updateEmployee, employeeText, employeeSelect }) {
                        if (employeeSelect === 'First Name') {
                            db.query(`UPDATE employee SET first_name = '${employeeText}' WHERE id = (${updateEmployee});`, (err, result) => {
                                if (err) console.log(err);
                                console.log(result);
                            })
                        }
                        else {
                            db.query(`UPDATE employee SET last_name = '${employeeText}' WHERE id = (${updateEmployee});`, (err, result) => {
                                if (err) console.log(err);
                                console.log(result);
                            })
                        }
                        getEmployee();
                        startProgram();
                    });
            }
        })

}
//delete a row of data 
function deleteEntry() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: "Please enter the id number you wish to delete.",
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter the id number you wish to delete.');
                    return false;
                }
            }
        }
    ])
        .then(function ({ id }) {

            var deleteInput = id;
            //deletes from each table
            db.query(`DELETE FROM department WHERE id IN (${deleteInput})`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
            db.query(`DELETE FROM role WHERE id IN (${deleteInput})`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
            db.query(`DELETE FROM employee WHERE id IN (${deleteInput})`, (err, result) => {
                if (err) console.log(err);
                console.log(result);
            })
            getAll();
            startProgram();
        })
}

function startProgram() {
    //questions to navigate app
    inquirer.prompt([
        {
            name: "options",
            type: "rawlist",
            message: "Please select if you would like to view, add to, or delete from tables.",
            choices: ["View", "Add", "Update", "Delete"]
        }
    ])
        .then(function ({ options }) {
            if (options === "View") {
                inquirer.prompt([
                    {
                        name: "tables",
                        type: "rawlist",
                        message: "Please select which table you wish to view.",
                        choices: ["Departments", "Roles", "Employees", "All"]
                    }
                ])
                //show tables
                    .then(function ({ tables }) {
                        if (tables === "Departments") {
                            getDepartment();
                            startProgram();
                        }
                        else if (tables === "Roles") {
                            getRole();
                            startProgram();
                        }
                        else if (tables === "Employees") {
                            getEmployee();
                            startProgram();
                        }
                        else {
                            getAll();
                            startProgram();
                        }

                    });
            }
            //add entry
            else if (options === "Add") {
                addEntry();
            }
            //update entry
            else if (options === "Update") {
                updateEntry();
            }
            //delete entry
            else {
                deleteEntry();
            }
        });

}
//initialize program
startProgram();