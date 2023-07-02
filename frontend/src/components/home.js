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

    // async getBalance() {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/signup', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body: JSON.stringify({
    //
    //             })
    //         });
    //
    //         if (response.status < 200 || response.status >= 300) {
    //             throw new Error(response.message);
    //         }
    //
    //         const result = await response.json();
    //         if (result) {
    //             if (result.error || !result.user) {
    //                 throw new Error(result.message);
    //             }
    //
    //             location.href = '#/home'
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }




}