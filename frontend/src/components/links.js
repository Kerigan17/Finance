import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Links {
    constructor() {
        const links = Array.from(document.getElementsByClassName('nav-link'));
        links.forEach(item => {
            item.onclick = () => {
                links.forEach(item => item.classList.remove('active-item'));
                item.classList.add('active-item')
            }
        })

        const balanceItem = document.getElementById('balance-item');
        const balanceValueItem = document.getElementById('balance-value');
        const balancePopup = document.getElementById('popup-balance');
        const balanceBtn = document.getElementById('balance-btn');
        const balanceSpan = document.getElementById('balance');
        let balanceValue = null;
        this.newBalanceValue = null;

        balanceItem.onclick = () => {
            balanceValue = Number(balanceSpan.innerText);
            balancePopup.style.display = 'flex';
            balanceValueItem.value = balanceValue;
        }

        balanceBtn.onclick = () => {
            balancePopup.style.display = 'none';
            this.newBalanceValue = balanceValueItem.value;
            this.updateBalance();
        }
    }

    async updateBalance() {
        try {
            const response = await CustomHttp.request(config.host + '/balance', 'PUT',{
                newBalance: this.newBalanceValue
            });
            document.getElementById('balance').innerText = response.balance;
        } catch (error) {
            console.log(error);
        }
    }
}


