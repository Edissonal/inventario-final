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

//listar ubicacion
$app -> get('/ubicacion',function() use($db,$app){
        $sql ='select * from ubicacion order by id_ubi ASC;';
        $query =$db->query($sql);
       
        $ubicacionn = array();
        while($ubicacion = $query->fetch_assoc()){

            $ubicacionn[] =$ubicacion;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$ubicacionn
           );
    echo json_encode($result);

});

//devolver un solo ubicacion

$app ->get ('/ubicacion/:id', function ($id) use($db,$app){
    $sql=' select * from ubicacion where  id_ubi='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Ubicacion no disponible'
    );

    if($query ->num_rows == 1 ){
     $ubicacion = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$ubicacion
    );
    }
    echo json_encode($result);
});

//eliminar  ubicacion

$app->get('/ubicacion-delete/:id', function($id) use($db,$app){
$sql ='delete from ubicacion where id_ubi='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'La ubicacion se elimino correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La ubicacion no se elimino correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de ubicacion

$app->post('/ubicacion-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_ubi'};
 
    $sql ="UPDATE ubicacion SET nombre_ubi = '$nombre' WHERE id_ubi = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'La ubicacion se actualizo de manera correcta'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La ubicacion no se actualizo de manera correcta'
           );
    }
    echo json_encode($result); 
});
//guardar ubicacion
$app ->post('/ubicacion',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_ubi'};

    $query ="INSERT INTO ubicacion (nombre_ubi) VALUES ('".$nombre."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'Ubicacion no creada correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'Ubicacion creada correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>