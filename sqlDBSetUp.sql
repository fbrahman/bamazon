
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(3) AUTO_INCREMENT NOT NULL
    , product_name VARCHAR(30)
    , department_name VARCHAR(30)
    , price FLOAT (6,2)
    , stock_quantity INTEGER(2) DEFAULT 0
    , product_sales INTEGER (6) DEFAULT 0
    , PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Nintendo Switch", "Electronics", 299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Sofa", "Furniture", 343.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Bean Bag Chair", "Furniture", 39.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Vacuum", "Appliances", 99.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Iron", "Appliances", 16.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Bath Towel", "Bath", 12.99, 50);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Shower Curtain", "Bath", 19.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Projector", "Electronics", 419.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Bandages", "Health", 2.79, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Hydrogen Peroxide", "Health", 0.97, 70);
    
CREATE TABLE departments (
	department_id INTEGER(3) AUTO_INCREMENT NOT NULL
    , department_name VARCHAR (30) NOT NULL
    , over_head_costs INTEGER (6) DEFAULT 0
    , PRIMARY KEY (department_id)
    );

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Electronics", 1000);

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Furniture", 3000);

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Appliances", 2000);

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Bath", 4000);

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Health", 1000);

INSERT INTO departments (department_name, over_head_costs)
	VALUES ("Kitchen", 7000);



