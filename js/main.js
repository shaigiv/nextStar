$(document).ready(function () {

    $(".add-title img").click(
    function () {
        $("#add-vote").addClass("shrink-height");
    });

    //$(".wait-open-vote").click(
    //function () {
    //  //   document.getElementById("wait-open-vote-check").checked=true;
    //   document.getElementById("check1").checked=true;

    //});







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