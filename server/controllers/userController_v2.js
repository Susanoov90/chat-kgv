var express = require('express');
const User = require('../models/user_v2');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

//AUTHENTICATION
const registerUser = async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('post requested', req.body);
        const { name_user, username_user, email_user, date_enter, password_user } = req.body;
        let searchUserMail = await User.findOne({ email_user });
        let searchUserUsername = await User.findOne({ username_user });

        if (!name_user || !username_user || !email_user || !password_user) {
            console.log("Please fill all the fields")
            return res.status(400).json("Please fill all the fields").send("Please fill all the fields")
        }

        if (!validator.isEmail(email_user)) {
            console.log("Invalid email")
            return res.status(400).json("Invalid email").send("Invalid email")
        }

        if (!validator.isStrongPassword(password_user)) {
            console.log("You suggest a password and its not very strong...")
            return res.status(400).json("Invalid password").send("You suggest a password and its not very strong...")
        }

        if (searchUserMail || searchUserUsername) {
            console.log("Email or Username already exists")
            return res.status(400).json("Email or Username already exists").send("Email or Username already exists")
        } else {
            const users = await new User({ name_user, username_user, email_user, date_enter, password_user })
            const salt = await bcrypt.genSalt(10)
            users.password_user = await bcrypt.hash(users.password_user, salt)
            await users.save()
            const token = createToken(users._id)

            res.status(200).json({ _id: users._id, name_user, username_user, email_user, date_enter, token })
        }
    } catch (err) {
        console.error("error of register", err)
        res.status(500).json(err)
    }
}


const loginUser = async (req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('post requested', req.body);
        const { username_user, password_user } = req.body;

        const findUser = await User.findOne({ username_user })

        const isValidPassword = await bcrypt.compare(password_user, findUser.password_user)

        if (!isValidPassword) {
            console.log("Attempt of login invalid because of the username or the password I guess... Try Again please!")
            return res.status(400).json("Attempt of login invalid because of the username or the password I guess... Try Again please!").send("Attempt of login invalid because of the username or the password I guess... Try Again please!")
        }

        if (!findUser) {
            alert("Attempt of login invalid because of the username or the password I guess... Try Again please!")
            return res.status(400).json("Attempt of login invalid because of the username or the password I guess ... Try Again please !").send("Attempt of login invalid because of the username or the password I guess... Try Again please!")
        }

        if (!username_user || !password_user) {
            alert("Please fill the fields for login attempt")
            return res.status(400).json("Please fill the fields for login attempt").send("Please fill the fields for login attempt");
        }

        const token = createToken(findUser._id);

        res.status(200).json({ _id: findUser._id, name_user: findUser.name_user, username_user: findUser.username_user, email_user: findUser.email_user, date_enter: findUser.date_enter, token })

    } catch (err) {
        console.error("error of login", err)
        res.status(500).json(err)
    }
}
//END AUTHENTICATION

const findUser = async (req, res, next) => {
    const userID = req.params.id
    try {
        const user = await User.findById(userID)

        res.status(200).json(user)

    } catch (err) {
        console.error("error of findUser", err)
        res.status(500).json(err)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const user = await User.find()

        res.status(200).json(user)

    } catch (err) {
        console.error("error of findUser", err)
        res.status(500).json(err)
    }
}

const sendInvitation = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { userID, invitationID } = req.body
    try {
        const user = await User.findOne({
            membership_linked: { $all: [userID, invitationID] }
        })

        const findUserInvitation = await User.findOne({ _id: invitationID }) //Find details about the user who gonna get invited
        const findUserID = await User.findOne({ _id: userID }) //Retrieve details avout the current user

        if (findUserID && findUserInvitation) {
            const forUserInvitation = await User.findByIdAndUpdate(req.params.lastId, {
                membership_linked: handleDisponibilityToConcat((findUserInvitation.membership_linked), userID),
                details_membership_linked: handleDisponibilityToConcat((findUserInvitation.details_membership_linked), findUserID.username_user)
            })


            const forUserID = await User.findByIdAndUpdate(req.params.id, {
                membership_linked: handleDisponibilityToConcat((findUserID.membership_linked), invitationID),
                details_membership_linked: handleDisponibilityToConcat((findUserID.details_membership_linked), findUserInvitation.username_user)
            })

            res.status(200).json({ forUserInvitation: forUserInvitation, forUserID: forUserID })

        }

    } catch (err) {
        console.error("error of sendInvitation", err)
        res.status(500).json(err)
    }
}

//Function Handling availability of data
const handleDisponibilityToConcat = (previous_arr, valueToConcat) => {
    if (previous_arr.includes(valueToConcat)) {
        return previous_arr
    } else {
        return previous_arr.concat(valueToConcat)
    }
}

module.exports = { registerUser, loginUser, findUser, getUsers, sendInvitation }
