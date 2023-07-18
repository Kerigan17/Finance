import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export class Home {
    constructor() {
        this.periods = ['now', 'week', 'month', 'year', 'all', 'interval'];
        this.period = 'all';
        this.operations = null;
        this.sortButtons = Array.from(document.getElementById('sort-list').children);
        this.incomeCanvas = document.getElementById('incomeDiagram');
        this.expensiveCanvas = document.getElementById('expensiveDiagram');
        this.incomeDiagram = null;
        this.expensiveDiagram = null;
        this.intervalInputs = Array.from(document.getElementsByClassName('interval-input'));
        this.dateFrom = null;
        this.dateTo = null;

        this.intervalInputs.forEach(item => {
            item.onchange = () => {
                this.dateFrom = this.intervalInputs[0].value;
                this.dateTo = this.intervalInputs[1].value;

                if (this.period === 'interval' && this.dateFrom && this.dateTo) {
                    this.incomeDiagram.destroy();
                    this.expensiveDiagram.destroy();
                    this.getOperations(this.dateFrom, this.dateTo);
                }
            }
        })

        for (let i = 0; i < this.sortButtons.length; i++) {
            this.sortButtons[i].onclick = () => {
                this.sortButtons.forEach(item => item.classList.remove('active'))
                this.sortButtons[i].classList.add('active');
                this.period = this.periods[i];

                this.incomeDiagram.destroy();
                this.expensiveDiagram.destroy();

                if (this.period === 'interval' &&this.dateFrom && this.dateTo) {
                    this.getOperations(this.dateFrom, this.dateTo);
                } else {
                    this.getOperations();
                }
            }
        }

        this.getOperations();
    }

    async getOperations(dateFrom, dateTo) {
        try {
            if (dateFrom && dateTo) {
                this.result = await CustomHttp.request(config.host + '/operations' + '?period=' + this.period + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo, 'GET',);
            } else {
                this.result = await CustomHttp.request(config.host + '/operations' + '?period='  + this.period, 'GET',);
            }
            this.paintingDiagrams(this.result);
        } catch (error) {
            console.log(error);
        }
    }

    paintingDiagrams(operations) {
        this.operations = operations;
        if (this.operations !== []) {
            const incomeOperations = this.operations.filter(item => item.type === 'income');
            const expenseOperations = this.operations.filter(item => item.type === 'expense');

            this.incomeDiagram = this.paintDiagram(this.incomeCanvas, incomeOperations);
            this.expensiveDiagram = this.paintDiagram(this.expensiveCanvas, expenseOperations);
        } else {
            console.log(1)
            this.incomeDiagram.destroy();
            this.expensiveDiagram.destroy();
        }

    }

    paintDiagram(diagram, items) {
        this.items = items;
        const labelList = [];
        const dataList = [];

        this.items.forEach(item => {
            labelList.push(item.category);
            dataList.push(item.amount);
        })

        return new Chart(diagram, {
            type: 'pie',
            data: {
                labels: labelList,
                datasets: [{
                    label: '# of Votes',
                    data: dataList,
                    borderWidth: 0
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
}