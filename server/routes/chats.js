var express = require('express');
var router = express.Router();
// const { createChat, findChat, findUserChats } = require('../controllers/chatController');
const { createChat, findChat, findUserChats } = require('../controllers/chatController_v2');


router.post('/:id', createChat ); //enlever le register apres la barre la apres pour interagir avec react
router.get('/:id', findUserChats) //enlever le login apres la barre la apres pour interagir avec react
router.get('/:firstId/:lastId', findChat) //enlever le find apres la barre la apres pour interagir avec react

module.exports = router;