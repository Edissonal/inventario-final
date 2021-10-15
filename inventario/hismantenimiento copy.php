<?php

require_once'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$app = new \Slim\Slim();
$db = new mysqli('localhost','root','','inventario');
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




function validarFecha($fecha_man, $format = 'Y-m-d')
{
    $d = DateTime::createFromFormat($format, $fecha_man);
    return $d && $d->format($format) == $fecha_man;
}

//listar historico consultas
$app -> get('/hismantenimiento/:id',function($id) use($db,$app){
       
        $sql="
        select  H.id_ma,M.nombre_ma,
        H.id_equi,E.nombre_equi,
        H.id_pro,P.nombre_pro,
        D.id_ciu,D.nombre_ciu,
        S.id_sede,S.nombre_sede,	
        H.id_ubi,U.nombre_ubi,
        C.id_con, C.modelo_con,
        H.fecha_man,
        H.estado_man,
        H.periodicidad_man,
        H.fecha_pro_man,
        H.costo_man,
        H.estado_hman,
        H.id_usu,
        Us.nombre_usu,
        
        H.fecha_hman from hismantenimiento H , MARCA M, equipo E, provedor p , ubicacion U , sede S, ciudad D ,consultas C, usuario Us
        
        WHERE
        
        H.id_ma = M.id_ma and
        H.id_equi = E.id_equi and 
        H.id_pro =P.id_pro and 
        H.id_ubi = U.id_ubi and
        H.id_ciu = D.id_ciu and            
        H.id_sede = S.id_sede and
        H.id_usu = Us.id_usu  and
        H.id_con = C.id_con and  nombre_pro like''".$id."'%'";

        $query =$db->query($sql);
       
        $hisconsultas = array();
        while($hisconsulta = $query->fetch_assoc()){

            $hisconsultas[] =$hisconsulta;
        }

        $result  = array (
            'status'=>'success',
            'code' =>200,
            'data'=>$hisconsultas
           );
    echo json_encode($result);
});

//consultar provedores
$app ->get ('/pro/:id', function ($id) use($db,$app){
    $sql=' select * from hismantenimiento  where  id_pro='.$id;
    $query =$db->query($sql);
       
    $consultas = array();
   
    
      while($row = $query->fetch_assoc()){
          
          $id_pro = $row["id_pro"];
          $placa = $row["placa_con"];
     }
   


$respuesta =substr($placa, 3);
$integer = (int)$respuesta;
$resultado = $integer + 1;
$cadena1 = strval($resultado);
$cadena2=str_pad($cadena1,4,"0",STR_PAD_LEFT);
$cadena2;

$sql=' select * from provedor where  id_pro='.$id;
$query1 =$db->query($sql);
$provedor = $query1->fetch_assoc();
$datai= $provedor['nombre_pro'];
$datai;
$letra = iniciales($datai);
$valorf = $letra.$cadena2;

$consultas = array(

    "id_con" => $id_pro,
    "nombre_con" =>$datai,
    "placa_con" =>$valorf
);

   $result  = array (
        'status'=>'success',
        'code' =>200,
        'data'=>$consultas
       );
    echo json_encode($result);
});

//devolver una sola consulta

$app ->get ('/mantenimiento-con/:id', function ($id) use($db,$app){
    $sql='select H.id_man,
	H.id_ma,M.nombre_ma,
	H.id_equi,E.nombre_equi,
	H.id_pro,P.nombre_pro,
	D.id_ciu,D.nombre_ciu,
	S.id_sede,S.nombre_sede,	
	H.id_ubi,U.nombre_ubi,
	H.id_con,
	H.fecha_man,
	H.estado_man,
	H.periodicidad_man,
	H.fecha_pro_man,
	H.costo_man,
	H.estado_hman,
	H.fecha_hman	
        from 
        hismantenimiento H ,marca M ,equipo E,provedor P,ubicacion U, sede S,ciudad D
        where 
		H.id_ma = M.id_ma and
        H.id_equi = E.id_equi and 
        H.id_pro =P.id_pro and 
        H.id_ubi = U.id_ubi and
        H.id_ciu = D.id_ciu and        
        H.id_sede = S.id_sede and
        id_hman='.$id;
    $query =$db->query($sql);
    

    $result=array(
        'status'=> 'error',
        'code' => 404,
        'message'=>'consulta no disponible'
    );

    if($query ->num_rows == 1 ){
     $con = $query->fetch_assoc();
    
     $result=array(
     'status'=> 'success',
     'code' => 200,
     'data'=>$con
    );
    }
    echo json_encode($result);
});

