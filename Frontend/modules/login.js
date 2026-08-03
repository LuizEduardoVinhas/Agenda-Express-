import validator from 'validator'

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }
    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        });
    }
    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        let error = false;

        if(!validator.isEmail(emailInput.vale))
            alert('E-mail inválido'), error = true;
        if(passwordInput.value.length < 3 || passwordInput.value.length > 50)
            error = true, alert('Senha precisa ter entre 3 e 50 caracteres')
        if(error) return
        el.submit()

        console.log(emailInput.value, passwordInput.value)
    }
}
