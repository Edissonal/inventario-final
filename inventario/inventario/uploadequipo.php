<?php

require_once'vendor/autoload.php';
$app = new \Slim\Slim();
$db = new mysqli('localhost','root','','inventario');

//cabezeras 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}



$app ->post('/uploequipo',function() use($app,$db){

   $data = json_decode(file_get_contents('php://input', true));
    
   
  foreach($data as $row){
    $nombre =  $row->{'nombre_equi'};
    

     $query ="INSERT INTO equipo (nombre_equi) VALUES ('".$nombre."')";
     $insert = $db->query($query);

  
  }
  $result  = array (
    'status'=>'error',
    'code' =>404,
    'message'=>'Equipo no creado'
   );

if($insert){
 $result  = array (
 'status'=>'success',
 'code' =>200,
 'message'=>'Equipo creado correctamente'
);
}  
    echo json_encode($result);

});

$app->run();

?>