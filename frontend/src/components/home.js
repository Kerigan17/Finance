export class Home {
    constructor() {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })

        this.linksClick();


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




}