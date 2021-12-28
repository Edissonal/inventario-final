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

   $fallo = false;
   $imprime ='';
   $count='';
   $mensaje='';

    $validacion = array(
      "id_ma" ,
      "id_equi" ,
      "id_pro" ,
      "id_ubi" ,
      "modelo_con" ,
      "serial_con" ,
      "id_ciu" ,
      "id_sede" ,
  );  
    //validacionde cabezeras
        foreach($data as $row){

        foreach($validacion as $campo){
             

              if(!array_key_exists($campo,$row)){
               
                $imprime = $campo;
                $fallo = true;
                $mensaje='fallas en formato cabecera';
               }
            } 

            $id_ma =  $row->{'id_ma'};
            $result = $db->query("select * from marca  where id_ma='".$id_ma."'");
            $count=$result->num_rows;

            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de marca no existe';
            $fallo = true;
            break;
            }
            

            $id_equi =  $row->{'id_equi'};
            $result = $db->query("select * from equipo  where id_equi='".$id_equi."'");
            $count=$result->num_rows;

            
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de equipos no existe';
            $fallo = true;
            break;
            }
            
        
            $id_pro =  $row->{'id_pro'};
            $result = $db->query("select * from provedor  where id_pro='".$id_pro."'");
            $count=$result->num_rows;

            
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de provedor no existe';
            $fallo = true;
            break;
            }
            
            $id_ciu =  $row->{'id_ciu'};
            $result = $db->query("select * from ciudad  where id_ciu='".$id_ciu."'");
            $count=$result->num_rows;

            
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de ciudad no existe';
            $fallo = true;
            break;
            }


            $id_ciu =  $row->{'id_ciu'};
            $result = $db->query("select * from ciudad  where id_ciu='".$id_ciu."'");
            $count=$result->num_rows;
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de ciudad no existe';
            $fallo = true;
            break;
            }
            
            
            $id_sede =  $row->{'id_sede'};
            $result = $db->query("select * from sede  where id_sede='".$id_sede."'");
            $count=$result->num_rows;
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de sede no existe';
            $fallo = true;
            break;
            }

            $id_ubi =  $row->{'id_ubi'};
            $result = $db->query("select * from ubicacion  where id_ubi='".$id_ubi."'");
            $count=$result->num_rows;
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de ubicacion no existe';
            $fallo = true;
            break;
            }

        
        
        
            $serial_con =  $row->{'serial_con'};
            $result = $db->query("select * from consultas  where serial_con='".$serial_con."'");
            $count=$result->num_rows;
            
            if($count > 0){
              $mensaje='ahi seriales ya cargados en la db';
              $fallo = true;
              break;
            }


            $modelo_con =  $row->{'modelo_con'};

            if(empty($modelo_con)){
              $mensaje='modelo  es obligatorio';
              $fallo = true;
              break;
            }

            $mantenimiento_con =  $row->{'mantenimiento_con'};
            if(empty($mantenimiento_con)){
              $mensaje='mantenimiento_con  es obligatorio';
              $fallo = true;
              break;
            }
            
        }

//validacion de seriales repetidos
$valor=array_count_values(array_column($data, 'serial_con'));

 foreach ($valor as $row) {

  if($row >=2){

    $mensaje='ahi seriales repetidos';
    $fallo = true;
    break;
  }
 }

 
      if($fallo == true){
       $imprime;
       $result  = array (
          'status'=>'error',
          'code' =>404,
          'message'=>$mensaje
          );
      }else{
       //implementacion de codigo 
        foreach($data as $row){

          $id_ma =  $row->{'id_ma'};
          $id_equi =  $row->{'id_equi'};
          $id_pro =  $row->{'id_pro'};
          $id_ubi =  $row->{'id_ubi'};
          $modelo =  $row->{'modelo_con'};
          $serial =  $row->{'serial_con'};
          $id_ciu =  $row->{'id_ciu'};
          $id_sede =  $row->{'id_sede'};
          $mantenimiento_con =  $row->{'mantenimiento_con'};
          
     
            $sql=' select * from provedor where  id_pro='.$id_pro;
            $query1 =$db->query($sql);
            $provedor = $query1->fetch_assoc();
            $datai= $provedor['nombre_pro'];
      
            $count++;
            
            $cadena1 = strval($count);
            $cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
            $letra = iniciales($datai);
            $valorf = $letra.$cadena2;
      
            
            $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con) VALUES
            ('".$id_ma."', '".$id_equi."', '".$id_pro."', '".$id_ciu."', '".$id_sede."', '".$id_ubi."', '".$modelo."', '".$serial."', '". $valorf."','". $mantenimiento_con."')";
            $insert = $db->query($query);
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
        }
       
      
      }
      
        echo json_encode($result);


});

$app->run();

?>