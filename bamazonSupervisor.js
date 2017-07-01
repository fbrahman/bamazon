const bamazonSupervisor = (function() {

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
            choices: ["View Product Sales by Department",
                "Create New Department"
            ]
        }]).then(function(userSelection) {
            inquirerCMDLogicTree(userSelection);
        })
    };

    const inquirerCMDLogicTree = function(userSelection) {
        switch (userSelection.cmd) {
            case ("View Product Sales by Department"):
                viewDeptSales(displayTable);
                break;
            case ("Create New Department"):
                addNewDept();
                break;
        }
    };

    const viewDeptSales = function(callback) {
        // connection.connect();
        let query = `SELECT b.department_id
                            , b.department_name
                            , b.over_head_costs
                            , sum(a.product_sales) AS product_sales
                            , (sum(a.product_sales) - b.over_head_costs) AS total_profit 
                     FROM bamazon.products a
                         JOIN bamazon.departments b
                         ON a.department_name = b.department_name
                     GROUP BY b.department_id, b.department_name, b.over_head_costs`

        connection.query(query, function(err, results) {
            if (err) {
                return console.log(err)
            };
            callback(results);
        })

        connection.end();
    };

    const addNewDept = function() {
        inquirer.prompt([{
                type: 'input',
                name: 'deptName',
                message: 'Please enter the new department name:'
            }, {
                type: 'input',
                name: 'overHead',
                message: 'Please enter the department\'s overhead costs:'
            }

        ]).then(function(userInput) {
            let deptName = userInput.deptName;
            let overHead = userInput.overHead;

            let newQuery = `INSERT INTO bamazon.departments
                               SET ?`;
            let newValues = {
                department_name: deptName,
                over_head_costs: overHead
            };

            connection.query(newQuery, newValues, function(err, results) {
                if (err) { console.log(err) };
                let newItemID = results.insertId

                let addedQuery = `SELECT *
                                  FROM bamazon.departments
                                  WHERE department_id = ?`;
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
