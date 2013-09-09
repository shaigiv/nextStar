 
  /********PRODUCTION!!!!*******/
   //var domain = "/nextStar/json?";
  /********PRODUCTION!!!!*******/
  

 var domain = "http://thenextstar.mako.co.il:9090/nextStarTestE/json?";
 //var domain = "/nextStarTestF/json?";
 
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
				var returnHerf=getURLParameter("returnHerf");
				if (returnHerf=="null") 
					returnHerf="index.html";
                window.location.href = returnHerf;
            }
            else {
                alert("login fail");
            }
        },
        error: function(data) {
            alert("login fail")
        }
    });
	return false;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}