INSERT INTO department
  (name)
VALUES
  ('Shipping'),
  ('Sales'),
  ('Sales'),
  ('Shipping'),
  ('Recieving'),
  ('Recieving'),
  ('HR'),
  ('Shipping'),
  ('Recieving'),
  ('Shipping');

  INSERT INTO role
  (title, salary)
VALUES
  ('Manager', 16000),
  ('Manager', 22000),
  ('Employee', 10000),
  ('Employee', 9000),
  ('Manager', 17000),
  ('Employee', 12000),
  ('Manager', 24000),
  ('Employee', 10000),
  ('Employee', 12000),
  ('Employee', 11000);

 INSERT INTO employee
  (first_name, last_name, manager_id)
VALUES
  ('Joe', 'Joeson', 1),
  ('Dan', 'Danson', 1),
  ('Greg', 'Gregson', 0),
  ('Tim', 'Timson', 0),
  ('Kay', 'Kayson', 1),
  ('Fae', 'Faeson', 0),
  ('Pat', 'Patson', 1),
  ('Bo', 'Boson', 0),
  ('Jill', 'Jillson', 0),
  ('Ham', 'Hamson', 0);