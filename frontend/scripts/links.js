const links = Array.from(document.getElementsByClassName('nav-link'));
links.forEach(item => {
    item.onclick = () => {
        links.forEach(item => item.classList.remove('active-item'));
        item.classList.add('active-item')
    }
})

const balanceItem = document.getElementById('balance-item');
const balanceValueItem = document.getElementById('balance-value');
const balancePopup = document.getElementById('popup-balance');
const balanceBtn = document.getElementById('balance-btn');
const balanceSpan = document.getElementById('balance');
let balanceValue = null;
let newBalance = null;

balanceItem.onclick = () => {
    balanceValue = Number(balanceSpan.innerText);
    balancePopup.style.display = 'flex';
    balanceValueItem.value = balanceValue;
}

balanceBtn.onclick = () => {
    balancePopup.style.display = 'none';
    newBalance = balanceValueItem.value;
}

