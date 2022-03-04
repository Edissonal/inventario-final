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

//listar equipos
$app -> get('/equipo',function() use($db,$app){
        $sql ='select * from equipo order by id_equi ASC;';
        $query =$db->query($sql);
       
        $equipos = array();
        while($equipo = $query->fetch_assoc()){

            $equipos[] =$equipo;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$equipos
           );
    echo json_encode($result);

});

//devolver un solo equipo

$app ->get ('/equipo/:id', function ($id) use($db,$app){
    $sql=' select * from equipo where  id_equi='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'equipo no disponible'
    );

    if($query ->num_rows == 1 ){
     $equipo = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$equipo
    );
    }
    echo json_encode($result);
});

//eliminar  equipo

$app->get('/equipo-delete/:id', function($id) use($db,$app){
$sql ='delete from equipo where id_equi='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'el equipo se a eliminado correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'el equipo no se a eliminado correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de equipo

$app->post('/equipo-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    $nombre = $data->{'nombre_equi'};
   

    $sql ="UPDATE equipo SET nombre_equi = '$nombre' WHERE id_equi = '$id'";

    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'el equipo se actualizado corectamente '
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'el equipo no se a actualizado correctamente'
           );
    }
    echo json_encode($result); 
});
//guardar equipo
$app ->post('/equipo',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_equi'};

    $query ="INSERT INTO equipo (nombre_equi) VALUES ('".$nombre."')";
    $insert = $db->query($query);
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>'equipo no creado correctamente'
       );
    
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'equipo creado correctamente'
    );

    }
    echo json_encode($result); 
    

});

$app->run();

?>