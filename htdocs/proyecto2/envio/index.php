<?php
require_once 'vendor/autoload.php';

$app= new \Slim\Slim();

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app ->get("/pruebas",function()use($app){
    echo "Holamundo desde slim";
   //var_dump($db);

});

$app ->get("/provando",function()use($app){
    echo "Este es otro metodo ";

});

$app->post('/productos', function() use($app){
	
  $params =json_decode(file_get_contents('php://input'), TRUE);
  
   
  $nombre = $params["nombre"];
  $correo = $params["correo"];
  $mensaje = $params["mensaje"];

   $destino = "comercial@tecsoni.com.co";
   $contenido ="Nombre:". $nombre . "\nCorreo:" . $correo .  "\nmensaje:"  . $mensaje ;
   mail($destino,"Datos de Contacto Pagina",$contenido); 

});

$app ->run();
?>