$(document).ready(function () {

    $("#contestants").click(function () {
        $("#mainPage").hide();
        $("#contestantsList").show();
    });

    $("#programs").click(function () {
        $("#mainPage").hide();
        $("#programsList").show();
    });

    $("#settings").click(function () {
        $("#mainPage").hide();
        $("#settingsList").show();
    });
    $("#users").click(function () {
        $("#mainPage").hide();
        $("#usersList").show();
    });

    $("#goBack").click(function (){
    $("section").hide();
    $("#mainPage").show();
    });
});