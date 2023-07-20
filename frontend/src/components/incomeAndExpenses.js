import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeAndExpenses {
    constructor() {
        this.popup = document.getElementById('popup');
        this.tableBody = document.getElementById('table-body');
        this.yesDelete = document.getElementById('yesDelete');
        this.noDelete = document.getElementById('noDelete');
        this.incomeBtn = document.getElementById('income');
        this.expenseBtn = document.getElementById('expense');
        this.operationId = null;
        this.periods = ['now', 'week', 'month', 'year', 'all', 'interval'];
        this.period = 'all';
        this.sortButtons = Array.from(document.getElementById('sort-list').children);
        this.intervalInputs = Array.from(document.getElementsByClassName('interval-input'));
        this.dateFrom = null;
        this.dateTo = null;

        this.incomeBtn.onclick = () => {
            localStorage.setItem('operation', 'income');
        }
        this.expenseBtn.onclick = () => {
            localStorage.setItem('operation', 'expense');
        }

        this.intervalInputs.forEach(item => {
            item.onchange = () => {
                this.dateFrom = this.intervalInputs[0].value;
                this.dateTo = this.intervalInputs[1].value;

                if (this.period === 'interval' && this.dateFrom && this.dateTo) {
                    this.getInfo(this.dateFrom, this.dateTo);
                }
            }
        })

        for (let i = 0; i < this.sortButtons.length; i++) {
            this.sortButtons[i].onclick = () => {
                this.sortButtons.forEach(item => item.classList.remove('active'))
                this.sortButtons[i].classList.add('active');
                this.period = this.periods[i];

                if (this.period === 'interval' &&this.dateFrom && this.dateTo) {
                    this.getInfo(this.dateFrom, this.dateTo);
                } else {
                    this.getInfo();
                }
            }
        }

        this.yesDelete.onclick = () => {this.deleteOperation(this.operationId)};
        this.noDelete.onclick = () => {this.popup.style.display = 'none'};

        this.getInfo();
    }

    async getInfo(dateFrom, dateTo) {
        this.response = null;
        this.tableBody.innerHTML = '';
        let that = this;

        try {
            if (dateFrom && dateTo) {
                this.response = await CustomHttp.request(config.host + '/operations' + '?period=' + this.period + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo, 'GET',);
            } else {
                this.response = await CustomHttp.request(config.host + '/operations' + '?period=' + this.period, 'GET',);
            }
        } catch (error) {
            console.log(error);
        }

        for (let j = 0; j < this.response.length; j++) {
            //создание строки
            let trElement = document.createElement('tr');

            //нумерация
            let firstTdElement = document.createElement('td');
            firstTdElement.innerText = (j + 1);
            trElement.appendChild(firstTdElement);

            //доход - расход
            firstTdElement = document.createElement('td');
            if (this.response[j].type === 'income') {
                firstTdElement.innerText = 'доход';
                firstTdElement.style.color = 'green';
            } else {
                firstTdElement.innerText = 'расход';
                firstTdElement.style.color = 'red';
            }
            trElement.appendChild(firstTdElement);

            //категория
            firstTdElement = document.createElement('td');
            firstTdElement.innerText = this.response[j].category;
            trElement.appendChild(firstTdElement);

            //сумма
            firstTdElement = document.createElement('td');
            firstTdElement.innerText = this.response[j].amount + '$';
            trElement.appendChild(firstTdElement);

            //дата
            firstTdElement = document.createElement('td');
            let operationDate = this.response[j].date.split('-').reverse().join('.')
            firstTdElement.innerText = operationDate;
            trElement.appendChild(firstTdElement);

            //коммент
            firstTdElement = document.createElement('td');
            firstTdElement.innerText = this.response[j].comment;
            trElement.appendChild(firstTdElement);

            //удаление и редактирование
            firstTdElement = document.createElement('td');
            firstTdElement.classList.add('svg-images');

            let imgElement = document.createElement('img');
            imgElement.src = '/images/bucket.svg';
            imgElement.onclick = () => {
                this.popup.style.display = 'flex';
                that.operationId = this.response[j].id;
            }
            firstTdElement.appendChild(imgElement);

            imgElement = document.createElement('img');
            imgElement.src = '../../images/pen.svg';
            imgElement.onclick = () => {
                localStorage.setItem('id', this.response[j].id);
                localStorage.setItem('operation', this.response[j].type);
                location.href = '#/edit-operation';
            }
            firstTdElement.appendChild(imgElement);
            trElement.appendChild(firstTdElement);
            this.tableBody.appendChild(trElement);
        }
    }

    async deleteOperation(id) {
        try {
            this.result = await CustomHttp.request(config.host + '/operations/' + id, 'DELETE', );
            location.href = '#/incAndExp';
        } catch (error) {
            console.log(error);
        }
    }
}