$(document).ready(function() {
    getHomePageData();
    homePageInitEvents();
    initInputFile();
    showEvents();
    votePageAttachEvents();


    //$("#add-vote-title").on('click', $("#add-vote-title"), function() {
    //    if($(".toggle-edit").hasClass('minimize')) {
    //        $("#add-vote").slideToggle();
    //        if($("#add-page-title").hasClass('maximize')) {
    //            $("#add-page").slideUp();
    //            $("#add-page-title").removeClass('maximize').addClass('minimize');
    //        }
    //        $("#add-vote-title").toggleClass('minimize maximize');
    //    }
    //});

    //$("#add-page-title").on('click', $("#add-page-title"), function() {
    //    if($(".toggle-edit").hasClass('minimize')) {
    //        $("#add-page").slideToggle();
    //        if($("#add-vote-title").hasClass('maximize')) {
    //            $("#add-vote").slideUp();
    //            $('#add-vote-title').removeClass('maximize').addClass('minimize');
    //        }
    //        $("#add-page-title").toggleClass('minimize maximize');
    //    }
    //});
    $("#add-vote-title").click(function() {
        if($("#add-vote").is(":visible")) {
            hideAddVoteBox();
            editVotePage = false;
        }
        else {
            showAddVoteBox();
            clearAddVoteBox();
        }
    });
    $("#add-page-title").click(function() {
        if($("#add-page").is(":visible")) {
            hideAddPageBox();
            editStaticPage = false;
        }
        else {
            showAddPageBox();
            initAddStaticPageText();
        }
    });
    $("#edit-prog-name").click(function() {
        $("#edit-prog-name span").show();
    });


});


function showAddVoteBox(){
     $("#add-vote").fadeIn();
     $("#add-page").fadeOut();
}
function hideAddVoteBox(){
     $("#add-vote").fadeOut();
    
}

function showAddPageBox(){
     $("#add-page").fadeIn();
     $("#add-vote").fadeOut();
}
function hideAddPageBox(){
     $("#add-page").fadeOut();
}

//add class for attention
function addAttention(item){
   //$(item).addClass("attention");
   //setTimeout(function(){
   //    $(".attention").removeClass("attention");
   //},300);
}