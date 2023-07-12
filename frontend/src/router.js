import {Form} from "./components/form.js";
import {Home} from "./components/home.js";
import {IncomeAndExpenses} from "./components/incomeAndExpenses.js";
import {Income} from "./components/income.js";
import {Expenses} from "./components/expenses.js";
import {CreateIncome} from "./components/create-income.js";
import {CreateExpenses} from "./components/create-expenses.js";

export class Router {
    constructor() {
        this.routs = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: '/templates/signup.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                template: '/templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/home',
                title: 'Главная',
                template: '/templates/home.html',
                styles: 'styles/home.css',
                load: () => {
                    new Home();
                }
            },
            {
                route: '#/incAndExp',
                title: 'Доходы и расходы',
                template: '/templates/incomeAndExpenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new IncomeAndExpenses();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: '/templates/income.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new Income();
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: '/templates/expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new Expenses();
                }
            },
            {
                route: '#/create-income',
                title: 'Создание категории доходов',
                template: '/templates/create-income.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new CreateIncome();
                }
            },
            {
                route: '#/create-expenses',
                title: 'Создание категории расходов',
                template: '/templates/create-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new CreateExpenses();
                }
            }
        ]
    }

    async openRoute() {
        const newRoute = this.routs.find(item => {
            return item.route === window.location.hash;
        })


        if (!newRoute) {
            window.location.href = '#/login';
            return;
        }

        if (newRoute.route === '#/home') {
            document.getElementById('sidebar').innerHTML = await fetch('/templates/sidebar.html').then(response => response.text());
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('title').innerText = newRoute.title;

        newRoute.load();
    }
}