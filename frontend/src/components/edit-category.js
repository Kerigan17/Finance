import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class EditCategory {
    constructor(page) {
        this.id = localStorage.getItem('id');
        this.editBut = document.getElementById('create-item');
        this.editInput = document.getElementById('create-input');
        this.newValue = null;
        this.page = page;
        this.adress = null;

        this.editBut.innerText = 'Сохранить'

        if (page === 'income') {
            this.adress = 'income';
        } else {
            this.adress = 'expense';
        }

        this.getCategory();

        this.editBut.onclick = () => {
            this.newValue = this.editInput.value;
            this.editCategory()
        }
    }

    async getCategory() {
        try {
            this.result = await CustomHttp.request(config.host + '/categories/' + this.adress + '/' + this.id, 'GET', );
            this.editInput.value = this.result.title;
        } catch (error) {
            console.log(error);
        }
    }

    async editCategory() {
        try {
            this.result = await CustomHttp.request(config.host + '/categories/' + this.adress + '/' + this.id, 'PUT', {
                title: this.newValue
            });
        } catch (error) {
            console.log(error);
        }
        location.href = '#/' + this.adress;
    }
}