export class IncomeAndExpenses {
    constructor() {
        const popup = document.getElementById('popup');
        const buckets = Array.from(document.getElementsByClassName('bucket'));

        buckets.forEach(item => item.onclick = () => {
            popup.style.display = 'flex';
        })
    }
}