const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
    senderID : String,
    receiverID : String,
    isValidated : Boolean
}, {
    timestamps: true,
})

const invitationModel = mongoose.model("invitation", invitationSchema);

module.exports = invitationModel;
