const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: String,
    senha: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;

    }

    async Login() {
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email })

        if (!this.user) {
            this.errors.push('Usuario não existe.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExists()
        const salt = bcryptjs.genSaltSync()
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt)
        if (this.errors.length > 0) return;


        try {
            this.user = await LoginModel.create(this.body)
        } catch (e) {
            console.log(e)
        }
    }

    async userExists() {
        const user = await LoginModel.findOne({ email: this.body.email })

        if (user) this.errors.push('Usuario já existe')
    }

    valida() {
        this.cleanUp();

        // validação
        // email válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        // senha entre 3 e 40 caracteres
        if (this.body.senha.length < 3 || this.body.senha.length >= 40) {
            this.errors.push('A senha precisa ter entre 3 e 40 caractere')
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        }
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        }
    }
}

module.exports = Login;