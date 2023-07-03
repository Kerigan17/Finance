import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";

export class Form {
    constructor(page) {
        this.processElement = null;
        this.passwordOne = null;
        this.passwordTwo = null;
        this.page = page;
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

        this.processElement = document.getElementById('process');
        this.processElement.onclick = () => {
            that.processForm();
        };

        //если signup
        if (this.page === 'signup') {
            this.fields.push(
                {
                    name: 'fio',
                    id: 'fio',
                    element: null,
                    regex: /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/,
                    valid: false
                },
                {
                    name: 'passwordRepeat',
                    id: 'passwordRepeat',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false
                }
            );

            this.processElement.onclick = () => {
                if (!that.passwordsChecked()) {
                    alert('Пароли не совпадают')
                } else {
                    alert('Регистрация завершена')
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
        this.passwordTwo = document.getElementById('passwordRepeat');

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

    async processForm() {
        if (this.validateForm()) {

            if (this.page === 'signup') {
                try {
                    const result = await CustomHttp.request(config.host + '/signup', 'POST', {
                        name: this.fields.find(item => item.name === 'fio').element.value.split(' ')[1],
                        lastName: this.fields.find(item => item.name === 'fio').element.value.split(' ')[0],
                        email: this.fields.find(item => item.name === 'email').element.value,
                        password: this.fields.find(item => item.name === 'password').element.value,
                        passwordRepeat: this.fields.find(item => item.name === 'passwordRepeat').element.value,
                    });

                    if (result) {
                        if (result.error || !result.user) {
                            throw new Error(result.message);
                        }
                        location.href = '#/home';
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    const result = await CustomHttp.request(config.host + '/login', 'POST', {
                        email: this.fields.find(item => item.name === 'email').element.value,
                        password: this.fields.find(item => item.name === 'password').element.value,
                        rememberMe: false
                    });

                    if (result) {
                        console.log(result)
                        if (result.error || !result.user || !result.tokens.refreshToken || !result.tokens.accessToken) {
                            throw new Error(result.message);
                        }
                        Auth.setTokens(result.accessToken, result.refreshToken);
                        location.href = '#/home';
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    async refreshToken(){
        try {
            const response = await fetch('http://localhost:3000/api/refresh', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken: localStorage.getItem('refreshToken')
                })
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.message);
            }

            const result = await response.json();
            if (result) {
                if (result.error || !result.user) {
                    throw new Error(result.message);
                }

                localStorage.setItem("accessToken", result.tokens.accessToken)
                localStorage.setItem("refreshToken", result.tokens.refreshToken)

                location.href = '#/home';
            }
        } catch (error) {
            console.log(error);
        }
    }
}