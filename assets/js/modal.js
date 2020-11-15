var toggle = document.querySelector("#customSwitches");
var radios = document.getElementsByName("modalRadio");
var saveButton = document.getElementById("Save");


// Disables and clears radio buttons, preventing user selection
function disableRadios() {
    $(radios).prop('checked', false);
    $(radios).prop('disabled', true);
}


// Tracks toggle button state to enable or disable radio buttons
$(document).ready(function() {
    $(toggle).click(function() {  
        if ($(toggle).prop('checked') === true) {
            $(radios).prop("disabled", false);
        } else {
            disableRadios();
        }
    });
});


// When either modal close buttons are clicked, modal is reset to default state.
$(document).ready(function(){
    $("[name='closeModal']").click (function () {
        disableRadios();
        $(toggle).prop('checked', false);  
    })
});


// TODO
// When save button clicked, stores user input and saves settings.
$(document).ready(function(){
    $(saveButton).click (function () {
        input = getSelection();
        if (input !== undefined) {
            saveSettings(input);
        } 
    })
});


// Obtains the user's radio button selection.
function getSelection() {
    var selection;

    for (var i=0; i < radios.length; i++) {
        if (radios[i].checked === true) {
            selection = radios[i].value;
        }
    }
    return selection;
}


// TODO
// Saves modal settings so they persist across both web pages.
function saveSettings (input) {
    if (input !== undefined){
        var x;
    }
}