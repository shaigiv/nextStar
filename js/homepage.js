var domain = "http://makosrv1.egoline.co.il:9090/nextStar/json?";
//var domain = "http://makosrv1.egoline.co.il/nextStarTestA/json?";
var domain = "http://makosrv1.egoline.co.il:9090/nextStarTestD/json?";
//var domain = "http://192.168.2.108:8080/nextStarQA/json?";
var domainForJson = "http://makosrv1.egoline.co.il:9090";


var editCompId = "";
var editCompHtml = "";
var deleteCompHtml = "";
var deletedShowHtml="";
var imgUrlSmall ="";
var imgUrlLarge ="";
var smallImgAdded=false;
var largeImgAdded=false;
//var smallImgUploadedByAdd=false;
//var largeImgUploadedByAdd=false;
var smallImgUploadedByEdit=false;
var largeImgUploadedByEdit=false;
var smallImgEdited =false;
var largeImgEdited =false;

function  homePageInitEvents(){
    $(".programs-list").delegate(".delete","click",function(){
        deleteShow($(this));
    });
    $(".programs-list").delegate(".open","click",function(){
        openShow($(this));
    });
    $("#conestant-container").delegate(".delete", "click",function(){
        deleteCompetitor(this);
    });
     $("#conestant-container").delegate(".edit", "click",function(){
         if($("#edit-contestant").is(":visible")){
           $("#edit-contestant").fadeOut();  
         }
         else{
             $("#edit-contestant").fadeIn(); 
             editcompetitor(this);
         }
        
    });
    $("#addComp").click(function(){
        
        addCompetitor();
    });
     $("#editComp").click(function(){
        editCompetitorSend(this);
    });


    /*add show events*/
    $("#addShow").click(function(){
        if($(".add-program-wrap").is(':visible')){
             $(".add-program-wrap").fadeOut();
        }
        else{
             $(".add-program-wrap").fadeIn();
        }
        
    });
    $("#addProg").click(function(){
        addShow();
    });
      $("#addShowCancel").click(function(){
        $(".add-program-wrap").fadeOut();
    });

    $("#edit-cancel-comp").click(function(){
        $("#edit-contestant").fadeOut();
    });

    $("#cancle-add-comp").click(function(){
        $("#add-contestant").fadeOut();
        addCompInitFields();
    });

    $("#open-new-comp").click(function(){
        if($("#add-contestant").is(':visible')){
             $("#add-contestant").fadeOut();
        }
        else{
             $("#add-contestant").fadeIn();
        }
       
    });

    //display img event
    $(".displayImgBtn").click(function(){
        displayImg($(this));
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
            if(data.error =="not log in"){
                window.location.href="login.html"
            }
            else{
                console.log("success getShowsList: " + data);
                setShowList(data);
            }
           
        },
        error: function(data) {
            console.log("error getShowsList: " + data);
        }
    });
}

function setShowList(data){
    $("#programs-list-ul").html("");
    $(data).each(function(index){
        console.log("in setShowList: "+this.name);
         console.log("in setShowList: "+this.status);
        var name = this.name;
        var number = index*1+1*1;
        var id = this.id;
        var data =this;
        var status = "הצבעות ("+this.votesCount + ")" +"   מתמודדים ("+this.CompetitorCount + ")";
        var statusClass ="";
         if (data.live == true){
             statusClass ="live"
         }
      $("#programs-list-ul").append(' <li class="'+statusClass+'">'+
                '<div class="program-number">'+number+'</div>'+
                '<div class="program-name">'+name+'</div>'+
                '<div class="program-status">'+status+'</div>'+
                '<div class="program-options"><span class="delete">מחק</span><span> |</span> <span class="open">פתח</span></div>'+
            ' </li>');

            $("#programs-list-ul").children("li:last").data("showData", data);
    });
    
}


function deleteShow(show){
    var data =show.parents("li").data("showData")
     var showId = data.id;
    var name =show.parents("li").children(".program-name").text();
    //if the show is alive  - dont let delete
    if(data.live ==true){
        alert('אין אפשרות למחוק תוכנית חיה');
    }
    else{
        var r=confirm("האם אתה בטוח שברצונך למחוק את "+ name);
    if (r==true)
      {
            deletedShowHtml =show.parents("li");

             $.ajax({
                type:"POST",
                url: domain + "type=deleteShow",
                data:{"id":showId},
                success: function(data) {
                    if(data.error =="not log in"){
                        window.location.href="login.html"
                    }
                    else{
                        console.log("success getShowsList: " + data);
                        setShowDeleted(data);
                    }
                },
                error: function(data) {
                    console.log("error getShowsList: " + data);
                }
            });
      }
    }
     
  
   
}


