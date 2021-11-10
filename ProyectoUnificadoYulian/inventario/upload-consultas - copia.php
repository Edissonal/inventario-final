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

    $id_ma =  $row->{'id_ma'};
    $id_equi =  $row->{'id_equi'};
    $id_pro =  $row->{'id_pro'};
    $id_ubi =  $row->{'id_ubi'};
    $modelo =  $row->{'modelo_con'};
    $serial =  $row->{'serial_con'};
    $id_ciu =  $row->{'id_ciu'};
    $id_sede =  $row->{'id_sede'};

    $result = $db->query("select * from consultas  where id_pro='".$id_pro."'");
    $count=$result->num_rows;

    if($count == 0){

      $sql=' select * from provedor where  id_pro='.$id_pro;
      $query1 =$db->query($sql);
      $provedor = $query1->fetch_assoc();
      $datai= $provedor['nombre_pro'];

      $count++;
      
      $cadena1 = strval($count);
      $cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
      $letra = iniciales($datai);
      $valorf = $letra.$cadena2;

      
      $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con) VALUES
      ('".$id_ma."', '".$id_equi."', '".$id_pro."', '".$id_ciu."', '".$id_sede."', '".$id_ubi."', '".$modelo."', '".$serial."', '". $valorf."')";
      $insert = $db->query($query);

     
    }
    else{
      $sql=' select * from provedor where  id_pro='.$id_pro;
      $query1 =$db->query($sql);
      $provedor = $query1->fetch_assoc();
      $datai= $provedor['nombre_pro'];

      $count++;
      
      $cadena1 = strval($count);
      $cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
      $letra = iniciales($datai);
      $valorf = $letra.$cadena2;

      
      $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con) VALUES
      ('".$id_ma."', '".$id_equi."', '".$id_pro."', '".$id_ciu."', '".$id_sede."', '".$id_ubi."', '".$modelo."', '".$serial."', '". $valorf."')";
      $insert = $db->query($query);
    }
  }
  $result  = array (
    'status'=>'error',
    'code' =>404,
    'message'=>'productos no creados'
    );

  if($insert){
    $result  = array (
    'status'=>'success',
    'code' =>200,
    'message'=>'productos creados correctamente'
    );
  }
  echo json_encode($result);

});

$app->run();

?>