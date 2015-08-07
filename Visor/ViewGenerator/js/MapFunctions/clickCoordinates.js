var enabled = false;
var coordinatesOverlay;
$(document).ready(function(){
    coordinatesEventHandlers();
});

/**
 * Create click event handler on this tool button and add data JQuery attribute to it.
 * @method CoordinatesEventHandlers
 * @return
 */
function coordinatesEventHandlers() {
    $("#clickCoordinatesButton").click(function () {
        toggleClickCoordinate();
    });
}

/**
 * Toggle enable/disable this tool.
 * @method toggleClickCoordinate
 * @return
 */
function toggleClickCoordinate(){
    enabled ? disableClickCoordinate() : enableClickCoordinates();
}

/**
 * Creates the coordinates overlay showing information. This happens when tool is enabled.
 * @method createOverlay
 * @return
 */
function createOverlay(){
    coordinatesOverlay = new ol.Overlay({
        element: document.getElementById('coordinatesOverlay'),
        positioning: 'bottom-right'
    });
}


/**
 * Enable this tool.
 * @method enableClickCoordinates
 * @return
 */
function enableClickCoordinates(){
    enabled = true;
    createOverlay();
    map.on("click", showCoordinates);
    changeCursor();
}

/**
 * Disable this tool.
 * @method disableClickCoordinate
 * @return
 */
function disableClickCoordinate(){
    console.log("hola");
    enabled = false;
    map.un("click", showCoordinates);
    coordinatesOverlay.setPosition();
    changeCursor();
}

/**
 * When this tool is enabled, cursor hover on map is changed to a crosshair. When disabled it's changed back to default.
 * @method changeCursor
 * @return
 */
function changeCursor() {
    enabled ? $("#map").css("cursor", "crosshair") : $("#map").css("cursor", "default");
}

/**
 * Gets the event (click) coordinates and fill the overlay content with it, then shows it up.
 * @method showCoordinates
 * @param {} event
 * @return
 */
function showCoordinates(event) {
    var coordinate = event.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326'));
    coordinatesOverlay.getElement().innerHTML = '<p>Coordenadas del lugar:</p><code>' + hdms + '</code>';
    coordinatesOverlay.setPosition(coordinate);
    console.log(coordinate);
    map.addOverlay(coordinatesOverlay);
}
