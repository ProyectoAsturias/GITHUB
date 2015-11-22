<?php
	include_once("configuration.php");
	$tomcatServer = $GLOBALS["TOMCATHOST"].':'.$GLOBALS["TOMCATPORT"];
	$loginTomcatJava = $tomcatServer.'/LocalGIS/java/Java.inc';
	$printTomcatJava = $tomcatServer.'/JavaBridge/java/Java.inc';
?>
