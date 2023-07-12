export class Income {
    constructor() {
        let deleteButtons = Array.from(document.getElementsByClassName('delete'));
        const popup = document.getElementById('popup');

        deleteButtons.forEach(item => item.onclick = () => {
            popup.style.display = 'flex';
        })
    }
}