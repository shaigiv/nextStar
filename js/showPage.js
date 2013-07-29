var currentShowId = "";
//add static page const text
SCREENCONTENT = "יצאנו לפרסומות";
SCREENINFO = "מייד נמשיך בשידור";
SCREENTITLE = "הערב בכוכב נולד";
SCREENNAME = "הזן שם מסך";
//templates dictionary - also for the application
//המתנה עם תמונה -1
//המתנה בלי תמונה -2
//סטטי עם תמונה -3
//סטטי בלי תמונה -4

var editStaticPage =false;
var editStaticPageData = "";
var editPageData="";
var editPageHtml="";
var editVotePage = false;
function showEvents(){
    //init the add static page text fields
    initAddStaticPageText();


    $("#voteAndWaitList").delegate(".delete", "click", function() {
        pageDelete(this);
    });

    $("#voteAndWaitList").delegate(".edit", "click", function() {
        editPageData = $(this).parents("tr").data("pageData");
        editVotePage = true;
        editPageHtml = $(this).parents("tr");
        $("#addVoteBtn").text("ערוך");
        pageEdit($(this).parents("tr"));
    });
    $("#voteAndWaitList").delegate(".copy", "click", function() {
        pageCopy($(this).parents("tr"));
    });

    $("#voteAndWaitList").delegate(".open-voting", "click", function() {
        getVoteData($(this));
        //openVotingPage(this);
    });
      $("#voteAndWaitList").delegate(".publish", "click", function() {
        publishPage(this);
    });


    $("#add-page-btn").click(function() {
        //if the user come from edit static page
        if(editStaticPage) {
            editPageStatic();
        }
        //else - if the user come from add static page
        else {
            addPageStatic();
        }

    });

    $("#firstCompAddVote").change(function(){
        setImgOnAddVote(this);
    });
     $("#secondCompAddVote").change(function(){
        setImgOnAddVote(this);
    });

    $("#addVoteBtn").click(function(){
      
        addVote();
        
    });

    $("#add-vote-cancel").click(function() {
        //hide the add-vote box
        //$("#add-vote-title").click();
        hideAddVoteBox();
    });
    $("#cancel-page-btn").click(function() {
        //hide the add-page box
        $("#add-page-title").click();
        hideAddPageBox();
    });
    $("#screen-title").focus(function() {
        if($(this).val() == SCREENTITLE) {
            $(this).val("");
        }
    });
    //$("#screen-title").blur(function() {
    //   if($(this).val() == "") {
    //        $(this).val(SCREENTITLE);
    //    }
    //});
    $("#screen-content").focus(function() {
        if($(this).val() == SCREENCONTENT) {
            $(this).val("");
        }
    });
    $("#screen-info").focus(function() {
        if($(this).val() == SCREENINFO) {
            $(this).val("");
        }
    });
     $("#screen-name").focus(function() {
        if($(this).val() == SCREENNAME) {
            $(this).val("");
        }
    });

   
    $("#voteAndWaitList").delegate(".nav-arrow.up", "click", function() {
        switchUp($(this));
    });

    $("#edit-prog-name").click(function(){
        showEditProgBox();
    });

    ///**datepicker**/
    // $("#datepicker-icon").click( 
    //    function(){
    //        $( "#datepicker" ).focus();
    //    });

    //$( "#datepicker-edit" ).datepicker( {
    //onSelect: function(date) {
    ////alert(date);
    //}

}
   
function openShow(show){
    // window.location.href = window.location.origin + "/index.html#prog-page10092013";
        //switchHash();
        var showId = show.parents("li").data("showId");
        currentShowId = showId;
        getShowData();
        setCompSelectList();

}

function getShowData(){
    $.ajax({
        type: "POST",
        url: domain + "type=getPages",
        data: { "showId": currentShowId },
        success: function(data) {
            console.log("success getPages: " + data);
             setGetShow(data);
            //showShowPage();
        },
        error: function(data) {
            console.log("error getPages: " + data);
        }
    });
}

