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
        //if the user check 
        if($(this).is(':checked')){
             updateWaitingText($(this));
        }
       
    });

    $("#register-going-to-close").click(function(){
        registerGoingToClose($(this));
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
    //set the comps' images and names
    setCompImagesAndNamesVote(data);
    //set the dates
    setVoteStatusesDate(data);
    setRealPercent(data);
    setTextboxPercent(data);
    //show the page
    navigate("vote")
    
    
    //init the num of user
    $("#num-of-users").text(data.RegisterCounter);
    $("#vote1RealPerc").text(data.votes[0].finalPercent+"%");
    $("#vote2RealPerc").text(data.votes[1].finalPercent+"%");

   //get the registers' numbers by real timenum-of-users
    if(data.status == 21 || data.status == 22){
         getRegistersNumByRealTime();
    }
   

   //set the real time percent - if this is a vote time
   if(data.status == 23){
    getPercentByRealTime(data);   
   }

    
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
        updateVoteStatus(23,setVoteOpen);
    }
    //do nothing
    else{
        
    }
}

function closeVote(){
    //if the btn is a next step - do it
    if($("#closeVote").hasClass("next")){
       updateVoteStatus(25,setVoteClose);
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
     //clear the timeout of register and percent
        clearTimeoutRegisterAndVote();
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
         
     
        updateVoteStatus(26,setPublishResult);
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
            updateVoteStatus(26,setPublishResult);
        }
    }
}

function updateVoteStatus(statusNum, funcCB){
    $.ajax({
        type: "POST",
        url: domain + "type=updatePageStatus",
        data: { "pageId": currentPageId, "newStatus": statusNum },
        success: function (data) {
            console.log("success updatePageStatus: " + data);
            //set the vote status
            if (data.status) {
                voteStatus = data.status;
                funcCB.call(undefined, data);
            }
            //if there is another open vote
            else if (data.error.indexOf('other vote Page is in middle') > -1) {
                alert("הצבעה אחרת פתוחה! פרסם את תוצאותיה בטרם תוכל לפתוח הצבעה או דף אחרים");
            }


        },
        error: function (data) {
            console.log("error updatePageStatus. num: " + statusNum + " data: " + data);
        }
    });
}

function setOpenRegister(data){
    console.log(data.status);
    
    //set the header status
    setHeaderStatus(data.status);
    //set date
    setVoteStatusesDate(data);
    //get the registers' numbers by real time
    getRegistersNumByRealTime();

}

function setVoteOpen(data){
     console.log(data.status);
    
    //set the header status
    setHeaderStatus(data.status);
    //set date
    setVoteStatusesDate(data);
    //get percent by real time
    getPercentByRealTime(data);

}

function setVoteClose(data){
    console.log(data.status);

    //set the textbox percents
     $("#vote1RealPerc").show();
     //set the textbox percent
    var tempPerc =$("#vote1RealPerc").text().substring(0,$("#vote1RealPerc").text().length-1)
    var perc1 =Math.round(parseInt(tempPerc));
    $("#vote1Perc").val(perc1);

   if(data.votes.length ==2){
          //$("#vote2RealPerc").text(data.votes[1].finalPercent +"%")
     $("#vote2RealPerc").show();
     //set the textbox percent
     tempPerc =$("#vote2RealPerc").text().substring(0,$("#vote2RealPerc").text().length-1)
     perc2 =Math.round(parseInt(tempPerc));
    $("#vote2Perc").val(perc2);

   }
     //set the header status
    setHeaderStatus(data.status);
    //set date
    setVoteStatusesDate(data)


    //clearTimeoutRegisterAndVote();
   

}



function setPublishResult(data){
    console.log(data.status);

    //set the header status
    setHeaderStatus(data.status);
    //set date
    setVoteStatusesDate(data);
    clearTimeoutRegisterAndVote();
}

