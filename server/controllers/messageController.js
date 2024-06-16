const messageModel = require('../models/message');

const createMessage = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { chatId, senderId, text } = req.body;

    const message = await new messageModel({
        chatId,
        senderId,
        text
    })
    try {
        const savingMessage = await message.save();
        res.status(200).json(savingMessage)
    } catch (e) {
        console.error("error of createMessage", e)
        res.status(500).json(e)
    }
}

const getMessage = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id
    const chatId = req.params.chatId
    console.log("req.body",{id:id, chatId:chatId})

    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages)
    } catch (e) {
        console.error("error of getMessage", e)
        res.status(500).json(e)
    }
}

module.exports = { createMessage, getMessage }
