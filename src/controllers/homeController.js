const contatoModel = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await contatoModel.buscarContato();
    res.render('index', { contatos });
}