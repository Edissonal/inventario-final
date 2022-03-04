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

//listar ciudad
$app -> get('/ciudad',function() use($db,$app){
        $sql ='select * from ciudad order by id_ciu ASC;';
        $query =$db->query($sql);
       
        $ciudadd = array();
        while($ciudad = $query->fetch_assoc()){

            $ciudadd[] =$ciudad;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$ciudadd
           );
    echo json_encode($result);

});

//devolver un solo ciudad

$app ->get ('/ciudad/:id', function ($id) use($db,$app){
    $sql=' select * from ciudad where  id_ciu='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Ciudad no disponible'
    );

    if($query ->num_rows == 1 ){
     $ciudad = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$ciudad
    );
    }
    echo json_encode($result);
});

//eliminar  sede

$app->get('/ciudad-delete/:id', function($id) use($db,$app){
$sql ='delete from ciudad where id_ciu='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'La ciudad se elimino correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La ciudad se elimino correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de sede

$app->post('/ciudad-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_ciu'};
 
    $sql ="UPDATE ciudad SET nombre_ciu = '$nombre' WHERE id_ciu = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'La ciudad se actualizo de manera correcta'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La ciudad no se actualizo de manera correcta'
           );
    }
    echo json_encode($result); 
});
//guardar ciudad
$app ->post('/ciudad',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_ciu'};

    $query ="INSERT INTO ciudad (nombre_ciu) VALUES ('".$nombre."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'Ciudad no creada correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'Ciudad creada correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>