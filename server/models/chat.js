const mongoose = require('mongoose');
const userModel = require('./user.js');

const chatSchema = new mongoose.Schema({
    members : Array
}, {
    timestamps: true,
})

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