function setGetShow(data){

    $(data).each(function() {
        var numOfComp = 0;
        var firstComp;
        var secondComp;
        var compsHtml = "";
        var songsHtml = "";
        //if the page deleted
        if(this.status != -1) {
            //if the page is vote
            if(this.type == "vote") {
              addVoteAndAppend(this); 
            }
            //else if the page is static
            else {
                addPageAndAppend(this); 
            }
        }


    });


    //show show page
    showShowPage();
}
var pageHtml;

function pageDelete(pageItem){
    var pageData =$(pageItem).parents("tr").data();
    var id =pageData.pageData.id;
    pageHtml = $(pageItem).parents("tr");


    $.ajax({
        type: "POST",
        url: domain + "type=deletePage",
        data: { "pageId": id },
        success: function(data) {
            console.log("success updatePageStatus-delete: " + data);
            if(data.result == "success."){
                setPageDelete(data);
            }
            

        },
        error: function(data) {
            console.log("error updatePageStatus-delete:: " + data);
        }
    });

}


function setPageDelete(data){
    pageHtml.fadeOut();
    pageHtml.remove();
    pageHtml = "";
}

function setStatusText(data,numOfComp){
    var text = '';
    var statusNum =data.status;
    switch (statusNum){
     
        case 0:
            text ="ממתין";
            break;
        case -1:
            text ="נמחק";
            break;
        case 11:
            text ="חי";
            break;
        case 21:
            text ="חי";
            break;
        case 22:
            text ="חי";
            break;
        case 23:
            text ="חי";
            break;
        case 24:
            text ="חי";
            break;
        case 25:
            text ="חי";
            break;
        case 100:
            var percents = data.votes[numOfComp-1].finalPercent;
            var Judges = data.votes[numOfComp-1].numOfJudges;
            text = percents + "%" + " (" + percents + ")";
            break;
    }
    
        return text;
}

//set the competitors list of select box
function setCompSelectList(){
    $(compArray).each(function(){
        var name = this.name;
        var id= this.id;
        var imgUrl =this.imageUrlA;
        $("#secondCompAddVote").append('<option value="'+id+'">'+name+'</option>');
        $("#firstCompAddVote").append('<option value="'+id+'">'+name+'</option>');
        //save the data for images
        $("#secondCompAddVote").children("option:last").data("compData", this);
        $("#firstCompAddVote").children("option:last").data("compData", this);
    });
}
//set the image on add vote when the select changed
function setImgOnAddVote(selectItem){
    var selectedItem = $(selectItem).children("option:selected");
    //if is a null comp -do nothing
    if($(selectedItem).val() == "0"){
         $(selectItem).parent(".contestant-details").children(".contestant-img").attr("src","");
    }
    else{
         var selectedItemData = selectedItem.data("compData");
        $(selectItem).parent(".contestant-details").children(".contestant-img").attr("src",selectedItemData.imageUrlA);
    }
   
}

function addVote(){
    var selectedItemFirst = $("#firstCompAddVote").children("option:selected");
    var selectedItemSecond = $("#secondCompAddVote").children("option:selected");
    var threshold =$("#threshold-add-vote").val();
    var numOfComp =0;
    var firstSongName ="";
    var secondSongName="";
    var firstId=0;
    var secondId=0;
    //if comp not chosen
    if($(selectedItemFirst).val() == "0" && $(selectedItemSecond).val() == "0"){
        alert("עליך לבחור לפחות מועמד אחד");
     }
     else{
         //if chosen one comp
         if($(selectedItemFirst).val() != "0"){
             numOfComp =1;
             firstSongName = $("#first-songs-name").val();
             firstId =selectedItemFirst.data("compData").id;
         }
        if($(selectedItemSecond).val() != "0"){
             numOfComp =2;
             secondSongName = $("#second-songs-name").val();
             secondId =selectedItemSecond.data("compData").id;
         }

        //check that insert name and song
         if(firstSongName == "" || firstId == undefined){
             alert("עליך להכניס משתמש ושם שיר");
         }
         else if(numOfComp ==2 && (secondSongName == "" || secondId == undefined)){
             alert("עליך להכניס משתמש ושם שיר");
         }
         else if(firstId == secondId){
             alert("עליך להכניס מתמודדים שונים");
         }
         else{
             //if this edit vote- editVote()
             if(editVotePage == true){
                 editVote(firstId,firstSongName,threshold,secondId,secondSongName);
             }
             //if is a new vote additional
             else{
               $.ajax({
                type: "POST",
                url: domain + "type=addVotePage",
                data: { "showId": currentShowId,"competitor_id1": firstId,"songName1":firstSongName,"competitor_id2":secondId,
                         "songName2":secondSongName,"threshold":threshold,
                         "textWaitRegister":"","textWaitVote":"","textWaitCalc":"","textWaitContinue":""},
                success: function(data) {
                    console.log("success addVotePage" + data);
                        setAddVote(data);
                },
                error: function(data) {
                    console.log("error addVotePage " + data);
                }
            });
             }
            
            
             
         }

     }
   
}

