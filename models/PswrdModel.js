const connection = require('../config/database.js');

 // CHECKS IF THERE IS A QUEUE
exports.queueIsSet = callback => {

    let sql = 'SELECT * FROM `queue` WHERE date = CURDATE()';

    connection.query(sql, (err, result) => {
        if(err) throw err;
        return callback(result);
    }); 
};

 // CREATE A PASSWPRD
 exports.createPswrd = (type, service, callback) => {

    let sql = ``;

    connection.query(sql, (err, result) => {
        if(err) throw err;
        return callback(result);
    }); 
};