function setHeaderStatus(status) {
    $(".statusItem").addClass("disable");
    $(".statusItem").removeClass("current");
    $(".statusItem").removeClass("next");
    $("#announcements input[type=text]").removeAttr("disabled");
    switch(status) {
        case 0:
            $("#waitStat").removeClass("disable");
            $("#waitStat").addClass("current");
            $("#openRegister").addClass("next");
            $("#openRegister").removeClass("disable");
             //register going to close disable
            $("#register-going-to-close").addClass("disable");
            break;
        case 21:
            $("#openRegister").removeClass("disable");
            $("#openRegister").addClass("current");
            $("#openVote").removeClass("disable");
            $("#openVote").addClass("next");
            //register going to close able
            $("#register-going-to-close").removeClass("disable");
            //set the text box wait disable
            // $("#wait-open").attr("disabled", "disabled");
            break;
        case 22:
            $("#openRegister").removeClass("disable");
            $("#openRegister").addClass("current");
            $("#openVote").removeClass("disable");
            $("#openVote").addClass("next");
            //register going to close able
            $("#register-going-to-close").removeClass("disable");
            $("#register-going-to-close").add("active");
            //set the text box wait disable
            // $("#wait-open").attr("disabled", "disabled");
            break;
        case 23:
            $("#openVote").removeClass("disable");
            $("#openVote").addClass("current");
            $("#closeVote").removeClass("disable");
            $("#closeVote").addClass("next");

            //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            
            //register going to close disable
            $("#register-going-to-close").addClass("disable");
            $("#register-going-to-close").removeClass("active");
            break;
        case 25:
            $("#closeVote").removeClass("disable");
            $("#closeVote").addClass("current");
            $("#publishResults").removeClass("disable");
            $("#publishResults").addClass("next");

            //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            $("#wait-close").attr("disabled", "disabled");
           
            //register going to close disable
            $("#register-going-to-close").addClass("disable");
            break;
        case 26:
            $("#publishResults").removeClass("disable");
            $("#publishResults").addClass("current");

             //set the text box wait disable
            $("#wait-open").attr("disabled", "disabled");
            $("#wait-close").attr("disabled", "disabled");
            $("#wait-count").attr("disabled", "disabled");
          
            //register going to close disable
            $("#register-going-to-close").addClass("disable");
            break;
            case 100:
                $("#wait-open").attr("disabled", "disabled");
                $("#wait-close").attr("disabled", "disabled");
                $("#wait-count").attr("disabled", "disabled");
                $("#wait-continue").attr("disabled", "disabled");
            //register going to close disable
            $("#register-going-to-close").addClass("disable");
    }
}
 


    /******** the checkbox functions *******/
    
function checkOpen() {
    document.getElementById("wait-open-check").disabled = false;
    document.getElementById("wait-open-check").checked = false;

    //clear the text
    //$("#wait-open").val("");
}

