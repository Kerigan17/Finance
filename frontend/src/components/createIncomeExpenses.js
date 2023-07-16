import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncomeExpenses {
    constructor() {
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

            console.log(this.categoryIdOperation)
            console.log(typeof(this.categoryIdOperation))
        }

        this.btnCreateOperation.onclick = () => {
            this.createNewCategory();
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

    async createNewCategory() {
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
            console.log(result)
            location.href = '#/incAndExp';
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