function editVote(firstId,firstSongName,threshold,secondId,secondSongName){

     var voteId1 =editPageData.votes[0].id;
        var pid =editPageData.id;
        if(numOfComp ==1){
            //type=updateVotePage&pid=1&vote_id1=1&competitor_id1=1&SongName1=ים%20של%20דמעות&vote_id2=1&competitor_id2=2&SongName2=המגפים&threshold=2
            $.ajax({
            type: "POST",
            url: domain + "type=updateVotePage",
            data: { "pid": pid,"vote_id1":voteId1,"competitor_id1": firstId,"songName1":firstSongName,
                        "threshold":threshold,
                        "textWaitRegister":"","textWaitVote":"","textWaitCalc":"","textWaitContinue":""},
            success: function(data) {
                console.log("success addVotePage" + data);
                    setEditVote(data);
            },
            error: function(data) {
                console.log("error addVotePage " + data);
            }
    });
        }
        else if(numOfComp ==2){
            var voteId2 =editPageData.votes[1].id;
            var pid =editPageData.id;
            //type=updateVotePage&pid=1&vote_id1=1&competitor_id1=1&SongName1=ים%20של%20דמעות&vote_id2=1&competitor_id2=2&SongName2=המגפים&threshold=2
            $.ajax({
            type: "POST",
            url: domain + "type=updateVotePage",
            data: { "pid": pid,"vote_id1":voteId1,"competitor_id1": firstId,"songName1":firstSongName,
                        "threshold":threshold,"vote_id2":voteId2,"competitor_id2": secondId,"songName2":secondSongName
                },
            success: function(data) {
                console.log("success addVotePage" + data);
                    setEditVote(data);
            },
            error: function(data) {
                console.log("error addVotePage " + data);
            }
    });
             }
}


function setAddVote(data){
    
    addVoteAndAppend(data);
    //clear the add-vote's fields
     clearAddVoteBox();
}

function setEditVote(data){
    $(editPageHtml);
     if(data.votes.length == 1) {
            numOfComp = 1;
        }
        else if(data.votes.length == 2) {
            numOfComp = 2;
        }

        if(numOfComp == 1) {
            songsHtml = data.votes[0].songName;
            compsHtml = getCompNameByID(data.votes[0].cid)

        }
        else if(numOfComp == 2) {
                    
            songsHtml = data.votes[0].songName + "</br>" + data.votes[1].songName;
            compsHtml = getCompNameByID(data.votes[0].cid) + "</br>" + getCompNameByID(data.votes[1].cid);
        }
        $($(editPageHtml).children("td")[2]).html(songsHtml);
        $($(editPageHtml).children("td")[1]).html(compsHtml);
        $(editPageHtml).data("pageData", data);
        hideAddVoteBox();
    clearAddVoteBox();
    
}

function clearAddVoteBox(){
        //img
        $("#add-vote .contestant-details img").attr("src"," ");
        //select
        $("#add-vote #firstCompAddVote option").removeAttr('selected');
        $("#add-vote #firstCompAddVote option:first").attr('selected', 'selected');
        $("#add-vote #secondCompAddVote option").removeAttr('selected');
        $("#add-vote #secondCompAddVote option:first").attr('selected', 'selected');
        //songs name
        $("#first-songs-name").val("");
        $("#second-songs-name").val("");
        editVotePage = false;
        editPageData = "";
        editPageHtml = "";
        $("#addVoteBtn").text("הוסף")
}

