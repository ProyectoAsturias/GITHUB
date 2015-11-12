var drawInteraction; //El objeto Draw que se crea, no confundir con su feature (drawingContent)
var drawingContent; //El feature (contenido) del dibujo que se está haciendo, usado para obtener información del dibujo y calcular el área/distancia
var typeSelect = document.getElementById('drawType');
var selectedInteraction = null;
var areaOverlay;
var enabledModalWindow = false;
var previousFeature;
var previousStyle;

function openDrawingModalWindow(){
  if (!enabledModalWindow){
    enabledModalWindow = true;
    var drawModalWindow="<div id=\"drawModalWindow\">"+
        "<div class=\"modal-content\">"+
        "<div class=\"modal-header\">"+
        "<button type=\"button\" onclick=\"cancelDrawingWindow()\" class=\"close\" >&times;</button>"+
        "<h4 class=\"modal-title\">Seleccionar figura</h4>"+
        "</div>"+
        "<div class=\"modal-body\">"+
        '<select id="drawType" class="function" data="draw">'+
        '<option value="length">Distancia</option>'+
        '<option value="area">Área</option>'+
        '</select>'+
        "<button onclick='startDrawInteraction()' id=\"delKeyword\" class=\"btn btn-success btn-block\"  >Medir</button>"+
        "<ul id='distancesTaken'></div></div>"+
        "</div>"+
        "</div>";
    $('#map').append(drawModalWindow);
    $("#drawModalWindow").draggable({
      containment: $(".ol-viewport")
    });
  }else{
    cancelDrawingWindow();
  }
}

function cancelDrawingWindow(){
  enabledModalWindow = false;
  stopDrawInteraction();
  $("#distancesTaken li").each(function (index, removeElement){
    if (selectedInteraction !== null) {
      selectedInteraction.getFeatures().remove($(removeElement).data("drawingContent"))
    }
      drawingLayer.getSource().removeFeature($(removeElement).data("drawingContent"));
  })
  $("#drawModalWindow").remove();
}

//Declaración de variables necesarias
$(document).ready(function (){
//Declaración del Overlay (pop-up con el área)

  //Los dibujos van a ir a una capa aparte.
  drawingLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
      }),
      stroke: new ol.style.Stroke({
        color: '#DE6235',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
  });
  map.addLayer(drawingLayer);
  drawingLayer.setZIndex(999);

  $(".drawType").on("click", function(){
    openDrawingModalWindow();
  })

  $(document).keydown(function(event){
    if (event.keyCode == "27"){
      stopDrawInteraction();
      $("#delKeyword").attr("disabled", false);
    }
  });

  areaOverlay = new ol.Overlay({
    element: document.getElementById('areaOverlay'),
    positioning: 'bottom-right'
  });

});

function startDrawInteraction() {
  $("#delKeyword").attr("disabled", true);
  var typeSelect = document.getElementById('drawType');
  var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');

  drawInteraction = new ol.interaction.Draw({
    source: drawingLayer.getSource(),
    type:
    /** @type {ol.geom.GeometryType} */
        (type)
  });

  map.addInteraction(drawInteraction);

  //Los eventos del dibujo, al empezar y terminar.
  drawInteraction.on('drawstart', function(evt) {
    drawingContent = evt.feature;
  }, this);

  drawInteraction.on('drawend', function(evt) {
    drawingContent.setStyle(
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: getRandomColor(),
            width: 3
          })
        }));
    if (drawingContent){
      var distance = fillAndShowOverlay(drawingContent, areaOverlay);
      addDistanceToList(drawingContent, distance);
    }
    drawingContent = null;
  }, this);

  typeSelect.onchange = function(e) {
    stopDrawInteraction()
    startDrawInteraction();
  };

  $("#map").on('mousemove', mouseMoveHandler);
}

