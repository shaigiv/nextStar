$(document).ready(function () {

    $("#go-back").click(function () {
        window.location.href = window.location.origin + "/index.html";
        $("section").hide();
        $("#main-page").show();
    });

    $("#voting-screen").click(function () {
        window.location.href = window.location.origin + "/index.html#voting-screens";
        switchHash();
    });

    $("#contestants").click(function () {
        window.location.href = window.location.origin + "/index.html#contestants-list";
        switchHash();
    });

    $("#programs").click(function () {
        window.location.href = window.location.origin + "/index.html#programs-list";
        switchHash();
    });

    $("#settings").click(function () {
        window.location.href = window.location.origin + "/index.html#settings-list";
        switchHash();
    });

    $("#users").click(function () {
        window.location.href = window.location.origin + "/index.html#users-list";
        switchHash();
    });

    $("#prog10092013").click(function () {
        $("section").hide();
        $("#prog-page").show();
        $("#prog-page .prog-page").hide();
        $("#prog-page10092013").show();
    });

    $("#prog20092013").click(function () {
        $("section").hide();
        $("#prog-page").show();
        $("#prog-page .progPage").hide();
        $("#prog-page20092013").show();
    });


});

function switchHash() { //navigates according to hash tag
    var x;
    switch (location.hash) {
        case "":
            $("section").hide();
            $("#main-page").show();
            break;
        case "#contestants-list":
            $("#main-page").hide();
            $("#contestants-list").show();
            break;
        case "#programs-list":
            $("#main-page").hide();
            $("#programs-list").show();
            break;
        case "#settings-list":
            $("#main-page").hide();
            $("#settings-list").show();
            break;
        case "#users-list":
            $("#main-page").hide();
            $("#users-list").show();
            break;
        case "#programs-list":
            $("section").hide();
            $("#prog-page").show();
            $("#prog-page .prog-page").hide();
            $("#prog-page10092013").show();
            break;
        case "#voting-screens":
            $("section").hide();
            $("#voting-screens").show();
            break;

    }
}