function checkClose() {
    document.getElementById("wait-close-check").disabled = false;
    document.getElementById("wait-close-check").checked = false;
    //clear the text
    //$("#wait-close").val("");
}
function checkCount() {
    document.getElementById("wait-count-check").disabled = false;
    document.getElementById("wait-count-check").checked = false;

     //clear the text
    //$("#wait-count").val("");
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
    $.ajax({
        type: "POST",
        url: domain + "type=updatePageFiled",
        data: {"pageId":currentPageId, "filed": field,"value":value },
        success: function(data) {
            console.log("success updatePageFiled: " + data);
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

function setCompImagesAndNamesVote(data){

     $("#vote-first-img").attr("src",getCompImgByID(data.votes[0].cid));
     $("#vote1CompName").text(getCompNameByID(data.votes[0].cid));
     $("#vote1FinalPercName label").text(getCompNameByID(data.votes[0].cid));
     $("#vote1FinalPercName input").val(data.votes[0].finalPercent);
    if(data.votes.length ==2){
        
        $("#vote-second-img").attr("src",getCompImgByID(data.votes[1].cid));
        $("#vote2CompName").text(getCompNameByID(data.votes[1].cid));
        $("#vote2FinalPercName label").text(getCompNameByID(data.votes[1].cid));
        $("#vote2FinalPercName input").val(data.votes[1].finalPercent);

         $("#voting-screens .container-left").show();
         $("#vote2FinalPercName").show();
    }
    //if this is a single vote- hide the second comp
    else{
         $("#voting-screens .container-left").hide();
         $("#vote2FinalPercName").hide();
    }
   
}
function getDateByLong(longTemp){
     tempDate =new Date(longTemp);
     tempDate = tempDate.getDate() + "/" + (tempDate.getMonth() * 1 + 1 * 1) + "/" + tempDate.getFullYear() + " " + tempDate.getHours() + ":" + tempDate.getMinutes() + ":" + tempDate.getSeconds();
     return tempDate;
}

function setVoteStatusesDate(data){
  
    var tempDate;
    //hide all dates - and show if its exist
    $(".date").hide();

    $(data.statusTime).each(function() {
        var tempLong;
        switch(this.status) {

            //register 
            case 21:
                tempLong = this.time;
                var date = getDateByLong(tempLong);
                $("#open-register-date").text(date);
                $("#open-register-date").show();
                break;
            //vote 
            case 23:
                tempLong = this.time;
                var date = getDateByLong(tempLong);
                $("#open-vote-date").text(date);
                $("#open-vote-date").show();
                break;
                //vote close
            case 25:
                tempLong = this.time;
                var date = getDateByLong(tempLong);
                $("#close-vote-date").text(date);
                $("#close-vote-date").show();
                break;
                //publish result
            case 26:
                tempLong = this.time;
                var date = getDateByLong(tempLong);
                $("#publish-results-date").text(date);
                $("#publish-results-date").show();
                break;



        }
    });

    //if(data.statusTime[0]){
    //    var tempLong =data.statusTime[0].time;
    //    tempDate =new Date(tempLong);
    //    tempDate = tempDate.getDate()+"/"+(tempDate.getMonth()*1 +1*1)+"/"+tempDate.getFullYear()+" "+tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds()
    //    $("#open-register-date").text(tempDate);
    //    $("#open-register-date").show();
   //
    //}
    //if(data.statusTime[1]){
    //    tempLong =data.statusTime[1].time;
    //    tempDate =new Date(tempLong);
    //    tempDate = tempDate.getDate()+"/"+(tempDate.getMonth()*1 +1*1)+"/"+tempDate.getFullYear()+" "+tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds()
    //    $("#open-vote-date").text(tempDate);
    //    $("#open-vote-date").show();
 
 //   //}

    //if(data.statusTime[2]){
    //        tempLong =data.statusTime[2].time;
    //tempDate =new Date(tempLong);
    //tempDate = tempDate.getDate()+"/"+(tempDate.getMonth()*1 +1*1)+"/"+tempDate.getFullYear()+" "+tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds()
    //$("#close-vote-date").text(tempDate);
    //$("#close-vote-date").show();
 
 //   //}
    //if(data.statusTime[3]){
    //    tempLong =data.statusTime[3].time;
    //    tempDate =new Date(tempLong);
    //    tempDate = tempDate.getDate()+"/"+(tempDate.getMonth()*1 +1*1)+"/"+tempDate.getFullYear()+" "+tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds()
    //    $("#publish-results-date").text(tempDate);
    //     $("#publish-results-date").show();
 
 //   //}
    //if(data.statusTime[4]){
    //    tempLong =data.statusTime[4].time;
    //    tempDate =new Date(tempLong);
    //    tempDate = tempDate.getDay()+"/"+tempDate.getMonth()+"/"+tempDate.getFullYear()+" "+tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds()
    //    $("#publish-results-date").text(tempDate); 
    //    $("#publish-results-date").show();
 
 //   //}
    //
}

function setRealPercent(data){ 
    var perc1="";
    var perc2="";
    //if the vote was published or vote in publish results - show the real percent
    if(data.status ==100 || data.status == 25 || data.status == 26)
    {
         perc1 =data.votes[0].finalPercent;
         perc2=0;
          //if is not a double vote- hide the second user
        if(doubleVotes != true){
            //$("#voting-screens .container-left").hide();
            $("#vote2FinalPercName").hide();
            $("#vote1RealPerc").show();
        }
        else{
             perc2 =data.votes[1].finalPercent;
            $("#voting-screens .container-left").show();
            $("#vote2FinalPercName").show();
            $("#vote1RealPerc").show();
            $("#vote2RealPerc").show();

        }
         $("#vote1RealPerc").text(perc1+"%");
         $("#vote2RealPerc").text(perc2+"%");
    }
    //else -hide the real percent
    else
    {
        $("#vote1RealPerc").hide();
        $("#vote2RealPerc").hide();
    }
   
    
   
}

function setTextboxPercent(data){
    var perc1 = data.votes[0].finalPercent;
    $("#vote1Perc").val(perc1);
    if(data.votes.length == 2){
        var perc2 = data.votes[1].finalPercent; 
        $("#vote2Perc").val(perc2);
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
    console.log("successs setPublishPage");
    //refresh the status from db - get al list
    getShowData();
}

function registerGoingToClose(btn){
    //if registergoing to close is disable-
    //alert
    if(btn.hasClass("disable")){
        alert("לא ניתן לציין שהרשמה עומדת להסתיים כאשר הסטאטוס הפעיל  אינו 'הרשמה'");
    }
    //else - update the server
    else{
        updateVoteStatus(22,setRegisterGoingToClose);
    }

}

function setRegisterGoingToClose(data){

    $("#register-going-to-close").addClass("active");
}


/******************************GET THE REGISTERS' NUMBERS IN REAL TIME**************************************/
var registerNumTimeout;
function getRegistersNumByRealTime(){
    registerNumTimeout = setTimeout(function(){
        getRegistersNum();
    },1000);
}

function getRegistersNum(){
    //getRegisterCounter
     $.ajax({
        type: "POST",
        url: domain + "type=getRegisterCounter",
        success: function(data) {
            console.log("success getRegisterCounter: " + data);
             setRegistersNumByRealTime(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error getRegisterCounter: " + data);
        }
    });
      registerNumTimeout = setTimeout(function(){
        getRegistersNum();
    },1000);
}


function setRegistersNumByRealTime(data){
  //  console.log(data);
    $("#num-of-users").text(data.RegisterCounter);
  
}


/*********************GET PERCENTS IN REAL TIME*************************************/

var graphJsonURLA="";
var graphJsonURLB="";
var firstPercentTimeout;
var secondPercentTimeout;
function getPercentByRealTime(data){
    //vote1RealPerc,vote2RealPerc
     $("#vote1RealPerc").text("0%");
    var urlSecond = "";
    
    if(data.votes.length ==1){
        $("#vote1RealPerc").show();
        $("#vote2RealPerc").hide();
        graphJsonURLA =data.votes[0].graphJsonURL;
        getFirstPercentRealTime();
    }
    else{
        $("#vote1RealPerc").show();
        $("#vote2RealPerc").show();
        graphJsonURLA =data.votes[0].graphJsonURL;
        graphJsonURLB =data.votes[1].graphJsonURL;

        getFirstPercentRealTime();
        getSecondPercentRealTime();
    }
}

function getFirstPercentRealTime(){
      var url = domainForJson +graphJsonURLA;
         $.ajax({
            type: "POST",
            url: url,
            success: function(data) {
                console.log("success setFirstPercentRealTime:");
                 setFirstPercentRealTime(data);
            },
            error: function(data) {
                console.log("error setFirstPercentRealTime: " + data);
            }
        });

        //get the percent every 5 seconds
    firstPercentTimeout =setTimeout(function(){
        getFirstPercentRealTime();
    },5000);
}

function setFirstPercentRealTime(data){
    console.log("setFirstPercentRealTime");
    var dataArray = JSON.parse(data);
    var relevantData = dataArray[dataArray.length - 1];
    var perc;
    //if num of users that register = 0
    if(relevantData.voteRegister == 0){
        perc = 0;
    }
    else{
        perc = relevantData.voteTrue / relevantData.voteRegister*100;
    }

    $("#vote1RealPerc").text(perc.toFixed(2) + "%");

   

    
    
}

function getSecondPercentRealTime(){
      var url = domainForJson +graphJsonURLB;
         $.ajax({
            type: "POST",
            url: url,
            success: function(data) {
                console.log("success getSecondPercentRealTime: ");
                 setSecondPercentRealTime(data);
            },
            error: function(data) {
                console.log("error getSecondPercentRealTime: " + data);
            }
        });
        secondPercentTimeout =setTimeout(function(){
            getSecondPercentRealTime();
        },5000);
}

function setSecondPercentRealTime(data){
    console.log("setSecondPercentRealTime");
    var dataArray = JSON.parse(data);
    var relevantData = dataArray[dataArray.length - 1];
    var perc;
    //if num of users that register = 0
    if(relevantData.voteRegister == 0){
        perc = 0;
    }
    else{
        perc = relevantData.voteTrue / relevantData.voteRegister *100;
    }

     $("#vote2RealPerc").text(perc.toFixed(2) + "%");
    
    
    // tempPerc =$("#vote2RealPerc").text().substring(0,$("#vote2RealPerc").text().length-1)
    // var perc2 =Math.round(parseInt(tempPerc));
    //$("#vote2Perc").val(perc2);
    //get the percent every 5 seconds
   
    
}


function clearTimeoutRegisterAndVote(){
    //clear the timeout after 1.5 minute
    //the server get time to end process
    setTimeout(function(){
        //clear the real register number
        clearTimeout(registerNumTimeout);
    
        //clear the real percent timeout
        clearTimeout(firstPercentTimeout);
        clearTimeout(secondPercentTimeout);

        console.log("timeout clear");
    },90000);
   
}