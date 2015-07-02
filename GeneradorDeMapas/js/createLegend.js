function create_legend(layer){
	var response=layer.getSource().p;
	console.log(response);
	var urlWms= response.split("#");
	var legend ="<img class=\"legendIcon\" src='"+urlWms[0]+"?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER="+layer.name+"' />";
	return legend;
}