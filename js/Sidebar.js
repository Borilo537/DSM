const menuIcon = document.querySelector('.menuIcon');
const logoIcon = document.querySelector('.logoIcon');
const topSide = document.querySelector('.topSide');
const sideBar = document.querySelector('.sidebar');
const sideElement = document.querySelectorAll('.sideElement');
const main = document.getElementById('main');
let logoShown = true
menuIcon.addEventListener('click', () => {
    sideElement.forEach((sideElement) => {
        sideElement.classList.toggle('sideElementOpen')
    })
    if (logoShown) {
        logoIcon.style.opacity = '1';
        logoIcon.style.maxWidth = '40px';
        logoIcon.style.zIndex = '1';
        menuIcon.style.marginLeft = '0';
        logoShown = false
    } else {
        logoIcon.style.opacity = '';
        logoIcon.style.maxWidth = '';
        logoIcon.style.zIndex = '';
        menuIcon.style.marginLeft = '';
        logoShown = true
    }
    sideBar.classList.toggle('openSide')
    main.classList.toggle('mainToSide')
})

sideElement.forEach((sideElement) => {
    sideElement.addEventListener('click', () => {
        msg = 'em produção'
        ShowPopUp(msg, longTime)
    })
})