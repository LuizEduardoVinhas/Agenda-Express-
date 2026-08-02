exports.middlewareGlobal = (req, res, next) => {
    res.locals.VarLocal = 'Variavel local'
    next()
}


exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()

}

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer um login');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
}