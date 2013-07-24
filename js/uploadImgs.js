function initInputFile(){

    $("#add-upload").click(function() {
        $("#add-submit").click();
    });

     $(".smallImg").change(function(e) {
           
            var fileName = $(this).val();
            if((/\.(gif|jpg|jpeg|png)$/i).test(fileName)) {

                 if(this.files && this.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                      console.log(e.target.result);
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
    
    $(".smallImg").data("url", imgUrlSmall);
    $(".largeImg").data("url", imgUrlLarge);
}