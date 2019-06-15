const express = require('express');
const router = express.Router();
const pswrdController = require('../controllers/pswrdController');

router.post('/', pswrdController.createPswrd);
// router.post('/', controller.createPswrd);

module.exports = router;