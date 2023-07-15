import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Expenses {
    constructor() {
        this.popup = document.getElementById('popup');
        this.yesDelete = document.getElementById('yesDelete');
        this.categoryId = null;

        this.getCategories();

        this.yesDelete.onclick = () => {
            this.popup.style.display = 'none';
            this.deleteCategory(this.categoryId);
        }
    }

    async getCategories() {
        this.result = null;
        let blockCategories = document.getElementById('block-categories');

        try {
            this.result = await CustomHttp.request(config.host + '/categories/expense', 'GET', );
            console.log(this.result);
        } catch (error) {
            console.log(error);
        }

        if (this.result) {
            this.result.forEach(item => {
                let blockCategory = document.createElement('div');
                blockCategory.classList.add('block');

                let blockTitle = document.createElement('div');
                blockTitle.classList.add('block-title');
                blockTitle.innerText = item.title;

                let blockActions = document.createElement('div');
                blockActions.classList.add('block-actions');

                let butEdit = document.createElement('button');
                butEdit.classList.add('edit');
                butEdit.innerText = 'Редактировать';
                let butDelete = document.createElement('button');
                butDelete.classList.add('delete');
                butDelete.innerText = 'Удалить';

                butDelete.onclick = () => {
                    this.popup.style.display = 'flex';
                    this.categoryId = item.id;
                }

                blockActions.appendChild(butEdit);
                blockActions.appendChild(butDelete);

                blockCategory.appendChild(blockTitle);
                blockCategory.appendChild(blockActions);

                blockCategories.appendChild(blockCategory);
            })
        }

        let blockAdd = document.createElement('a');
        blockAdd.setAttribute('href', '#/create-expenses');
        blockAdd.innerText = '+';
        blockAdd.classList.add('block');
        blockAdd.classList.add('create-block');

        blockCategories.appendChild(blockAdd);
    }

    async deleteCategory(id) {
        try {
            console.log(id)
            this.result = await CustomHttp.request(config.host + '/categories/expense/' + id, 'DELETE', );
            location.href = '#/expenses';
        } catch (error) {
            console.log(error);
        }
    }
}