var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

function startConnection(cb) {
    connection.connect(function (err) {
        if (err) throw (err);
        console.log("\nWELCOME TO BAMAZON!" + "\n")
        if (cb) {
            cb();
        }
    })
}
startConnection(start);

function start() {
    inquirer
        .prompt([
            {
                name: "selectOption",
                type: "list",
                message: "What would you like to do today?",
                choices: ["View Products for Sale", "View Low Inventory", "Add New Inventory", "Add New Product", "Exit"]
            }
        ]).then(function (answers) {
            // console.log(answers)
            switch (answers.selectOption) {
                case "View Products for Sale":
                    viewProducts();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add New Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                case "Exit":
                    endConnection();
                    break;

                default:
                    break;
            }
        })

    function viewProducts() {
        connection.query('SELECT * FROM products ORDER BY product_name ASC', function (err, results) {
            if (err) throw (err);

            console.log('\nItems for Sale:');
            for (var i = 0; results.length > i; i++) {
                console.log("\nID # " + results[i].item_id + "\nPRODUCT NAME: " + results[i].product_name + "\nPRICE " + "$" + results[i].price + "\n" + "----------------");
            }
            connection.end();
        });
    }

    function lowInventory() {
        connection.query('SELECT * FROM products ORDER BY product_name ASC', function (err, results) {
            if (err) throw (err);
            // console.log(results)
            console.log('\nLOW INVENTORY');
            for (var i = 0; results.length > i; i++) {
                if (results[i].stock_quantity < 5) {
                    console.log("\nID # " + results[i].item_id + "\nPRODUCT NAME: " + results[i].product_name + "\nPRICE " + "$" + results[i].price + "\n" + "----------------");
                }
            }
            connection.end();
        })
    }
    function addInventory() {
        connection.query('SELECT * FROM products ORDER BY product_name ASC', function (err, results) {
            if (err) throw (err);

            console.log('\nItems for Sale:');
            for (var i = 0; results.length > i; i++) {
                console.log("\nID # " + results[i].item_id + "\nPRODUCT NAME: " + results[i].product_name + "\nPRICE " + "$" + results[i].price + "\n" + "----------------");
            }
            
        inquirer
            .prompt([
                {
                    name: "selectItem",
                    type: 'input',
                    message: "Which item would you like to add inventory to? (Select by ID number).",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        console.log("\nPlease input a proper ID number. Thank you!")
                        return false;
                    }
                },
                {
                    name: "quantity",
                    type: 'input',
                    message: "How many items would you like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        console.log("\nPlease input a number. Thank you!")
                        return false;
                    }
                }
            ]).then(function (answers) {

                var id = answers.selectItem;
                var amount = answers.quantity;
                
                connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, results) {
                    if (err) throw (err);

                    var result = results[0];
                    // console.log(result);
                    console.log("\nThank you. Your inventory has been updated." + "\n")
                    connection.end();
                })
                updateInventory(id, amount);
            })
        })
    }

    function updateInventory(idAnswered, amountAnswered) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ? ", [amountAnswered, idAnswered], function(err, results) {
            if (err) throw(err);
            // console.log(results)
        })
    }

    function newProduct() {
        inquirer
        .prompt([
            {
                name: "itemName",
                type: "input",
                message: "Please enter the item name:"
            },
            {
                name: "itemDept",
                type: "list",
                message: "Please add which department the item belongs in:",
                choices: ["Clothing, Shoes, Jewelry & Watch", "Movies, Music & Games", "Electronics", "Home & Garden", "Pet Supplies", "Food and Grocery", "Beauty & Health", "Toy, Kids & Baby", "Sports & Outdoors", "Automotive"]
            },
            {
                name: "itemPrice",
                type: "input",
                message: "Please enter the price of the item:"
            },
            {
                name: "itemQuantity",
                type: "input",
                message: "Please enter the quantity of the item on hand:"
            },
        ]).then (function (answers) {
            var name = answers.itemName;
            var dept = answers.itemDept;
            var price = answers.itemPrice;
            var quantity = answers.itemQuantity;

            connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ? )", [name, dept, price, quantity], function (err, result) {
                if (err) throw (err);
                console.log(result);
                endConnection();
            })
        })
    }

    function endConnection() {
        connection.end();
    }
}





