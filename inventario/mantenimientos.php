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


//listar consultas
$app -> get('/mantenimientos/:id',function($id) use($db,$app){
       
        $sql="select C.id_con,D.id_ciu,D.nombre_ciu,S.id_sede,S.nombre_sede,C.id_ma,M.nombre_ma,C.id_equi,E.nombre_equi,C.id_pro,P.nombre_pro,C.id_ubi,U.nombre_ubi,C.modelo_con,C.serial_con,C.placa_con
        from 
        consultas C ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D 
        where C.id_ma = M.id_ma and
        C.id_equi = E.id_equi and 
        C.id_pro =P.id_pro and 
        C.id_ubi = U.id_ubi and
        C.id_ciu = D.id_ciu and
        C.id_sede = S.id_sede and nombre_pro  like''".$id."'%'";
        $query =$db->query($sql);

       
        $consultas = array();
        while($consulta = $query->fetch_assoc()){
               
           $datos = array('fecha_man'=>'dd/mm/yyy','estado_man'=>'encurso','periodicidad_man'=>'semestral','fecha_pro_man'=>'dd/mm/yyy');

           $resultados = array_merge((array)$consulta , (array)$datos);
           
           $consultas[] =$resultados;

        }
        $consultas2 = array();
        $sql2 ="select * from mantenimiento";
        $query2 =$db->query($sql2);
        while($consulta2 = $query2->fetch_assoc()){
            $consultas2[] =$consulta2;
     }
     $estado = true;
      $consultas3 = array();
     foreach($consultas as $row){
      
        $valor1= $row["id_con"];
        
        foreach($consultas2 as $row2){
            $valor2= $row2["id_con"];
    
            if($valor1 == $valor2){
                $estado=false;
                break;
            }else{
                $estado = true;
            }

       }
       if($estado == true){
        array_push($consultas3,$row);    
       }
    
     }
     
        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$consultas3
           );
    echo json_encode($result);
        
    
    
});


// ingresar mantenimiento

$app ->post('/mantenimientos',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    foreach($data as $row){
     $id_ma =   $row->{'id_ma'};
     $id_equi = $row->{'id_equi'};
     $id_pro =  $row->{'id_pro'};
     $id_ciu =  $row->{'id_ciu'};
     $id_sede =  $row->{'id_sede'}; 
     $id_con  =  $row->{'id_con'};
     $id_ubi =  $row->{'id_ubi'};
     $fecha_man=   $row->{'fecha_man'};
     $estado_man=   $row->{'estado_man'};
     $periodicidad_man=   $row->{'periodicidad_man'};
     $fecha_pro_man=   $row->{'fecha_pro_man'};


   $query ="INSERT INTO mantenimiento (
            id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man) 
            VALUES 
            ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_pro_man."')";
            
    $insert = $db->query($query);

   }
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'mantenimiento no creado correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'mantenimiento creado correctamente'
    );

    }
    echo json_encode($result);    
});



//relizar consulta tabla mantenimientos

$app ->get ('/consultasman/:id', function ($id) use($db,$app){
    $sql="SELECT M.id_man,M.id_con,M.id_ma,MA.nombre_ma,M.id_equi,E.nombre_equi ,M.id_pro,P.nombre_pro,M.id_ciu,CI.nombre_ciu,M.id_sede,S.nombre_sede,M.id_ubi,U.nombre_ubi,M.estado_man,M.periodicidad_man,M.fecha_pro_man
    from mantenimiento M  , consultas C, marca MA, equipo E,provedor P, ciudad CI, sede S , ubicacion U
    
    WHERE
    
    M.id_con = C.id_con and
    M.id_ma = MA.id_ma and
    M.id_equi = E.id_equi and 
    M.id_pro = P.id_pro and
    M.id_ciu = CI.id_ciu and
    M.id_sede = S.id_sede  and
    M.id_ubi = U.id_ubi and 
    P.nombre_pro like''".$id."'%'";
    $query =$db->query($sql);
    

    $mantenimientos = array();
    while($mante = $query->fetch_assoc()){

        $mantenimientos[] =$mante;
    }

    $result  = array (
        'status'=>'success',
        'code' =>200,
        'data'=>$mantenimientos
       );
echo json_encode($result);

});


//devolver datos serial  de consulta

$app->get('/consulman/:id',function($id) use($db,$app){

    $sql="select C.id_con,D.id_ciu,D.nombre_ciu,S.id_sede,S.nombre_sede,C.id_ma,M.nombre_ma,C.id_equi,E.nombre_equi,C.id_pro,P.nombre_pro,C.id_ubi,U.nombre_ubi,C.modelo_con,C.serial_con,C.placa_con
        from 
        consultas C ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D 
        where C.id_ma = M.id_ma and
        C.id_equi = E.id_equi and 
        C.id_pro =P.id_pro and 
        C.id_ubi = U.id_ubi and
        C.id_ciu = D.id_ciu and
        C.id_sede = S.id_sede and serial_con  like''".$id."'%'";
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


$app ->post('/addman',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));

    $id_ma =   $data->{'id_ma'};
    $id_equi = $data->{'id_equi'};
    $id_pro =  $data->{'id_pro'};
    $id_ciu =  $data->{'id_ciu'};
    $id_sede =  $data->{'id_sede'}; 
    $id_con  =  $data->{'id_con'};
    $id_ubi =  $data->{'id_ubi'};
    $fecha_man =   $data->{'fecha_man'};
    $estado_man =   $data->{'esta_man'};
    $periodicidad_man =   $data->{'peri_man'};
    $fecha_pro_man =   $data->{'fecha_pro_man'};


    $query ="INSERT INTO mantenimiento (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_pro_man."')";
     $insert = $db->query($query);  

    $result  = array (
            'status'=>'error',
            'code' =>404,
            'message'=>'mantenimiento no creado correctamente'
    );
        
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'mantenimiento creado correctamente'
    );
    
    }
    echo json_encode($result);    
    
});




$app->run();

?>