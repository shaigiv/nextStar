var domain = "http://makosrv1.egoline.co.il/nextStar/json?";

var editCompId = "";
var editCompHtml = "";
var deleteCompHtml = "";
var deletedShowHtml="";
var imgUrlSmall ="";
var imgUrlLarge ="";

function  homePageInitEvents(){
    $(".programs-list").delegate(".delete","click",function(){
        deleteShow($(this));
    });
    $("#programs-list").delegate(".open-prog","click",function(){
        openShow($(this));
    });
    $("#conestant-container").delegate(".delete", "click",function(){
        deleteCompetitor(this);
    });
     $("#conestant-container").delegate(".edit", "click",function(){
        editcompetitor(this);
    });
    $("#addComp").click(function(){
        addCompetitor();
    });
     $("#editComp").click(function(){
        editCompetitorSend(this);
    });


    /*add show events*/
    $("#addShow").click(function(){
        $(".add-program-wrap").fadeIn();
        
    });
    $("#addProg").click(function(){
        addShow();
    });
      $("#addShowCancel").click(function(){
        $(".add-program-wrap").fadeOut();
    });


    $("#open-new-comp").click(function(){
        $("#add-contestant").show();
    });

    datepickerInit();
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
    $(data).each(function(index){
        console.log("in setShowList: "+this.name);
         console.log("in setShowList: "+this.status);
        var name = this.name;
        var number = index*1+1*1;
        var id = this.id;
        var status = "הצבעות ("+this.CompetitorCount + ")" +"   מתמודדים ("+this.votesCount + ")";
        
        $("#programs-list-ul").append(' <li class="">'+
                '<div class="program-number">'+number+'</div>'+
                '<div class="program-name">'+name+'</div>'+
                '<div class="program-status">'+status+'</div>'+
                '<div class="program-options"><span class="delete">מחק</span><span> |</span> <span class="open">פתח</span></div>'+
            ' </li>');

            $("#programs-list-ul").children("li:last").data("showId", id);
    });
    
}


function deleteShow(show){
     var showId = show.parents("li").data("showId");
    var name =show.parents("li").children(".program-name").text();
     var r=confirm("האם אתה בטוח שברצונל למחוק את "+ name);
    if (r==true)
      {
            deletedShowHtml =show.parents("li");

             $.ajax({
                type:"POST",
                url: domain + "type=deleteShow",
                data:{"id":showId},
                success: function(data) {
                    console.log("success getShowsList: " + data);
                    setShowDeleted(data);
                },
                error: function(data) {
                    console.log("error getShowsList: " + data);
                }
            });
      }
  
   
}


function setShowDeleted(data){
    deletedShowHtml.fadeOut();
   // deletedShowHtml.remove();
}
function openShow(show){
    // window.location.href = window.location.origin + "/index.html#prog-page10092013";
        //switchHash();
        var showId = show.parents(".line").data("showID");
        showShowPage(showId);
}

function addShow(){
    
    var showName = $("#add-prog-name").val();
    var dateTemp =$( "#datepicker" ).datepicker( "getDate" );
    var date =dateTemp.getTime();

     $.ajax({
        type:"POST",
        url: domain + "type=addShow",
        data:{"name":showName,"date":date},
        success: function(data) {
            console.log("success addShow: " + data);
            setShowAdded(data);
        },
        error: function(data) {
            console.log("error addShow: " + data);
        }
    });
}

function setShowAdded(data){
    //init the fields
     $(".add-program-wrap").fadeOut();
      var showName = $("#add-prog-name").val("");
      $( "#datepicker" ).val("");
     //insert the line to the html
     var number =$("#programs-list-ul li").length+1;
     var name =data.name;
     var id = data.id;
     var status = "הצבעות ("+data.CompetitorCount + ")" +"   מתמודדים ("+data.votesCount + ")";
      $("#programs-list-ul").append(' <li class="">'+
                '<div class="program-number">'+number+'</div>'+
                '<div class="program-name">'+name+'</div>'+
                '<div class="program-status">'+status+'</div>'+
                '<div class="program-options"><span class="delete">מחק</span><span> |</span> <span class="open">פתח</span></div>'+
            ' </li>');
    
    $("#programs-list-ul").children("li:last").data("showId", id);
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
    $(data).each(function(index) {
        console.log(this.name);
      //  console.log(this["image-url"]);
        var name = this.name;
        var img = this["imageUrlA"];
        var id = this.id;
        var jsonData= this;
        var number =index*1+1*1;
        $("#conestant-container").append("<li>" +
                                   " <div class=\"container-right\">" +
                                       " <div>" +
                                            "<span class=\"title\">"+number+". </span><span>" + name + "</span>" +
                                       " </div>" +
                                       " <div>" +
                                           " <ul class=\"horizonal-list\">" +
                                                 "<li class='edit'><a href=\"#home\"> ערוך </a></li>" +
                                                "<li><a class='delete' href=\"#news\"> מחק</a></li>" +
                                            "</ul>" +
                                       " </div>" +
                                    "</div>" +
                                    "<div class=\"container-left\">" +
                                       " <img src=\"" + img + "\" alt=\"ninet\">" +
                                    "</div>" +
                                "</li>");
        $("#conestant-container").children("li:last").data("compData", jsonData);
    });
}
function addCompetitor(){
     var name= $("#add-competitor-name").val();
     
     $.ajax({
         type: "POST",
         url: domain + "type=addCompetitor",
         data: { "name": name, "imgUrlA": imgUrlSmall, "imgUrlB": imgUrlLarge },
         success: function(data) {
             console.log("success addCompetitor: " + data);
             setAddCompetitor(data);
             alert("המשתמש " + data.name + " נוסף בהצלחה");
             $("#add-contestant").fadeOut();

         },
         error: function(data) {
             console.log("error addCompetitor: " + data);
         }
     });
}

