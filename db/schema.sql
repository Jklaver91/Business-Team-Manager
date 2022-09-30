DROP DATABASE IF EXISTS manage_db;
CREATE DATABASE manage_db;

USE manage_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id BOOLEAN,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

                    -- associated data 
-- name type                        || department_id INTEGER,
-- FOREIGN KEY (name)               || FOREIGN KEY (department_id) 
-- REFERENCES othertabletitle(data) || REFERENCES department(id),




-- As the image illustrates, your schema should contain the following three tables:

-- * `department`

--   * `id`: `INT PRIMARY KEY`

--   * `name`: `VARCHAR(30)` to hold department name

-- * `role`

--   * `id`: `INT PRIMARY KEY`

--   * `title`: `VARCHAR(30)` to hold role title

--   * `salary`: `DECIMAL` to hold role salary

--   * `department_id`: `INT` to hold reference to department role belongs to

-- * `employee`

--   * `id`: `INT PRIMARY KEY`

--   * `first_name`: `VARCHAR(30)` to hold employee first name

--   * `last_name`: `VARCHAR(30)` to hold employee last name

--   * `role_id`: `INT` to hold reference to employee role

--   * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)