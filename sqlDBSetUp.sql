DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(3) AUTO_INCREMENT NOT NULL
    , product_name VARCHAR(30)
    , department_name VARCHAR(30)
    , price FLOAT (6,2)
    , stock_quantity INTEGER(2) DEFAULT 0
    , PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Nintendo Switch", "Electronics", 299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Sofa", "furniture", 343.99, 25);

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
	VALUES ("Projector", "Electronics", 419.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Bandages", "Health", 2.79, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Hydrogen Peroxide", "Bath", 0.97, 70);



