var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors')

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  displayProducts();
  
});

function displayProducts(){
  console.log("Getting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement

    for (var i=0; i<res.length; i++){
      console.log(
        "\nid: " + res[i].id + 
        "\nproduct: " + res[i].product_name +
        "\nprice: $" + res[i].price);
    }

    ask();
    
  });
}

function ask(){
  inquirer.prompt([
    {
      name: "buying",
      message: "Enter the ID of the product you wish to buy: "
    },
    {
      name: "quantity",
      message: "How many would you like to buy?"
    }

  ]).then(function(answers){
    
    connection.query("SELECT * FROM products", function(err, res){
      if (err) throw err;
  
      var q = res[answers.buying-1].quantity;
      var totalPrice = res[answers.buying-1].price * answers.quantity;


      if (q > answers.quantity){
        updateQuantity(answers.buying, answers.quantity);

        console.log("\nYour total price is: $" + totalPrice.toFixed(2)); 
      }
      else {
        console.log("\nsorry there arent enough\n".red);
        connection.end();
      }
      
      
    });
    
    // if (howMany(answers.product) > answers.quantity){
    //   console.log('it works');
    // }
    
    
  });
}

function updateQuantity(id, q){
  connection.query(
    "UPDATE products SET quantity = quantity - " + q + " WHERE ?",
    [

      {
        id: id
      }
    ],
    function(err, res) {
      if (err) throw err;

      connection.end();
    }

    
  );
}
