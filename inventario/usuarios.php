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

//listar Usuarios
$app -> get('/usuario',function() use($db,$app){
        $sql ='select * from usuario order by id_usu ASC;';
        $query =$db->query($sql);
       
        $usuarios = array();
        while($usuario = $query->fetch_assoc()){

            $usuarios[] =$usuario;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$usuarios
           );
    echo json_encode($result);

});

//devolver un solo usuario

$app ->get ('/usuario/:id', function ($id) use($db,$app){
    $sql=' select * from usuario where  id_usu='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Usuario no registrado'
    );

    if($query ->num_rows == 1 ){
     $usuario = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$usuario
    );
    }
    echo json_encode($result);
});

//eliminar  usuario

$app->get('/usuario-delete/:id', function($id) use($db,$app){
$sql ='delete from usuario where id_usu='.$id;
$query= $db->query($sql);
    if($query){
        $result=array(
            'status'=> 'success',
            'code' => 200,
            'message'=>'Usuario eliminado correctamente'
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'Usuario No eliminado correctamente'
           );
    }
    echo json_encode($result);
    }); 

//actulizacion de usuario

$app->post('/usuario-pass',function() use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
    
    $password = $data->{'password_usu'};

    $sql =" select id_usu,nombre_usu from usuario where  password_usu = '".$password."' ";

    $query = $db ->query($sql);

    if($query ->num_rows == 1 ){
        $usuario = $query->fetch_assoc();
       
        $result=array(
        'status'=> 'success',
        'code' => 200,
        'message'=>'login correcto'
       );

       }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'login incorrecto'
        );
       }
    echo json_encode($result);
    

});

//actualiza-usuariofinal
$app->post('/usuario-update/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
   
    $nombre = $data->{'nombre_usu'};
   $correo = $data->{'correo_usu'};
   $password = $data->{'password_usu1'};
 
   $sql ="UPDATE usuario SET nombre_usu = '$nombre', correo_usu = '$correo', password_usu = '$password ' WHERE id_usu = '$id'";
    $query = $db ->query($sql);
    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'Usuario actualizado '
           );
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'Usuario no actualizado'
           );
    }
    echo json_encode($result); 
});


//guardar Usuario
$app ->post('/usuario',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    
    $nombre = $data->{'nombre_usu'};
    $correo = $data->{'correo_usu'};
    $password = $data->{'password_usu'};
    $rol_usu = $data->{'roll_usu'};

    $sql =" select correo_usu from usuario where  correo_usu = '".$correo."'";
    $query = $db ->query($sql);

    if($query ->num_rows == 1 ){
        $usuario = $query->fetch_assoc();
       
        $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'usuario ya esta registrado'
       );
    }else{
    
        $sql ="INSERT INTO usuario (nombre_usu,correo_usu,password_usu,rol_usu) VALUES ('".$nombre."','".$correo."','".$password."','".$rol_usu."')";
        $query = $db ->query($sql);
        
        if($query){
            $result=array(
                'status'=> 'succes',
                'code' => 200,
                'message'=>'Usuario registrado de manera correcta'
               );
        }else{
            $result=array(
                'status'=> 'error',
                'code' => 404,
                'message'=>'Usuario no se registro de manera correcta'
               );
        }
    }
    echo json_encode($result);

});

//login usuario

$app ->post('/login',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    

    $correo = $data->{'correo_usu'};
    $password = $data->{'password_usu'};

    $sql =" select id_usu,nombre_usu,rol_usu from usuario where  correo_usu = '".$correo."' and password_usu = '".$password."' ";
    $query = $db ->query($sql);
  
    if($query ->num_rows == 1 ){
        $usuario = $query->fetch_assoc();
       
        $result=array(
        'status'=> 'success',
        'code' => 200,
        'data'=>$usuario
       );
       }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'login incorrecto'
        );
       }
    echo json_encode($result);
    

});

//llamado
$app ->get ('/usuario-login/:id', function ($id) use($db,$app){
    $sql='select id_usu,nombre_usu,rol_usu from usuario where  id_usu='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'Usuario no registrado'
    );

    if($query ->num_rows == 1 ){
     $usuario = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$usuario
    );
    }
    echo json_encode($result);
});

$app ->post('/enviologi',function() use($app){
    $data = json_decode(file_get_contents('php://input', true));
    

    $correo = $data->{'correo_usu'};
    $randPassword = $data->{'randPassword'};

    $destino = "edissonalonso@gmail.com";
    $contenido ="\nCorreo:" . $correo .  "\nclave:"  . $randPassword ;
    mail($destino,"Datos de Contacto Pagina",$contenido); 

    
    echo json_encode($result);
});

$app->run();

?>