import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {EditCategory} from "./edit-category";

export class Category {
    constructor(page) {
        this.popup = document.getElementById('popup');
        this.yesDelete = document.getElementById('yesDelete');
        this.noDelete = document.getElementById('noDelete');
        this.categoryId = null;
        this.page = page;
        this.adress = null;
        this.id = null;

        if (this.page === 'income') {
            this.adress = 'income';
        } else {
            this.adress = 'expense';
        }

        this.getCategories(this.adress);

        this.yesDelete.onclick = () => {
            this.deleteCategory(this.categoryId);
        }
        this.noDelete.onclick = () => {
            this.popup.style.display = 'none';
        }
    }

    async getCategories() {
        this.result = null;
        let blockCategories = document.getElementById('block-categories');

        try {
            this.result = await CustomHttp.request(config.host + '/categories/' + this.adress, 'GET', );
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

                let butEdit = document.createElement('a');
                if (this.page === 'income') {
                    butEdit.setAttribute('href', '#/edit-income')
                } else {
                    butEdit.setAttribute('href', '#/edit-expense')
                }
                butEdit.classList.add('edit');
                butEdit.innerText = 'Редактировать';

                butEdit.onclick = () => {
                    localStorage.removeItem('id');
                    localStorage.setItem('id', item.id);
                }

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

            let blockAdd = document.createElement('a');
            blockAdd.setAttribute('href', '#/create-income');
            blockAdd.innerText = '+';
            blockAdd.classList.add('block');
            blockAdd.classList.add('create-block');

            blockCategories.appendChild(blockAdd);
        }
    }

    async deleteCategory(id) {
        try {
            console.log(id)
            this.result = await CustomHttp.request(config.host + '/categories/' + this.adress + '/' + id, 'DELETE', );
            location.href = '#/' + this.adress;
        } catch (error) {
            console.log(error);
        }
    }
}