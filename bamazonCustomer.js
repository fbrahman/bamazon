const bamazon = (function (){

	const keys = require('./keys.js');
	const mySQL = require('mySQL');
	const inquirer = require ('inquirer');

	let connection = mySQL.createConnection(keys.sqlConfig);

	connection.connect();

	connection.query('SELECT * FROM bamazon.products', function (err, results,fields){
		if(err) console.log(err);

		console.log(results);
	})

	connection.end();
})();