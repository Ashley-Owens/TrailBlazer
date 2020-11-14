// Disables and clears radio buttons, preventing user selection
function disableRadios() {
    $('[name="modalRadio"]').prop('checked', false);
    $('[name="modalRadio"]').prop('disabled', true);
}

// Tracks toggle button state to enable or disable radio buttons
$(document).ready(function() {
    $("#customSwitches").click(function() {  
        if ($('[name="modalRadio"]').prop("disabled") === true) {
            $('[name="modalRadio"]').prop("disabled", false);   
        } else {
            disableRadios();
        }
    });
});

// When either modal close buttons are used, modal is reset to default state
$(document).ready(function(){
    $("[name='closeModal']").click (function () {
        $("#customSwitches").prop('checked', false);
        disableRadios();
    })
});

