const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.get('/', queueController.getCurrentQueue);
// router.get('/', pswrdController.getAllPswrd);
// router.get('/:id', pswrdController.getPswrd);
// router.put('/:id', pswrdController.getPswrd);
// router.delete('/:id', pswrdController.getPswrd);

module.exports = router;