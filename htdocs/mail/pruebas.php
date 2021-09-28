<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'vendor/autoload.php';


$app= new \Slim\Slim();
$mail = new PHPMailer(true);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];

if($method == "OPTIONS") {
    die();
}

$app ->get("/pruebas",function()use($app){
    echo "Holamundo desde slim";
   //var_dump($db);

});

$app ->get("/provando",function()use($app){
    echo "Este es otro metodo ";

});


$app->post('/productos', function() use($app,$mail){
	
    $data = json_decode(file_get_contents('php://input', true));
      
       
    $nombre = $data->{'nombre'};
    $correo = $data->{'correo'};
    $mensaje = $data->{'mensaje'};


    try {
        //Server settings
    //    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.office365.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'pruebasEdi123@hotmail.com';                     //SMTP username
        $mail->Password   = 'Mateopan1989';                               //SMTP password
        $mail->SMTPSecure = 'tls';           //Enable implicit TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('pruebasEdi123@hotmail.com', 'Mailer');
        $mail->addAddress('edissonalonso@gmail.com', 'Mailer');     //Add a recipient
       // $mail->addAddress('ellen@example.com');               //Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //Attachments
       // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
       // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Prueba';
        $mail->Body    = 'Mensaje de prueba 
                mensaje:'.$mensaje.'
                correo:'.$correo.'
                nombre:'.$nombre.'
        
        
        !</b>';
       // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    
        $mail->send();
        //echo 'Message has been sent';
        $result  = array (
            'status'=>'success',
            'code' =>200,
            'message'=>'correo  enviado'
           );
           echo json_encode($result);
    } catch (Exception $e) {
      //  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      $result  = array (
        'status'=>'mail no enviado',
        'code' =>400,
        'data'=>$mail->ErrorInfo
       );
       echo json_encode($result);
    }

    });

$app ->run();
?>