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

   $fallo = true;
   $imprime ='';
   $count='';
   $mensaje='';

    $validacion = array(
	  "id_equi" ,
      "id_ma" ,      
      "id_pro" ,
	  "id_ciu" ,
      "id_sede" ,
      "id_ubi" ,
      "modelo_con" ,
      "serial_con" ,
	  "mantenimiento_con" ,
      
  );  
    //validacion de cabezeras
        foreach($data as $row){

        foreach($validacion as $campo){
             

              if(!array_key_exists($campo,$row)){
               
                $fallo = false;
                $mensaje='fallas en formato campos vacios en archios';
               }
            } 
		}
		
		if($fallo == true){
			foreach($data as $row){
		
			
			$id_equi =  $row->{'id_equi'};
            $result = $db->query("select * from equipo  where id_equi='".$id_equi."'");
            $count=$result->num_rows;

            
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de equipos no existe';
            $fallo = false;
            break;
            }

            $id_ma =  $row->{'id_ma'};
            $result = $db->query("select * from marca  where id_ma='".$id_ma."'");
            $count=$result->num_rows;

            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de marca no existe';
            $fallo = false;
            break;
            }                
            
        
            $id_pro =  $row->{'id_pro'};
            $result = $db->query("select * from provedor  where id_pro='".$id_pro."'");
            $count=$result->num_rows;           
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de provedor no existe';
            $fallo = false;
            break;
            }
            
            $id_ciu =  $row->{'id_ciu'};
            $result = $db->query("select * from ciudad  where id_ciu='".$id_ciu."'");
            $count=$result->num_rows;

            
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de ciudad no existe';
            $fallo = false;
            break;
            }


            $id_sede =  $row->{'id_sede'};
            $result = $db->query("select * from sede  where id_sede='".$id_sede."'");
            $count=$result->num_rows;
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de sede no existe';
            $fallo = false;
            break;
            }

            $id_ubi =  $row->{'id_ubi'};
            $result = $db->query("select * from ubicacion  where id_ubi='".$id_ubi."'");
            $count=$result->num_rows;
            
            if($count > 0){

            }elseif($count === 0){

            $mensaje='id de ubicacion no existe';
            $fallo = false;
            break;
            }
			
			$modelo_con =  $row->{'modelo_con'};
            if(empty($modelo_con)){
              $mensaje='modelo  es obligatorio';
              $fallo = false;
              break;
            }
			
			    
           $serial_con =  $row->{'serial_con'};
            $result = $db->query("select * from consultas  where serial_con='".$serial_con."'");
            $count=$result->num_rows;
            
            if($count > 0){
              $mensaje='Campo Serial vacio o se encuentra duplicado en archivo Inventario';
              $fallo = false;
              break;
            }		

            $mantenimiento_con =  $row->{'mantenimiento_con'};
            if(empty($mantenimiento_con)){
              $mensaje='mantenimiento_con  es obligatorio';
              $fallo = false;
              break;
            }
			
		}
	}
            
        

//validacion de seriales repetidos
$valor=array_count_values(array_column($data, 'serial_con'));

 foreach ($valor as $row) {

  if($row >=2){

    $mensaje='ahi seriales repetidos';
    $fallo = false;
    break;
  }
 }

 
      if($fallo == true){
       $imprime;
       
	     foreach($data as $row){

			$id_ma =  $row->{'id_ma'};
			$id_equi =  $row->{'id_equi'};
			$id_pro =  $row->{'id_pro'};
			$id_ciu =  $row->{'id_ciu'};
			$id_sede =  $row->{'id_sede'};
			$id_ubi =  $row->{'id_ubi'};
			$modelo =  $row->{'modelo_con'};
			$serial =  $row->{'serial_con'};	
			$mante =   $row->{'mantenimiento_con'};
			
			$estado_hcon =   $row->{'estado_hcon'};
			$fecha_hcon =   $row->{'fecha_hcon'};
			$id_usu =   $row->{'id_usu'};
    
	

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

				  
				  $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con) VALUES
				  ('".$id_ma."', '".$id_equi."', '".$id_pro."', '".$id_ciu."', '".$id_sede."', '".$id_ubi."', '".$modelo."', '".$serial."', '". $valorf."','".$mante."')";
				  $insert = $db->query($query);
				  
				   
				  //Query para hacer insertar datos en tabla histoconsultas
				  
				  $queryh ="INSERT INTO hisconsultas(id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
				  VALUES 
				  ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$modelo."','".$serial."','". $valorf."','".$mante."',
				 '".$estado_hcon."','".$fecha_hcon."','".$id_usu."')";
				 $inserth = $db->query($queryh);
				  

				 
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

					  
					  $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con) VALUES
					  ('".$id_ma."', '".$id_equi."', '".$id_pro."', '".$id_ciu."', '".$id_sede."', '".$id_ubi."', '".$modelo."', '".$serial."', '". $valorf."','".$mante."')";
					  $insert = $db->query($query);
					  
						  
					  //Query para hacer insertar datos en tabla histoconsultas
					  
					  $queryh ="INSERT INTO hisconsultas (
					id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
					VALUES 
					('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$modelo."','".$serial."','".$valorf."','".$mante."',
					 '".$estado_hcon."','".$fecha_hcon."','".$id_usu."')";
					 $inserth = $db->query($queryh);
					  
					  
					}
			}
				  $result  = array (
					'status'=>'error',
					'code' =>404,
					'message'=>'productos no creados'
					);

				  if($insert && $inserth){
					$result  = array (
					'status'=>'success',
					'code' =>200,
					'message'=>'productos creados correctamente'
					);
					}
	   
      }else{
		  $result  = array (
		  'status'=>'error',
          'code' =>404,
          'message'=>$mensaje
        );
       
      
      }
      
        echo json_encode($result);


});

$app->run();

?>