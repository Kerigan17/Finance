import {CustomHttp} from "../services/custom-http.js";
import {Auth} from "../services/auth.js";
import config from "../../config/config.js";

export class Form {
    constructor(page) {
        this.processElement = null;
        this.passwordOne = null;
        this.passwordTwo = null;
        this.page = page;
        this.rememberMe = null;
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

        this.rememberMe = document.getElementById('flexCheckDefault');

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

        if (document.cookie !== '' && this.page === 'login') {
            this.autoFillForm();
        }
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
                    const email = this.fields.find(item => item.name === 'email').element.value;
                    const result = await CustomHttp.request(config.host + '/login', 'POST', {
                        email: email,
                        password: this.fields.find(item => item.name === 'password').element.value,
                        rememberMe: this.rememberMe.checked
                    });

                    if (this.rememberMe.checked){
                        document.cookie = "email" + "=" + this.fields.find(item => item.name === 'email').element.value + "; path=" + config.host + "/login";
                        document.cookie = "password" + "=" + this.fields.find(item => item.name === 'password').element.value + "; path=" + config.host + "/login";
                    } else {
                        this.cookiesDelete();
                    }

                    if (result) {
                        if (result.error || !result.user || !result.tokens.refreshToken || !result.tokens.accessToken) {
                            throw new Error(result.message);
                        }
                        Auth.setUserInfo({
                            fullName: `${result.user.name} ${result.user.lastName}`,
                            userId: result.id,
                            email: email
                        })
                        Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
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
            const response = await CustomHttp.request(config.host + '/refresh', 'POST', {
                refreshToken: localStorage.getItem('refreshToken')
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

    cookiesDelete() {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    autoFillForm() {
        this.fields.find(item => item.name === 'email').element.value = this.getCookie('email');
        this.fields.find(item => item.name === 'password').element.value = this.getCookie('password');

        this.rememberMe.setAttribute('checked', 'checked');
        this.processElement.removeAttribute('disabled');

        this.fields.forEach(item => item.valid = true)
    }
}