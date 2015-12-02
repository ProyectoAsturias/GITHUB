var centersArray=[];
var zoomsArray=[];
var savePosition=true;
var counter=0;
$(document).ready(function(){
    getPositionEvent();
    lastviewEventHandler();
});

function getPositionEvent(){
    map.on('moveend', function(){
        if(savePosition){
            counter++;
            var view = map.getView();
            var center =view.getCenter();
            centersArray.push(center);
            var zoom = view.getZoom();
            zoomsArray.push(zoom);
        }
        savePosition=true;
    });
}

function lastviewEventHandler() {
    $(".lastview").click(function () {
        if(counter>1){
            console.log(counter);
            savePosition=false;
            map.getView().setCenter(centersArray[centersArray.length-2]);
            map.getView().setZoom(zoomsArray[zoomsArray.length-2]);
            if(zoomsArray.length>2){
                centersArray.splice(centersArray.length-1 ,1);
                zoomsArray.splice(zoomsArray.length-1 ,1);
            }
        }
    });
}