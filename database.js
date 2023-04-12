//Import the mysql module
const mysql = require('mysql');

//Create a connection object with the user details
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

    acquireTimeout:6000,
});


/** Returns a promise to get all courses */
module.exports.getCourseDetails = async ()=> {
    //Build SQL query
    const sql = "SELECT * FROM title";

    //Execute promise to run query
    let result = await executeQuery(sql);
    console.log(result)
    //Extract the data we need from the result
    return result;
}

/** Returns a promise to get all courses */
module.exports.getModuleDetails = async ()=> {
    //Build SQL query
    const sql = "SELECT * FROM modules";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
/** Returns a promise to get all credentials */
module.exports.getCredentialDetails = async ()=> {
    //Build SQL query
    const sql = "SELECT * FROM credential";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
/** Returns a promise to get all credentials */
module.exports.updateCourse = async (module)=> {
    //Build SQL query
    const  sql="UPDATE title SET name ='"+module.name+"', code='"+module.code+"', type='"+module.type+"' WHERE id ='"+module.id+"'";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
module.exports.updateModules = async (module)=> {
    //Build SQL query
    const  sql="UPDATE modules SET code ='"+module.name+"', name='"+module.code+"', year='"+module.year+"', optional='"+module.optional+"', skill1='"+module.skill1+"', skill2='"+module.skill2+"', skill3='"+module.skill3+"', skill4='"+module.skill4+"', skill5='"+module.skill5+"' WHERE id ='"+module.id+"'";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}

module.exports.addCourses = async (module)=> {
    //Build SQL query
    const   sql = "INSERT INTO title (id,name, code,type) " +
        "VALUES ('" + module.id + "','" +module.name + "','" + module.code + "','" + module.type+ "')";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
module.exports.addModules = async (module)=> {
    //Build SQL query
    const   sql = "INSERT INTO modules (id,title_id,code,name,year,optional,skill1,skill2,skill3,skill4,skill5) " +
        "VALUES ('" + module.id + "','" +module.title_id + "','" +module.name + "','" + module.code + "','" + module.year+ "','" +module.optional + "','" +module.skill1 + "','" +module.skill2 + "','" +module.skill3 + "','" +module.skill4 + "','" +module.skill5 + "')";

    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
module.exports.removeModules = async (module)=> {
    //Build SQL query
    const  sql = "DELETE FROM modules WHERE name ='"+module.code+"'" ;
    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
module.exports.removeAllModules = async (module)=> {
    //Build SQL query
    const  sql = "DELETE FROM modules WHERE name ='"+module.name+"'" ;
    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
module.exports.removeCourse = async (module)=> {
    //Build SQL query
    const  sql = "DELETE FROM title WHERE code ='"+module.code+"'" ;
    //Execute promise to run query
    let result = await executeQuery(sql);

    //Extract the data we need from the result
    return result;
}
/** Wraps connection pool query in a promise and returns the promise */
async function executeQuery(sql){
    //Wrap query around promise
    let queryPromise = new Promise( (resolve, reject)=> {
        //Execute the query
        connectionPool.query(sql, function (err, result) {
            //Check for errors
            if (err) {
                //Reject promise if there are errors
                reject(err);
            }

            //Resole promise with data from database.
            resolve(result);
        });
    });

    //Return promise
    return queryPromise;
}

