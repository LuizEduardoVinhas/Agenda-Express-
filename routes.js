const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// rotas home
route.get('/index', homeController.index);

// rotas login
route.get('/index/login', loginController.index)

module.exports = route;