const bamazonCustomer = (function() {

    const keys = require('./keys.js');
    const mySQL = require('mySQL');
    const inquirer = require('inquirer');
    const Table = require('easy-table');

    const connection = mySQL.createConnection(keys.sqlConfig);

    connection.connect();

    let snapQuery = `SELECT item_id AS ID
    					, product_name AS Product
    					, price AS Price
    				 FROM bamazon.products`

    connection.query(snapQuery, function(err, results, fields) {
        if (err) return console.log(err);
        console.log(Table.print(results));
        inquirerInitial();
    });

    let inquirerInitial = function() {
        inquirer.prompt([{
            type: 'input',
            name: 'itemID',
            message: 'Please enter the id of the item you would like to purchase:'
        }, {
            type: 'input',
            name: 'quantityRequested',
            message: 'How many units would you like you to purchase?'
        }]).then(function(userInput) {
            let itemID = userInput.itemID;
            let quantityReq = userInput.quantityRequested;

            let reqQuery = `SELECT item_id AS ID
    							, product_name AS Product
    							, price AS Price
    							, stock_quantity AS Stock
    							, product_sales AS Sales
    						FROM bamazon.products
    						WHERE item_id = ?`;
            let reqValues = [itemID];

            connection.query(reqQuery, reqValues, function(err, results) {

                let currentStock = results[0].Stock;
                let productName = results[0].Product;
                let itemID = results[0].ID;
                let price = results[0].Price;
                let currSales = results[0].Sales;

                if (err) return console.log(err);
                if (currentStock < quantityReq) {
                    console.log(`We currently do not have ${quantityReq} ${productName}(s) available for purchase. Please check in again at a later time.`)
                } else if (currentStock >= quantityReq) {
                    let newStockLevel = currentStock - quantityReq;
                    let totalCost = quantityReq * price;
                    let totalSales = currSales + totalCost;

                    let updateQuery = `UPDATE bamazon.products
                						  SET stock_quantity = ?
                						  	  , product_sales = ?
                						WHERE item_id = ?`;
                    let updateValue = [newStockLevel, totalSales, itemID]

                    connection.query(updateQuery, updateValue, function(err, results) {

                        if (err) return console.log(err);

                        if (results.changedRows === 0) {
                            console.log('Boo something did\'t work');
                        } else if (results.changedRows > 0) {
                            let resultsArray = [{ 'Product': productName, 'Quantity': quantityReq, 'Total': totalCost }]
                            console.log(Table.print(resultsArray));
                        };
                        connection.end();
                    })
                }
            })
        })
    }
})();
