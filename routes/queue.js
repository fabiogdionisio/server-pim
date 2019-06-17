const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.get('/', queueController.getCurrentQueue);
router.get('/called', queueController.getCalledQueue);
// router.get('/', pswrdController.getAllPswrd);
// router.get('/:id', pswrdController.getPswrd);
router.put('/', queueController.callNextPswrd);
// router.delete('/:id', pswrdController.getPswrd);

module.exports = router;