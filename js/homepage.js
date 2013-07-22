var domain = "http://makosrv1.egoline.co.il/nextStar/json?";

function  homePageInitEvents(){
    $("#programs-list").delegate(".delete-prog","click",function(){
        deleteShow($(this));
    });
    $("#programs-list").delegate(".open-prog","click",function(){
        openShow($(this));
    });
    $("#addComp").click(function(){
        addCompetitor();
    });

    $("#addShow").click(function(){
        addShow();
    });
}

function getHomePageData(){

    getShowsList();
    getCompetitorsList();
}

function getShowsList() {
    $.ajax({
         type:"POST",
        url: domain + "type=getAllShow",
        success: function(data) {
            console.log("success getShowsList: " + data);
            setShowList(data);
        },
        error: function(data) {
            console.log("error getShowsList: " + data);
        }
    });
}

function setShowList(data){
    $(data).each(function(){
        console.log(this.name);
    });
}


function getCompetitorsList() {
    $.ajax({
        type:"POST",
        url: domain + "type=getAllCompetitor",
        success: function(data) {
            console.log("success getShowsList: " + data);
            setCompetitorsList(data);
        },
        error: function(data) {
            console.log("error getShowsList: " + data);
        }
    });
}

function setCompetitorsList(data){
    $(data).each(function(){
        console.log(this.name);
    });
}

function deleteShow(show){
    var showId = show.parents(".line").data("showID");
    if(showId == undefined){
        showId = 7;
    }

     $.ajax({
        type:"POST",
        url: domain + "type=getAllShow",
        success: function(data) {
            console.log("success getShowsList: " + data);
            setShowList(data);
        },
        error: function(data) {
            console.log("error getShowsList: " + data);
        }
    });
}

function openShow(show){
    // window.location.href = window.location.origin + "/index.html#prog-page10092013";
        //switchHash();
        var showId = show.parents(".line").data("showID");
        showShowPage(showId);
}

function addCompetitor(){
     var name= $("#add-competitor-name").val();
     var imgUrl = "imgUrl.png"
     $.ajax({
        type:"POST",
        url: domain + "type=addCompetitor",
        data:{"name":name,"imgUrl":imgUrl},
        success: function(data) {
            console.log("success addCompetitor: " + data);
            setAddCompetitor(data);
        },
        error: function(data) {
            console.log("error addCompetitor: " + data);
        }
    });
}

function setAddCompetitor(data){
    console.log(data);
}

function addShow(){
    
    var showName = "תוכנית מספר אחד";
     $.ajax({
        type:"POST",
        url: domain + "type=addShow",
        data:{"name":showName},
        success: function(data) {
            console.log("success addShow: " + data);
            setShowAdded(data);
        },
        error: function(data) {
            console.log("error addShow: " + data);
        }
    });
}

function setShowAdded(){
    
}