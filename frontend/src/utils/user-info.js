import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config.js";

export class UserInfo {
    constructor() {
        this.fullName = document.getElementById('fullname');
        this.balance = document.getElementById('balance');
        this.userInfo = Auth.getUserInfo();
        this.accessToken = localStorage.getItem(Auth.accessTokenKey);

        const balanceItem = document.getElementById('balance-item');
        const balanceValueItem = document.getElementById('balance-value');
        const balancePopup = document.getElementById('popup-balance');
        const balanceBtn = document.getElementById('balance-btn');
        const balanceCancel = document.getElementById('balance-cancel');
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

        balanceCancel.onclick = () => {
            balancePopup.style.display = 'none';
        }

        this.getUserInfo();
        this.getBalance();
    }

    getUserInfo() {
        this.userInfo && this.accessToken ? this.fullName.innerText = this.userInfo.fullName : this.fullName.innerText = 'Нет данных';
    }

    async getBalance() {
        try {
            const response = await CustomHttp.request(config.host + '/balance', 'GET', )
            if (response) {
                if (response.error) {
                    throw new Error(response.error);
                }
                this.balance.innerText = response.balance;
            }
        } catch (error) {
            console.log(error);
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