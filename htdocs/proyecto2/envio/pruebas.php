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
	
    $data = json_decode(file_get_contents('php://input', true));
      
       
    $nombre = $data->{'nombre'};
    $correo = $data->{'correo'};
    $mensaje = $data->{'mensaje'};

    $remitente = "edissonandresalonso@hotmail.com";
    $destinatario = "edissonalonso@gmail.com";
    $asunto = "Te contactaron en el formulario de tu sitio web";
    $mensaje = "MENSAJE DE SCRIPT A LAS 8";
    $headers = "From: $remitente\r\nReply-to: $remitente";
    
    mail($destinatario, $asunto, $mensaje, $headers);


    $result  = array (
        'status'=>'success',
        'code' =>200,
        'message'=>'provedor creado correctamente'
       );

 echo json_encode($result);

    
    
     /*  $destino = "edissonalonso@gmail.com";
       $contenido ="Nombre:". $nombre . "\nCorreo:" . $correo .  "\nmensaje:"  . $mensaje ;
       mail($destino,"Datos de Contacto Pagina yuliam",$contenido); 

       /*if($contenido){
        $result  = array (
        'status'=>'success',
        'code' =>200,
        'message'=>'provedor creado correctamente'
       );
   
       }else{
        $result  = array (
            'status'=>'success',
            'code' =>400,
            'message'=>'correo no enviado'
           );
       
       }
       echo json_encode($result); */

    });

$app ->run();
?>