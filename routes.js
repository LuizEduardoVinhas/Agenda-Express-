const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middlewaresGlobal');


// rotas home
route.get('/index', homeController.index);

// rotas login
route.get('/index/login', loginController.index)

// rotas de contato
route.get('/index/contato', loginRequired, contatoController.index);
    route.get('/index/contato', loginRequired, contatoController.editindex);
route.post('/index/contato', loginRequired, contatoController.registerContato);

module.exports = route; 