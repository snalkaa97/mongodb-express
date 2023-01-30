const express = require('express');
const route = express.Router();
const userRoute = require('./User')
const authJwt = require('../controllers/auth/AuthJwtController')
const signController = require('../controllers/auth/signController')

route.post('/login', signController.signin);
route.post('/signup', signController.signup);
route.use('/user', userRoute);

module.exports = route;