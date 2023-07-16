import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class WorkWithCategory {
    constructor(page) {
        this.inputValue = null;
        this.createInput = document.getElementById('create-input');
        this.createItem = document.getElementById('create-item');
        this.page = page;

        this.createItem.onclick = () => {
            this.inputValue = this.createInput.value;
            if (this.inputValue !== null) {
                this.createNewCategory(this.inputValue);
            }
        }
    }

    async createNewCategory(value) {
        try {
            const result = await CustomHttp.request(config.host + '/categories/' + this.page, 'POST', {
                title: value
            });
            console.log(result);
            location.href = '#/' + this.page;
        } catch (error) {
            console.log(error);
        }
    }
}