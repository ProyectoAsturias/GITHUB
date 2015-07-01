<?php
	include "Connection.php";
	include "ApiRest.php";
	$connection = new ServerConnection("Arbolado","Map_Arbolado");
	$geoserver = new ApiRest('http://'.$connection->gsHost.':8080/geoserver',$connection->gsUser, $connection->gsPassword);
	/*$dbconn = pg_connect("host=".$connection->dbHost." dbname=".$connection->dbName." user=".$connection->dbUser." password=".$connection->dbPass)  or die('Error: '.pg_last_error());
	$query = "SELECT s.id_style, l.id_layer, l.stylename, s.xml FROM layers_styles as l, styles as s WHERE l.id_style=s.id_style AND id_map='497' AND id_layer='12320'";
	$result = pg_query($query) or die('Error: '.pg_last_error());
	$styles = array();
	while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
	    $styleName = $line["stylename"];
	    $SLD = $line["xml"]; 
		$file_sld = 'prueba.tmp';
		$fp = fopen($file_sld, 'w');
		fwrite($fp, $SLD);
		fclose($fp);
	}*/
	//curl -v -u admin:geoserver -XPUT -H 'Content-type: text/xml' -d '<layer><defaultStyle><name>prueba12:scbarbol1:_:default:scbarbol1</name></defaultStyle></layer>' http://localhost:8080/geoserver/rest/layers/prueba12:scbarbol1
	/*$layerName="scbarbol1";
	$styleName="scbarbol1:_:default:scbarbol1";
	$geoserver->defaultStyleToLayer($connection->wsName, $layerName, $styleName);*/
	$styleName="hey";
	$SLD = '<?xml version="1.0" encoding="ISO-8859-1"?>'.
'<StyledLayerDescriptor version="1.0.0" '.
 'xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" '.
 'xmlns="http://www.opengis.net/sld" '.
 'xmlns:ogc="http://www.opengis.net/ogc" '.
 'xmlns:xlink="http://www.w3.org/1999/xlink" '.
 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'.
  '<!-- a Named Layer is the basic building block of an SLD document -->'.
  '<NamedLayer>'.
    '<Name>sld</Name>'.
    '<UserStyle>'.
    '<!-- Styles can have names, titles and abstracts -->'.
      '<Title>Default Polygon</Title>'.
      '<Abstract>A sample style that draws a polygon</Abstract>'.
      '<!-- FeatureTypeStyles describe how to render different features -->'.
      '<!-- A FeatureTypeStyle for rendering polygons -->'.
      '<FeatureTypeStyle>'.
        '<Rule>'.
          '<Name>rule1</Name>'.
          '<Title>Gray Polygon with Black Outline</Title>'.
          '<Abstract>A polygon with a gray fill and a 1 pixel black outline</Abstract>'.
          '<PolygonSymbolizer>'.
            '<Fill>'.
              '<CssParameter name="fill">#AAAAAA</CssParameter>'.
            '</Fill>'.
            '<Stroke>'.
              '<CssParameter name="stroke">#000000</CssParameter>'.
              '<CssParameter name="stroke-width">1</CssParameter>'.
            '</Stroke>'.
          '</PolygonSymbolizer>'.
        '</Rule>'.
      '</FeatureTypeStyle>'.
    '</UserStyle>'.
  '</NamedLayer>'.
'</StyledLayerDescriptor>';
	print($SLD);	

	$geoserver->createStyle($styleName, $connection->wsName, $SLD);
?>