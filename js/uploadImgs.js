function initInputFile(){

    $("#add-upload").click(function() {
        

         if(smallImgAdded && largeImgAdded){
           $("#add-submit").click();
        }
        else{
            alert("עליך לבחור 2 תמונות לפני העלאתן")
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
    //init the inicators for images chosen
    smallImgAdded = false;
    largeImgAdded = false;
}
//imagges uploaded by edit competitor
function editImageUploaded(){
    var iframeName = $("#editIframeResultId").attr("name");
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
    $(".edit-comp-img-wrap .smallImg").data("url", imgUrlSmall);
    $(".editcomp-img-wrap .largeImg").data("url", imgUrlLarge);
    alert("התמונות עלו");
}

/*add page function*/
function pageImageUploaded(){
    var iframeName = $("#pageIframeResultId").attr("name");
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
}