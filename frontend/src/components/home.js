import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export class Home {
    constructor() {
        this.sortChoice = 'all';
        let that = this;

        //Обработчик событий на сортировку
        this.sortList = Array.from(document.getElementById('sort-list').children);
        this.sortList.forEach(item => {
            item.onclick = () => {
                this.sortList.forEach(item => item.classList.remove('active'));
                item.classList.add('active');
                this.sortChoice = item.children[0].innerText;
                this.getCategory(this.sortChoice);
            }
        });

        //Обработчик событий в сайдбаре
        this.links = Array.from(document.getElementsByClassName('nav-link'));
        this.links.forEach(item => {
            item.onclick = () => {
                this.links.forEach(item => item.classList.remove('active-item'));
                item.classList.add('active-item');
            }
        })

        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })

        this.getCategory();
        console.log(localStorage.accessToken);
    }

    async getBalance() {
        try {
            const response = await CustomHttp.request(config.host + '/balance', 'GET',);
            document.getElementById('balance').innerText = response.balance;
            console.log(response.balance)
            return await response.balance;
        } catch (error) {
            console.log(error);
        }
    }

    paintDiagram(item, list) {
        this.dataList = [];
        this.colors = [];
        this.comments = [];

        list.forEach(item => {
            this.dataList.push(item.amount);
            this.colors.push('#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase());
            this.comments.push(item.comment);
        })

        console.log(list);

        new Chart(item, {
            type: 'pie',
            data: {
                labels: this.comments,
                datasets: [{
                    label: 'Сумма',
                    data: this.dataList,
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
    }

    async getCategory(sortName) {
        this.incomeList = [];
        this.expensiveList = [];
        this.date = new Date();
        //this.nowDate = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
        console.log(sortName)

        try {
            const response = await CustomHttp.request(config.host + '/operations' + '?period=' + sortName, 'GET',);

            if (response) {
                response.forEach(item => {
                    if (item.type === 'income') {
                        this.incomeList.push(item);
                    } else {
                        this.expensiveList.push(item);
                    }
                })
                this.paintDiagram(document.getElementById('incomeDiagram'), this.incomeList);
                this.paintDiagram(document.getElementById('expensiveDiagram'), this.expensiveList);
            }
        } catch (error) {
            console.log(error)
        }
    }
}