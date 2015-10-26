var serverUrl = "asturiasmodelo.dyndns.org";
var port = "8092";
var portGS = "8090";

var server = "http://"+serverUrl+":"+port+"/";
var serverGS = "http://"+serverUrl+":"+portGS+"/";
//var serverGS = "http://"+"192.168.1.39"+":"+portGS+"/";
var installationPath = "../../";
var apiPath = installationPath+"GeoserverApi/";
var mapPath = installationPath+"MapGenerator/";
var viewPath = installationPath+"ViewGenerator/";
var tablesPath = installationPath+"Asturias/Tables/";
var destPath = installationPath+"Views/";
var printingServer = server;
var printingPath = printingServer+"JasperReports/";

var auth = btoa('admin:geoserver');
var requestCapabilities='/wms?request=getCapabilities&service=wms';
