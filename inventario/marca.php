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

//listar marca
$app -> get('/marca',function() use($db,$app){
        $sql ='select * from marca order by id_ma ASC;';
        $query =$db->query($sql);
       
        $marcas = array();
        while($marca = $query->fetch_assoc()){

            $marcas[] =$marca;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$marcas
           );
    echo json_encode($result);

});

//devolver un solo marca

$app ->get ('/marca/:id', function ($id) use($db,$app){
    $sql=' select * from marca where  id_ma='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Marca no disponible'
    );

    if($query ->num_rows == 1 ){
     $marca = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$marca
    );
    }
    echo json_encode($result);
});

//eliminar  marca

$app->get('/marca-delete/:id', function($id) use($db,$app){
$sql ='delete from marca where id_ma='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'La marca se elimino correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La marca se elimino correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de Marca

$app->post('/marca-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_ma'};
 
    $sql ="UPDATE marca SET nombre_ma = '$nombre' WHERE id_ma = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'La marca se actualizo de manera correcta'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'La marca no se actualizo de manera correcta'
           );
    }
    echo json_encode($result); 
});
//guardar marca
$app ->post('/marca',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_ma'};

    $query ="INSERT INTO marca (nombre_ma) VALUES ('".$nombre."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'Marca no creada correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'Marca creada correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>