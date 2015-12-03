var enabled = false;
var dragZoom = new ol.interaction.DragZoom({
    condition: ol.events.condition.always
});

$(document).ready(function(){
    ZoomAreaEventHandler();
});

/**
 * Adds event handler and JQuery data attribute on this tool button.
 * @method eventHandler
 * @return
 */
function ZoomAreaEventHandler(){
    $(".areaZoom").click(function () {
        toggleAreaZoom();
    });
}

/**
 * Switch between enable/disable this tool.
 * @method toggleAreaZoom
 * @return
 */
function toggleAreaZoom(){
    enabled ? disableAreaZoom() : enableAreaZoom();
}



/**
 * Enable this tool. Adds a DragZoom Interaction to the map.
 * @method enableAreaZoom
 * @return
 */
function enableAreaZoom(){
    enabled = true;
    changeCursor();
    map.addInteraction(dragZoom);
    dragZoom.on('boxend', function(evt) {
        disableAreaZoom();
    });
}

/**
 * Disable this tool.
 * @method disableAreaZoom
 * @return
 */
function disableAreaZoom(){
    enabled = false;
    map.removeInteraction(dragZoom);
    changeCursor();
}

/**
 * When this tool is enable cursor over the map is changed for a crosshair. When disabled the cursor is changed back to default.
 * @method changeCursor
 * @return
 */
function changeCursor() {
    enabled ? $("#map").css("cursor", "crosshair") : $("#map").css("cursor", "default");
}

