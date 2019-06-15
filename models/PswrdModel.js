const connection = require('../config/database.js');

exports.countPswrd = (queueId) => {

    return new Promise( (resolve, reject) => {

        let sql = 'SELECT COUNT(*) as count FROM `pswrd` WHERE `queue` = ' + queueId;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0].count);
        }); 
    });
};

exports.createPswrd = (queueId, type, service, count) => {

    return new Promise( (resolve, reject) => {

        let sql = `INSERT INTO pswrd (queue, type, service, number, status) VALUES (${queueId}, ${type}, ${service}, '${count}', 'aberto')`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result.insertId);
        }); 
    });
};

exports.getPswrd = (pswrd) => {

    return new Promise( (resolve, reject) => {

        let sql = 'SELECT `number` FROM `pswrd` WHERE `id` = ' + pswrd;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result.insertId);
        }); 
    });
};

exports.getOpenPswrds = (id) => {

    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd WHERE queue = ${id} AND status = 'aberto'`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result);
        }); 
    });
};