function setAddCompetitor(data){
     console.log(data);
     $("#add-competitor-name").val("");
     imgUrlSmall ="";
     imgUrlLarge ="";
     var name = data.name;
     var img = data["imageUrlA"];
     var id = data.id;
     var jsonData =data;
     $("#conestant-container").append("<li>"+
                                   " <div class=\"container-right\">"+
                                       " <div>"+
                                            "<span class=\"title\">1. </span><span>"+name+"</span>"+
                                       " </div>"+
                                       " <div>"+
                                           " <ul class=\"horizonal-list\">"+
                                                "<li class='edit'><a href=\"#home\"> ערוך </a></li>"+
                                                "<li><a class='delete' href=\"#news\"> מחק</a></li>"+
                                            "</ul>"+
                                       " </div>"+
                                    "</div>"+
                                    "<div class=\"container-left\">"+
                                       " <img src=\""+img+"\" alt=\"ninet\">"+
                                    "</div>"+
                                "</li>");
     
     $("#conestant-container").children("li:last").data("compData",jsonData);

     
}

function updateCompetitor(){
   //init the edit fields
    var addCompState = "";
    var addCompId = "";
}


function editcompetitor(editItem){
    var comp = $(editItem).parents("li");
    editCompHtml = comp;
    var compId = comp.data("compId");
    editCompId = compId;
    $("#edit-form").show();
    //open the add competitor box and set the details
    $("#edit-contestant").show();
    editCompHtml.after( $("#edit-contestant")); 
    //var name = comp.children(".container-right").children("div:first").children("span:last").text();
    var name = comp.data("compData").name;
    //var imgUrl = comp.children(".container-left").children("img").attr("src");
    var imgUrl = comp.data("compData").imageUrlA;

    $("#edit-competitor-name").val(name);
    $("#edit-competitor-imgFile").attr("src", imgUrl);


}

function editCompetitorSend(){
      var name= $("#edit-competitor-name").val();
      var imgUrla = "imgUrla.png";
      var imgUrlb = "imgUrlb.png";
      var id = editCompId;
     $.ajax({
        type:"POST",
        url: domain + "type=updateComptitor",
        data:{"id":id,"name":name,"imgUrlA":imgUrla, "imgUrlB":imgUrlb},
        success: function(data) {
            console.log("success editCompetitor: " + data);
            setEditCompetitor(data);
        },
        error: function(data) {
            console.log("error addCompetitor: " + data);
        }
    });
}

function setEditCompetitor(data){
    var name = data.name;
    var imgUrla = data.imgUrlA;
    var imgUrlb = data.imgUrlB;

    editCompHtml.children(".container-right").children("div:first").children("span:last").text(name);
    editCompHtml.children(".container-left").children("img").attr("src",imgUrla);

    editCompHtml = "";  
    
    //hide the edit box
    $("#edit-contestant").fadeOut();
    
    
}

function deleteCompetitor(deleteItem){
   var comp = $(deleteItem).parents("li");
   var compId = $(deleteItem).parent("li").parents("li").data("compData").id;
   var name = comp.children(".container-right").children("div:first").children("span:last").text();
   var imgUrl = comp.children(".container-left").children("img").attr("src");
  
   //check if the user want to delete
   var r=confirm("האם אתה בטוח שברצונל למחוק את "+ name);
if (r==true)
  {
    deleteCompetitorSend(deleteItem);
  }
  
}

function deleteCompetitorSend(deleteItem) {
     var comp = $(deleteItem).parent("li").parents("li");
     //save the html for delete from dom after delete from the server
     deleteCompHtml = comp;
     var compId = comp.data("compData").id;
     $.ajax({
         type: "POST",
         url: domain + "type=updateComptitorStatus",
         data: { "id": compId, "status": -1 },
         success: function(data) {
             console.log("success deleteCompetitorSend: " + data);
             deleteCompHtml.fadeOut();
             //leteCompHtml.remove();
         },
         error: function(data) {
             console.log("error deleteCompetitorSend: " + data);
         }
     });
}

/**********************datepicker***************************/
function datepickerInit(){
     $( "#datepicker" ).datepicker( {
          onSelect: function(date) {
            //alert(date);
        }, 
       showButtonPanel: true,
        minDate: 0,
    },$.datepicker.regional[ "he" ] );

    $("#datepicker-icon").click(
        function(){
            $( "#datepicker" ).focus();
        });
	
}

/**************************upload images***************************/

    