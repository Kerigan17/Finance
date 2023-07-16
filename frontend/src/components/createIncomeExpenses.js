import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncomeExpenses {
    constructor(page) {
        this.page = page;
        this.typeOperation = 'income';
        this.amountOperation = null;
        this.dateOperation = null;
        this.commentOperation = null;
        this.categoryIdOperation = null;
        this.categories = null;

        this.btnCreateOperation = document.getElementById('btnCreateOperation');
        this.selectCategories = document.getElementById('selectCategories');
        this.typeOperationElement = document.getElementById('typeOperationElement');

        //получаю категории
        this.getCategories(this.typeOperation);

        //задаю Id категории
        this.categoryIdOperation = Number(this.selectCategories.value);

        //изменение типа операции
        this.typeOperationElement.onchange = () => {
            this.typeOperation = this.typeOperationElement.value;
            this.getCategories(this.typeOperation);
            this.setCategories();
            console.log(this.categories);
        }

        //изменение категории
        this.selectCategories.onchange = () => {
            this.categoryIdOperation = Number(this.selectCategories.value);
        }

        if (this.page === 'edit') {
            this.operation = null;
            this.id = localStorage.getItem('id');
            this.btnCreateOperation.innerText = 'Сохранить';

            this.getOperation()

            this.btnCreateOperation.onclick = () => {
                this.updateOperation()
            }
        } else {
            this.btnCreateOperation.onclick = () => {
                this.createNewOperation();
            }
        }
    }

    async getCategories(operation) {
        try {
            const response = await CustomHttp.request(config.host + '/categories/' + operation, 'GET', );
            this.categories = response;
        } catch (error) {
            console.log(error);
        }

        //устанавливаю категории
        this.setCategories();
    }

    setCategories() {
        this.selectCategories.innerHTML = '';
        let operationItem = null;

        this.categories.forEach(item => {
            operationItem = document.createElement('option');
            operationItem.setAttribute('value', item.id);
            operationItem.innerText = item.title;

            this.selectCategories.appendChild(operationItem);
        })
    }

    async createNewOperation() {
        this.getValue();

        console.log(typeof(this.categoryIdOperation))

        try {
            const result = await CustomHttp.request(config.host + '/operations', 'POST', {
                type: this.typeOperation,
                amount: this.amountOperation.value,
                date: this.dateOperation.value,
                comment: this.commentOperation.value,
                category_id: this.categoryIdOperation,
            });
            console.log(this.categoryIdOperation)
            location.href = '#/incAndExp';
        } catch (error) {
            console.log(error);
        }
    }

    async updateOperation() {
        let typeOperation = document.getElementById('typeOperationElement').value;
        let typeCategory = Number(document.getElementById('selectCategories').value);
        let amountOperation = document.getElementById('amountOperation').value;
        let dateOperation = document.getElementById('dateOperation').value;
        let commentOperation = document.getElementById('commentOperation').value;

        console.log(typeCategory)

        try {
            const result = await CustomHttp.request(config.host + '/operations/' + this.id, 'PUT', {
                type: typeOperation,
                amount: amountOperation,
                date: dateOperation,
                comment: commentOperation,
                category_id: typeCategory,
            });
            console.log(this.categoryIdOperation)
            location.href = '#/incAndExp';
        } catch (error) {
            console.log(error);
        }
    }

    async setValuesOperation(operation) {
        this.operation = operation;

        let typeOperation = document.getElementById('typeOperationElement');
        let typeCategory = document.getElementById('selectCategories');
        let amountOperation = document.getElementById('amountOperation');
        let dateOperation = document.getElementById('dateOperation');
        let commentOperation = document.getElementById('commentOperation');

        typeOperation.value = this.operation.type;
        typeCategory.value = this.operation.category;
        amountOperation.value = this.operation.amount;
        dateOperation.value = this.operation.date;
        commentOperation.value = this.operation.comment;
    }

    async getOperation() {
        try {
            this.result = await CustomHttp.request(config.host + '/operations/' + this.id, 'GET', );
            this.setValuesOperation(this.result)
        } catch (error) {
            console.log(error);
        }
    }

    getValue() {
        this.amountOperation = document.getElementById('amountOperation');
        this.dateOperation = document.getElementById('dateOperation');
        this.commentOperation = document.getElementById('commentOperation');
    }
}