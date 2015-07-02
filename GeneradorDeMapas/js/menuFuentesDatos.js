function initMenu(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosWms(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosMapLocalgis(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);
}

function menuDatosLayersLocalgis(){
	var menuHtml=	"<button onclick='showListWms()' class=\"btn btn-primary btn-block\" style=\"height:30%; min-height:4ex\"> Wms Externo</button>"+
					"<button onclick='showListMaps()' class=\"btn btn-primary btn-block \" style=\"height:30%; min-height:4ex\"> Mapas Localgis</button>"+
					"<button onclick='showListFamilies()' class=\"btn btn-primary btn-block btn-info\" style=\"height:30%; min-height:4ex\"> Capas Localgis</button>";
	$("#fuentesDatos").empty().append(menuHtml);	
}