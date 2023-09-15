
/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Chi Man Law Student ID: 170713218 Date: Sep 10, 2023
*  Cyclic Link: https://brave-deer-lingerie.cyclic.app/
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

const CompaniesDB = require("./modules/companiesDB.js");
const db = new CompaniesDB();



// Add support for incoming JSON entities
// app.use(bodyParser.json());
app.use(express.json()); // built-in body-parser

app.use(cors());

app.get("/", (req,res) => {
    res.json({"message":"This is a REST API"})
  });
  

//add new company
app.post('/api/companies', (req, res) => {
    db.addNewCompany(req.body).then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
  });


// Get all companies
app.get("/api/company/:name", (req, res) => { // 
  db.getCompanyByName(req.params.name).then((data)=> {
      console.log("success to get a company");
      res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })

  });


// Get all companies
app.get("/api/companies", (req, res) => { // 
  let page = req.query.page ? req.query.page : 0;

  db.getAllCompanies(page,req.query.perPage,req.query.tag).then((data)=> {
      res.status(200).json(data);
  }).catch((err)=>{
      res.status(500).json(err);
  })
});

//update a company
app.put("/api/company/:name", (req, res) => { // 
  db.updateCompanyByName(req.body, req.params.name).then((data)=> {
      res.status(200).json(data);
  }).catch((err)=>{
      res.status(500).json(err);
  })
});


//delete a company by name
app.delete("/api/company/:name", (req,res) => {
  db.deleteCompanyByName(req.params.name).then((data) => {
    res.status(204).end();
  }).catch((err)=>{
    res.status(500).json(err);
  })
});




//http service setup and db connection
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});



