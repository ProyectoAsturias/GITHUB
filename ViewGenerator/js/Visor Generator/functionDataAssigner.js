$(document).ready(function(){
    addDataAttributes();
});

function addDataAttributes(){
    clickCoordinatesDataAssing();
    drawAreaDataAssign();
    panToDataAssign();
    printMapDataAssign();
    retrieveDataAssign();
    fullScreenDataAssign();
    zoomControlDataAssign();
    zoomAreaDataAssign();
    emptySpaceAssign();
    exportDataAssign();
}

function exportDataAssign(){
    $(".export").data("function", "export");
}

function clickCoordinatesDataAssing(){
    $(".clickCoordinatesButton").data("function", "clickCoordinates");
}

function drawAreaDataAssign(){
    $(".drawType").data("function", "draw");
}

function panToDataAssign(){
    $(".panTo").data("function", "panTo");
}

function printMapDataAssign(){
    $(".printMap").data("function", "printMap");
}

function retrieveDataAssign(){
    $(".dataRetrieving").data("function", "dataRetrieve");
}

function fullScreenDataAssign(){
    $(".fullScreen").data("function", "fullScreen");
}

function zoomControlDataAssign(){
    $(".zoomInButton").data("function", "zoomIn");
    $(".zoomOutButton").data("function", "zoomOut");
}

function zoomAreaDataAssign(){
    $(".areaZoom").data("function", "areaZoom");
}

function emptySpaceAssign(){
    $(".empty").data("function", "empty");
}
