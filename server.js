//Import the express and url modules
const express = require('express');
const cors=require("cors");
const morgan= require("morgan");
const path=require("path");
const url = require("url");
const csv = require ('csv-parser');
const fs = require('fs');
const mysql = require('mysql');

//Status codes defined in external file
require('./http_status.js');


//The express module is a function. When it is executed it returns an app object
const app = express();
app.use(cors());
app.use(morgan("short"));

app.use(express.json());

const connectionPool = mysql.createPool({
    connectionLimit : 1000,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "cvdb.c4p731oe4hib.eu-west-2.rds.amazonaws.com",
    user: "admin",
    password: "myfinalyearproject",
    database: "final_project",
    debug: false,

});


//GET request for all Middlesex University Courses Included for this project
app.get('/courses',  (request, response) => {


    let sql = "SELECT * FROM title";
    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
            console.log(JSON.stringify(result));
            response.send(result);
        }
    });

});
app.get('/modules', (request, response) => {
    const sql = "SELECT * FROM modules";
    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });

});
app.get('/credentials',  (request, response) => {
    const sql = "SELECT * FROM credential";
    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });

});
app.post('/updateCourse', (request, response) => {
    let module=request.body;
    const  sql="UPDATE title SET name ='"+module.name+"', code='"+module.code+"', type='"+module.type+"' WHERE id ='"+module.id+"'";

    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});
app.post('/updateModule', (request, response) => {
    let module=request.body;
    const  sql="UPDATE modules SET code ='"+module.name+"', name='"+module.code+"', year='"+module.year+"', optional='"+module.optional+"', skill1='"+module.skill1+"', skill2='"+module.skill2+"', skill3='"+module.skill3+"', skill4='"+module.skill4+"', skill5='"+module.skill5+"' WHERE id ='"+module.id+"'";

    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});

app.post('/addCourse',  (request, response) => {
    let module=request.body;
    const   sql = "INSERT INTO title (id,name, code,type) " +
        "VALUES ('" + module.id + "','" +module.name + "','" + module.code + "','" + module.type+ "')";
    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});
app.post('/addModule',  (request, response) => {
    let module=request.body;
    const   sql = "INSERT INTO modules (id,title_id,code,name,year,optional,skill1,skill2,skill3,skill4,skill5) " +
        "VALUES ('" + module.id + "','" +module.title_id + "','" +module.name + "','" + module.code + "','" + module.year+ "','" +module.optional + "','" +module.skill1 + "','" +module.skill2 + "','" +module.skill3 + "','" +module.skill4 + "','" +module.skill5 + "')";


    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});
app.post('/removeModule',  (request, response) => {
    let module=request.body;

    const  sql = "DELETE FROM modules WHERE name ='"+module.code+"'" ;


    connectionPool.query(sql, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});
app.post('/removeCourse',  (request, response) => {
    let module=request.body;
    let tempArr=module.modules;

    let moduleDelete=tempArr.forEach((dat)=>{
        const  sql = "DELETE FROM modules WHERE name ='"+dat.name+"'" ;
        connectionPool.query(sqls, function (err, result) {
            //Check for errors
            if (err) {


            }
        });


    });
    const  sqls = "DELETE FROM title WHERE code ='"+module.code+"'" ;
    connectionPool.query(sqls, function (err, result) {
        //Check for errors
        if (err) {
            //Reject promise if there are errors

        }
        response.json(result);
    });
});
const port= process.env.PORT || 8080;
app.listen(port,function (){
    console.log("Server listening on port: "+port);
});