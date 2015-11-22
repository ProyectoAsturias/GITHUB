var GSHOST="asturiasmodelo.dyndns.org";
var GSPORT="8090";
var GSUSER="admin";
var GSPASS="geoserver";
var GSAUTH="privateUser:1234";
//var APACHEHOST="asturiasmodelo.dyndns.org";
//var APACHEPORT="8092";
var APACHEHOST = "localhost";
var APACHEPORT = "8090";

var server = "http://"+APACHEHOST+":"+APACHEPORT+"/Asturias/";
var serverGS = "http://"+GSHOST+":"+GSPORT+"/";
var installationPath = "../../";
var apiPath = installationPath+"GeoserverApi/";
var mapPath = installationPath+"MapGenerator/";
var viewPath = installationPath+"ViewGenerator/";
var tablesPath = installationPath+"Asturias/Tables/";
var destPath = installationPath+"Views/";
var printingServer = server;
var printingPath = printingServer+"JasperReports/";

var auth = btoa(GSAUTH);
var requestCapabilities='/wms?request=getCapabilities&service=wms';
