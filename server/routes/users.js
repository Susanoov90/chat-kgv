var express = require('express');
var router = express.Router();
// const User = require('../models/user');
// const { registerUser, loginUser, findUser, getUsers } = require('../controllers/userController');
const { registerUser, loginUser, findUser, getUsers, sendInvitation } = require('../controllers/userController_v2');


/* POST FOR REGISTER*/
router.post('/', registerUser ); //enlever le register apres la barre la apres pour interagir avec react
router.post('/login', loginUser) //enlever le login apres la barre la apres pour interagir avec react
router.get('/:id', findUser) //enlever le find apres la barre la apres pour interagir avec react
router.get('/', getUsers) 
router.post('/:id/:lastId', sendInvitation)

/* GET */
// router.get('/', async function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     const users = await User

//     users.find()
//         .then(u => res.json(u))
//         .catch(err => res.json(err) )
// });

/* PUT */
// router.put('/:id', async function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     const users = await User

//     users.findByIdAndUpdate(req.params.id, req.body)
//       .then(u => res.json(u))
//       .catch(err => res.json(err) )
// });


/* DELETE */
// router.delete("/:id",async function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     const id = req.params.id
//     const users = await User

//     users.findByIdAndDelete(req.params.id)
//      .then(u => res.json(u))
//      .catch(err => res.json(err) )
// })


module.exports = router;