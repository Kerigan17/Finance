import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeAndExpenses {
    constructor() {
        const popup = document.getElementById('popup');
        const buckets = Array.from(document.getElementsByClassName('bucket'));
        this.tableBody = document.getElementById('table-body');

        buckets.forEach(item => item.onclick = () => {
            popup.style.display = 'flex';
        })

        this.getInfo();
    }

    async getInfo() {
        this.response = null;

        try {
            this.response = await CustomHttp.request(config.host + '/operations' + '?period=all', 'GET',);
            console.log(this.response)
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
            imgElement.onclick = () => {this.deleteOperation(this.response[j].id);}
            firstTdElement.appendChild(imgElement);

            imgElement = document.createElement('img');
            imgElement.src = '../../images/pen.svg';
            imgElement.onclick = () => {this.editOperation(this.response[j].id);}
            firstTdElement.appendChild(imgElement);

            trElement.appendChild(firstTdElement);

            // for (let i = 0; i < 5; i++) {
            //     console.log(this.response[i])
            //     let tdElement = document.createElement('td');
            //     tdElement.innerText = 1;
            //     trElement.appendChild(tdElement);
            // }

            this.tableBody.appendChild(trElement);
        }
    }

    async deleteOperation(id) {
        console.log(id);
        try {
            this.result = await CustomHttp.request(config.host + '/operations/' + id, 'DELETE', );
            location.href = '#/incAndExp';
        } catch (error) {
            console.log(error);
        }
    }

    editOperation(operation) {
        console.log(operation)
    }
}