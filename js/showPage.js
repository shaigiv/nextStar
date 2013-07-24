var currentShowId = "";
function showEvents(){

    $("#voteAndWaitList").delegate(".delete", "click", function() {
        pageDelete(this);
    });

    $("#voteAndWaitList").delegate(".open-voting", "click", function() {
        getVoteData($(this));
        openVotingPage(this);
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
                //check if the vote is double
                if(this.votes.length == 1) {
                    numOfComp = 1;
                }
                else if(this.votes.length == 2) {
                    numOfComp = 2;
                }

                if(numOfComp == 1) {
                  songsHtml = this.votes[0].songName;
                    compsHtml = getCompNameByID(this.votes[0].cid)

                }
                else if(numOfComp == 2) {
                    
                      songsHtml = this.votes[0].songName + "</br>" + this.votes[1].songName;
                    compsHtml = getCompNameByID(this.votes[0].cid) + "</br>" + getCompNameByID(this.votes[1].cid);
                }

                var status = setStatusText(this, numOfComp);

                $("#voteAndWaitList").append('<tr>' +
							'<td>' +
								'<img src="./img/Down Arrow.png" alt="arrow" class="nav-arrow down">' +
								'<span class="namber">1</span>' +
							'</td>' +
							'<td>'+ compsHtml+'</td>' +
							'<td>'+songsHtml+'</td>' +
							'<td>' + status + '</td>' +
							'<td class="row-options"><span class="edit">ערוך</span> <span class="delete">מחק</span> <span class="copy">שכפל</span></td>' +
							'<td>פריוויו</td>' +
							'<td class="open-voting">פתח</td>' +
						'</tr>');
                $("#voteAndWaitList").children().children("tr:last").data("pageData", this);
            }
            //else if the page is static
            else {

            }
        }


    });


    //show show page
    showShowPage();
}
var pageHtml;
function pageDelete(pageItem){
    var pageData =$(pageItem).parents("tr").data();
    var id =currentShowId;
    pageHtml = $(pageItem).parents("tr");


    $.ajax({
        type: "POST",
        url: domain + "type=deletePage",
        data: { "pageId": id, "newStatus": -1 },
        success: function(data) {
            console.log("success updatePageStatus-delete: " + data);
            if(data.error == "success"){
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
            var percents = data.votes[numOfComp].finalPercent;
            var Judges = data.votes[numOfComp].numOfJudges;
            text = percents + "%" + " (" + percents + ")";
            break;
    }
    
        return text;
}

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
         else{

             $.ajax({
                type: "POST",
                url: domain + "type=addVotePage",
                data: { "showId": currentShowId,"competitor_id1": firstId,"SongName1":firstSongName,"competitor_id2":secondId,
                         "SongName2":secondSongName,"threshold":threshold,
                         "textWaitRegister":"","textWaitVote":"","textWaitCalc":"","textWaitContinue":""},
                success: function(data) {
                    console.log("success addVotePage" + data);
                    //if(data.error == "success"){
                        setAddVote(data);
                    //}
            

                },
                error: function(data) {
                    console.log("error addVotePage " + data);
                }
            });
             
         }

     }
   
}

function setAddVote(data){
    
}
