<!DOCTYPE html>
<html lang="es">
<head>
	<title>Generador de Mapas</title>
	<link href="../../Common/images/favicon-96x96.png" rel="icon" sizes="96x96">
	<link href="../../Common/bootstrap-3.3.4/css/bootstrap.css" rel="stylesheet" media="screen">

	<link href="../css/creadorMapas.css" rel="stylesheet" media="screen">
	<link rel='stylesheet' href='../../Common/css/ol.css'>
	<link rel='stylesheet' href='../../Common/css/chosen.css'>
	<link href="../../Common/pace/themes/blue/pace-theme-loading-bar.css" rel="stylesheet" />

	<script src="../../Common/js/ol.js"></script>
	<script src='../../Common/js/jquery.min.js'></script>
	<script src='../../Common/js/bootstrap-treeview.js'></script>
	<script src="../../Common/js/chosen.jquery.js"></script>
	<script src='../../Common/js/attachMap.js'></script>
	<script src='../../Common/js/createMap.js'></script>
	<script src="../../Common/bootstrap-3.3.4/js/bootstrap.min.js"></script>

	<script src="../../Common/js/jquery-ui.min.js"></script>
	<script src="../../Common/js/jquery-sortable.js"></script>

	<script src='../js/configuration.js'></script>
	<script src='../js/createTreeMap.js'></script>
	<script src='../js/createLayerTreeMap.js'></script>
	<script src='../js/createLegend.js'></script>
	<script src='../js/mapEditor.js'></script>
	<script src='../js/localgis.js'></script>
	<script src='../js/wms.js'></script>
	<script src='../js/menuFuentesDatos.js'></script>
	<script src='../js/modalWmsInfo.js'></script>

	<script src="../../GeneradorVisores/js/Map%20Functions/createLayersJSON.js"></script>
	<script src="../../Common/Jsonix/Jsonix-all.js"></script>
	<script src="../../Common/Jsonix/XLINK_1.0.js"></script>
	<script src="../../Common/Jsonix/XSD_1.0.0.js"></script>

	<script src='../js/loadingBar.js'></script>
	<script src="../../Common/js/bootbox.min.js"></script>
	<script src='../js/wms.js'></script>
	<script src='../js/menuFuentesDatos.js'></script>

	<script>
		window.paceOptions = {
			startOnPageLoad: false,
			elements: false,
			target: 'div #layersList',
			restartOnRequestAfter: 40,
		}
	</script>
	<script src="../../Common/pace/pace.js"></script>

</head>
<body>
<?php /*echo($_GET["mapName"]) */?>
<script>
	function confirmSaveMap(){
		bootbox.prompt("Introduzca el nombre del mapa.", function(result) {
			if (result != null)
				success("Mapa guardado correctamente.");
		});
	}
	function confirmCleanMap(){
		bootbox.confirm("El contenido del mapa será eliminado", function(result) {
			if (result)
				success("El contenido del mapa ha sido eliminado.");
		});
	}
	function success(message){
		bootbox.alert(message, function() {});
	}
</script>
<div>
	<div id="menucapas" class="col-xs-3">
		<div>
			<div>
				<div id="logo" class="">
					<img src="../../Common/images/cabeceraLogoAsturias.gif">
				</div>
				<div id="leftBar">
					<div id="mapName">
						<!-- Trigger the modal with a button -->
						<button type="button" class="btn btn-info btn-block" onclick="appendModalWms('<?php echo ($_GET["mapName"]) ?>')"><h2><?php echo($_GET["mapName"]) ?></h2></button>
					</div>
					<div id="layersList">
						<ol class="simple_with_animation vertical">
						</ol>
					</div>
					<div class="btn-group btn-group-justified" role="group">
						<a href="#" id="saveMapButton" class="btn btn-lg btn-success" onclick="confirmSaveMap()"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar Mapa</a>
						<a href="#" id="cancelMapButton" class="btn btn-lg btn-danger" onclick="confirmCleanMap()"><span class="glyphicon glyphicon-remove"></span>  </a>
					</div>
					<div class="separator"></div>
					<div id="logout">
						<p>Conectado como: <span class="glyphicon glyphicon-user"></span><strong> <?php session_start(); echo($_SESSION["username"]);?></strong></p>
						<a href="#" class="btn btn-lg btn-warning"><span class="glyphicon glyphicon-log-out"></span> Logout</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="contenido" class="col-xs-9">
		<div class="row clearfix">
			<div id="allTools" class="col-xs-12 column">
				<div class="col-xs-2" id="fuentesDatos">

				</div>

				<div class="col-xs-10" id="selector">

				</div>
			</div>
			<div id="mapContainer">
				<div id="progress" class="progress"></div>
				<div id="map" class="map"></div>
			</div>
		</div>
	</div>
</div>

<!-- Modal Datos Layer -->
<div id="modalLayer" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				
			</div>
			<div class="modal-body">

			</div>
			<div class="modal-footer">
				<button type="button" onclick="updateLayerInfo()" class="btn btn-success" data-dismiss="modal">Guardar</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Datos WMS -->
<div id="modalWms" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Modificar datos del servicio WMS</h4>
			</div>
			<div class="modal-body">

			</div>
			<div class="modal-footer">
				<button type="button" onclick="updateWmsInfo()" class="btn btn-success" data-dismiss="modal">Guardar</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Atributos-->
<div id="modalAttributes" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">Seleccionar atributos</h4>
			</div>
			<div class="modal-body">
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal">Guardar</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script>
	loadingBar();
	initMenu();
	initMap('<?php echo ($_GET["mapName"])?>');
</script>
</body>
</html>