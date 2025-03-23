const username = "admin";
const password = "admin";

function main() {
    const menu = document.querySelector('#mobile-menu')
    const menuLinks = document.querySelector('.navbar__menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    if (localStorage.getItem("loggedIn") == null || JSON.parse(localStorage.getItem("loggedIn")) == false) {
        const loginForm = document.querySelector("#loginForm");
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();
            if (event.target.elements["username"].value == username && event.target.elements["password"].value == password) {
                localStorage.setItem("loggedIn", true);
                window.location.href = window.location.origin + "/pages/clients_view.html";
            }
        })
    }  
    else {
        window.location.href = window.location.origin + "/pages/clients_view.html";
    }
    
}

document.addEventListener("DOMContentLoaded", main)