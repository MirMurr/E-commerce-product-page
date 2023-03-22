let hamburger = document.querySelector('.hamburger')
let navMenu = document.querySelector('.navlinks')
let closeHamburger = document.querySelector('.close-bar')
let body = document.getElementById('body')
let mainProductImage = document.getElementsByClassName('container-img-main')[0]
let cartIcon = document.querySelector('.cart-icon')
let swiperPrevButton = document.querySelector('.swiper-button-prev')
let swiperNextButton = document.querySelector('.swiper-button-next')

hamburger.addEventListener('click', toggleNavbar)
closeHamburger.addEventListener('click', toggleNavbar)
hamburger.addEventListener('click', changeBackground)
closeHamburger.addEventListener('click', changeBackground)


// open / close hamburger menu
function toggleNavbar() {
    hamburger.classList.toggle('active')
    navMenu.classList.toggle('active')

    hideCartContent()
    hideButtons()
}


// add dark background when hamburger menu is active / remove dark background when hamburger is not active
function changeBackground() {
    if(hamburger.classList.contains('active')) {
        body.classList.add('active')
        mainProductImage.classList.add('active')
    } else {
        body.classList.remove('active')
        mainProductImage.classList.remove('active')
    }
}


// hides the buttons when hamburger menu is active
function hideButtons() {
    if(hamburger.classList.contains('active')) {
        swiperNextButton.style.display="none"
        swiperPrevButton.style.display="none"
    } else {
        swiperNextButton.style.display="flex"
        swiperPrevButton.style.display="flex"
    }
}


// hides the cart content while hamburger menu is active. When we click on the cart while the hamburger menu is active, we can´t click on the cart icon.
function hideCartContent() {
    if(hamburger.classList.contains('active')) {
        cartIcon.removeEventListener('click', displayCartContent)
    } else {
        cartIcon.addEventListener('click', displayCartContent)
    }
}
