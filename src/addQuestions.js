const addQuestions =
[
    {
        name: "inputDepartment",
        type: "input",
        message: "Please enter the Deparment of your entrant.",
        validate: departmentInput => {
            if (departmentInput) {
                return true;
            } else {
                console.log('Please enter the department name!');
                return false;
            }
        }
    },
    {
        name: "inputTitle",
        type: "input",
        message: "Please enter the entrants job title.",
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter the entrants title');
                return false;
            }
        }
    },
    {
        name: "inputSalary",
        type: "input",
        message: "Please enter the entrants salary.",
        validate: salaryInput => {
            if (salaryInput) {
                return true;
            } else {
                console.log('Please enter the entrants salary.');
                return false;
            }
        }
    },
    {
        name: "inputFirst",
        type: "input",
        message: "Please enter the entrants first name.",
        validate: firstInput => {
            if (firstInput) {
                return true;
            } else {
                console.log('Please enter the entrants first name.');
                return false;
            }
        }
    },
    {
        name: "inputLast",
        type: "input",
        message: "Please enter the entrants last name.",
        validate: lastInput => {
            if (lastInput) {
                return true;
            } else {
                console.log('Please enter the entrants last name.');
                return false;
            }
        }
    },
    {
        name: "inputManager",
        type: "confirm",
        message: "Does the entrant have a manager?"
    }
    ]

module.exports = addQuestions