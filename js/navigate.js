$(document).ready(function () {

    $("#goBack").click(function () {
        $("section").hide();
        $("#mainPage").show();
    });

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

    $("#prog10092013").click(function () {
        $("section").hide();
        $("#progPage").show();
        $("#progPage .progPage").hide();
        $("#progPage10092013").show();
    });

      $("#prog20092013").click(function () {
        $("section").hide();
        $("#progPage").show();
        $("#progPage .progPage").hide();
        $("#progPage20092013").show();
    });
});