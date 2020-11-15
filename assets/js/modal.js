
var toggle = document.querySelector("#customSwitches");
var radios = document.getElementsByName("modalRadio");
var filterButton = document.getElementsByName("filterSearch");
var saveButton = document.getElementById("Save");
myStorage = window.localStorage;


// Checks for user settings and updates modal as needed upon modal opening.
$(document).ready(function(){
    $(filterButton).click (function () {

        if (myStorage.getItem("userSelection")) {
            var selectionID = document.getElementById(myStorage.getItem("userSelection"));
            $(radios).prop("disabled", false);
            $(selectionID).prop("checked", true);
            $(toggle).prop('checked', true);
        }
    })
});
        

// Disables and clears radio buttons, preventing user selection
function disableRadios() {
    $(radios).prop('checked', false);
    $(radios).prop('disabled', true);
}


// Removes user input from local storage
function clearStorage() {
    myStorage.removeItem("userSelection");
}


// Tracks toggle button state to enable or disable radio buttons and clear storage if needed.
$(document).ready(function() {
    $(toggle).click(function() {  
        if ($(toggle).prop('checked') === true) {
            $(radios).prop("disabled", false);
        } else {
            disableRadios();
            clearStorage();
        }
    });
});


// When either modal close buttons are clicked, modal is reset to default state.
$(document).ready(function(){
    $("[name='closeModal']").click (function () {
        $(toggle).prop('checked', false);
        disableRadios();
        clearStorage();
    })
});


// When save button is clicked, user input stored if needed and modal settings saved.
$(document).ready(function(){
    $(saveButton).click (function () {

        if ($(toggle).prop('checked') === true) {
            input = getSelection();
            saveSettings(input);
        } 
    })
});


// Obtains the selected radio button id#.
function getSelection() {
    for (var i=0; i < radios.length; i++) {
        if (radios[i].checked === true) {
            input = radios[i].id;
        }
    }
    return input;
}


// Saves user input to local storage so that settings persist across both web pages.
function saveSettings (input) {
    if (input !== undefined && window.localStorage){ 
        myStorage.setItem("userSelection", input);  
    }
}


