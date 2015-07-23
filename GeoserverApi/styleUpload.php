<?php
$data=$_FILES['inputSld'];
$current = file_get_contents($data["tmp_name"]);
$error=file_put_contents('styles/uploadStyle.sld', $current);
//aqui debemos crear el estilo.
//y luego asignar el estilo a la capa
$prueba="error";
$json=json_encode($prueba);
echo ($json);

?>


