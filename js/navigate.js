$(document).ready(function() {

    $("#go-back").click(function() {
        window.location.href = window.location.origin + "/index.html";
        $("section").hide();
        $("#main-page").show();
    });

    $(".open-voting").click(function() {
        window.location.href = window.location.origin + "/index.html#voting-screens";
       //switchHash();
    });

    $("#contestants").click(function() {
        window.location.href = window.location.origin + "/index.html#contestants-list";
        // switchHash();
    });

    $("#programs").click(function() {
        window.location.href = window.location.origin + "/index.html#programs-list";
        //switchHash();
    });

    $("#settings").click(function() {
        // window.location.href = window.location.origin + "/index.html#settings-list";
        // switchHash();
        showSettingsPage();
    });

    $("#users").click(function() {
        window.location.href = window.location.origin + "/index.html#users-list";
        // switchHash();
    });

    
});
pagePosition = "";
pageBackPosition = "";

function switchHash() { //navigates according to hash tag
    var x;
    switch (location.hash) {
        case "":
            $("section").hide();
            $("#main-page").show();
            break;
        case "#contestants-list":
            showMainPage();
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

        case "#prog-page10092013":
            $("section").hide();
            $("#prog-page").show();
            $("#prog-page .prog-page").hide();
            $("#prog-page10092013").show();
            break;

        case "#prog-page20092013":
            $("section").hide();
            $("#prog-page").show();
            $("#prog-page .prog-page").hide();
            $("#prog-page20092013").show();
            break;
    }
}
function navigate(to){
    switch( to ){
        case "main":
            showMainPage();
            break;
            case "show":
            showShowPage();
            break;
            case "vote":
            openVotingPage();
            break;
            case "settings":
            showSettingsPage();
            break;
        
    }
}
function showMainPage(){
    
}

function showShowPage(){
    $("section").hide();
    $("#prog-page").show();
}

function showProgPage(progLine){
    $("section").hide();
    $("#prog-page").show();
}

function showSettingsPage(){
       $("section").hide();
    $("#settings-list").show();
}

function openVotingPage(){
      $("section").hide();
    $("#voting-screens").show();
}

function back(){
    
}