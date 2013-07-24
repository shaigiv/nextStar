$(document).ready(function() {
    getHomePageData();
    homePageInitEvents();
    initInputFile();

    $("#add-vote-title").on('click',$("#add-vote-title"),function() {
        if($(".toggle-edit").hasClass('minimize')) {
            $("#add-vote").slideToggle();
			if($("#add-page-title").hasClass('maximize')){
			 $("#add-page").slideUp();
			 $("#add-page-title").removeClass('maximize').addClass('minimize');
			}
            $("#add-vote-title").toggleClass('minimize maximize');
        }
    });

    $("#add-page-title").on('click',$("#add-page-title"),function() {
        if($(".toggle-edit").hasClass('minimize')) {
            $("#add-page").slideToggle();
			if($("#add-vote-title").hasClass('maximize')){
			 $("#add-vote").slideUp();
			 $('#add-vote-title').removeClass('maximize').addClass('minimize');
			}
		    $("#add-page-title").toggleClass('minimize maximize');
        }
    });

    $("#edit-prog-name").click(function() {
        $("#edit-prog-name span").show();
    });


});


function checkOpen() {
    document.getElementById("wait-open-check").disabled = false;
    document.getElementById("wait-open-check").checked = false;
}

function checkClose() {
    document.getElementById("wait-close-check").disabled = false;
    document.getElementById("wait-close-check").checked = false;
}
function checkCount() {
    document.getElementById("wait-count-check").disabled = false;
    document.getElementById("wait-count-check").checked = false;
}
function checkContinue() {
    document.getElementById("wait-continue-check").disabled = false;
    document.getElementById("wait-continue-check").checked = false;
}


