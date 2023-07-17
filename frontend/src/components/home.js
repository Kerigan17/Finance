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

        for (let i = 0; i < this.sortButtons.length; i++) {
            this.sortButtons[i].onclick = () => {
                this.sortButtons.forEach(item => item.classList.remove('active'))
                this.sortButtons[i].classList.add('active');
                this.period = this.periods[i];

                this.incomeDiagram.destroy();
                this.expensiveDiagram.destroy();
                this.getOperations();
            }
        }

        this.getOperations();
    }

    async getOperations() {
        try {
            const result = await CustomHttp.request(config.host + '/operations' + '?period='  + this.period, 'GET',);
            this.paintingDiagrams(result);
        } catch (error) {
            console.log(error);
        }
    }

    paintingDiagrams(operations) {
        this.operations = operations;
        const incomeOperations = this.operations.filter(item => item.type === 'income');
        const expenseOperations = this.operations.filter(item => item.type === 'expense');

        this.incomeDiagram = this.paintDiagram(this.incomeCanvas, incomeOperations);
        this.expensiveDiagram = this.paintDiagram(this.expensiveCanvas, expenseOperations);
    }

    paintDiagram(diagram, items) {
        this.items = items;
        const labelList = [];
        const dataList = [];

        console.log(this.items)

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