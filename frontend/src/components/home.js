import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";


export class Home {
    constructor() {
        this.balance = null;

        const ctx = document.getElementById('pieChart');

        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })

        this.linksClick();
        this.balance = this.getBalance();
        console.log(this.balance)

        document.getElementById('balance').innerText = this.balance;
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
            document.getElementById('balance').innerText = response.balance;
            console.log(response.balance)
            return await response.balance;
        } catch (error) {
            console.log(error);
        }
    }




}