//Adicionar Histomantenimiento
$app ->post('/addmanh',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));

    $id_ma =   $data->{'id_ma'};
    $id_equi = $data->{'id_equi'};
    $id_pro =  $data->{'id_pro'};
    $id_ciu =  $data->{'id_ciu'};
    $id_sede =  $data->{'id_sede'}; 
    $id_con  =  $data->{'id_con'};
    $id_ubi =  $data->{'id_ubi'};
    $fecha_man =   $data->{'fecha_man'};
    $estado_man =   $data->{'esta_man'};
    $periodicidad_man =   $data->{'peri_man'};
    $fecha_pro_man =   $data->{'fecha_pro_man'};
    $costo_man =   $data->{'costo_man'};
    $estado_hman =   $data->{'estado_hman'};
    $fecha_hman =   $data->{'fecha_hman'};
    $id_usu =   $data->{'id_usu'};
    

    $query ="INSERT INTO hismantenimiento (
    id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man,costo_man,estado_hman,fecha_hman,id_usu) 
    VALUES 
    ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_pro_man."','".$costo_man."',
     '".$estado_hman."','".$fecha_hman."','".$id_usu."')";
     $insert = $db->query($query);  

    $result  = array (
            'status'=>'error',
            'code' =>404,
            'message'=>'mantenimiento no creado correctamente'
    );
        
    if($insert){
     $result  = array (
     'status'=>'success',
     'code' =>200,
     'message'=>'mantenimiento creado correctamente'
    );
    
    }
    echo json_encode($result);    
    
});


//cargas histomantenimiento

