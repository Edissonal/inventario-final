<?php

$dia =12;
date_default_timezone_set('America/Bogota');

//$fecha_actual = date("Y-m-d");
$fecha_actual="2021-3-25";

  $fecha_fi= date("Y-m-d",strtotime($fecha_actual."+  ".$dia." month")); 

echo  'prueba',' ', $fecha_fi;
?>