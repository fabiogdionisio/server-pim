const express = require('express');
const router = express.Router();
const pswrdController = require('../controllers/pswrdController');

router.post('/', pswrdController.createPswrd);
router.get('/serve', pswrdController.servePswrd);
// router.get('/', pswrdController.getAllPswrd);
// router.get('/:id', pswrdController.getPswrd);
// router.put('/:id', pswrdController.getPswrd);
// router.delete('/:id', pswrdController.getPswrd);

module.exports = router;