import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class CreateIncomeExpenses {
    constructor() {
        this.typeOperation = null;
        this.typeCategory = null;
        this.sumOperation = null;
        this.dateOperation = null;
        this.commentOperation = null;
        this.categoryId = null;
        this.createOperation = document.getElementById('createOperation');

        this.createOperation.onclick = () => {
            this.createNewCategory();
        }
    }

    async createNewCategory() {
        this.getValue();

        try {
            const result = await CustomHttp.request(config.host + '/operations', 'POST', {
                type: this.typeOperation.value,
                amount: this.sumOperation.value,
                date: this.dateOperation.value,
                comment: this.commentOperation.value,
                category_id: this.categoryId.value,
            });
            console.log(result.status)
            location.href = '#/create-income-expenses';
        } catch (error) {
            console.log(error);
        }
    }

    getValue() {
        this.typeOperation = document.getElementById('typeOperation');
        this.typeCategory = document.getElementById('typeCategory');
        this.sumOperation = document.getElementById('sumOperation');
        this.dateOperation = document.getElementById('dateOperation');
        this.commentOperation = document.getElementById('commentOperation');

        if (this.typeOperation === 'income') {
            this.categoryId = 2;
        } else {
            this.categoryId = 1;
        }
    }
}