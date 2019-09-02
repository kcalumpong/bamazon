CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(20) NOT NULL,
price DECIMAL(13,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
("Faux Sheepskin Area Rug", "Home Decor", 39.99, 20),
("LED Tall Floor Lamp", "Home Decor", 56.99, 84),
("Blackout Curtain Panels", "Home Decor", 34.99, 16),
("Dollhouse Miniature Furniture", "Toys and Games", 7.99, 38),
("Deluxe Wooden Standing Art Easel","Arts and Crafts", 59.99, 102),
("Happy Birthday Banner", "Party Decorations", 14.99, 214),
("Hasbro Gaming Rubik's Cube", "Toys and Games", 4.49, 312),
('"Becoming" by Michelle Obama', "Books", 17.89, 564),
("DELL 23inch Full HD Monitor", "Electronics", 129.99, 770),
("Jewelry Travel Organizer Case", "Jewelry", 16.49, 82),
("Art of the Root Soy Candle", "Home Decor", 12.99, 4);




