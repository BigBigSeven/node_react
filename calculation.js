const mysql = require('mysql'),
      moment = require('moment'),
      D = require('../defaultset'),
      async = require('async'),
      schedule = require('node-schedule');

let pool  = mysql.createPool({
  connectionLimit : 10,
  host: D.db_database_ip,
  user: D.db_user,
  password: D.db_password,
  database: D.db_database
});


/**
 * 每天凌晨执行一次任务，进行数据库备份
 */
// let j = schedule.scheduleJob({ hour: 00, minute: 00 }, () => {
//   console.log('每天凌晨执行一次数据库备份');
//   backupMysql.fn();
// });

/***************************************登录*************************/
let auth = (user, cb) => {
  console.log(111111);
  console.log(user);
  const sql = 'SELECT * FROM userlist WHERE username = ?';
  pool.query(sql, [user], (err, results, fields) => {
    if (err) {
      throw err;
    }
    if (results) {
      console.log(results);
      cb(results);
    }
  })
}
let auth_deserialize = (id, cb) => {
  const sql = 'SELECT * FROM userlist WHERE id = ?';
  pool.query(sql, [id], (err, results, fields) => {
    if (err) {
      throw err;
    }
    if (results) {
      cb(results);
    }
  });
}

module.exports = {
  auth,
  auth_deserialize
}
