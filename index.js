const mysql = require('mysql2');
const inquirer = require("inquirer");

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

function startProgram() {
    inquirer.prompt([
        {
        name: "tables",
        type: "rawlist",
        message: "Please select which table you wish to view.",
        choices: ["Departments", "Roles", "Employees"]
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