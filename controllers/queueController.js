const PswrdModel = require('../models/PswrdModel');
const QueueModel = require('../models/QueueModel');

exports.getCurrentQueue = async (req, res) => {

    // Get all the open passwords for the current day
    let queue = await QueueModel.queueIsSet();
    let result = await PswrdModel.getOpenPswrds(queue);

    res.json(result);
};

exports.callNextPswrd = async (req, res) => {

    // Get all the open passwords for the current day
    let queue = await QueueModel.queueIsSet();
    let result = await PswrdModel.callNextPswrd(queue);

    res.json(result);
};