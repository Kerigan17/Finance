import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Income {
    constructor() {
        this.deleteButtons = null;
        this.popup = document.getElementById('popup');

        this.getCategories();
    }

    async getCategories() {
        this.result = null;
        let blockCategories = document.getElementById('block-categories');

        try {
            this.result = await CustomHttp.request(config.host + '/categories/income', 'GET', );
            console.log(this.result);
        } catch (error) {
            console.log(error);
        }

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

        this.deleteButtons = Array.from(document.getElementsByClassName('delete'));
        this.deleteButtons.forEach(item => item.onclick = () => {
            this.popup.style.display = 'flex';
        });
    }
}