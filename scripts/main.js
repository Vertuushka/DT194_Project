import { getMaxId, addNewData, readData, updateData, deleteData, getCollectionsByDate } from './dataManager.js';

let cardHeader;
let cardDate;
let cardType;
let cardWeight;
let cardComment;
let arrowLeft;
let arrowRight;
let form;
let deleteButton;
let selectedCollection;
let calendarSelectionResult;
let calendarSelection;
let page;

function hideFormCard() {
    const card = document.querySelector(".card_container");
    card.classList.add("hidden");
}

function showFormCard() {
    const card = document.querySelector(".card_container");
    card.classList.remove("hidden");
}

function hideDeleteBtn() {
    deleteButton.classList.add("hidden");
}

function showDeleteBtn() {
    deleteButton.classList.remove("hidden");
}

function showNavButtons(){
    arrowLeft.classList.remove("hidden");
    arrowRight.classList.remove("hidden");
}

function hideNavButtons(){
    arrowLeft.classList.add("hidden");
    arrowRight.classList.add("hidden");
}

function resultLine_ShowDetails(self, id=0, data=null) {
    if (data == null) {
        if (id != 0 ) {
            data = readData("collection", id);
        } else {
            data = readData("collection", parseInt(self.getAttribute("id")));
        }
    }
    cardHeader.value = `${data.client}`;
    cardDate.value = `${data.date}`;
    cardType.value = `${data.type}`;
    cardWeight.value = `${data.weight}`;
    cardComment.value = `${data.comment}`;
    selectedCollection = data.id;
    if (calendarSelectionResult && calendarSelectionResult.length > 1) {
        showNavButtons();
        calendarSelection = calendarSelectionResult.indexOf(data);
    } else {
        hideNavButtons();
    }
    showFormCard();
    showDeleteBtn();
}

function addNewCollectionShow() {
    cardHeader.value = ``;
    cardDate.value = ``;
    cardType.value = ``;
    cardWeight.value = ``;
    cardComment.value = ``;
    selectedCollection = 0;
    showFormCard();
    hideDeleteBtn();
}

function createResultLine(data) {
    let result = document.createElement("div");
    result.classList.add("result_container");
    result.classList.add("result_template");
    result.setAttribute("id", data.id);
    result.innerHTML = `
        <p class="ta_left"">${data.client}</p>
        <p class="ta_center">${data.date}</p>
        <p class="ta_center">${data.weight} kg</p>`;
    result.addEventListener("click", function() {
        resultLine_ShowDetails(this);
    });
    return result;
}

function showCollectionInfo() {
    let resultsWrapper = document.querySelector(".results_wrapper");
    let collectionMax = getMaxId("collection");
    for (let i = 1; i <= collectionMax; i++) {
        let collection = readData("collection", i);
        if (collection) {
            let new_line = createResultLine(collection);
            resultsWrapper.appendChild(new_line);
        }
    }
}

function updateCollectionInfo() {
    let resultsWrapper = document.querySelector(".results_wrapper");
    resultsWrapper.innerHTML = "";
    showCollectionInfo();
}

function formOnSave(event) {
    event.preventDefault();
    let id = selectedCollection || calendarSelection;
    let data_old = readData("collection", id);
    let formData = {
        'client': event.target.elements["clientName"].value,
        'date': event.target.elements["date"].value,
        'type': event.target.elements["type"].value,
        'weight': event.target.elements["weight"].value,
        'comment': event.target.elements["comment"].value,
    }
    let result;
    if (data_old) {
        result = updateData("collection", selectedCollection, formData);
        selectedCollection = data_old.id;
    } else {
        result = addNewData("collection", formData);
        selectedCollection = getMaxId("collection");
    }
    if (result) {
        if (page == "clients_view") {
            updateCollectionInfo();
        } else {
            CalenderDateOnClick(null, event.target.elements["date"].value);
        }
        resultLine_ShowDetails(null, selectedCollection);
    }
}

function loadGlobalVariables() {
    cardHeader = document.querySelector(".card_header");
    cardDate = document.querySelector(".card_date");
    cardType = document.querySelector("#type");
    cardWeight = document.querySelector("#weight");
    cardComment = document.querySelector("#comment");
    arrowLeft = document.querySelector(".left");
    arrowRight = document.querySelector(".right");
    form = document.querySelector("#form");
    deleteButton = document.querySelector(".delete");
}

function CalenderDateOnClick(info=null, date=null) {
    if (info) {
        calendarSelectionResult = getCollectionsByDate("collection", info.dateStr);
    }
    if (date) {
        calendarSelectionResult = getCollectionsByDate("collection", date);
    }
    if (calendarSelectionResult.length > 0) {
        resultLine_ShowDetails(null, null, calendarSelectionResult[0]);
    } else {
        hideFormCard();
    }
}

function main() {
    if (localStorage.getItem("loggedIn") == null || JSON.parse(localStorage.getItem("loggedIn")) == false) {
        window.location.href = window.location.origin;
    }
    loadGlobalVariables();
    hideFormCard();

    const menu = document.querySelector('#mobile-menu')
    const menuLinks = document.querySelector('.navbar__menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    if (window.location.href.includes("clients_view")) {
        page = "clients_view";
        showCollectionInfo();
    }
    if (window.location.href.includes("calendar_view")) {
        page = "calendar_view";
        let calendarEl = document.getElementById('calendar');
        let calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            dateClick: function(info) {
                CalenderDateOnClick(info);
              }
        });
        calendar.render();
    }

    const newClientBtn = document.querySelector(".new_client");
    newClientBtn.addEventListener("click", function() {
        selectedCollection = 0;
        calendarSelection = 0;
        addNewCollectionShow();
    });

    deleteButton.addEventListener("click", function() {
        deleteData("collection", selectedCollection);
        selectedCollection = 0;
        hideFormCard();
        if (page == "clients_view") {
            updateCollectionInfo();
        }
    });

    arrowLeft.addEventListener("click", function() {
        if (calendarSelection > 0) {
            calendarSelection -= 1;
            resultLine_ShowDetails(null, null, calendarSelectionResult[calendarSelection]);
        }
    });
    arrowRight.addEventListener("click", function() {
        if (calendarSelection < calendarSelectionResult.length-1) {
            calendarSelection += 1;
            resultLine_ShowDetails(null, null, calendarSelectionResult[calendarSelection]);
        }
    });

    form.addEventListener("submit", formOnSave);
}

document.addEventListener("DOMContentLoaded", main);