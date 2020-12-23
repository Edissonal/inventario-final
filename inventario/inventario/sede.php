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

//listar sede
$app -> get('/sede',function() use($db,$app){
        $sql ='select * from sede order by id_sede ASC;';
        $query =$db->query($sql);
       
        $sedes = array();
        while($sede = $query->fetch_assoc()){

            $sedes[] =$sede;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$sedes
           );
    echo json_encode($result);

});

//devolver un solo sede

$app ->get ('/sede/:id', function ($id) use($db,$app){
    $sql=' select * from sede where  id_sede='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Sede no disponible'
    );

    if($query ->num_rows == 1 ){
     $sede = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$sede
    );
    }
    echo json_encode($result);
});

//eliminar  sede

$app->get('/sede-delete/:id', function($id) use($db,$app){
$sql ='delete from sede where id_sede='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'La sede se elimino correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La sede se elimino correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de sede

$app->post('/sede-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_sede'};
 
    $sql ="UPDATE sede SET nombre_sede = '$nombre' WHERE id_sede = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'La sede se actualizo de manera correcta'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La sede no se actualizo de manera correcta'
           );
    }
    echo json_encode($result); 
});
//guardar sede
$app ->post('/sede',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_sede'};

    $query ="INSERT INTO sede (nombre_sede) VALUES ('".$nombre."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'Sede no creada correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'Sede creada correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>