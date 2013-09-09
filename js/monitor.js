jsonPageUrl='/page/pageF.json';
jsonUrl='/nextStarTestF'

var pid= 0;
var status=0;
var votes=[];
var threshold=0;
var timeOut=null;

$().ready(function(){
	chackLogin();
	pollController=new PollController();
	pollController._setUrl(jsonPageUrl); 
	pollController._setCallBackFunction(function(data){
		status=data.status;
		if (data.type== "vote"){
			if (pid!=data.id){
				pid=data.id;
				votes=[];
				$.ajax({
					type: "POST",
					method: "POST",
					url: jsonUrl+"/json",
					data: "type=getPage&pageId="+pid,
					dataType: 'json',
					success: function(voteDate){
						for (var i=0;i<voteDate.votes.length;i++){
							if (data.votes[i].voteID!=voteDate.votes[i].id) console.log("eee");
							votes[i]=voteDate.votes[i].graphJsonURL;
							threshold=parseInt(voteDate.votes[i].threshold);
						}
						showVotePage(data.votes);
					}
				});
			}
			showUpdateStatus();
		}
		else{
			showStaticPage();
		}
	});
	pollController._init();

});

function showStaticPage(){
	$('#current-contestants').hide();
	$('#register-going-to-close,.horizonal-list li').removeClass('current');
	$('#waitStat').addClass('current');
}

function showVotePage(data){
	$('#vote1CompName').html(data[0].name);
	$('#vote-first-img').attr("src",data[0].imageUrlA);
	$('.container-left').show();
	if(data.length>1){
		$('#vote2CompName').html(data[1].name);
		$('#vote-second-img').attr("src",data[1].imageUrlA);
		}
	else
		$('.container-left').hide();
	$('#vote1RealPerc,#vote2RealPerc').html('0%').removeClass('green-text').addClass('red-text');
	$('#current-contestants').show();
}

function showUpdateStatus(){
	$('#register-going-to-close,.horizonal-list li').removeClass('current');
	switch(status)
	{
	case "21":
	  $('#openRegister').addClass('current');
	  break;
	case "22":
	  $('#register-going-to-close').addClass('current');
	  break;
	case "23":
	  $('#openVote').addClass('current');
	  break;
	case "25":
	  $('#closeVote').addClass('current');
	  break;
	case "26":
	  $('#publishResults').addClass('current');
	  break;
	}
	get_data();
}

function get_data(){
	if (timeOut!=null)
		clearTimeout(timeOut);
	if (status=="21" || status=="22"){
		$.ajax({
			type: "POST",
			method: "POST",
			url: jsonUrl+"/json",
			data: "type=getRegisterCounter",
			dataType: 'json',
			success: function(data){
				$('#num-of-users').html(data.RegisterCounter);
			}
		});
	}
	else if (status=="23" || status=="25"){
		$.ajax({
			url: votes[0],
			dataType: 'json',
			success: function(data){
				var percent=0;
				data=data[data.length-1];
				if (data.voteRegister>0)
					percent=Math.round(100*data.voteTrue/data.voteRegister);
				$('#num-of-users').html(data.voteRegister);
				$('#vote1RealPerc').html(percent+"%");
				$('#vote1RealPerc').removeClass('green-text').removeClass('red-text');
				if (percent>=threshold)
					$('#vote1RealPerc').addClass('green-text');
				else
					$('#vote1RealPerc').addClass('red-text');
			}
		});
		if (votes.length>1){
			$.ajax({
				url: votes[1],
				dataType: 'json',
				success: function(data){
					var percent=0;
					data=data[data.length-1];
					if (data.voteRegister>0)	
						percent=Math.round(100*data.voteTrue/data.voteRegister);
					$('#vote2RealPerc').html(percent+"%");
					$('#vote2RealPerc').removeClass('green-text').removeClass('red-text');
					if (percent>=threshold)
						$('#vote2RealPerc').addClass('green-text');
					else
						$('#vote2RealPerc').addClass('red-text');
				}
			});
		}
	}
	else{
		return;
	}
	timeOut=setTimeout(get_data,3000);
}

function chackLogin(){
	 $.ajax({
		type: "POST",
		method: "POST",
		url: jsonUrl+"/json",
		data: "type=getRegisterCounter",
		dataType: 'json',
		success: function(data){
			if (data.error=="not log in")
				window.location.href = "login.html?returnHerf=monitor.html";
		}
	});
}
