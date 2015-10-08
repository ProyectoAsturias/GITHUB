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
    configurationAssign();
    helpAssign();
    homeinfoAssign();
    lastviewAssign();
    mailAssign();
    selectionAssign();
    updateAssign();
    wmsimportAssign();
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
    $(".emptySpace").data("function", "emptySpace");
}
function configurationAssign(){
    $(".configuration").data("function", "configuration");
}
function helpAssign(){
    $(".help").data("function", "help");
}
function homeinfoAssign(){
    $(".homeinfo").data("function", "homeinfo");
}
function lastviewAssign(){
    $(".lastview").data("function", "lastview");
}
function mailAssign(){
    $(".mail").data("function", "mail");
}
function selectionAssign(){
    $(".selection").data("function", "selection");
}
function updateAssign(){
    $(".update").data("function", "update");
}
function wmsimportAssign(){
    $(".wmsimport").data("function", "wmsimport");
}