<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;



function mails($correo_usu,$nombre_pro,$fecha_pro_man){

    $mail = new PHPMailer(true);


    try {
        //Server settings
       // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.mi.com.co';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'Comercial@tecsoni.com.co';                     //SMTP username
        $mail->Password   = 'Mauricio86';                               //SMTP password
        $mail->SMTPSecure = 'tls';           //Enable implicit TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
       // $mail->setFrom('pruebasEdi123@hotmail.com', 'Mailer');
          $mail->setFrom('Comercial@tecsoni.com.co', 'Mailer');
         // $mail->addAddress('edissonalonso@gmail.com', 'Mailer');     //Add a recipient
          $mail->addAddress($correo_usu, 'Mailer');
       // $mail->addAddress('ellen@example.com');               //Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //Attachments
       // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
       // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
   
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Mantenimeinto esta por vencer tecsoni';
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
                <td   aling="center" valing="top"> <h2>El mantenimiento esta por vencer</h2></td>
            </tr>
           <tr>
           <td  aling="center" valing="top"><h3>El mantenimiento del provedor '.$nombre_pro.' </h3></td>
           </tr>
           <tr>
           <td  aling="center" valing="top">el mantenimiento estara por caducar en la fecha '.$fecha_pro_man.'</td>
           </tr>
           <tr>
           <td>relize su ventana de mantenimiento antes de vencerse la fecha limite</td>
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
           return true;
    } catch (Exception $e) {
      //  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
      $result  = array (
        'status'=>'mail no enviado',
        'code' =>400,
        'data'=>$mail->ErrorInfo
       );
       echo json_encode($result);
    }
   
}

?>