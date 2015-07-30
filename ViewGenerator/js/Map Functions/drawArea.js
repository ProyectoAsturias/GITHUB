/*
//Declaración de variables necesarias
$(document).ready(function (){
  var drawInteraction; //El objeto Draw que se crea, no confundir con su feature (drawingContent)
  var drawingContent; //El feature (contenido) del dibujo que se está haciendo, usado para obtener información del dibujo y calcular el área/distancia
  var typeSelect = document.getElementById('drawType');
  var selectedInteraction = null;

//Declaración del Overlay (pop-up con el área)
  var areaOverlay = new ol.Overlay({
    element: document.getElementById('areaOverlay'),
    positioning: 'bottom-right'
  });

  //Los dibujos van a ir a una capa aparte.
  var drawingLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
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


//Creación del dibujo, al llamar a esta función entramos en modo "dibujar"
  function startDrawInteraction() {
    var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
    drawInteraction = new ol.interaction.Draw({
      source: drawingLayer.getSource(),
      type: */
/** @type {ol.geom.GeometryType} *//*
 (type)
    });

    map.addInteraction(drawInteraction);

    //Los eventos del dibujo, al empezar y terminar.
    drawInteraction.on('drawstart', function(evt) {
      drawingContent = evt.feature;
    }, this);

    drawInteraction.on('drawend', function(evt) {
      if (drawingContent){
        fillAndShowOverlay(drawingContent, areaOverlay);
      }
      drawingContent = null;
    }, this);
  }

  //Parar el modo dibujo y hacer desaparecer el Overlay.
  function stopDrawInteraction(){
    map.removeInteraction(drawInteraction);
    drawingContent = null;
    areaOverlay.setPosition();
    selectInteraction();
  }

  //Si estamos dibujando, drawingContent no es nulo, y cada vez que movemos el raton actualizamos el areaOverlay, tanto su posición como contenido
  function mouseMoveHandler(evt) {
    if (drawingContent){
      fillAndShowOverlay(drawingContent, areaOverlay);
    }
  };

  //Ponemos el handler del MousMove a su evento
  $("#map").on('mousemove', mouseMoveHandler);

  //Cuando recibimos la tecla ESC dejamos de dibujar |||||| No me gusta mucho, porque borra el areaOverlay y en otro momento puede dar problema.
  $(document).keydown(function(event){
    if (event.keyCode == "27"){
      stopDrawInteraction();
    }
  });

  //Cuando cambiamos en el comboBox el objeto de dibujo cancelamos el actual y empezamos a dibujar.
  typeSelect.onchange = function(e) {
    stopDrawInteraction()
    startDrawInteraction();
  };

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
    if (drawingContent.getGeometry() instanceof ol.geom.Polygon) {
      occupiedSpace = formatArea(*/
/** @type {ol.drawingContent.getGeometry().Polygon} *//*
 (drawingContent.getGeometry()));
      overlay.setPosition(new Array(drawingContent.getGeometry().getLastCoordinate()[0] * 1.0002, drawingContent.getGeometry().getLastCoordinate()[1]));
    } else if (drawingContent.getGeometry() instanceof ol.geom.LineString) {
      occupiedSpace = formatLength(*/
/** @type {ol.drawingContent.getGeometry().LineString} *//*
 (drawingContent.getGeometry()));
      overlay.setPosition(new Array(drawingContent.getGeometry().getClosestPoint(drawingContent.getGeometry().getLastCoordinate())[0], drawingContent.getGeometry().getClosestPoint(drawingContent.getGeometry().getLastCoordinate())[1] * 1.00005));
    }
    overlay.getElement().innerHTML = occupiedSpace;
    map.addOverlay(overlay);
  }


  //Función que permite seleccionar/deseleccionar una interacción (dibujo) en el mapa. Cuando se selecciona una se muestra el areaOverlay nuevamente calculada en su posición.
  function selectInteraction() {
    if (selectedInteraction !== null) {
      selectedInteraction = null;
    }
    selectedInteraction = new ol.interaction.Select({
      condition: ol.events.condition.click
    });
    if (selectedInteraction !== null) {
      map.addInteraction(selectedInteraction);
      selectedInteraction.getFeatures().on('change:length', function(interactionFeature) {
        console.log("bien");
        drawingContent = interactionFeature.target.item(0);
        if (drawingContent != null){
          console.log("gola");
          fillAndShowOverlay(drawingContent, areaOverlay);
        }else{
          areaOverlay.setPosition(); //Para ocultar la etiqueta le damos una posición vacía.
        }
      });
    }
  };
});*/
