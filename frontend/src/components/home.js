import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Home {
    constructor() {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })

        this.linksClick();

        //this.getBalance();
    }

    linksClick() {
        const links = Array.from(document.getElementsByClassName('nav-link'));
        links.forEach(item => {
            item.onclick = () => {
                links.forEach(item => item.classList.remove('active-item'))
                item.classList.add('active-item')
            }
        })
    }

    async getBalance() {
        try {
            const response = await CustomHttp.request(config.host + '/balance', 'GET', );
        } catch (error) {
            console.log(error);
        }
    }




}