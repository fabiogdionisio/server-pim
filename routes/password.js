const express = require('express');
const router = express.Router();
const controller = require('../controllers/pswrdController');

router.post('/', controller.createPswrd);
// router.post('/', controller.createPswrd);

module.exports = router;