function addVoteAndAppend(voteItem){
        //check if the vote is double
        if(voteItem.votes.length == 1) {
            numOfComp = 1;
        }
        else if(voteItem.votes.length == 2) {
            numOfComp = 2;
        }

        if(numOfComp == 1) {
            songsHtml = voteItem.votes[0].songName;
            compsHtml = getCompNameByID(voteItem.votes[0].cid)

        }
        else if(numOfComp == 2) {
                    
            songsHtml = voteItem.votes[0].songName + "</br>" + voteItem.votes[1].songName;
            compsHtml = getCompNameByID(voteItem.votes[0].cid) + "</br>" + getCompNameByID(voteItem.votes[1].cid);
        }

        var status = setStatusText(voteItem, numOfComp);
        var number =$("#voteAndWaitList tr").length;
        $("#voteAndWaitList").append('<tr>' +
					'<td>' +
						'<img src="./img/Up Arrow.png" alt="arrow" class="nav-arrow up">'+
					'<img src="./img/Down Arrow.png" alt="arrow" class="nav-arrow down">'+
						'<span class="namber">'+number+'</span>' +
					'</td>' +
					'<td>'+ compsHtml+'</td>' +
					'<td>'+songsHtml+'</td>' +
					'<td>' + status + '</td>' +
					'<td class="row-options"><span class="edit">ערוך</span> <span class="delete">מחק</span> <span class="copy">שכפל</span></td>' +
					'<td>פריוויו</td>' +
					'<td class="open-voting">פתח</td>' +
				'</tr>');
        $("#voteAndWaitList").children().children("tr:last").data("pageData", voteItem);
}


function pageEdit(pageItem){
    var pageItemData = $(pageItem).data("pageData");
    if(pageItemData.type=="vote"){
        //open the addBox
        openAddVoteBox();
        setEditAddVote(pageItemData);
    }
    else if(pageItemData.type=="page"){
        //open the addBox
        openAddPageBox();
        setEditAddPage(pageItemData);
    }
}
function  setEditAddVote(pageItemData){
    var firstId = pageItemData.votes[0].cid;
    var secondId = pageItemData.votes[1].cid;
    //set images
    $("#add-vote #firstImg").attr("src", getCompImgByID(firstId));
    $("#add-vote #secondImg").attr("src", getCompImgByID(secondId));
    
    //set selected competitor
    $("#add-vote #firstCompAddVote option").removeAttr('selected');
    $("#add-vote #secondCompAddVote option").removeAttr('selected');
    $('#firstCompAddVote option[value="' + firstId + '"]').attr("selected", "selected");
    $('#secondCompAddVote option[value="' + secondId + '"]').attr("selected", "selected");
    
    //set the songs name
    var firstSong = pageItemData.votes[0].songName;
    var secondSong = pageItemData.votes[1].songName;
    $("#first-songs-name").val(firstSong);
    $("#second-songs-name").val(secondSong);

    //set the threshold
     var threshold = pageItemData.votes[0].threshold;
     $("#threshold-add-vote").val(threshold);
}

function openAddVoteBox()
{
    showAddVoteBox();
}
function openAddPageBox()
{
    showAddPageBox();
}
/****************static page*************/

function initAddStaticPageText(){

     $("#screen-title").val(SCREENTITLE);
     $("#screen-content").val(SCREENCONTENT);
     $("#screen-info").val(SCREENINFO);
     $("#screen-name").val(SCREENNAME);
     //change the add btn to edit
     $("#add-page-btn").text("הוסף");
    
     //templates select
     $("#template-select option").each(function(index) {
         $(this).attr("value", index*1+1);
     });
     $("#template-select option").removeAttr('selected');
     $("#template-select option:first").attr('selected', 'selected');

     //init the images
     $(".add-page-img-wrap .smallImg").data("url", "");
     $(".add-page-img-wrap .largeImg").data("url", "");
     $("#add-page-imgFile").attr("src", "");
}

