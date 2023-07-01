export class Form {
    constructor() {
        this.processElement = null;
        this.passwordOne = null;
        this.passwordTwo = null;
        this.linkButton = null;
        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false
            }
        ]

        let that = this;

        this.linkButton = document.getElementById('link-button');
        this.linkButton.onclick = () => {
            location.href = '#/signup';
        }

        this.processElement = document.getElementById('process');
        this.processElement.onclick = () => {
            //that.checkUserProfile()
            that.processForm();
        };

        //если hash === #/signup
        if (window.location.hash === '#/signup') {
            this.fields.push(
                {
                    name: 'fio',
                    id: 'fio',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/,
                    valid: false
                },
                {
                    name: 'passwordTwo',
                    id: 'passwordTwo',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false
                }
            );

            this.linkButton.onclick = () => {
                location.href = '#/login';
            };

            this.processElement.onclick = () => {
                if (!that.passwordsChecked()) {
                    alert('Пароли не совпадают')
                } else {
                    alert('Регистрация завершена')
                    //that.createUserProfile();
                    that.processForm();
                }
            };
        }

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function ()  {
                that.validateField.call(that, item, this);
            }
        });
    }

    passwordsChecked() {
        this.passwordOne = document.getElementById('password');
        this.passwordTwo = document.getElementById('passwordTwo');

        return this.passwordOne.value === this.passwordTwo.value
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.style.borderColor = 'red';
            field.valid = false;
        } else {
            element.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        if (validForm) {
            this.processElement.removeAttribute('disabled')
        } else {
            this.processElement.setAttribute('disabled', 'disabled')
        }

        return validForm;
    }

    createUserProfile() {

    }

    checkUserProfile() {

    }

    processForm() {
        if (this.validateForm()) {
            location.href = '#/home'
        } else {
            location.href = '#/login'
        }
    }
}