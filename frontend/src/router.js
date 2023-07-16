import {Form} from "./components/form.js";
import {Home} from "./components/home.js";
import {IncomeAndExpenses} from "./components/incomeAndExpenses.js";
import {WorkWithCategory} from "./components/work-with-category.js";
import {CreateIncomeExpenses} from "./components/createIncomeExpenses.js";
import {Category} from "./components/category.js";
import {EditCategory} from "./components/edit-category";

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
                    new Category('income');
                }
            },
            {
                route: '#/expense',
                title: 'Расходы',
                template: '/templates/expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new Category('expense');
                }
            },
            {
                route: '#/create-income',
                title: 'Создание категории доходов',
                template: '/templates/create-income.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new WorkWithCategory('income');
                }
            },
            {
                route: '#/create-expenses',
                title: 'Создание категории расходов',
                template: '/templates/create-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new WorkWithCategory('expense');
                }
            },
            {
                route: '#/create-income-expenses',
                title: 'Создание дохода/расхода',
                template: '/templates/create-income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new CreateIncomeExpenses();
                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование категории доходов',
                template: '/templates/edit-income.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new EditCategory("income");
                }
            },
            {
                route: '#/edit-expense',
                title: 'Редактирование категории доходов',
                template: '/templates/edit-expense.html',
                styles: 'styles/income-expenses.css',
                load: () => {
                    new EditCategory('expense');
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
        }

        document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
        document.getElementById('styles').setAttribute('href', newRoute.styles);
        document.getElementById('title').innerText = newRoute.title;

        newRoute.load();
    }
}