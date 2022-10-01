const mysql = require('mysql2');
const inquirer = require("inquirer");
const addQuestions = require('./src/addQuestions');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lamwil10',
    database: 'department'
});

function getDepartment() {
    db.query('SELECT * FROM department', (err, result) =>{
        if (err) console.log(err);
        console.log(result);
    });
}

function getRole() {
    db.query('SELECT * FROM role', (err, result) =>{
        if (err) console.log(err);
        console.log(result);
    });
}

function getEmployee() {
    db.query('SELECT * FROM employee', (err, result) =>{
        if (err) console.log(err);
        console.log(result);
    });
}

function getAll() {
    db.query('SELECT * FROM department JOIN role ON department.id = role.id JOIN employee ON role.id = employee.id;', (err, result) =>{
        if (err) console.log(err);
        console.log(result);
    });
}

function addEntry(){
   // run iquirer to capture department, role, salary, first_name, last_name, manager_id
   inquirer. prompt(addQuestions)
        .then(function ({inputDepartment, inputTitle, inputSalary, inputFirst, inputLast, inputManager}) {
            console.log(inputDepartment, inputTitle, inputSalary, inputFirst, inputLast, inputManager);
            var newDepartment = inputDepartment;
            var newTitle = inputTitle;
            var newSalary = inputSalary;
            var newFirst = inputFirst;
            var newLast = inputLast;
                if (inputManager === true) {
                    var newManager = 1;
                 }
                 else {
                    var newManager = 0;
                 }
            
            db.query('INSERT INTO department(name) VALUES ("'+newDepartment+'")');
            db.query('INSERT INTO role (title, salary) VALUES ("'+newTitle+'","'+newSalary+'")');
            db.query('INSERT INTO employee (first_name, last_name, manager_id) VALUES ("'+newFirst+'","'+ newLast+'","'+ newManager+'")');
            
            
            db.query('SELECT * FROM department JOIN role ON department.id = role.id JOIN employee ON role.id = employee.id;', (err, result) =>{
                if (err) console.log(err);
                console.log(result);
            });
    });
}

function startProgram() {
    inquirer. prompt([
        {
            name: "options",
            type: "rawlist",
            message: "Please select if you would like to view, add to, or delete from tables.",
            choices: ["View", "Add", "Delete"]
        }
    ])
    .then(function ({options}) {
        if (options === "View") {
            inquirer.prompt([
                {
                name: "tables",
                type: "rawlist",
                message: "Please select which table you wish to view.",
                choices: ["Departments", "Roles", "Employees", "All"]
                }
            ])
            .then(function ({tables}) {
                    if (tables === "Departments") {
                        console.log('Department table');
                        getDepartment();
                    } 
                    else if (tables === "Roles") {
                        console.log('Role table');
                        getRole();
                    } 
                    else if (tables === "Employees") {
                        console.log('Employee table');
                        getEmployee();
                    } 
                    else {
                        console.log('all tables');
                        getAll();
                    }
                });
        } 
        else if (options === "Add") {
            addEntry();
        } 
        else {
            deleteEntry();
        } 
    });
    
}

startProgram();
// db.query('SELECT * FROM role WHERE id = ?', '2', (err, result) =>{
//     if (err) console.log(err);
//     console.log(result);
// })

// db.query('SELECT * FROM role', (err, result) =>{
//     if (err) console.log(err);
//     console.log(result);
// })

// const getEmployee = (title) => {
//     db.query('SELECT * FROM role WHERE title = ?', title, (err, result) =>{
//         if (err) console.log(err);
//         console.log(result);
//     });
// }

// getEmployee('Manager');


// SELECT books.book_name AS book_name, prices.price AS price FROM books JOIN prices ON books.price = prices.id;