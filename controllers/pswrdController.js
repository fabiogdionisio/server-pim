const model = require('../models/PswrdModel');

exports.createPswrd = (req, res) => {
    let type = req.params.type;
    let service = req.params.service;
    
    // Check if there is a queue 
    model.queueIsSet( (response) => {
        let queueId = response[0].id;
        
         
        // If yes, generate new password,
        model.createPswrd(queueId, type, service, response) {

        };
        // Else create a queue then generate a password.
    });
};