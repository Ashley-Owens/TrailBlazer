// Disables radios buttons, preventing user selection
function disableRadios() {
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

    disableRadios();
    var radioState = false;

    $('input[type="checkbox"]').click(function() {
        if($(this).prop('id') === "customSwitches") {
            
            if (radioState === true) {
                document.querySelector('input[name="modalRadio"]:checked').checked = false;
                disableRadios();
                radioState = false;
                
            } else {
                enableRadios();
                radioState = true;
            }
        }	 
    });
});
