function initInputFile(){

    //UPLOAD BTN CLICK - upload to server
    $("#add-upload").click(function() {
        

         if(smallImgAdded && largeImgAdded){
             //if there are 2 images - upload to server
           $("#add-submit").click();
        }
        else{
            alert("עליך לבחור 2 תמונות לפני העלאתן")
        }
    });
    //$("#edit-upload").click(function() {
        
        //upload only if the user choose at least 1 img
         //if(smallImgEdited || largeImgEdited){
             //if there are 2 images - upload to server
    //       $("#submit-edit").click();
      //  }
      //  else{
       //     alert("עליך לבחור תמונות לפני העלאתן")
       // }
  //  });

    $("#edit-upload").click(function() {
       // alert("click");
        //upload only if the user choose at least 1 img
         if(smallImgEdited || largeImgEdited){
            // if there are 2 images - upload to server
           $("#submit-edit").click();
        }
        else{
            alert("עליך לבחור תמונות לפני העלאתן")
        }
    });

    $(".add-comp-img-wrap .smallImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    $("#add-competitor-imgFile").attr("src", e.target.result);
                    smallImgAdded = true;
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });

    $(".add-comp-img-wrap .largeImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    largeImgAdded = true;
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });
    $(".edit-comp-img-wrap .smallImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    $("#edit-competitor-imgFile").attr("src", e.target.result);
                    smallImgEdited = true;
                    
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });

    $(".edit-comp-img-wrap .largeImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    $("#edit-competitor-imgFile").attr("src", e.target.result);
                    largeImgEdited = true;
                    
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });

     $("#page-upload").click(function() {
            
             if(smallImgAdded && largeImgAdded){
          $("#page-submit").click();
        }
        else{
            alert("עליך לבחור 2 תמונות לפני העלאתן")
        }
       
    });

    $(".add-page-img-wrap .smallImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    $("#add-page-imgFile").attr("src", e.target.result);
                    smallImgAdded = true;
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });

    $(".add-page-img-wrap .largeImg").change(function(e) {

        var fileName = $(this).val();
        if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

            if(this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    console.log(e.target.result);
                    largeImgAdded = true;
                };

                reader.readAsDataURL(this.files[0]);
            }
        }
        else {
            alert("noValidFile");
        }
    });
}

//image upload by add competitor
function addImageUploaded(){
    var iframeName = $("#addIframeResultId").attr("name");
    console.log("load iframe:" + $(window[iframeName].document.getElementsByTagName("body")[0]).text());
    var imagesUrlJson = $.parseJSON($(window[iframeName].document.getElementsByTagName("body")[0]).text());
    imgUrlSmall = imagesUrlJson.smallImg;
    imgUrlLarge = imagesUrlJson.largeImg;
    if(imgUrlSmall != undefined){
        smallImgUploadedByAdd = true;
    }
     if(imgUrlLarge != undefined){
         largeImgUploadedByAdd = true;
    }
    $(".add-comp-img-wrap .smallImg").data("url", imgUrlSmall);
    $(".add-comp-img-wrap .largeImg").data("url", imgUrlLarge);
    alert("התמונות עלו");
   
    //show the dispaly img btns
    $(".add-comp-img-wrap .displayImgBtn").show();
    //init the inicators for images chosen
    smallImgAdded = false;
    largeImgAdded = false;
}

//imagges uploaded by edit competitor
function editImageUploaded(){
    var iframeName = $("#editIframeResultId").attr("name");
   // console.log("load iframe:" + $(window[iframeName].document.getElementsByTagName("body")[0]).text());
    var imagesUrlJson = $.parseJSON($(window[iframeName].document.getElementsByTagName("body")[0]).text());
   
    //if user upload only small image 
    if(smallImgEdited ==true){
         $(".edit-comp-img-wrap .smallImg").data("url", imagesUrlJson.smallImg);
         //$(".edit-comp-img-wrap .smallImg").data("url", imagesUrlJson.smallImg);
    }
    //if 2 images edited
     if(largeImgEdited ==true && smallImgEdited ==true){
         $(".edit-comp-img-wrap .largeImg").data("url", imagesUrlJson.largeImg);
         //$(".edit-comp-img-wrap .largeImg").data("url", imagesUrlJson.largeImg);
    }
    //if only large mage upload -the serevr return the value S "smallImg"
    else if (smallImgEdited == false && largeImgEdited ==true){
        $(".edit-comp-img-wrap .largeImg").data("url", imagesUrlJson.smallImg);
       // $(".edit-comp-img-wrap .largeImg").data("url", imagesUrlJson.smallImg);
    }
    if( imgUrlSmall != undefined){
        smallImgUploadedByEdit = true;
    }
    if( imgUrlLarge != undefined){
        largeImgUploadedByEdit = true;
    }
     alert("התמונות עלו");
     //show the dispaly img btns
    $(".edit-comp-img-wrap .displayImgBtn").show();
}

/*add page function*/
function pageImageUploaded(){
    var iframeName = $("#pageIframeResultId").attr("name");

    //if the user upload image large than 50K
    if($(window[iframeName].document.getElementsByTagName("head")[0]).text() == "413 Request Entity Too Large" || $(window[iframeName].document.getElementsByTagName("head")[0]).text().toLowerCase().indexOf("large")>-1){
        alert("עליך להעלות תמונות מתחת ל50K!");
    }
    //else - continue
    else{
         // console.log("load iframe:" + $(window[iframeName].document.getElementsByTagName("body")[0]).text());
    var imagesUrlJson = $.parseJSON($(window[iframeName].document.getElementsByTagName("body")[0]).text());
    imgUrlSmall = imagesUrlJson.smallImg;
    imgUrlLarge = imagesUrlJson.largeImg;
    if( imgUrlSmall != undefined){
        smallImgUploadedByEdit = true;
    }
    if( imgUrlLarge != undefined){
        largeImgUploadedByEdit = true;
    }
    $(".add-page-img-wrap .smallImg").data("url", imgUrlSmall);
    $(".add-page-img-wrap .largeImg").data("url", imgUrlLarge);
    alert("התמונות עלו");
    $("#disaplyImgSmall").click();
    $("#disaplyImgLarge").click();
    disaplyImgSmall
   //show the dispaly img btns
    $(".add-page-img-wrap .displayImgBtn").show();
    }
  
}