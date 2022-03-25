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

include('mail.php');



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
     
         mails($correo_usu,$nombre_pro,$fecha_pro_man);}
        echo"Prueba de envio";
    }else{
       
      echo "no ahi novedad con las fechas";

        
    }
    }

    echo "correo enviado correctamente";
    
?>