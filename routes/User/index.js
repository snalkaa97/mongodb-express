const express = require("express");
const route = express.Router();
const userController = require('../../controllers/User/UserController')
const verifyJwt = require('../../controllers/auth/AuthJwtController')

// route.get('/', (req, res) => {
//     res.status(200).send({message: 'user get'})
// })

route.get('/',[verifyJwt.verifyToken], userController.getUser)
route.get('/:id',[verifyJwt.verifyToken], userController.getUserById)
route.post('/',[verifyJwt.verifyToken], userController.saveUser);
route.put('/:id',[verifyJwt.verifyToken], userController.updateUser);
route.delete('/:id',[verifyJwt.verifyToken], userController.deleteUser);

module.exports = route;