<?php

// Creamos la conexión con MySQL
$db = new mysqli('localhost','u912103958_root','MauChuis2022-#11','u912103958_inventario');

// Revisamos la Conexión MySQL
if ($db->connect_error) {
    die("Ha fallado la conexión: " . $db->connect_error);
}
// Enviamos un mensaje de conexión correcta
//echo "Conectado correctamente";

?>