function setShowDeleted(data){
    deletedShowHtml.fadeOut();
   // deletedShowHtml.remove();
}


function addShow(){
    if($("#datepicker").val() ==""){
        alert("עליך להזין תאריך לתוכנית")
    }
    var showName = $("#add-prog-name").val();
     if(showName ==""){
        alert("עליך להוסיף שם תוכנית")}
   else{
        var dateTemp =$( "#datepicker" ).datepicker( "getDate" );
    var date =dateTemp.getTime();
   
    
         $.ajax({
            type:"POST",
            url: domain + "type=addShow",
            data:{"name":showName,"date":date},
            success: function(data) {
                if(data.error =="not log in"){
                    window.location.href="login.html"
                }
                else{
                    console.log("success addShow: " + data);
                    setShowAdded(data);
                }
            },
            error: function(data) {
                console.log("error addShow: " + data);
            }
        });
   }
   
    
    
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
     var status = "הצבעות ("+data.votesCount + ")" +"   מתמודדים ("+data.CompetitorCount + ")";
     var statusClass ="";
     if (data.live == true){
         statusClass ="live"
     }
      $("#programs-list-ul").append(' <li class="'+statusClass+'">'+
                '<div class="program-number">'+number+'</div>'+
                '<div class="program-name">'+name+'</div>'+
                '<div class="program-status">'+status+'</div>'+
                '<div class="program-options"><span class="delete">מחק</span><span> |</span> <span class="open">פתח</span></div>'+
            ' </li>');
    
    $("#programs-list-ul").children("li:last").data("showData", data);
}



function getCompetitorsList() {
    $.ajax({
        type:"POST",
        url: domain + "type=getAllCompetitor",
        success: function(data) {
            if(data.error =="not log in"){
                window.location.href="login.html"
            }
            else{
                console.log("success getShowsList: " + data);
                setCompetitorsList(data);
            }
        },
        error: function(data) {
            console.log("error getShowsList: " + data);
        }
    });
}

function setCompetitorsList(data){
    //set the compArray
    setCompArray(data);
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
                                            "<span class=\"title\">"+number+". </span><span class='add-comp-name-text'>" + name + "</span>" +
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
    var smallImageComp =$(".add-comp-img-wrap .smallImg").data("url");
    var largeImageComp = $(".add-comp-img-wrap .largeImg").data("url");
      var name= $("#add-competitor-name").val();
   
    if(!smallImageComp || !largeImageComp){
        alert("עליך להעלות 2 תמונות");
    }
    else if(name==""){
        alert("עליך להזין שם מתמודד");
    }
    ////check if the user upload the img to the server
    //if(smallImgUploadedByAdd == false || largeImgUploadedByAdd == false){
    //    alert("עליך להעלות את התמונות לפני הוספת מתמודד");
    //}
    else{
          
         var imgUrlSmall = $(".add-comp-img-wrap .smallImg").data("url");
         var imgUrlLarge = $(".add-comp-img-wrap .largeImg").data("url");
         $.ajax({
             type: "POST",
             url: domain + "type=addCompetitor",
             data: { "name": name, "imgUrlA": imgUrlSmall, "imgUrlB": imgUrlLarge },
             success: function(data) {
                 if(data.error =="not log in"){
                    window.location.href="login.html"
                }
                else{
                     console.log("success addCompetitor: " + data);
                     setAddCompetitor(data);
                     alert("המשתמש " + data.name + " נוסף בהצלחה");
                     $("#add-contestant").fadeOut();
                 }

         },
         error: function(data) {
             console.log("error addCompetitor: " + data);
         }
     });
    }
   
}

function setAddCompetitor(data){
     console.log(data);
     //init the add upload 
    addCompInitFields();
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
     //get the jquery item that in the a b c order is prev
     var dictioanryItem = getItemBefore(jsonData);
     $(dictioanryItem).after( $("#conestant-container").children("li:last"));
     
}

function getItemBefore(jsonData){
    var contin = true;
    var index=0;
    while (contin){
        var itemData =$("#conestant-container").children("li").eq(index).data("compData");
        //if the item name is bigger from us- return the prev
        if($("#conestant-container").children("li").eq(index).attr("id") != "edit-contestant"){
            if(itemData.name.toLowerCase() > jsonData.name.toLowerCase()){
            return $("#conestant-container").children("li").eq(index-1)
            contin  = false;
            }
        }
        
        //else -continue
        {
            index++;
        }
    }
    return $("#conestant-container").children("li:alst")
}

