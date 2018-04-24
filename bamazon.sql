DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department VARCHAR(100) NOT NULL,
  price FLOAT(10,2) NULL,
  quantity INT(10),

  PRIMARY KEY (item_id)
);





SELECT * FROM bamazonDB.products;

INSERT INTO products VALUES (1,"tent","outdoors",99.99,20);
INSERT INTO products VALUES (2,"sleeping bag","outdoors",29.99,50);