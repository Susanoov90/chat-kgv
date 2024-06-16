const userModel = require('../models/user_v2');
const invitationModel = require('../models/invitation')

//sendInvitation
const sendInvitation = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    const { userID, invitationID } = req.body

    try{

    } catch (err) {
        console.error("error of sendInvitation", err)
        res.status(500).json(err)
    }
}
//DecideToInvitationSent
