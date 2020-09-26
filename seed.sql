USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Full Stack Development");

INSERT INTO department (name)
VALUES ("Game Development");


INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Supervisor", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Egineer", 100000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Profits", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Dillinger", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Marly", 3 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frank", "Sinatra", 3, 2);