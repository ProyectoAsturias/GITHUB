$(document).ready(function(){
    zoomEventHandlers();
});

/**
 * Add events handlers for zoom buttons.
 * @method zoomEventHandlers
 * @return
 */
function zoomEventHandlers() {
    ZoomInEventHandler();
    ZoomOutEventHandler();
}

/**
 * Adds event handler and JQuery data attribute to ZoomIn button.
 * @method ZoomInEventHandler
 * @return
 */
function ZoomInEventHandler() {
    $(".zoomInButton").click(function () {
        doZoom(0.5);
    });
}

/**
 * Adds event handler and JQuery data attribute to ZoomOut button.
 * @method ZoomOutEventHandler
 * @return
 */
function ZoomOutEventHandler() {
    $(".zoomOutButton").click(function () {
        console.log("adios")
        doZoom(2);
    });
}

/**
 * Zooms In/Out for a given factor. By default ZoomIn calls with a factor value of 2 and ZoomOut of 0.5
 * @method doZoom
 * @param {} factor
 * @return
 */
function doZoom(factor) {
    var zoom = ol.animation.zoom({
        resolution: map.getView().getResolution()
    });
    map.beforeRender(zoom);
    map.getView().setResolution(map.getView().getResolution() * factor);
}