import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncome {
    constructor() {
        this.inputValue = null;
        this.createInput = document.getElementById('create-input');
        this.createItem = document.getElementById('create-item');

        this.createItem.onclick = () => {
            this.inputValue = this.createInput.value;
            if (this.inputValue !== null) {
                this.createNewCategory(this.inputValue);
            }
            this.createInput.value = '';
        }
    }

    async createNewCategory(value) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income', 'POST', {
                title: value
            });
            console.log(result);
            location.href = '#/income'
        } catch (error) {
            console.log(error);
        }
    }
}