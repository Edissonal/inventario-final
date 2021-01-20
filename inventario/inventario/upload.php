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

//$string = "Progress in Veterinary Science el timepo marcador nueve";

function iniciales($nombre) {
    $ret = '';
    
    $cadena = explode(" ", $nombre);

    if(count($cadena) >= 2){
    
    foreach (explode(' ', $nombre,3) as $word)
        $ret .= strtoupper($word[0]);
             strlen($ret);
           if(strlen($ret)<=2){
           return  $ret = strtoupper(substr($nombre, 0,3));
      }else{
         return $ret;
      }
      
    } else{
        //echo "toca descomponer palabra";
        return  $ret = strtoupper(substr($nombre, 0,3));
    }
}



$app ->post('/provedor',function() use($app,$db){

  $data = json_decode(file_get_contents('php://input', true));
  foreach($data as $row){

    $nombre =  $row->{'nombre_pro'};
    //$direccion =  $row->{'direccion_pro'};
    $result = $db->query("select * from provedor  where nombre_pro='".$nombre."'");
    $count=$result->num_rows;

    

    if($count == 0){


                  
          $count++;
    
        $cadena1 = strval($count);
        $cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
        $letra = iniciales($nombre);
        $valorf = $letra.$cadena2;
    
        
      $query ="INSERT INTO provedor (nombre_pro,nit_pro) VALUES ('".$nombre."','".$valorf."')";
      $insert = $db->query($query);
      
      
      
   
    }
    else{


        
      $count++;

      $cadena1 = strval($count);
      $cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
      $letra = iniciales($nombre);
      $valorf = $letra.$cadena2;


      $query ="INSERT INTO provedor (nombre_pro,nit_pro) VALUES ('".$nombre."','".$valorf."')";
      $insert = $db->query($query);

      

    
    
     

  
    }
  }
   
  
  $result  = array (
    'status'=>'error',
    'code' =>404,
    'message'=>'provedor no creado'
    );

  if($insert){
    $result  = array (
    'status'=>'success',
    'code' =>200,
    'message'=>'provedor creado correctamente'
    );
  }  
  echo json_encode($result);
});

$app->run();

?>