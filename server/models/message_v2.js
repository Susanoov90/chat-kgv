const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String,
    details_members : Array
}, {
    timestamps: true,
})

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
