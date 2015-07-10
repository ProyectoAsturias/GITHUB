<?php
	include "classes/Connection.php";
	include "classes/LocalgisStyle.php";
	if(isset($_POST['idLayer'])){
		$idFamily=$_POST['idLayer'];
		print(getStyles($idLayer));
	}
	else
		print(json_encode("Error: falta idLayer"));
	//print(getStyles(12563));

/**
 * Obtiene los estilos de una capa de LocalGis mediante su Id.
 * @param $idLayer
 * @return string
 */
function getStyles($idLayer){
		$connection = new ServerConnection();
		$query = "SELECT s.id_style, s.xml FROM layers as l,styles as s WHERE l.id_styles = s.id_style AND l.id_layer='".$idLayer."'";
		$result = pg_query($query) or die('Error: '.pg_last_error());
		$connection->dbClose();
		$styles = array();
		$i = 0;
		while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
			$style_attributes = array();
			$j = 0;
		    foreach ($line as $col_value) {
		        $style_attributes[$j++]=$col_value;
		    }
		    $styles[$i++]= new LocalgisStyle($style_attributes);
		}
		return json_encode($styles);
	}
?>