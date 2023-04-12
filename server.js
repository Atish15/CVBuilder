//Import the express and url modules
const express = require('express');
const cors=require("cors");
const morgan= require("morgan");
const path=require("path");
const url = require("url");
const csv = require ('csv-parser');
const fs = require('fs');


//Status codes defined in external file
require('./http_status.js');

const db = require('./database.js');
const skillsFile= "hobbies.csv";
//The express module is a function. When it is executed it returns an app object
const app = express();
app.use(cors());
app.use(morgan("short"));

app.use(express.json());



//GET request for all Middlesex University Courses Included for this project
app.get('/courses', async (request, response) => {
    let courses = await db.getCourseDetails();

    response.json(courses);

});
app.get('/modules', async (request, response) => {
    let courses = await db.getModuleDetails();

    response.json(courses);

});
app.get('/credentials', async (request, response) => {
    let courses = await db.getCredentialDetails();

    response.json(courses);

});
app.post('/updateCourse', async (request, response) => {
    let data=request.body;
    let result = await db.updateCourse(data);
    response.json(result);
});
app.post('/updateModule', async (request, response) => {
    let data=request.body;
    let result = await db.updateModules(data);
    response.json(result);
});

app.post('/addCourse', async (request, response) => {
    let data=request.body;
    let result = await db.addCourses(data);
    response.json(result);
});
app.post('/addModule', async (request, response) => {
    let data=request.body;

    let result = await db.addModules(data);

    response.json(result);
});
app.post('/removeModule', async (request, response) => {
    let data=request.body;

    let result = await db.removeModules(data);

    response.json(result);
});
app.post('/removeCourse', async (request, response) => {
    let data=request.body;
    let tempArr=data.modules;

    let moduleDelete=tempArr.forEach(async (dat)=>{
        await db.removeAllModules(dat);
    });

    let result = await db.removeCourse(data);

    response.json(result);
});
//
// app.get('/hobbies', async (request, response) => {
//     let hb=[];
//     await fs.createReadStream(  skillsFile)
//         .pipe(csv())
//         .on('data', (data) => {
//            hb.push(data.HOBBIES);
//
//         })
//         .on('end', () => {
//
//             response.json(hb);
//         });
//     //
//
//
// });


//Start the app listening on port 8080
const port= process.env.PORT || 8080;
app.listen(port,function (){
    console.log("Server listening on port: "+port);
});






