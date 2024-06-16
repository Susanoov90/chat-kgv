const mongoose = require('mongoose');
const userModel = require('./user');

const chatSchema = new mongoose.Schema({
    members : Array,
    details_members : Array
}, {
    timestamps: true,
})

const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;