function addCompInitFields(){
     $("#add-competitor-name").val("");
     $(".add-comp-img-wrap .smallImg").data("url", "");
     $(".add-comp-img-wrap .largeImg").data("url", "");
     $("#add-competitor-imgFile").attr("src","img/default.jpg");
     $(".displayImgBtn").hide();
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
    //open the add competitor box and set the details
    $("#edit-contestant").show();
    editCompHtml.after( $("#edit-contestant")); 
    var name = comp.data("compData").name;
    var imgUrl = comp.data("compData").imageUrlA;
    //set the old url data
     $(".edit-comp-img-wrap .smallImg").data("url", comp.data("compData").imageUrlA);
     $(".edit-comp-img-wrap .largeImg").data("url", comp.data("compData").imageUrlB);

    $("#edit-competitor-name").val(name);
    $("#edit-competitor-imgFile").attr("src", imgUrl);


}

function editCompetitorSend(){
      var name= $("#edit-competitor-name").val();
      var imgUrla = "";
      var imgUrlb = "";
      var id = editCompHtml.data("compData").id;
      
      //if the img was chosen but not uploaded to server
      if((smallImgEdited == true && smallImgUploadedByEdit == false) ||  (largeImgEdited == true && largeImgUploadedByEdit == false)){
         alert("עליך להעלות את התמונה/ות לפני הוספת משתמש"); 
      }
      else{
           //if small img not updated -send the old url
          if($(".edit-comp-img-wrap .smallImg").data("url") == undefined || $(".edit-comp-img-wrap .smallImg").data("url") == ""){
              imgUrla = editCompHtml.data("compData").imageUrlA;
          }
          //if small img updated - send the new url
          else{
              imgUrla = $(".edit-comp-img-wrap .smallImg").data("url");
          }
          //if large img not updated - send the old url
          if($(".edit-comp-img-wrap .largeImg").data("url") == undefined || $(".edit-comp-img-wrap .largeImg").data("url") == ""){
              imgUrlb = editCompHtml.data("compData").imageUrlB;
          }
          //if large img updated - send the new url
          else{
              imgUrlb = $(".edit-comp-img-wrap .largeImg").data("url");
          }
    
      
         $.ajax({
            type:"POST",
            url: domain + "type=updateComptitor",
            data:{"id":id,"name":name,"imgUrlA":imgUrla, "imgUrlB":imgUrlb},
            success: function(data) {
                if(data.error =="not log in"){
                window.location.href="login.html"
                }
                else{
                    console.log("success editCompetitor: " + data);
                    if(data == "parameter miss"){
                        console.log("parameter miss");
                    }
                    else{
                        setEditCompetitor(data);
                    }
               }
            
            },
            error: function(data) {
                console.log("error addCompetitor: " + data);
            }
        });
      }
     
}

function setEditCompetitor(data){
    var name = data.name;
    var imgUrla = data.imageUrlA;
    var imgUrlb = data.imageUrlB;

    editCompHtml.children(".container-right").children("div:first").children("span:last").text(name);
    editCompHtml.children(".container-left").children("img").attr("src",imgUrla);
    //set the data compData
    editCompHtml.data("compData",data);
    editCompHtml = "";  
    //init fields
    smallImgUploadedByEdit = false;
    largeImgUploadedByEdit = false;
    $(".edit-comp-img-wrap .smallImg").data("url","");
    $(".edit-comp-img-wrap .largeImg").data("url","");

    //hide the edit box
    $("#edit-contestant").fadeOut();
    
    
}

function deleteCompetitor(deleteItem){
   var comp = $(deleteItem).parents("li");
   var compId = $(deleteItem).parent("li").parents("li").data("compData").id;
   var name = comp.children(".container-right").children("div:first").children("span:last").text();
   var imgUrl = comp.children(".container-left").children("img").attr("src");
  
   //check if the user want to delete
   var r=confirm("האם אתה בטוח שברצונך למחוק את "+ name+"?");
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
             if(data.error =="not log in"){
                window.location.href="login.html"
            }
            else{
                 console.log("success deleteCompetitorSend: " + data);
                 deleteCompHtml.fadeOut();
             //leteCompHtml.remove();
             }
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

    