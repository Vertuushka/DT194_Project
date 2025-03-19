function main() {
    const menu = document.querySelector('#mobile-menu')
    const menuLinks = document.querySelector('.navbar__menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
}



function home() {

}

function addClient () {

}

function editClient () {

}

function deleteClient () {

}

function logIn () {


}

document.addEventListener("DOMContentLoaded", main)