<?php
require_once 'vendor/autoload.php';

$app= new \Slim\Slim();


$app ->get("/pruebas",function()use($app){
    echo "Holamundo desde slim";
   //var_dump($db);

});

$app ->get("/provando",function()use($app){
    echo "Este es otro metodo ";

});

$app->post('/productos', function() use($app){
	$json = $app->request->post('json');
    $data = json_decode($json, true);
  
   
    $destino = "edissonalonso@gmail.com";
    $nombre = $data['nombre'];
    $correo = $data['correo'];
    $mensaje = $data['mensaje'];

    
   $contenido ="Nombre:". $nombre . "\nCorreo:" . $correo .  "\nmensaje:"  . $mensaje ;
   mail($destino,"Datos de Contacto Pagina",$contenido);
    #header("Location:correo.html");

});

$app ->run();
?>