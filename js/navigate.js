$(document).ready(function() {
    $(".back").click(function() {
        back(pagePosition);
    });

   
    //$(".open-voting").click(function() {
    //    window.location.href = window.location.origin + "/index.html#voting-screens";
    //    //switchHash();
    //});

    //$("#contestants").click(function() {
    //    window.location.href = window.location.origin + "/index.html#contestants-list";
    //    // switchHash();
    //});

    //$("#programs").click(function() {
    //    window.location.href = window.location.origin + "/index.html#programs-list";
    //    //switchHash();
    //});

    $("#settings").click(function() {
        // window.location.href = window.location.origin + "/index.html#settings-list";
        // switchHash();
        navigate("settings");
        //showSettingsPage();
    });

    //$("#users").click(function() {
    //    window.location.href = window.location.origin + "/index.html#users-list";
    //    // switchHash();
    //});


});
pagePosition = "main";
pageBackPosition = "main";
navigationArray = new Array();
navigationArray[0] ="main"
navigationArrayIndex = 0;




function navigate(to,from){
  
    if(from == "back") {
        --this.navigationArrayIndex;
    }

    if(from != "back") {
        ++this.navigationArrayIndex;
        this.navigationArray[this.navigationArrayIndex] = to;
    }
    switch( to ){
        case "main":
            showMainPage();
            break;
        case "show":
            
            showShowPage(from);
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
    $("section").hide();
    $("#main-page").show();
    $(".back").hide();
    getShowsList();
     pageBackPosition = pagePosition;
     pagePosition = "main";
}

function showShowPage(from){
    if (from =="back"){
        //take the update data from server
        getShowData();
    }
    console.log("showShowPage");
    $("section").hide();
    $("#prog-page").show();
    $(".back").show();

     pageBackPosition = pagePosition;
     pagePosition = "show";
}

function showSettingsPage(){
       $("section").hide();
    $("#settings-list").show();
    $(".back").show()

    pageBackPosition = pagePosition;
     pagePosition = "settings";
}

function openVotingPage(){
      $("section").hide();
    $("#voting-screens").show();
    $(".back").show()

    pageBackPosition = pagePosition;
     pagePosition = "vote";
}

function back(from){
    navigate(navigationArray[navigationArrayIndex - 1],"back");
}


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
