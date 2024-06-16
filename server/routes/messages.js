var express = require('express');
var router = express.Router();
const { createMessage, getMessage } = require('../controllers/messageController');

router.post('/:id', createMessage ); //enlever le register apres la barre la apres pour interagir avec react
router.get('/:id/:chatId', getMessage) //enlever le login apres la barre la apres pour interagir avec react

module.exports = router;