function addPageStatic(){
    var templateId =  $("#template-select option:selected").attr("value");
    var title = $("#screen-title").val();
    var content = $("#screen-content").val();
    var info = $("#screen-info").val();
    var name = $("#screen-name").val();
    var tamplateImage1 =$(".add-page-img-wrap .smallImg").data("url");
    var tamplateImage2 =$(".add-page-img-wrap .largeImg").data("url");


    $.ajax({
        type: "POST",
        url: domain + "type=addStaticPage",
        data: { "showId": currentShowId,"page-type": "page","name":name,"title":title,
                    "text":content,"templateId":templateId,
                    "info":info,"tamplateImage1":tamplateImage1,"tamplateImage2":tamplateImage2},
        success: function(data) {
            console.log("success addPageStatic" + data);
                setAddPage(data);
        },
        error: function(data) {
            console.log("error addPageStatic " + data);
        }
    });

}

function editPageStatic(){
//type=updateStaticPage&pid=15&name=hifff&title=titlefff&text=blafff&templateId=2&info=blablafff
    //editPageHtml
    //editPageData

    var pid =editPageData.id;
    var name =$("#screen-name").val();
    var title =$("#screen-title").val();
    var content =$("#screen-content").val();
     var info =$("#screen-info").val();
    var templateID =$("#template-select option:selected").attr("value");
    var tamplateImage1 = $(".add-page-img-wrap .smallImg").data("url");
    var tamplateImage2 = $(".add-page-img-wrap .largeImg").data("url");;
    $.ajax({
            type: "POST",
            url: domain + "type=updateStaticPage",
            data: { "pid": pid,"name":name ,"title":title,"text":content,
                        "templateId":templateID,"info":info,
                        "tamplateImage1":tamplateImage1,"tamplateImage2":tamplateImage2},
            success: function(data) {
                console.log("success updateStaticPage" + data);
                    setEditPage(data);
            },
            error: function(data) {
                console.log("error updateStaticPage " + data);
            }
     });

}

function setEditPage(data){
    
}

function addPageAndAppend(pageItem){
     var number = $("#voteAndWaitList tr").length;
     var name =pageItem.name;
     initAddStaticPageText();
     //close the add page box 
    
        $("#voteAndWaitList").append('<tr class="bottom">'+
				'<td> '+
					'<img src="./img/Up Arrow.png" alt="arrow" class="nav-arrow up">'+
					'<img src="./img/Down Arrow.png" alt="arrow" class="nav-arrow down">'+
					'<span class="namber">'+number+'</span>'+
				'</td>'+
				'<td colspan="2">'+name+'</td>'+
				'<td>ממתין</td>'+
				'<td class="row-options"><span class=\"edit\">ערוך</span> <span class=\"delete\">מחק</span> <span class=\"copy\">שכפל</span></td>'+
				'<td>פריוויו</td>'+
				'<td class="publish">פרסם</td>'+
			'</tr>');
        $("#voteAndWaitList").children().children("tr:last").data("pageData", pageItem);
        addAttention($("#voteAndWaitList").children().children("tr:last"));
        
}

function setAddPage(data){
     $("#add-page-title").click();
    addPageAndAppend(data);
}

function  setEditAddPage(pageItemData){
    //set the template select
    //$("#template-select option").reoveAttr("selected");
    //$("# value=["+templateId+);
    editStaticPageData = pageItemData;
    ///set the title
    $("#screen-title").val(pageItemData.title);
    ///set the content
    $("#screen-content").val(pageItemData.text);
    //set the name
    $("#screen-name").val(pageItemData.name);
    //set the info
    $("#screen-info").val(pageItemData.info);
    //set the images
    $(".add-page-img-wrap .smallImg").data("url", pageItemData.tamplateImage1);
    $(".add-page-img-wrap .largeImg").data("url", pageItemData.tamplateImage2);
    $("#add-page-imgFile").attr("src", pageItemData.tamplateImage1);
    //change the add btn to edit
    $("#add-page-btn").text("ערוך");
    editStaticPage = true;
}

function pageCopy(pageItem){
    var pageData = $(pageItem).data("pageData")
    if(pageData.type=="vote"){
        addCopyVote(pageData);
    }
    else if(pageData.type=="page"){
        addCopyPage(pageData);
    }
}

