const express = require('express');
const router = express.Router();

const playerController = require('../controllers/PlayerController');


router.get('/', playerController.index);
router.get('/create', playerController.create);

module.exports = router;