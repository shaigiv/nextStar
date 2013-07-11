$(document).ready(function () {

    $("#add-vote-title").click(function () {
        if ($(".toggle-edit").hasClass('minimize')) {
            $("#add-vote").slideToggle();
            $("#add-vote-title").toggleClass('minimize maximize');
        }
    });

     $("#add-page-title").click(function () {
        if ($(".toggle-edit").hasClass('minimize')) {
            $("#add-page").slideToggle();
            $("#add-page-title").toggleClass('minimize maximize');
        }
    });

    $("#edit-prog-name").click(function () {
        $("#edit-prog-name span").show();
    });


});


function checkOpen() {
    document.getElementById("wait-open-check").disabled = false;
    document.getElementById("wait-open-check").checked = false;
}

function checkClose() {
    document.getElementById("wait-close-check").disabled = false;
    document.getElementById("wait-close-check").checked = false;
}
function checkCount() {
    document.getElementById("wait-count-check").disabled = false;
    document.getElementById("wait-count-check").checked = false;
}
function checkContinue() {
    document.getElementById("wait-continue-check").disabled = false;
    document.getElementById("wait-continue-check").checked = false;
}