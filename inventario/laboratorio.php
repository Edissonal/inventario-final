<?php

$array1 = array(

    ['id' => 1, 'title' => 'tree'],
    ['id' => 2, 'title' => 'sun'],
    ['id' => 3, 'title' => 'cloud'],
    ['id' => 9, 'title' => 'cloud'],
    ['id' => 10, 'title' => 'cloud'],
    ['id' => 11, 'title' => 'cloud'],
    
    );

    $array2 = array(

        ['id' => 1, 'title' => 'tree'],
        ['id' => 6, 'title' => 'sun'],
        ['id' => 3, 'title' => 'cloud'],
        );
$array3 = array();

print_r($array1);
echo"<br>";
print_r($array2);
 $estado;
foreach($array1 as $row){

    $valor1 = $row["id"];

    foreach($array2 as $row2){
        $valor2 =$row2["id"];

        if($valor1 == $valor2){
           echo "iguales";
           $estado = false;
           break;
        }else{
            $estado = true;
        }

    }

    if($estado == true){
        array_push($array3,$row);
    }
}

echo"<br>";
print_r($array3);

?>