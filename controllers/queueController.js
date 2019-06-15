const PswrdModel = require('../models/PswrdModel');
const QueueModel = require('../models/QueueModel');

exports.getCurrentQueue = async (req, res) => {

    // Get all the open passwords for the current day
    let queue = await QueueModel.queueIsSet();
    let result = await PswrdModel.getOpenPswrds(queue);

    // let result = {
    //     message: 'Senha criada com sucesso',
    //     pswrd: pswrd
    // };

    res.json(result);
};