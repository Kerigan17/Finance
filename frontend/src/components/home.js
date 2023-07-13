import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export class Home {
    constructor() {
        const ctx = document.getElementById('pieChart');

        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })

        //this.balance = this.getBalance();
        this.paintDiagram();

        //document.getElementById('balance').innerText = this.balance;
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

    paintDiagram() {
        const ctx = Array.from(document.getElementsByClassName('myChart'));

        ctx.forEach(item => {
            new Chart(item, {
                type: 'pie',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            display: false
                        },
                        x: {
                            display: false
                        }
                    },
                    gridLines: {
                        display: false
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontColor: 'rgb(255, 99, 132)'
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                boxWidth: 35,
                            }
                        }
                    }
                }
            });
        })
    }
}