
/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Chi Man Law Student ID: 170713218 Date: Sep 10, 2023
*  Cyclic Link: 
*
********************************************************************************/ 



// Setup
require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");

 
// const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
// Or use some other port number that you like better

// Add support for incoming JSON entities
// app.use(bodyParser.json());
app.use(express.json()); // built-in body-parser

app.use(cors());

app.get("/", (req,res) => {
    res.json({"message":"This is a REST API"})
  });
  

app.listen(HTTP_PORT,onHttpStart);    




function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT + " Path " + path.join(__dirname,"/views/about.html"));
}

