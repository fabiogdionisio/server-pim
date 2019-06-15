const PswrdModel = require('../models/PswrdModel');
const QueueModel = require('../models/QueueModel');

exports.createPswrd = async (req, res) => {
    let type = req.body.type;
    let service = req.body.service;

    // Check if there is a queue 
    // If false, creates a queue
    let queueId = await QueueModel.queueIsSet();
    if (!queueId) queueId = await QueueModel.createQueue();

    // Count the number of existed password to generate the new password number;
    let count = await PswrdModel.countPswrd(queueId) + 1;

    // Finally creates the password and return to the user;
    let pswrd = await PswrdModel.createPswrd(queueId, type, service, count);
    let result = {
        message: 'Senha criada com sucesso',
        pswrd: pswrd
    };

    res.json(result);
};