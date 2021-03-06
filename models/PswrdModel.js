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

        let sql = `INSERT INTO pswrd (queue, type, service, number, status, time_created) VALUES (${queueId}, ${type}, ${service}, '${count}', 'aberto', CURTIME())`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result.insertId);
        }); 
    });
};

exports.getPswrd = (pswrdId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd WHERE id = ${pswrdId}`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};

exports.getCalledPswrds = (queueId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `SELECT pswrd.id as id,
                   type.initials as type, 
                   service.initials as service,
                   pswrd.number as number
                   FROM ((pswrd 
                   INNER JOIN type ON pswrd.type = type.id)
                   INNER JOIN service ON pswrd.service = service.id)
                   WHERE queue = ${queueId}
                   AND status = 'chamado'
                   AND time_served IS NULL
                   ORDER BY time_called ASC
                   LIMIT 1`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};

exports.getOpenPswrds = (queueId) => {

    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd WHERE queue = ${queueId} AND status = 'aberto'`;
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result);
        }); 
    });
};

exports.getDelayedPswrd = (queueId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd 
        WHERE pswrd.queue = ${queueId}
        AND pswrd.time_created < DATE_SUB( NOW() , INTERVAL 15 MINUTE ) 
        AND pswrd.status = 'aberto'
        LIMIT 1`;

        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};

exports.getPrefPswrd = (queueId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd 
                   WHERE queue = ${queueId} 
                   AND status = 'aberto' 
                   AND type = 2 
                   LIMIT 1`;

        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};

exports.getNextPswrd = (queueId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `SELECT * FROM pswrd WHERE queue = ${queueId} AND status = 'aberto' LIMIT 1`;

        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};

exports.callPswrd = (pswrd) => {

    return new Promise( (resolve, reject) => {

        let sql = `UPDATE pswrd 
                   SET status = 'chamado',
                   time_called = CURTIME()
                   WHERE id = ${pswrd}`;
                   
        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result);
        }); 
    });
};

exports.alterServedPswrd = (pswrdId) => {
    
    return new Promise( (resolve, reject) => {

        let sql = `UPDATE pswrd SET time_served = CURTIME() where id = ${pswrdId}`;

        connection.query(sql, (err, result) => {

            if(err) return reject(err);
            resolve(result[0]);
        }); 
    });
};
