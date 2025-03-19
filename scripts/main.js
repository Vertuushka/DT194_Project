import { addNewData, readData, updateData, deleteData } from './dataManager.js';

function main() {
    const menu = document.querySelector('#mobile-menu')
    const menuLinks = document.querySelector('.navbar__menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    setAddButtonListener();
    setEditClientListener();
    setRemoveClientListener();
}

function setAddButtonListener() {
    const addButton = document.getElementById("addButton");
    const form = document.getElementById("dataForm");

    addButton.addEventListener("click", function(event) {
        event.preventDefault()
        
        const formData = { // change to real elements, these are just examples
            name: form.elements["name"].value,
            email: form.elements["email"].value,
            age: form.elements["age"].value,
        }

        addNewData("client", formData);
    });
}

function setEditClientListener() {
    const editButton = document.getElementById("editButton");

    editButton.addEventListener("click", function() {
        id; // need logic to get client id
        newData; // need logic to get new data

        updateData("client", id, newData);
    });
}

function setRemoveClientListener() {
    const removeButton = document.getElementById("removeButton");

    removeButton.addEventListener("click", function() {
        id; // need logic to get client id

        deleteData("client", id)
    });
}

document.addEventListener("DOMContentLoaded", main);