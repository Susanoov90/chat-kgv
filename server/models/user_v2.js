const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name_user: {type: String, required: true, minlength: 1, maxlength: 50},
    username_user: {type: String, required: true, minlength: 1, maxlength: 50, unique: true},
    email_user: {type: String, required: true, minlength: 1, maxlength: 50, unique: true},
    date_enter: {type: Date, default : Date.now, required: false},
    password_user: {type: String, required: true, minlength: 4, maxlength: 150, unique: true},
    membership_linked : Array,
    details_membership_linked : Object
}, {
    timestamps: true,
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;