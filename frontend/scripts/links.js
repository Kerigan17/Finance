const links = Array.from(document.getElementsByClassName('nav-link'));
links.forEach(item => {
    item.onclick = () => {
        links.forEach(item => item.classList.remove('active-item'))
        item.classList.add('active-item')
    }
})

