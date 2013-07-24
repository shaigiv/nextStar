function openShow(show){
    // window.location.href = window.location.origin + "/index.html#prog-page10092013";
        //switchHash();
        var showId = show.parents("li").data("showId");
       
        getShowData(showId);

}

function getShowData(showId){
    $.ajax({
        type:"POST",
        url: domain + "type=getPages",
        data:{"showId":showId},
        success: function(data) {
            console.log("success getPages: " + data);
            setGetShow(data);
        },
        error: function(data) {
            console.log("error getPages: " + data);
        }
    });
}

function setGetShow(data){

    $(data).each(function(){
        
        //if the page deleted
        if(this.status != -1){
            //if the page is vote
            if(this.type=="vote"){
            var status= setStatusText(this,0);

            $("#voteAndWaitList").append('<tr>'+
							'<td>'+
								'<img src="./img/Down Arrow.png" alt="arrow" class="nav-arrow down">'+
								'<span class="namber">1</span>'+
							'</td>'+
							'<td>אור טרגן<br>'+
								'איטן גרינברג</td>'+
							'<td>ים של דמעות<br>'+
								'ים הרחמים</td>'+
							'<td>'+status+'</td>'+
							'<td class="row-options"><span>ערוך</span> <span>מחק</span> <span>שכפל</span></td>'+
							'<td>פריוויו</td>'+
							'<td class="open-voting">פתח</td>'+
						'</tr>');
            }
            //else if the page is static
            else{
                
            }
        }
        

    });


    //show show page
    showShowPage();
}


function setStatusText(data,numOfComp){
    var text = '';
    var statusNum =data.status;
    switch (statusNum){
        case 0:
            text ="";
            break;
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