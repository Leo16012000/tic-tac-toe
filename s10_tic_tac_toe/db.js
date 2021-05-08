const mysql = require("mysql");
const config = require("./default.json")
const pool = mysql.createPool(config.mysql);
const TBL = "Account";
module.exports = {
    load: function(sql){
        return new Promise(function(resolve, reject){
            pool.query(sql, function(error, result, fields){
                if(error){
                    return reject(error);
                }

                resolve(result);
            })
        })
    },
    loaduser: function(username, password){
        const rows = await db.load(`select * from ${TBL} where User = '${username}' and Pass ='${password}'`);
        if (rows.length === 0) return null;
        else return rows[0];
    },
    adduser: function(username, password){
        await db.load(`insert into ${table} value (${username},${password})`)
    }
}