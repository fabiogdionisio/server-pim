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
    let pswrdId = await PswrdModel.createPswrd(queueId, type, service, count);
    let createPswrd = await PswrdModel.getPswrd(pswrdId);

    let result = {
        message: 'Senha criada com sucesso',
        pswrd: createPswrd.number 
    };

    res.json(result);
};

exports.servePswrd = async (req, res) => {

    // Get all the called passwords for the current day
    let queue = await QueueModel.queueIsSet();
    let result = await PswrdModel.getCalledPswrds(queue);
    if (result) await PswrdModel.alterServedPswrd(result.id);

    res.json(result);
};