$(document).ready(function(){
    PrintEventHandler();
});

/**
 * Adds event handler and JQuery data attribute on this tool button.
 * @method PrintEventHandler
 * @return
 */
function PrintEventHandler() {
    $(".printMap").on("click", printMap);
}

/**
 * Start print task only for map content.
 * @method printMap
 * @return
 */
function printMap(){
    makeOverlaysResponsive();
    window.print();
}

/**
 * In order to print overlays on the map, those must become responsive since they are generated with static position.
 * @method makeOverlaysResponsive
 * @return
 */
function makeOverlaysResponsive() {
    makeCoordinatesOverlayResponsive();
    makeAreaOverlayResponsive();
}

/**
 * Changes some css attributes on coordinatesOverlay from static values to percentages. With that when printing is started this overlay stays
 * in the same position.
 * @method makeCoordinatesOverlayResponsive
 * @return
 */
function makeCoordinatesOverlayResponsive() {
    $("#coordinatesOverlay").parent().css('right', function () {
        var rightMargin = $("#coordinatesOverlay").parent().css("right");
        var rightPercentage = parseFloat(rightMargin) / parseFloat($("#mapContainer").width());
        return rightPercentage * 100 + "%";
    });

    $("#coordinatesOverlay").parent().css('bottom', function () {
        var bottomMargin = $("#coordinatesOverlay").parent().css("bottom");
        var bottomPercentage = parseFloat(bottomMargin) / parseFloat($("#mapContainer").height());
        return bottomPercentage * 100 + "%";
    });
}

/**
 * Changes some css attributes on areaOverlay from static values to percentages. With that when printing is started this overlay stays
 * in the same position.
 * @method makeAreaOverlayResponsive
 * @return
 */
function makeAreaOverlayResponsive() {
    $("#areaOverlay").parent().css('right', function () {
        var rightMargin = $("#areaOverlay").parent().css("right");
        var rightPercentage = parseFloat(rightMargin) / parseFloat($("#mapContainer").width());
        return rightPercentage * 100 + "%";
    });

    $("#areaOverlay").parent().css('bottom', function () {
        var bottomMargin = $("#areaOverlay").parent().css("bottom");
        var bottomPercentage = parseFloat(bottomMargin) / parseFloat($("#mapContainer").height());
        return bottomPercentage * 100 + "%";
    });
}
