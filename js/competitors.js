var compArray = new Array();

function   setCompArray(data){
    $(data).each(function(index) {
        compArray[index] = this;
    });
}

/*****************************/

function getCompNameByID(id){
    var name;
    var index=0;
    for(var i=0; i<compArray.length; i++){
        if (compArray[i].id == 25){
           name =  compArray[i].name;
            break;
        }  
     }
    return name;
}