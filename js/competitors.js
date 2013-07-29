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
        if (compArray[i].id == id){
           name =  compArray[i].name;
            break;
        }  
     }
    return name;
}
function getCompImgByID(id){
    var image;
    var index=0;
    for(var i=0; i<compArray.length; i++){
        if (compArray[i].id == id){
           image =  compArray[i].imageUrlA;
            break;
        }  
     }
    return image;
}