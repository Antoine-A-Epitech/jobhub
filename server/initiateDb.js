const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const connection_delete = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD
});

const connection_create = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PWD
});

function updateDB(){

  // First of all drop the db
  connection_delete.execute('DROP DATABASE test', function(err, res) {
    if(err){
      console.log(err);
    } else {
      console.log("Database Deleted !");
    };
    // Create the db again
    connection_create.execute('CREATE DATABASE test', function(err, res) {
      if(err){
        console.log(err);
      } else {
        console.log("Dabase test created !");

        const new_connection = mysql.createConnection({
          host: 'localhost',
          user: process.env.DB_USER,
          database: process.env.DB_NAME,
          password: process.env.DB_PWD
        })

        // Go over the script to add the tables and the mock data
        const statements = fs.readFileSync('../tables.sql', {encoding: 'utf8'}).split(";");

        statements.pop();

        for (let i = 0; i < statements.length; i++){
          let statement = statements[i];
          new_connection.execute(statement, async function(err, res) {
            if (err){
              console.log("Error => ", err);
            } else if (res) {
              console.log("Script " + i + " Passed !");
            }
          })
        }

        connection_create.end();
        new_connection.end();
        connection_delete.end();
      }
    });
  });

};

updateDB();
