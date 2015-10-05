var centersArray=[];
var zoomsArray=[];
var savePosition=true;
$(document).ready(function(){
    getPositionEvent();
    lastviewEventHandler();
});

function getPositionEvent(){
    map.on('moveend', function(){
        if(savePosition){
            console.log("entra al cambiar la vista");
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
        savePosition=false;
        map.getView().setCenter(centersArray[centersArray.length-2]);
        map.getView().setZoom(zoomsArray[zoomsArray.length-2]);
        if(zoomsArray.length>2){
            centersArray.splice(centersArray.length-1 ,1);
            zoomsArray.splice(zoomsArray.length-1 ,1);
        }
    });
}