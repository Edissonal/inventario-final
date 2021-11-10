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
date_default_timezone_set('America/Bogota');

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

function validarFecha($fecha_man, $format = 'Y-m-d')
{
    $d = DateTime::createFromFormat($format, $fecha_man);
    return $d && $d->format($format) == $fecha_man;
}
//listar consultas
$app -> get('/mantenimientos/:id',function($id) use($db,$app){
       
        $sql="select C.id_con,D.id_ciu,D.nombre_ciu,S.id_sede,S.nombre_sede,C.id_ma,M.nombre_ma,C.id_equi,E.nombre_equi,C.id_pro,P.nombre_pro,C.id_ubi,U.nombre_ubi,C.modelo_con,C.serial_con,C.placa_con,C.mantenimiento_con
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
               
           $datos = array('fecha_man'=>'YYY-MM-DD','estado_man'=>'encurso','periodicidad_man'=>'6','costo_man'=>'20000');

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


// ingresar Carga

$app ->post('/mantenimientos',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    $count ='';
    $estado = true;
    $mensaje='';

    foreach($data as $row){

        $fecha_man=   $row->{'fecha_man'};

        $prueba = validarFecha($fecha_man);
              
            if($prueba == true){
            
            }else{
            $estado = false;
            $mensaje ="Formato fecha incorrecto";
            break;  
            }

        $id_con =  $row->{'id_con'};
        $result = $db->query("select * from consultas  where id_con='".$id_con."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id consulta invalida';
            break;  
        }

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

        $id_sede =  $row->{'id_sede'};
        $result = $db->query("select * from sede  where id_sede='".$id_sede."'");
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

        $estado_man =  $row->{'estado_man'};
        if(empty($estado_man)){
          $mensaje='estado   es obligatorio';
          $estado = false;
          break;
        }

        $periodicidad_man =  $row->{'periodicidad_man'};
        if(empty($periodicidad_man)){
          $mensaje='periodicidad es obligatorio';
          $estado = false;
          break;
        }


        $costo_man =  $row->{'costo_man'};
        if(empty($costo_man)){
          $mensaje='costo man es obligatorio';
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
        $id_sede =  $row->{'id_sede'}; 
        $id_con  =  $row->{'id_con'};
        $id_ubi =  $row->{'id_ubi'};
        $fecha_man=   $row->{'fecha_man'};
        $estado_man=   $row->{'estado_man'};
        $periodicidad_man=   $row->{'periodicidad_man'};
        $costo_man=   $row->{'costo_man'};
   
        $fecha_fi = date("Y-m-d",strtotime($fecha_man."+  ".$periodicidad_man." month")); 
   
   
      $query ="INSERT INTO mantenimiento (
               id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man,costo_man) 
               VALUES 
               ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_fi."','".$costo_man."')";
               
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
      
}else{
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>$mensaje
        );
}
echo json_encode($result);     
});



//relizar consulta tabla mantenimientos

$app ->get ('/consultasman/:id', function ($id) use($db,$app){
    $sql="SELECT M.costo_man,M.id_man,M.id_con,M.id_ma,MA.nombre_ma,M.id_equi,E.nombre_equi ,M.id_pro,P.nombre_pro,M.id_ciu,CI.nombre_ciu,M.id_sede,S.nombre_sede,M.id_ubi,U.nombre_ubi,M.estado_man,M.periodicidad_man,M.fecha_pro_man,M.fecha_man
    from mantenimiento M  , consultas C, marca MA, equipo E,provedor P, ciudad CI, sede S , ubicacion U
    
    WHERE
    
    M.id_con = C.id_con and
    M.id_ma = MA.id_ma and
    M.id_equi = E.id_equi and 
    M.id_pro = P.id_pro and
    M.id_ciu = CI.id_ciu and
    M.id_sede = S.id_sede  and
    M.id_ubi = U.id_ubi and 
    P.nombre_pro like'".$id."' ";
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
       
        if($query ->num_rows == 1 ){
            $mantenimiento = $query->fetch_assoc();
           
            $result=array(
            'status'=> 'success',
            'code' => 200,
            'data'=>$mantenimiento
           );
           }
           echo json_encode($result);
        });


