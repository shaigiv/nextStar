 
  /********PRODUCTION!!!!*******/
   var domain = "/nextStar/json?";
  /********PRODUCTION!!!!*******/
  

 //var domain = "/nextStarTestA/json?";
 
//E -mako
//A -yerutech
//cambium -D


function sendLoginRequest() {
    var userName = $("#name").val();
    var password = $("#pass").val();

    $.ajax({
        type: "POST",
        method: "POST",
        url: domain,
        data: "type=login&userName=" + userName + "&password=" + password,
        dataType: 'json',
        success: function(data) {
            if(data.login == 1) {
                alert("login success");
                 window.location.href = "index.html";
            }
            else {
                alert("login fail");
            }
        },
        error: function(data) {
            alert("login fail")
        }
    });

   




}