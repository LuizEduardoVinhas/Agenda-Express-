const contatoModel = require('../models/ContatoModel');

exports.index = (req, res) => {
    return res.render('contato', { contato: {} });

}

exports.registerContato = async (req, res) => {
    const contato = new contatoModel(req.body);
    await contato.register();

    try {
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/index/contato'));
            return;
        }
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(`/index/contato/${contato.contato._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.editindex = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const user = await contatoModel.buscarPorid(req.params.id);
    if (!user) return res.render('404');

    res.render('contato', { contato: user });
}

exports.edit = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const contato = new contatoModel(req.body);
    await contato.edit(req.params.id);

    try {
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/index/contato'));
            return;
        }
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(`/index/contato/${contato.contato._id}`));
    } catch (e) {
        console.log(e);
        res.render('404');
    }

}

exports.delete = async function (req, res) {
    if (!req.params.id) return res.render('404');
    const contato = await contatoModel.delete(req.params.id);
    if (!contato) return res.render('404');
    req.flash('success', 'Contato deletado com sucesso');
    req.session.save(() => res.redirect('/'));
}