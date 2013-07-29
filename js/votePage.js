var currentPageId =0;
var voteStatus = 0;
var vote1Id=0;
var vote2Id=0;
var doubleVotes =false;
var requestReturned =0;
function votePageAttachEvents(){
    $("#openRegister").click(function() {
        openRegister();
    });
    $("#openVote").click(function() {
        openVote();
    });
    $("#closeVote").click(function() {
        closeVote();
    });
     $("#publishResults").click(function() {
        publishResult();
    });

    $("#announcements input[type=checkbox]").click(function(){
        updateWaitingText($(this));
    });
     

}

function getVoteData(voteItem){
    //type=getPage&PageId=3
    //getPage&PageId=3
   var voteItemData =  $(voteItem).parents("tr").data("pageData");
   var id = voteItemData.id;
   currentPageId = id;
    $.ajax({
        type: "POST",
        url: domain + "type=getPage",
        data: { "pageId": id },
        success: function(data) {
            console.log("success getPage: " + data);
             setVotePageData(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error getPage: " + data);
        }
    });
}

function setVotePageData(data){
    voteStatus = data.status;
    vote1Id= data.votes[0].id;
    //check if is a duet
    if(data.votes.length ==2){
         doubleVotes =true;
         vote2Id= data.votes[1].id;
    }
    else{
         doubleVotes =false;
    }
   
  
    //set the header status
    setHeaderStatus(data.status);
    //set the waiting text
    setWaitingPage(data);
    setRealPercent(data);
    //show the page
    navigate("vote")
   // openVotingPage();
}


function openRegister(){
    //if the btn is a next step - do it
    if($("#openRegister").hasClass("next")){
        updateVoteStatus(21,setOpenRegister);
    }
    //do nothing
    else{
        
    }
}


function openVote(){
     //if the btn is a next step - do it
    if($("#openVote").hasClass("next")){
        updateVoteStatus(22,setVoteOpen);
    }
    //do nothing
    else{
        
    }
}

function closeVote(){
    //if the btn is a next step - do it
    if($("#closeVote").hasClass("next")){
       updateVoteStatus(24,setVoteClose);
    }
    //do nothing
    else{
        
    } 
}

function publishResult(){
    //if the btn is a next step - do it
    if($("#publishResults").hasClass("next")){
     //sendPercent and when it return from server -update the status
     //send 2 requests- if its duet

     if(vote1Id > 0){
      var perc1 = $("#vote1Perc").val();
       $.ajax({
        type: "POST",
        url: domain + "type=setVoteFinalPercent",
        data: { "voteId": vote1Id,"percent": perc1},
        success: function(data) {
            console.log("success getPage: " + data);
             setVotePercent(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error getPage: " + data);
        }
       });
     } 
     if(vote2Id > 0){
      var perc2 = $("#vote2Perc").val();
       $.ajax({
        type: "POST",
        url: domain + "type=setVoteFinalPercent",
        data: { "voteId": vote2Id,"percent": perc2},
        success: function(data) {
            console.log("success getPage: " + data);
             setVotePercent(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error getPage: " + data);
        }
       });
     } 
         
     
        updateVoteStatus(25,setPublishResult);
    }
    //do nothing
    else{
        
    } 
}

function setVotePercent(data){
    //check if the second request return
    //requestReturned
    if(doubleVotes){
        if(requestReturned == 0 ){
            requestReturned=1;
        }
        //if 2 requests returned - send the publish status
        else if(requestReturned == 1){
            requestReturned =2;
            updateVoteStatus(25,setPublishResult);
        }
    }
}

function updateVoteStatus(statusNum, funcCB){
    $.ajax({
        type: "POST",
        url: domain + "type=updatePageStatus",
        data: { "pageId": currentPageId, "newStatus": statusNum },
        success: function(data) {
            console.log("success updatePageStatus: " + data);
            //set the vote status
            if(data.status){
                voteStatus = data.status;
            }
            
            funcCB.call(undefined,data);
        },
        error: function(data) {
            console.log("error updatePageStatus. num: " + statusNum + " data: " + data);
        }
    });
}

function setOpenRegister(data){
    console.log(data.status);
    //update the date
    $("#openRegister .date").text("12/05/2013 10:05:03");
    
    //set the header status
    setHeaderStatus(data.status);
}

function setVoteOpen(data){
     console.log(data.status);
    //update the date
    $("#openVote .date").text("15/05/2014 10:05:03");
    
    //set the header status
    setHeaderStatus(data.status);
}

function setVoteClose(data){
    console.log(data.status);

    //update the date
    $("#closeVote .date").text("15/06/2013 11:15:13");
    
    //set the textbox percents
    var tempPerc =$("#vote1RealPerc").text().substring(0,$("#vote1RealPerc").text().length-1)
    var perc1 =Math.round(parseInt(tempPerc));
    tempPerc =$("#vote2RealPerc").text().substring(0,$("#vote2RealPerc").text().length-1)
    var perc2 =Math.round(parseInt(tempPerc));
    $("#vote1Perc").val(perc1);
    $("#vote2Perc").val(perc2);
    //set the header status
    setHeaderStatus(data.status);
}



function setPublishResult(data){
    console.log(data.status);

    //update the date
    $("#publishResults .date").text("11/04/2010 11:15:13");
    
    //set the header status
    setHeaderStatus(data.status);
}

function setHeaderStatus(status) {
    $(".statusItem").addClass("disable");
    $(".statusItem").removeClass("current");
    $(".statusItem").removeClass("next");
    $(".announcements input[type=text]").removeAttr("disabled");
    switch(status) {
        case 0:
            $("#waitStat").removeClass("disable");
            $("#waitStat").addClass("current");
            $("#openRegister").addClass("next");
            $("#openRegister").removeClass("disable");
            break;
        case 21:
            $("#openRegister").removeClass("disable");
            $("#openRegister").addClass("current");
            $("#openVote").removeClass("disable");
            $("#openVote").addClass("next");

            //set the text box wait disable
           // $("#wait-open").attr("disabled", "disabled");
            break;
        case 22:
            $("#openVote").removeClass("disable");
            $("#openVote").addClass("current");
            $("#closeVote").removeClass("disable");
            $("#closeVote").addClass("next");

            //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            //$("#wait-close").attr("disabled", "disabled");

            break;
        case 24:
            $("#closeVote").removeClass("disable");
            $("#closeVote").addClass("current");
            $("#publishResults").removeClass("disable");
            $("#publishResults").addClass("next");

            //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            $("#wait-close").attr("disabled", "disabled");
           // $("#wait-count").attr("disabled", "disabled");

            break;
        case 25:
            $("#publishResults").removeClass("disable");
            $("#publishResults").addClass("current");

             //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            $("#wait-close").attr("disabled", "disabled");
            $("#wait-count").attr("disabled", "disabled");
           // $("#wait-continue").attr("disabled", "disabled");
            break;
            case 100:
                $("#wait-open").attr("disabled", "disabled");
                $("#wait-close").attr("disabled", "disabled");
                $("#wait-count").attr("disabled", "disabled");
                $("#wait-continue").attr("disabled", "disabled");

    }
}
 


    /******** the checkbox functions *******/
    
function checkOpen() {
    document.getElementById("wait-open-check").disabled = false;
    document.getElementById("wait-open-check").checked = false;

    //clear the text
    $("#wait-open").val("");
}

function checkClose() {
    document.getElementById("wait-close-check").disabled = false;
    document.getElementById("wait-close-check").checked = false;
    //clear the text
    $("#wait-close").val("");
}
function checkCount() {
    document.getElementById("wait-count-check").disabled = false;
    document.getElementById("wait-count-check").checked = false;

     //clear the text
    $("#wait-count").val("");
}
function checkContinue() {
    document.getElementById("wait-continue-check").disabled = false;
    document.getElementById("wait-continue-check").checked = false;
}


function updateWaitingText(checkboxItem){
    var field ="";
    var value ="";
    switch (checkboxItem.attr("id")){
        case "wait-open-check":
            field ="textWaitRegister";
            value = $("#wait-open").val();
        break;
        case "wait-close-check":
            field ="textWaitVote";
            value = $("#wait-close").val();
        break;
        case "wait-count-check":
            field ="textWaitCalc";
            value = $("#wait-count").val();
        break;
        case "wait-continue-check":
            field ="textWaitContinue";
            value = $("#wait-continue").val();
        break;
    }
    sendUpdateText(field,value);
}

function sendUpdateText(field,value){
    //type=updatePageFiled&pageId=1&filed=text&value=aaa
    $.ajax({
        type: "POST",
        url: domain + "type=updatePageFiled",
        data: {"pageId":currentPageId, "filed": field,"value":value },
        success: function(data) {
            console.log("success updatePageFiled: " + data);
            // updatePageField(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error updatePageFiled: " + data);
        }
    });
}

function setWaitingPage(data){
    if(data.textWaitRegister !=""){
         $("#wait-open").val(data.textWaitRegister);
    }
      if(data.textWaitVote !=""){
         $("#wait-close").val(data.textWaitVote);
    }
      if(data.textWaitCalc !=""){
         $("#wait-count").val(data.textWaitCalc);
    }
      if(data.textWaitContinue !=""){
         $("#wait-continue").val(data.textWaitContinue);
    }
}

function setRealPercent(data){
    var perc1 =data.votes[0].finalPercent;
    var perc2=0;
    if (doubleVotes ==true){
        perc2 =data.votes[1].finalPercent;
    }
    

    setPerc(perc1,perc2);
}
function setPerc(perc1,perc2){
    $("#vote1RealPerc").text(perc1+"%");
    $("#vote2RealPerc").text(perc2+"%");
    //if is not a double vote- hide the second user
    if(doubleVotes != true){
        $("#voting-screens .container-left").hide();
    }
    else{
        $("#voting-screens .container-left").show();
    }
}

/********* publish page*****/

function publishPage(publishPage){
   
    var pageData = $(publishPage).parents("tr").data("pageData");
    //type=updatePageStatus&pageId=3&newStatus=11
    var id =pageData.id; 
    currentPageId = id;

    updateVoteStatus(11, setPublishPage);
}

function setPublishPage(data){
    console.log("successs setPublishPage")
}