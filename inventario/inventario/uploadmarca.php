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



$app ->post('/uplomarca',function() use($app,$db){

   $data = json_decode(file_get_contents('php://input', true));
    
   
  foreach($data as $row){
    $nombre =  $row->{'nombre_ma'};
    

     $query ="INSERT INTO marca (nombre_ma) VALUES ('".$nombre."')";
     $insert = $db->query($query);

  
  }
  $result  = array (
    'status'=>'error',
    'code' =>404,
    'message'=>'marca no creada'
   );

if($insert){
 $result  = array (
 'status'=>'success',
 'code' =>200,
 'message'=>'marca creado correctamente'
);
}  
    echo json_encode($result);

});

$app->run();

?>