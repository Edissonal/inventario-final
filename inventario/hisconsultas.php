<?php

require_once'vendor/autoload.php';
$app = new \Slim\Slim();
include("implement.php");

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


//listar historico consultas
$app -> get('/hisconsultas/:id',function($id) use($db,$app){
       
    $sql="select
    H.id_ma,M.nombre_ma,
    H.id_equi,E.nombre_equi,
    H.id_pro,P.nombre_pro,
    D.id_ciu,D.nombre_ciu,
    S.id_sede,S.nombre_sede,	
    H.id_ubi,U.nombre_ubi,
    H.modelo_con,
    H.serial_con,
    H.placa_con,
    H.mantenimiento_con,
    H.estado_hcon,
    H.fecha_hcon,
	H.id_usu,Us.nombre_usu
    
    from 
        
        hisconsultas H ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D, usuario Us 
        where 
        H.id_ma = M.id_ma and
        H.id_equi = E.id_equi and 
        H.id_pro =P.id_pro and 
        H.id_ubi = U.id_ubi and
        H.id_ciu = D.id_ciu and
        H.id_sede = S.id_sede and
	    H.id_usu = Us.id_usu and (P.nombre_pro  like '".$id."%' OR Us.nombre_usu  like'".$id."%') ORDER BY fecha_hcon DESC";

        $query =$db->query($sql);
       
        $hisconsultas = array();
        while($hisconsulta = $query->fetch_assoc()){

            $hisconsultas[] =$hisconsulta;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$hisconsultas
           );
    echo json_encode($result);
});

//consultar provedores
$app ->get ('/pro/:id', function ($id) use($db,$app){
    $sql=' select * from hisconsultas  where  id_pro='.$id;
    $query =$db->query($sql);
       
    $consultas = array();
   
    
      while($row = $query->fetch_assoc()){
          
          $id_pro = $row["id_pro"];
          $placa = $row["placa_con"];
     }
   


$respuesta =substr($placa, 3);
$integer = (int)$respuesta;
$resultado = $integer + 1;
$cadena1 = strval($resultado);
$cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
$cadena2;

$sql=' select * from provedor where  id_pro='.$id;
$query1 =$db->query($sql);
$provedor = $query1->fetch_assoc();
$datai= $provedor['nombre_pro'];
$datai;
$letra = iniciales($datai);
$valorf = $letra.$cadena2;

$consultas = array(

    "id_con" => $id_pro,
    "nombre_con" =>$datai,
    "placa_con" =>$valorf
);

   $result  = array (
        'status'=>'success',
        'code' =>200,
        'data'=>$consultas
       );
    echo json_encode($result);
});

//devolver una sola consulta

$app ->get ('/consultas-con/:id', function ($id) use($db,$app){
    $sql='select
	H.id_ma,M.nombre_ma,
	H.id_equi,E.nombre_equi,
	H.id_pro,P.nombre_pro,
	D.id_ciu,D.nombre_ciu,
	S.id_sede,S.nombre_sede,	
	H.id_ubi,U.nombre_ubi,
	H.modelo_con,
	H.serial_con,
	H.placa_con,
	H.mantenimiento_con,
	H.estado_hcon,
	H.fecha_hcon,
	H.id_usu,Us.nombre_usu	
        from 
        hisconsultas H ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D 
        where 
		H.id_ma = M.id_ma and
        H.id_equi = E.id_equi and 
        H.id_pro =P.id_pro and 
        H.id_ubi = U.id_ubi and
        H.id_ciu = D.id_ciu and
        H.id_sede = S.id_sede and
		H.id_usu = Us.id_usu and
        id_hcon='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'consulta no disponible'
    );

    if($query ->num_rows == 1 ){
     $con = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$con
    );
    }
    echo json_encode($result);
});

//Adicionar HistoConsultas
$app ->post('/addconh',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));

    $id_ma =   $data->{'id_ma'};
    $id_equi = $data->{'id_equi'};
    $id_pro =  $data->{'id_con'};
    $id_ciu =  $data->{'id_ciu'};
    $id_se =  $data->{'id_se'};    
    $id_ubi =  $data->{'id_ubi'};    
    $modelo_con =   $data->{'modelo_con'};
    $serial_con =   $data->{'serial_con'};
    $placa_con =   $data->{'placa_con'};
    $mante =   $data->{'ti_man'};
    $estado_hcon =   $data->{'estado_hcon'};
    $fecha_hcon =   $data->{'fecha_hcon'};
    $id_usu =   $data->{'id_usu'};
    

    $query ="INSERT INTO hisconsultas (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_se."','".$id_ubi."','".$modelo_con."','".$serial_con."','".$placa_con."','".$mante."',
     '".$estado_hcon."','".$fecha_hcon."','".$id_usu."')";
     $insert = $db->query($query);  

    $result  = array (
            'status'=>'error',
            'code' =>404,
            'message'=>'Consulta no creada correctamente'
    );
        
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'Consulta creada correctamente'
    );
    
    }
    echo json_encode($result);
    
});

//cargas histoconsultas

