const connection = require('../config/database.js');

 // CHECKS IF THERE IS A QUEUE
exports.queueIsSet = () => {

    return new Promise( (resolve, reject) => {

        let sql = 'SELECT * FROM `queue` WHERE date = CURDATE()';
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            if (result.length !== 0) resolve(result[0].id);
            else resolve(false);
        }); 
    });
};

exports.createQueue = () => {

    return new Promise( (resolve, reject) => {

        let sql = 'INSERT INTO `queue` (date) VALUES (CURDATE())';
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result.insertId);
        }); 
    });
};