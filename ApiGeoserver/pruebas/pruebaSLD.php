<?php
	$file="styles/prueba.sld";
	$fp = fopen($file, 'r');
	$SLD=fread($fp,filesize($file));
	fclose($fp);
	$numSld=substr_count($SLD,"<UserStyle>");
	$exp=explode("<UserStyle>",$SLD);
	$header=$exp[0];
	$end=explode("</UserStyle>",$SLD)[$numSld];
	$sld_files=array();
	for($i=1;$i<=$numSld;$i++){
		$sld_file=$header."<UserStyle>".$exp[$i];
		if($i!=$numSld)
			$sld_file.=$end;
		array_push($sld_files, $sld_file);
	}
	var_dump($sld_files);
?>