/*$app ->post('/consultash',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    $count ='';
    $estado = true;
    $mensaje='';

    foreach($data as $row){


        $id_ma =  $row->{'id_ma'};
        $result = $db->query("select * from marca  where id_ma='".$id_ma."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id marca invalida';
            break;  
        }
    
        $id_equi =  $row->{'id_equi'};
        $result = $db->query("select * from equipo  where id_equi='".$id_equi."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id equipo invalida';
            break;  
        }

        $id_pro =  $row->{'id_pro'};
        $result = $db->query("select * from provedor  where id_pro='".$id_pro."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id provedor invalida';
            break;  
        }

        $id_ciu =  $row->{'id_ciu'};
        $result = $db->query("select * from ciudad  where id_ciu='".$id_ciu."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id ciudad invalida';
            break;  
        }

        $id_se =  $row->{'id_sede'};
        $result = $db->query("select * from sede  where id_sede='".$id_se."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id sede invalida';
            break;  
        }

        $id_ubi =  $row->{'id_ubi'};
        $result = $db->query("select * from ubicacion  where id_ubi='".$id_ubi."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id ubicacion invalida';
            break;  
        }

        $modelo_con =  $row->{'modelo_con'};
        if(empty($modelo_con)){
          $mensaje='Modelo es obligatorio';
          $estado = false;
          break;
        }

        $serial_con =  $row->{'serial_con'};
        if(empty($serial_con)){
          $mensaje='Serial es obligatorio';
          $estado = false;
          break;
        }
		
        $mante =  $row->{'mantenimiento_con'};
        if(empty($mante)){
          $mensaje='Indicar si tiene o no mantenimiento es obligatorio';
          $estado = false;
          break;
        }
		
		$estado_hcon =  $row->{'estado_hcon'};
        if(empty($estado_hcon)){
          $mensaje='estado man es obligatorio';
          $estado = false;
          break;
        }
		
		$fecha_hcon =  $row->{'fecha_hcon'};
        if(empty($fecha_hcon)){
          $mensaje='Fecha man es obligatorio';
          $estado = false;
          break;
        }
   

        $id_usu =  $row->{'id_usu'};
        if(empty($id_usu)){
          $mensaje='id_usu man es obligatorio';
          $estado = false;
          break;
        }

    }   
    
    
if($estado == true){
    foreach($data as $row){
	$id_ma =   $row->{'id_ma'};
    $id_equi = $row->{'id_equi'};
    $id_pro =  $row->{'id_pro'};
    $id_ciu =  $row->{'id_ciu'};
    $id_se =  $row->{'id_sede'};    
    $id_ubi =  $row->{'id_ubi'};    
    $modelo_con =   $row->{'modelo_con'};
    $serial_con =   $row->{'serial_con'};
    $placa_con =   $row->{'placa_con'};
    $mante =   $row->{'mantenimiento_con'};
    $estado_hcon =   $row->{'estado_hcon'};
    $fecha_hcon =   $row->{'fecha_hcon'};
    $id_usu =   $row->{'id_usu'};
    

    $query ="INSERT INTO hisconsultas (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_se."','".$id_ubi."','".$modelo_con."','".$serial_con."','".$placa_con."','".$mante."',
     '".$estado_hcon."','".$fecha_hcon."','".$id_usu."')";
     $insert = $db->query($query);
   
      }
       $result  = array (
           'status'=>'error',
           'code' =>404,
           'message'=>'Inventario no creado correctamente'
          );
       
       if($insert){
        $result  = array (
        'status'=>'success',
        'code' =>200,
        'message'=>'Inventario creado correctamente'
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
}); */

$app ->post('/consultash',function() use($app,$db){
	
	$data = json_decode(file_get_contents('php://input', true));
	
	foreach($data as $row){
	$id_ma =   $row->{'id_ma'};
    $id_equi = $row->{'id_equi'};
    $id_pro =  $row->{'id_pro'};
    $id_ciu =  $row->{'id_ciu'};
    $id_se =  $row->{'id_sede'};    
    $id_ubi =  $row->{'id_ubi'};    
    $modelo_con =   $row->{'modelo_con'};
    $serial_con =   $row->{'serial_con'};
    $placa_con =   $row->{'placa_con'};
    $mante =   $row->{'mantenimiento_con'};
    $estado_hcon =   $row->{'estado_hcon'};
    $fecha_hcon =   $row->{'fecha_hcon'};
    $id_usu =   $row->{'id_usu'};
	
	//echo json_encode($placa_con);
    

    $query ="INSERT INTO hisconsultas (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_se."','".$id_ubi."','".$modelo_con."','".$serial_con."','".$placa_con."','".$mante."',
     '".$estado_hcon."','".$fecha_hcon."','".$id_usu."')";
     $insert = $db->query($query);
   
      }
       $result  = array (
           'status'=>'error',
           'code' =>404,
           'message'=>'Inventario no creado correctamente'
          );
       
       if($insert){
        $result  = array (
        'status'=>'success',
        'code' =>200,
        'message'=>'Inventario creado correctamente'
       );
   
       }
	echo json_encode($result);   
});
$app->run();

?>