function highlightFeatureOnSelect(drawingContent) {
  if (selectedInteraction !== null) {
    map.removeInteraction(selectedInteraction);
    selectedInteraction = null;
    previousFeature.setStyle(previousStyle);
  }
  selectedInteraction = new ol.interaction.Select();
  map.addInteraction(selectedInteraction);
  var features = selectedInteraction.getFeatures();
  features.push(drawingContent);
  var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(206, 252, 251, 0.3)'
    }),
    stroke: new ol.style.Stroke({
      color: '#09C2BF',
      width: 5
    })
  });
  previousFeature = drawingContent;
  previousStyle = drawingContent.getStyle();
  drawingContent.setStyle(highlightStyle)
  fillAndShowOverlay(drawingContent, areaOverlay)
}

function addDistanceToList(drawingContent, distance){
  var randomId = "listItem"+parseInt(Math.random()*1000);
  var listItem = $("<li/>",{
    id: randomId
  })
      .html("<div class='featureColor' style='background-color:"+drawingContent.getStyle().getStroke().getColor()+"'></div>"+distance+"<div class='removeFeature'>×</div>")
      .data("drawingContent", drawingContent)
      .appendTo("#distancesTaken");
  $("#"+randomId+" .removeFeature").on("click", function(){
    if (selectedInteraction !== null) {
      selectedInteraction.getFeatures().remove(drawingContent)
    }
    drawingLayer.getSource().removeFeature(drawingContent);
    $(this).parent().remove();
  })
  $(listItem).on("click", function () {
    $("#distancesTaken li").removeClass("featureSelected");
    $(listItem).addClass("featureSelected");
    highlightFeatureOnSelect(drawingContent);
  })
}

//Parar el modo dibujo y hacer desaparecer el Overlay.
function stopDrawInteraction(){
  map.removeInteraction(drawInteraction);
  drawingContent = null;
  areaOverlay.setPosition();
  //selectInteraction();
}

//Si estamos dibujando, drawingContent no es nulo, y cada vez que movemos el raton actualizamos el areaOverlay, tanto su posición como contenido
function mouseMoveHandler(evt) {
  if (drawingContent){
    fillAndShowOverlay(drawingContent, areaOverlay);
  }
};

//Cuando recibimos la tecla ESC dejamos de dibujar |||||| No me gusta mucho, porque borra el areaOverlay y en otro momento puede dar problema.

//Cuando el objeto dibujando es una línea devolvemos una distancia, no un área. Devuelve una string finalizada en m o km.
function formatLength(line) {
  var length = Math.round(line.getLength() * 100) / 100;
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
    ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
    ' ' + 'm';
  }
  return output;
};

//Si el objeto dibujando es un polígono cálculamos el área. Devuelve el área rodeada por el perímetro terminado en m^2 o km^2
function formatArea(polygon) {
  var area = polygon.getArea();
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
    ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
    ' ' + 'm<sup>2</sup>';
  }
  return output;
};

//Cambia el valor de la etiqueta del overlay y la posiciona cerca del último punto de la forma.
function fillAndShowOverlay(drawingContent, overlay) {
  var occupiedSpace;
  //console.log(drawingContent.getGeometryName());
  if (drawingContent.getGeometry() instanceof ol.geom.Polygon) {
    occupiedSpace = formatArea(/** @type {ol.drawingContent.getGeometry().Polygon} */(drawingContent.getGeometry()));
    overlay.setPosition(new Array(drawingContent.getGeometry().getLastCoordinate()[0] * 1.0002, drawingContent.getGeometry().getLastCoordinate()[1]));
  } else if (drawingContent.getGeometry() instanceof ol.geom.LineString) {
    occupiedSpace = formatLength(
        /** @type {ol.drawingContent.getGeometry().LineString} */
        (drawingContent.getGeometry()));
    overlay.setPosition(new Array(drawingContent.getGeometry().getClosestPoint(drawingContent.getGeometry().getLastCoordinate())[0], drawingContent.getGeometry().getClosestPoint(drawingContent.getGeometry().getLastCoordinate())[1] * 1.00005));
  }
  overlay.getElement().innerHTML = occupiedSpace;
  map.addOverlay(overlay);
  return occupiedSpace;
}


function getRandomColor() {
  // 30 random hues with step of 12 degrees
  var hue = Math.floor(Math.random() * 30) * 12;

  return $.Color({
    hue: hue,
    saturation: 0.9,
    lightness: 0.6,
    alpha: 1
  }).toHexString();
}