function addCopyVote(pageData){
    firstId = pageData.votes[0].cid;
    firstSongName=pageData.votes[0].songName;
    secondId=pageData.votes[1].cid;
    secondSongName =pageData.votes[1].songName;
    threshold = pageData.votes[0].threshold;
    $.ajax({
            type: "POST",
            url: domain + "type=addVotePage",
            data: { "showId": currentShowId,"competitor_id1": firstId,"songName1":firstSongName,"competitor_id2":secondId,
                        "songName2":secondSongName,"threshold":threshold,
                        "textWaitRegister":"","textWaitVote":"","textWaitCalc":"","textWaitContinue":""},
            success: function(data) {
                console.log("success addVotePage" + data);
                    setAddVote(data);
            },
            error: function(data) {
                console.log("error addVotePage " + data);
            }
     });
}

function addCopyPage(pageData){
   var templateId =  pageData.templateId;
    var title =pageData.title;
    var content = pageData.text;
    var info = pageData.info;
    var name = pageData.name;


    $.ajax({
        type: "POST",
        url: domain + "type=addStaticPage",
        data: { "showId": currentShowId,"page-type": "page","name":name,"title":title,
                    "text":content,"templateId":templateId,
                    "info":info},
        success: function(data) {
            console.log("success addPageStatic" + data);
                setAddPage(data);
        },
        error: function(data) {
            console.log("error addPageStatic " + data);
        }
    });
}

//switch order
var switchOrderFirstItem;
var switchOrderSecondItem;
var switchOrderFirstItemData;
var switchOrderSecondItemData;
function switchUp(pageItem){
    var pageData1 =$(pageItem).parents("tr").data("pageData");
    id1 = pageData1.id;
    switchOrderFirstItem = $(pageItem).parents("tr");
    switchOrderFirstItemData = pageData1;
    var pageData2 =$(pageItem).parents("tr").prev().data("pageData");
     id2 = pageData2.id;
     switchOrderSecondItem = $(pageItem).parents("tr").prev();
     switchOrderSecondItemData = pageData2;
     //type=swapPageOrder&pageId1=1&pageId2=4
     $.ajax({
        type: "POST",
        url: domain + "type=swapPageOrder",
        data: { "pageId1": id1,"pageId2":id2 },
        success: function(data) {
            console.log("success swapPageOrder: " + data);
             setSwitchPage(data);
        },
        error: function(data) {
            console.log("error swapPageOrder: " + data);
        }
    });
}

function setSwitchPage(){
    $(switchOrderSecondItem).after($(switchOrderFirstItem).clone());
    $(switchOrderFirstItem).after($(switchOrderSecondItem)).remove();

    //switch the line's number
    var firstNum = $($(switchOrderFirstItem).children("td")[0]).children(".namber").text();
    var secondNum  =$($(switchOrderSecondItem).children("td")[0]).children(".namber").text();
    var newFirstItem = $(switchOrderSecondItem).prev();
    $($(newFirstItem).children("td")[0]).children(".namber").text(secondNum);
    $($(switchOrderSecondItem).children("td")[0]).children(".namber").text(firstNum);
    // $($(switchOrderFirstItem).children("td")[0]).children(".namber").text(secondNum);
    //$($(switchOrderSecondItem).children("td")[0]).children(".namber").text(firstNum);

    //append the data
    $(newFirstItem).data("pageData",switchOrderFirstItemData);
    $(switchOrderSecondItem).data("pageData",switchOrderSecondItemData);


}

function showEditProgBox(){
   if( $("#edit-prog-date-name .prog_title").is(":visible")){
       $("#edit-prog-date-name .prog_title").hide();

    $("#edit-prog-date-name .editProgName").show();
    $("#edit-prog-date-name .prog-name-edit-date").addClass("show");
    $("#edit-prog-date-name .buttons").show();
    //set the prog name in the textbox
    var name =$(".prog_title").text();
    $(".editProgName").val(name);
       
   }
   else{
       $("#edit-prog-date-name .prog_title").show();

    $("#edit-prog-date-name .editProgName").hide();
    $("#edit-prog-date-name .prog-name-edit-date").removeClass("show");
    $("#edit-prog-date-name .buttons").hide();
       
   }
    
}