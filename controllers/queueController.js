const PswrdModel = require('../models/PswrdModel');
const QueueModel = require('../models/QueueModel');

exports.getCurrentQueue = async (req, res) => {

    // Get all the open passwords for the current day
    let queue = await QueueModel.queueIsSet();
    let result = await PswrdModel.getOpenPswrds(queue);

    res.json(result);
};

exports.callNextPswrd = async (req, res) => {

    let delayedPswrd, prefPswrd, nextPswrd, result = '';
    let queue = await QueueModel.queueIsSet();

    // Check if there is a password created more than 15 minutes ago and call it,
    delayedPswrd = await PswrdModel.getDelayedPswrd(queue);
    if (delayedPswrd) result = await PswrdModel.callPswrd(delayedPswrd.id);

    // If there isn't, call a preferential one
    if (!delayedPswrd) prefPswrd = await PswrdModel.getPrefPswrd(queue);
    if (prefPswrd) result = await PswrdModel.callPswrd(prefPswrd.id);

    // If there ins't a preferential one, call a common one.
    if (!prefPswrd && !delayedPswrd) nextPswrd = await PswrdModel.getNextPswrd(queue);
    if (nextPswrd) result = await PswrdModel.callPswrd(nextPswrd.id);

    // Return the response to the user
    if (result) {

        let calledPswrd = '';

        if (delayedPswrd) calledPswrd = delayedPswrd;
        if (prefPswrd) calledPswrd = prefPswrd;
        if (nextPswrd) calledPswrd = nextPswrd;

        let response = {
            message: 'Senha chamada com sucesso',
            pswrd: calledPswrd
        };

        res.json(response);

    } else {

        let response = {
            message: 'Nenhuma senha encontrada para ser chamada',
        };

        res.statusCode = 404;
        res.json(response);
    }
};

exports.callPswrd = async (req, res) => {

    let pswrd = req.body.pswrd;
    let result = await PswrdModel.callPswrd(pswrd);

    res.json(result);
};