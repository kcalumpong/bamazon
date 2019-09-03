var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

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
        console.log("connected as id " + connection.threadId + "\n");
        if (cb) {
            cb();
        }
    })
}
startConnection(displayProducts);

// function displayProducts() {
//     connection.query('SELECT * FROM products ORDER BY product_name ASC', function (err, results) {
//         if (err) throw (err);

//         console.log('\nItems for Sale:');
//         for (var i = 0; results.length > i; i++) {
//             console.log("\nID # " + results[i].item_id + "\nPRODUCT NAME: " + results[i].product_name + "\nPRICE " + "$" + results[i].price + "\n" + "----------------");
//         }
//         selectItem();
//     });
// }

function displayProducts() {
    connection.query('SELECT * FROM products ORDER BY product_name ASC', function (err, results) {
        if (err) throw (err);

        console.log('\nItems for Sale:');

        var table = new Table({ head: ['ID Number', 'Product Name', 'Price'] });
        
        for (var i = 0; results.length > i; i++) {
            // console.log("\nID # " + results[i].item_id + "\nPRODUCT NAME: " + results[i].product_name + "\nPRICE " + "$" + results[i].price + "\n" + "----------------");
            
            var object = [results[i].item_id, results[i].product_name, results[i].price]
            table.push(object);
            
        }
        console.log(table.toString());
        
        selectItem();
    });
};

function selectItem() {
    inquirer
        .prompt([
            {
                name: 'customerSelect',
                type: 'input',
                message: "Select the item you would like to purchase by ID number.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nPlease input a proper ID number. Thank you!")
                    return false;
                }
            },
            {
                name: 'quantity',
                type: "input",
                message: 'How many units would you like to purchase?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("\nPlease input a number")
                    return false;
                }
            }
        ]).then(function (answers) {
            var id = answers.customerSelect;
            var quantity = answers.quantity;
            connection.query('SELECT * FROM products WHERE item_id = ' + id, function (err, results) {
                if (err) throw (err);
                var result = results[0]
                // console.log(result)
                var itemPrice = result.price;
                if (quantity > result.stock_quantity) {
                    console.log("Not enough in stock!")
                    endConnection();
                    return;
                }
                updateQuantity(id, quantity, itemPrice)
            });
        })
}
function updateQuantity(idNumber, amount, price) {
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [amount, idNumber], function (err, results) {
        if (err) throw (err);
        // console.log(results);
        console.log('\nYour total is $' + price * amount + "\n" + "Thank you for shopping with bamazon!" + "\n");
        endConnection();
    })
}
function endConnection() {
    connection.end();
}