$app ->post('/mantenimientosh',function() use($app,$db){

    $data = json_decode(file_get_contents('php://input', true));
    $count ='';
    $estado = true;
    $mensaje='';

    foreach($data as $row){

        $fecha_man=   $row->{'fecha_man'};

        $prueba = validarFecha($fecha_man);
              
            if($prueba == true){
            
            }else{
            $estado = false;
            $mensaje ="Formato fecha incorrecto";
            break;  
            }

        $id_con =  $row->{'id_con'};
        $result = $db->query("select * from consultas  where id_con='".$id_con."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id consulta invalida';
            break;  
        }

        $id_ma =  $row->{'id_ma'};
        $result = $db->query("select * from marca  where id_ma='".$id_ma."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id marca invalida';
            break;  
        }
    
        $id_equi =  $row->{'id_equi'};
        $result = $db->query("select * from equipo  where id_equi='".$id_equi."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id equipo invalida';
            break;  
        }

        $id_pro =  $row->{'id_pro'};
        $result = $db->query("select * from provedor  where id_pro='".$id_pro."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id provedor invalida';
            break;  
        }

        $id_ciu =  $row->{'id_ciu'};
        $result = $db->query("select * from ciudad  where id_ciu='".$id_ciu."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id ciudad invalida';
            break;  
        }

        $id_sede =  $row->{'id_sede'};
        $result = $db->query("select * from sede  where id_sede='".$id_sede."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id sede invalida';
            break;  
        }

        $id_ubi =  $row->{'id_ubi'};
        $result = $db->query("select * from ubicacion  where id_ubi='".$id_ubi."'");
        $count=$result->num_rows;

        if($count > 0){
    
        }elseif($count === 0){    
            $estado= false;
            $mensaje='id ubicacion invalida';
            break;  
        }

        $estado_man =  $row->{'estado_man'};
        if(empty($estado_man)){
          $mensaje='estado   es obligatorio';
          $estado = false;
          break;
        }

        $periodicidad_man =  $row->{'periodicidad_man'};
        if(empty($periodicidad_man)){
          $mensaje='periodicidad es obligatorio';
          $estado = false;
          break;
        }


        $costo_man =  $row->{'costo_man'};
        if(empty($costo_man)){
          $mensaje='costo man es obligatorio';
          $estado = false;
          break;
        }

        $estado_hman =  $row->{'estado_hman'};
        if(empty($estado_hman)){
          $mensaje='estado man es obligatorio';
          $estado = false;
          break;
        }
   

        $id_usu =  $row->{'id_usu'};
        if(empty($id_usu)){
          $mensaje='id_usu man es obligatorio';
          $estado = false;
          break;
        }



        




    }

    
    
    
if($estado == true){
    foreach($data as $row){
        $id_ma =   $row->{'id_ma'};
        $id_equi = $row->{'id_equi'};
        $id_pro =  $row->{'id_pro'};
        $id_ciu =  $row->{'id_ciu'};
        $id_sede =  $row->{'id_sede'}; 
        $id_con  =  $row->{'id_con'};
        $id_ubi =  $row->{'id_ubi'};
        $fecha_man=   $row->{'fecha_man'};
        $estado_man=   $row->{'estado_man'};
        $periodicidad_man=   $row->{'periodicidad_man'};
        $costo_man=   $row->{'costo_man'};
        $estado_hman =    $row->{'estado_hman'};
        $fecha_hman =   $row->{'fecha_hman'};
        $id_usu =    $row->{'id_usu'};
   
        $fecha_fi = date("Y-m-d",strtotime($fecha_man."+  ".$periodicidad_man." month")); 
   
   
      $query ="INSERT INTO hismantenimiento (
               id_ma,id_equi,id_pro,id_ciu,id_sede,id_ubi,id_con,fecha_man,estado_man,periodicidad_man,fecha_pro_man,costo_man,estado_hman,fecha_hman,id_usu) 
               VALUES 
               ('".$id_ma."','".$id_equi."','".$id_pro."','".$id_ciu."','".$id_sede."','".$id_ubi."','".$id_con."','".$fecha_man."','".$estado_man."','".$periodicidad_man."','".$fecha_fi."','".$costo_man."',
               '".$estado_hman."','".$fecha_hman."','".$id_usu."')";
               
       $insert = $db->query($query);
   
      }
       $result  = array (
           'status'=>'error',
           'code' =>404,
           'message'=>'mantenimiento no creado correctamente'
          );
       
       if($insert){
        $result  = array (
        'status'=>'success',
        'code' =>200,
        'message'=>'mantenimiento creado correctamente'
       );
   
       }
      
}else{
    $result  = array (
        'status'=>'error',
        'code' =>404,
        'message'=>$mensaje
        );
}
echo json_encode($result);     
});


//calcular envio de correo

$app -> get('/calcularenv',function() use($db,$app,$mail){
    $sql ='SELECT P.nombre_pro,H.id_usu ,Us.nombre_usu,Us.correo_usu ,H.fecha_pro_man,H.periodicidad_man 
    FROM hismantenimiento H ,usuario Us ,provedor P
    WHERE 
    H.id_usu = Us.id_usu AND
    H.id_pro = P.id_pro';
    $query =$db->query($sql);
   
    $envios = array();
    while($envio = $query->fetch_assoc()){

        $envios[] =$envio;
    }


$ids = array_column($envios, 'id_usu');
$ids = array_unique($ids);

$envios = array_filter($envios, function ($key, $value) use ($ids) {
    return in_array($value, array_keys($ids));
}, ARRAY_FILTER_USE_BOTH);

        foreach ($envios as $row) {
            $fecha_pro_man =   $row{'fecha_pro_man'};
            $nombre_usu =   $row{'nombre_usu'};
            $nombre_pro =   $row{'nombre_pro'};
            $correo_usu =   $row{'correo_usu'};

            $ahora = date("Y-m-d");
            $fechapro = strtotime('-30 day',strtotime($fecha_pro_man));
            $date_past = date('Y-m-d', $fechapro);

            $fechact= strtotime($ahora);
            

            if($fechact >$fechapro){
         
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
           
            echo json_encode('no ahi novedad con las fechas');
        }
        }



       

      
       // $ahora = date("Y-m-d");
        //echo json_encode($ahora );

      //  echo json_encode($envios);

   /* $result  = array (
        'status'=>'success',
        'code' =>200,
        'data'=>$envios
       );
echo json_encode($result);*/

});





$app->run();

?>