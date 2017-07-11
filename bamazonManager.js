const bamazonManager = (function() {

    const keys = require('./keys.js');
    const mySQL = require('mySQL');
    const inquirer = require('inquirer');
    const Table = require('easy-table');

    const connection = mySQL.createConnection(keys.sqlConfig);

    connection.connect();

    const inquirerInitial = function() {
        inquirer.prompt([{
            type: "list",
            name: "cmd",
            message: "What would you like to do?",
            choices: ["View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }]).then(function(userSelection) {
            inquirerCMDLogicTree(userSelection);
        })
    };

    const inquirerCMDLogicTree = function(userSelection) {
        switch (userSelection.cmd) {
            case ("View Products for Sale"):
                viewProducts(displayTable);
                break;
            case ("View Low Inventory"):
                viewLowInventory(displayTable);
                break;
            case ("Add to Inventory"):
                addInventory();
                break;
            case ("Add New Product"):
                addNewProduct();
                break;
        }
    };

    // the item IDs, names, prices, and quantities

    const viewProducts = function(callback) {
        let query = `SELECT item_id AS ID
    							, product_name AS Product
    							, price AS Price
    							, stock_quantity AS Stock
        			 FROM bamazon.products`

        connection.query(query, function(err, results) {
            if (err) {
                return console.log(err)
            };
            callback(results);
        })

        connection.end();
    };

    const viewLowInventory = function(callback) {
        let query = `SELECT item_id AS ID
    							, product_name AS Product
    							, price AS Price
    							, stock_quantity AS Stock 
        			 FROM bamazon.products
        			 WHERE stock_quantity < 5`

        connection.query(query, function(err, results) {
            if (err) {
                return console.log(err)
            };
            if (results.length === 0) {
                console.log(`\nAll items have sufficient stock.`)
            } else if (results.length > 0) {
                callback(results);
            }
        })

        connection.end();
    };

    const addInventory = function() {
        inquirer.prompt([{
            type: 'input',
            name: 'itemID',
            message: 'Please enter the item ID:'
        }, {
            type: 'input',
            name: 'additionalStock',
            message: 'How many additional units would you like to add?'
        }]).then(function(userInput) {

            let itemID = userInput.itemID;
            let addStock = userInput.additionalStock;

            let stockQuery = `UPDATE bamazon.products
            					 SET stock_quantity = stock_quantity + ?
            					 WHERE item_id = ?`
            let stockValue = [addStock, itemID];

            connection.query(stockQuery, stockValue, function(err, results) {
                if (err) { console.log(err) };

                if (results.changedRows === 0) {
                    console.log('Boo something did\'t work');
                } else if (results.changedRows > 0) {

                    let updateQuery = `SELECT item_id AS ID
    											, product_name AS Product
    											, stock_quantity AS Stock  
                					   FROM bamazon.products
                					   WHERE item_id =?`;
                    let updateValue = [itemID];

                    connection.query(updateQuery, updateValue, function(err, results) {
                        if (err) { console.log(err) };
                        displayTable(results);
                    })

                    connection.end();
                }
            })
        })
    };

    const addNewProduct = function() {
        inquirer.prompt([{
                type: 'input',
                name: 'productName',
                message: 'Please enter the new product name:'
            }, {
                type: 'input',
                name: 'deptName',
                message: 'Please enter the name of the dept the product belongs to:'

            }, {
                type: 'input',
                name: 'price',
                message: 'Please enter the product\'s price:'
            }, {
                type: 'input',
                name: 'stock',
                message: 'Please enter the current stock of the product:'
            }

        ]).then(function(userInput) {
            let productName = userInput.productName;
            let deptName = userInput.deptName;
            let price = userInput.price;
            let stock = userInput.stock;

            let newQuery = `INSERT INTO bamazon.products
            				   SET ?`;
            let newValues = {
                product_name: productName,
                department_name: deptName,
                price: price,
                stock_quantity: stock
            };

            connection.query(newQuery, newValues, function(err, results) {
                if (err) { console.log(err) };
                let newItemID = results.insertId

                let addedQuery = `SELECT item_id AS ID
    										, product_name AS Product
    										, department_name AS Department
    										, price AS Price
    										, stock_quantity AS Stock 
                				  FROM bamazon.products
                				  WHERE item_id = ?`;
                let addedValue = [newItemID];

                connection.query(addedQuery, addedValue, function(err, results) {
                    if (err) { console.log(err) };
                    displayTable(results);
                    connection.end();
                })
            })
        })
    };

    const displayTable = function(objArray) {
        console.log(`\n${Table.print(objArray)}`)
    };

    inquirerInitial();

})();
