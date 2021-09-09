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


//listar historico consultas
$app -> get('/hismantenimiento/:id',function($id) use($db,$app){
       
        $sql="select H.id_man,
        H.id_ma,M.nombre_ma,
        H.id_equi,E.nombre_equi,
        H.id_pro,P.nombre_pro,
        D.id_ciu,D.nombre_ciu,
        S.id_sede,S.nombre_sede,	
        H.id_ubi,U.nombre_ubi,
        C.id_con, C.modelo_con,
        H.fecha_man,
        H.estado_man,
        H.periodicidad_man,
        H.fecha_pro_man,
        H.costo_man,
        H.estado_hman,
        H.fecha_hman	
            from 
            hismantenimiento H ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D, consultas C
            where 
            H.id_ma = M.id_ma and
            H.id_equi = E.id_equi and 
            H.id_pro =P.id_pro and 
            H.id_ubi = U.id_ubi and
            H.id_ciu = D.id_ciu and            
            H.id_sede = S.id_sede and
            H.id_con = C.id_con and nombre_pro  like''".$id."'%'";

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
    $sql=' select * from hismantenimiento  where  id_pro='.$id;
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

$app ->get ('/mantenimiento-con/:id', function ($id) use($db,$app){
    $sql='select H.id_man,
	H.id_ma,M.nombre_ma,
	H.id_equi,E.nombre_equi,
	H.id_pro,P.nombre_pro,
	D.id_ciu,D.nombre_ciu,
	S.id_sede,S.nombre_sede,	
	H.id_ubi,U.nombre_ubi,
	H.id_con,
	H.fecha_man,
	H.estado_man,
	H.periodicidad_man,
	H.fecha_pro_man,
	H.costo_man,
	H.estado_hman,
	H.fecha_hman	
        from 
        hismantenimiento H ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D
        where 
		H.id_ma = M.id_ma and
        H.id_equi = E.id_equi and 
        H.id_pro =P.id_pro and 
        H.id_ubi = U.id_ubi and
        H.id_ciu = D.id_ciu and        
        H.id_sede = S.id_sede and
        id_hman='.$id;
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

$app->run();

?>