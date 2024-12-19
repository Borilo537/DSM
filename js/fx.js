const serverImage = document.getElementById('serverImage');
const serverInfoName = document.querySelector('.serverInfoName');

window.addEventListener('scroll', () => {
    // serverImage.style.opacity = `${1-(window.pageYOffset*0.003)}`
    serverImage.style.filter = `blur(${(window.pageYOffset*0.05)}px)`
    serverInfoName.style.marginTop = `-${window.pageYOffset*0.4}px`
})


document.querySelector('.size').addEventListener('click', () => {
    document.querySelector('.serverInfo').classList.toggle('serverInfoSmall')
})