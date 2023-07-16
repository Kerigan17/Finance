const links = Array.from(document.getElementsByClassName('nav-link'));
links.forEach(item => {
    item.onclick = () => {
        links.forEach(item => item.classList.remove('active-item'));

        let url = location.hash;
        if (url === '#home') {

        }
        item.classList.add('active-item')
    }
})

