const mysql = require("mysql");
const config = require("./default.json");
const pool = mysql.createPool(config.mysql);
const TBL = "Account";
module.exports = {
  load: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (error, result, fields) {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  },
  add: function (table, entity) {
    return new Promise(function (resolve, reject) {
      const sql = `insert into ${table} set ?`;
      pool.query(sql, entity, function (error, result, fields) {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });
  },
  loaduser: async function (username, password) {
    const rows = await this.load(
      `select * from ${TBL} where User = '${username}' and Pass ='${password}'`
    );
    if (rows.length === 0) return null;
    else return rows[0];
  },
  isUserExisted: async function (username) {
    const rows = await this.load(
      `select * from ${TBL} where User = '${username}'`
    );
    if (rows.length === 0) return false;
    else return true;
  },
  adduser: async function (entity) {
    return this.add(TBL, entity);
  },
  getListRank: async function () {
    const rows = await this.load("SELECT * FROM MatchHistory");
    if (rows.length === 0) return null;
    else return rows;
  },
};
