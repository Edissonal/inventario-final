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

//Adicionar HistoConsultas
$app ->post('/addconh',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));

    $id_ma =   $data->{'id_ma'};
    $id_equi = $data->{'id_equi'};
    $id_pro =  $data->{'id_pro'};
    $id_ciu =  $data->{'id_ciu'};
    $id_sede =  $data->{'id_sede'};    
    $id_ubi =  $data->{'id_ubi'};    
    $modelo_con =   $data->{'modelo_con'};
    $serial_con =   $data->{'serial_con'};
    $placa_con =   $data->{'placa_con'};
    $mantenimiento_con =   $data->{'mantenimiento_con'};
    $estado_hcon =   $data->{'estado_hcon'};
    $fecha_hcon =   $data->{'fecha_hcon'};
    $id_usu =   $data->{'id_usu'};
    

    $query ="INSERT INTO hisconsultas (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con,estado_hcon,fecha_hcon,id_usu) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$modelo_con."','".$serial_con."','".$placa_con."','".$mantenimiento_con."',
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

//listar provedores
$app -> get('/consultas/:id',function($id) use($db,$app){
       
       $sql="select C.id_con,D.id_ciu,D.nombre_ciu,S.id_sede,S.nombre_sede,C.id_ma,M.nombre_ma,C.id_equi,E.nombre_equi,C.id_pro,P.nombre_pro,C.id_ubi,U.nombre_ubi,C.modelo_con,C.serial_con,C.placa_con,C.mantenimiento_con
        from 
        consultas C ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D 
        where C.id_ma = M.id_ma and
        C.id_equi = E.id_equi and 
        C.id_pro =P.id_pro and 
        C.id_ubi = U.id_ubi and
        C.id_ciu = D.id_ciu and
        C.id_sede = S.id_sede and  (P.nombre_pro ='".$id."' OR C.serial_con = '".$id."' or E.nombre_equi='".$id."')";

        $query =$db->query($sql);
       
        $consultas = array();
        while($consulta = $query->fetch_assoc()){

            $consultas[] =$consulta;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$consultas
           );
    echo json_encode($result);
    
});

//consultar provedores
$app ->get ('/pro/:id', function ($id) use($db,$app){
    $sql=' select * from consultas  where  id_pro='.$id;
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

// ingresar consulta

$app ->post('/consultas',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
     $id_ma =   $data->{'id_ma'};
     $id_equi = $data->{'id_equi'};
     $id_pro =  $data->{'id_con'};
     $id_ubi =  $data->{'id_ubi'};
     $id_pro =  $data->{'id_con'}; 
     $id_ciu =  $data->{'id_ciu'};
     $id_se =  $data->{'id_se'};
     $modelo =  $data->{'modelo_con'};
     $serial =  $data->{'serial_con'};
     $placa =   $data->{'placa_con'};
     $mante =   $data->{'ti_man'};


    $query ="INSERT INTO consultas (id_ma, id_equi, id_pro,id_ciu,id_sede,id_ubi,modelo_con,serial_con,placa_con,mantenimiento_con) 
            VALUES 
            ('".$id_ma."', '".$id_equi."', '".$id_pro."','".$id_ciu."','".$id_se."','".$id_ubi."', '".$modelo."', '".$serial."', '".$placa."','".$mante."')";
            
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'consulta no creado'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'consulta creada correctamente'
    );

    }
    echo json_encode($result); 
    
});



//eliminar consulta

$app->get('/consultas-delete/:id', function($id) use($db,$app){
    $sql ='delete from consultas where id_con='.$id;
    $query= $db->query($sql);
        if($query){
            $result=array(
                'status'=> 'success',
                'code' => 200,
                'message'=>'la consulta se elimino correctamente '
               );
        }else{
            $result=array(
                'status'=> 'error',
                'code' => 404,
                'message'=>'la consulta no se a eliminado'
               );
        }
        echo json_encode($result);
        }); 

//devolver una sola consulta

$app ->get ('/consultas-con/:id', function ($id) use($db,$app){
    $sql='select C.id_con,C.id_ma,M.nombre_ma,C.id_equi,E.nombre_equi,C.id_pro,P.nombre_pro,C.id_ubi,U.nombre_ubi,modelo_con,C.serial_con,C.placa_con,C.id_ciu,CI.nombre_ciu,C.id_sede,S.nombre_sede,C.mantenimiento_con
    from consultas C ,marca M ,equipo E,provedor P,ubicacion U, ciudad CI,sede S
    where C.id_ma = M.id_ma and
    C.id_equi = E.id_equi and
    C.id_pro =P.id_pro and 
    C.id_ubi = U.id_ubi and
    C.id_ciu = CI.id_ciu and 
    C.id_sede = S.id_sede and
    id_con='.$id;
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


//actulizacion de consulta

$app->post('/consultas-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
     $id_ma =   $data->{'id_ma'};
     $id_equi = $data->{'id_equi'};
     $id_pro =  $data->{'id_pro'};
     $id_ubi =  $data->{'id_ubi'};
     $id_ciu =  $data->{'id_ciu'};
     $id_sede =  $data->{'id_sede'};
     $modelo =  $data->{'modelo_con'};
     $serial =  $data->{'serial_con'};
     $placa =   $data->{'placa_con'};
     $mantenimiento_con =   $data->{'mantenimiento_con'};

    $sql ="UPDATE consultas SET id_ma = '$id_ma', id_equi = '$id_equi', id_pro = '$id_pro', id_ciu = '$id_ciu',id_sede = '$id_sede',id_ubi = '$id_ubi',modelo_con = '$modelo',serial_con = '$serial',placa_con = '$placa',mantenimiento_con = '$mantenimiento_con'
     WHERE id_con = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'el provedor el provedor se actualizado corectamente '
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'la consulta no se a actualizado correctamente'
           );
    }
    echo json_encode($result); 
});

$app->run();

?>