//adicionamman
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
    $costo_man =   $data->{'costo_man'};

    $query ="INSERT INTO mantenimiento (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man,costo_man) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_pro_man."','".$costo_man."')";
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













//eliminar  mantenimiento

$app->get('/mantenimientos-delete/:id', function($id) use($db,$app){

    $sql ='delete from mantenimiento where id_man='.$id;
    $query= $db->query($sql);
        if($query){
            $result=array(
                'status'=> 'success',
                'code' => 200,
                'message'=>'el mantenimiento se a eliminado correctamente'
               );
        }else{
            $result=array(
                'status'=> 'error',
                'code' => 404,
                'message'=>'el mantenimiento no se a eliminado correctamente'
               );
        }
        echo json_encode($result);
        }); 

//actualizar mantenimientos

$app->post('/mantenimientos-update/:id',function($id) use($db,$app){

            $data = json_decode(file_get_contents('php://input', true));
             $id_ma =   $data->{'id_ma'};
             $id_equi = $data->{'id_equi'};
             $id_pro =  $data->{'id_pro'};
             $id_ubi =  $data->{'id_ubi'};
             $id_ciu =  $data->{'id_ciu'};
             $id_sede =  $data->{'id_sede'};
             $id_con =  $data->{'id_con'};
             $fecha_man =  $data->{'fecha_man'};
             $estado_man =  $data->{'estado_man'};
             $periodicidad_man =  $data->{'periodicidad_man'};
             $costo_man =  $data->{'costo_man'};
             $fecha_pro_man =  $data->{'fecha_pro_man'};
           
        
            $sql ="UPDATE mantenimiento SET id_ma = '$id_ma', id_equi = '$id_equi', id_pro = '$id_pro', id_ciu = '$id_ciu',id_sede = '$id_sede',id_ubi = '$id_ubi',id_con = '$id_con',fecha_man = '$fecha_man',estado_man = '$estado_man',periodicidad_man = '$periodicidad_man',fecha_pro_man = '$fecha_pro_man',id_con = '$id_con',costo_man = '$costo_man'
             WHERE id_man = '$id'";
        
            $query = $db ->query($sql);
            
            if($query){
                $result=array(
                    'status'=> 'succes',
                    'code' => 200,
                    'message'=>'el Mantenimiento se actualizado corectamente '
                   );
            }else{
                $result=array(
                    'status'=> 'error',
                    'code' => 404,
                    'message'=>'el Mantenimiento no actualizado correctamente'
                   );
            }
            echo json_encode($result); 
        });


//devolver datos  de mantenimientos

$app->get('/mantenimientos-te/:id',function($id) use($db,$app){

    $sql="SELECT M.id_man,M.id_con,M.id_ma,MA.nombre_ma,M.id_equi,E.nombre_equi ,M.id_pro,P.nombre_pro,M.id_ciu,CI.nombre_ciu,M.id_sede,S.nombre_sede,M.id_ubi,U.nombre_ubi,M.estado_man,M.periodicidad_man,M.fecha_pro_man,M.fecha_man,M.costo_man
    from mantenimiento M  , consultas C, marca MA, equipo E,provedor P, ciudad CI, sede S , ubicacion U
    
    WHERE
    
    M.id_con = C.id_con and
    M.id_ma = MA.id_ma and
    M.id_equi = E.id_equi and 
    M.id_pro = P.id_pro and
    M.id_ciu = CI.id_ciu and
    M.id_sede = S.id_sede  and
    M.id_ubi = U.id_ubi and 
    M.id_man = '$id'";
    $query =$db->query($sql);
    

    if($query ->num_rows == 1 ){
        $mantenimiento = $query->fetch_assoc();
       
        $result=array(
        'status'=> 'success',
        'code' => 200,
        'data'=>$mantenimiento
       );
       }
       echo json_encode($result);
    });

        $app->run();

?>