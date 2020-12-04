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

//listar provedores
$app -> get('/provedor',function() use($db,$app){
        $sql ='select * from provedor order by id_pro ASC;';
        $query =$db->query($sql);
       
        $provedores = array();
        while($provedor = $query->fetch_assoc()){

            $provedores[] =$provedor;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$provedores
           );
    echo json_encode($result);

});

//devolver un solo provedor

$app ->get ('/provedor/:id', function ($id) use($db,$app){
    $sql=' select * from provedor where  id_pro='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'producto no disponible'
    );

    if($query ->num_rows == 1 ){
     $provedor = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$provedor
    );
    }
    echo json_encode($result);
});

//elominar  provedor

$app->get('/provedor-delete/:id', function($id) use($db,$app){
$sql ='delete from provedor where id_pro='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'el provedor se a eliminado correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'el provedor no se a eliminado correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de provedor

$app->post('/provedor-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_pro'};
    $direccion = $data->{'direccion_pro'};
    $nit = $data->{'nit_pro'};

    $sql ="UPDATE provedor SET nombre_pro = '$nombre', direccion_pro = '$direccion', nit_pro = '$nit' WHERE id_pro = '$id'";

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
            'message'=>'el provedor no se a actualizado correctamente'
           );
    }
    echo json_encode($result); 
});
//guardar provedor
$app ->post('/provedor',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_pro'};
    $direccion = $data->{'direccion_pro'};
    $nit = $data->{'nit_pro'};

    $query ="INSERT INTO provedor (nombre_pro, direccion_pro, nit_pro) VALUES ('".$nombre."', '".$direccion."', '".$nit."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'provedor no creado correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'provedor creado correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>