import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class IncomeAndExpenses {
    constructor() {
        const popup = document.getElementById('popup');
        const buckets = Array.from(document.getElementsByClassName('bucket'));

        buckets.forEach(item => item.onclick = () => {
            popup.style.display = 'flex';
        })

        console.log(localStorage.accessToken)
    }

    async getInfo() {
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