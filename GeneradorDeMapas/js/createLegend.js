function create_legend(layer){
	var name = layer.get('name');
	var legend ="<img class=\"legendIcon\" src="+server+"'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+name+"' />";
	return legend;
}