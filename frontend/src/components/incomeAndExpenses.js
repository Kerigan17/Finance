import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeAndExpenses {
    constructor() {
        this.popup = document.getElementById('popup');
        this.tableBody = document.getElementById('table-body');
        this.yesDelete = document.getElementById('yesDelete');
        this.noDelete = document.getElementById('noDelete');
        this.operationId = null;
        this.period = ['now', 'week', 'month', 'year', 'all', 'interval'];
        this.sortButtons = Array.from(document.getElementById('sort-list').children);

        for (let i = 0; i < this.sortButtons.length; i++) {
            this.sortButtons[i].onclick = () => {
                this.sortButtons.forEach(item => item.classList.remove('active'))
                this.sortButtons[i].classList.add('active');
                console.log(this.period[i])
            }
        }

        this.yesDelete.onclick = () => {this.deleteOperation(this.operationId)};
        this.noDelete.onclick = () => {this.popup.style.display = 'none'};

        this.getInfo();
    }

    async getInfo() {
        this.response = null;
        let that = this;

        try {
            this.response = await CustomHttp.request(config.host + '/operations' + '?period=all', 'GET',);
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
                localStorage.removeItem('id');
                localStorage.setItem('id', this.response[j].id);
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