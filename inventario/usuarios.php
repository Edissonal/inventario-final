<?php

require_once'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$app = new \Slim\Slim();
include("implement.php");
$mail = new PHPMailer(true);


//cabezeras 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

function decryptIt( $q ) {
    $cryptKey  = 'qJB0rGtIn5UB1xG03efyCp';
    $qDecoded      = rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_256, md5( $cryptKey ), base64_decode( $q ), MCRYPT_MODE_CBC, md5( md5( $cryptKey ) ) ), "\0");
    return( $qDecoded );
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
   $estado = $data->{'estado_usu'};
 
   $sql ="UPDATE usuario SET nombre_usu = '$nombre', correo_usu = '$correo', password_usu = '$password',esta_usu = '$estado' WHERE id_usu = '$id'";
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


//actualizaciones roles de usuarios
$app->post('/usuario-updateusu/:id',function($id) use($db,$app){

    $data = json_decode(file_get_contents('php://input', true));
   
   $nombre = $data->{'nombre_usu'};
   $correo = $data->{'correo_usu'};
   $rol_usu = $data->{'rol_usu'};
 
   $sql ="UPDATE usuario SET nombre_usu = '$nombre', correo_usu = '$correo' , rol_usu = '$rol_usu'  WHERE id_usu = '$id'";
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
    $estado = $data->{'estado_usu'};

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
    
        $sql ="INSERT INTO usuario (nombre_usu,correo_usu,password_usu,rol_usu,esta_usu) VALUES ('".$nombre."','".$correo."','".$password."','".$rol_usu."','".$estado."')";
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

    $sql =" select id_usu,nombre_usu,rol_usu,esta_usu from usuario where  correo_usu = '".$correo."' and password_usu = '".$password."' ";
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
    $sql='select id_usu,nombre_usu,rol_usu,esta_usu from usuario where  id_usu='.$id;
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

//Actualizar Contraseña

$app->post('/login-update/:id',function($id) use($db,$app,$mail){

    $data = json_decode(file_get_contents('php://input', true));
   
   $estado =$data ->{'estado'};
   $password = $data->{'password_usu'};
   $correo = $data->{'correo'};
   $clave= $data->{'pass'};
 
   $sql ="UPDATE usuario SET password_usu = '$password ',esta_usu ='$estado' WHERE id_usu = '$id'";
    $query = $db ->query($sql);


    
    if($query){
        $result=array(
            'status'=> 'succes',
            'code' => 200,
            'message'=>'Usuario actualizado '
           );


           try {
            //Server settings
          //  $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'notificaciones@inventario-tecsoni.com.co';                     //SMTP username
            $mail->Password   = 'Virtual123*';                               //SMTP password
            $mail->SMTPSecure = 'tls';           //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
           // $mail->setFrom('pruebasEdi123@hotmail.com', 'Mailer');
              $mail->setFrom('notificaciones@inventario-tecsoni.com.co', 'Mailer');
           // $mail->addAddress('edissonalonso@gmail.com', 'Mailer');     //Add a recipient
              $mail->addAddress($correo, 'Mailer');
           // $mail->addAddress('ellen@example.com');               //Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            //Attachments
           // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
           // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
       

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Restablecimiento de password';
            $mail->Body    = '
            
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
    
                <style type="text/css">
                table {
                        border-collapse:separate;
                        border-spacing: 10;
                        border:solid black 1px;
                        border-radius:10px;
                        -moz-border-radius:10px;
                        -webkit-border-radius: 5px;
                         border:1px solid #CDCDCD;
                         font: small/ 1.5 Arial,Helvetica,sans-serif;
                         text-align: center;
                        
                }
    
                tr {
                    box-sizing: border-box;
                    background-color: #fff;
                    color: #24292e;
                    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
                    font-size: 14px;
                    line-height: 1.5;
                    margin: 0;
                            }
                td {
                    display: table-cell;
                    vertical-align: inherit;
                    box-sizing: border-box;
                     font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji!important;
                    padding: 16px;
                }
                button{
                    background-color: #055d6b!important;
        box-sizing: border-box;
        color: #fff;
        text-decoration: none;
        border-radius: .5em;
        display: inline-block;
        font-size: inherit;
        font-weight: 500;
        line-height: 1.5;
        vertical-align: middle;
        white-space: nowrap;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji!important;
        padding: .75em 1.5em;
        border: 1px solid #055d6b;
                    
                }
                h3{
                    box-sizing: border-box;
        margin-bottom: 0;
        margin-top: 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.25!important;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji!important;
                }
              
                h2{
                    box-sizing: border-box;
        margin-bottom: 0;
        margin-top: 8px!important;
        font-weight: 400!important;
        font-size: 24px;
        line-height: 1.25!important;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji!important;
                }

                .centrar{
                
                    /*/ margin-left: 10%;*/
                    text-align:center
                 }
     
                 div.centrar table {
                     margin: 0 auto;
                     text-align: center;
     }
                
                </style>
            </head>
            <body>
            <div class="centrar">
              
               <table>
                <tr>
                    <td   aling="center" valing="top"> <h2>Restablecer contraseña</h2></td>
                </tr>
               <tr>
               <td  aling="center" valing="top"><h3>password reset</h3></td>
               </tr>
               <tr>
               <td  aling="center" valing="top">Escuchamos que perdió su contraseña de Tecsoni . ¡Lo siento por eso!</td>
               </tr>
               <tr>
               <td>Pero no te preocupes! Puede utilizar el siguiente botón para restablecer su contraseña </td>
               </tr>
               <tr>
               <td  aling="center" valing="top">
                <a href="http://inventario-tecsoni.com.co/#/logi">
                <button>Reset pass </button>
            </a>
                </td>
               </tr>
               <tr>
               <td  aling="center" valing="top">clave:'.$clave.'</td>
               </tr>
                </table>
                </div>
                </body>
                </html>';
           // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            $mail->send();
            //echo 'Message has been sent';
            $result  = array (
                'status'=>'success',
                'code' =>200,
                'message'=>'correo  enviado'
               );
        } catch (Exception $e) {
          //  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
          $result  = array (
            'status'=>'mail no enviado',
            'code' =>400,
            'data'=>$mail->ErrorInfo
           );
           echo json_encode($result);
        }
    }else{
        $result=array(
            'status'=> 'error',
            'code' => 404,
            'message'=>'Usuario no actualizado'
           );
    }



    echo json_encode($result); 
});

$app->run();

?>