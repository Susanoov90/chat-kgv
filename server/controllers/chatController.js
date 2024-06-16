const chatModel = require('../models/chat');

const createChat = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {firstId, lastId} = req.body;

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, lastId]}
        })


        if(chat){
            res.status(200).json(newChat)
        } else{
            const newChat = new chatModel({
                members: [firstId, lastId]
            })

            const response = await newChat.save()

            res.status(200).json(response)

        }

    } catch (err) {
        console.error("error of createChat", err)
        res.status(500).json(err)
    }
}

const findUserChats = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id

    try{
        const findChatOfUser = await chatModel.find({
            members: {$in : [id]}
        })

        res.status(200).json(findChatOfUser)

    } catch(err){
        console.error("error of findChat", err)
        res.status(500).json(err)

    }
}

const findChat = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const {firstId,secondId} = req.params


    try{
        const chats = await chatModel.find({
            members: {$all : [firstId,secondId]}
        })

        res.status(200).json(chats)

    } catch(err){
        console.error("error of findChat", err)
        res.status(500).json(err)

    }
}
module.exports = { createChat, findUserChats, findChat }
