// Disables and clears radio buttons, preventing user selection
function disableRadios() {
    $('input[name="modalRadio"]').prop('checked', false);
    $("#formCheck-1").prop('disabled', true);
    $("#formCheck-2").prop('disabled', true);
    $("#formCheck-3").prop('disabled', true);
}

// Enables radios buttons, allowing user selection
function enableRadios() {
    $("#formCheck-1").prop("disabled", false);
    $("#formCheck-2").prop('disabled', false);
    $("#formCheck-3").prop('disabled', false);
}

// Tracks toggle button state to enable or disable radio buttons
$(document).ready(function() {
    $("#customSwitches").click(function() {  
        if ($("#formCheck-1").prop("disabled") === true) {
            enableRadios();    
        } else {
            disableRadios();
        }
    });
});

// When the "close" button is used, modal is reset to default state
$(document).ready(function(){
    $('#closeModal').click (function () {
        $("#customSwitches").prop('checked', false);
        disableRadios();
    })
});

