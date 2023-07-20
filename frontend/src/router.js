import {Form} from "./components/form.js";
import {Home} from "./components/home.js";
import {IncomeAndExpenses} from "./components/incomeAndExpenses.js";
import {WorkWithCategory} from "./components/work-with-category.js";
import {CreateIncomeExpenses} from "./components/createIncomeExpenses.js";
import {Category} from "./components/category.js";
import {EditCategory} from "./components/edit-category.js";
import {Links} from "./components/links.js";
import {UserInfo} from "./utils/user-info.js";

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
                    new UserInfo();
                }
            },
            {
                route: '#/incAndExp',
                title: 'Доходы и расходы',
                template: '/templates/incomeAndExpenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new IncomeAndExpenses();
                    new UserInfo();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: '/templates/income.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new Category('income');
                    new UserInfo();
                }
            },
            {
                route: '#/expense',
                title: 'Расходы',
                template: '/templates/expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new Category('expense');
                    new UserInfo();
                }
            },
            {
                route: '#/create-income',
                title: 'Создание категории доходов',
                template: '/templates/create-edit-category.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new WorkWithCategory('income');
                    new UserInfo();
                }
            },
            {
                route: '#/create-expense',
                title: 'Создание категории расходов',
                template: '/templates/create-edit-category.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new WorkWithCategory('expense');
                    new UserInfo();
                }
            },
            {
                route: '#/create-income-expense',
                title: 'Создание дохода/расхода',
                template: '/templates/create-income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new CreateIncomeExpenses();
                    new UserInfo();
                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование категории доходов',
                template: '/templates/create-edit-category.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new EditCategory("income");
                    new UserInfo();
                }
            },
            {
                route: '#/edit-expense',
                title: 'Редактирование категории доходов',
                template: '/templates/create-edit-category.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new EditCategory('expense');
                    new UserInfo();
                }
            },
            {
                route: '#/edit-operation',
                title: 'Редактирование дохода/расхода',
                template: '/templates/create-income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new CreateIncomeExpenses('edit');
                    new UserInfo();
                }
            }
        ]
    }

    async openRoute() {
        const sidebar = document.getElementById('sidebar');

        const newRoute = this.routs.find(item => {
            return item.route === window.location.hash;
        })

        if (!newRoute) {
            window.location.href = '#/login';
            return;
        }

        if (newRoute.route === '#/login' || newRoute.route === '#/signup') {
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'flex';
            new Links();
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('title').innerText = newRoute.title;

        let title = document.getElementById('body-title');

        if (title) {
            title.innerText = newRoute.title;
        }
        newRoute.load();
    }
}