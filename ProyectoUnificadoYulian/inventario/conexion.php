<?php
// Declaramos las variables de conexión
$ServerName = "190.60.223.37";
$Username = "utecson6_ealonso";
$Password = "Alice1989";
$NameBD = "utecson6_inventario";

// Creamos la conexión con MySQL
$conexion = new mysqli($ServerName, $Username, $Password, $NameBD);

// Revisamos la Conexión MySQL
if ($conexion->connect_error) {
    die("Ha fallado la conexión: " . $conexion->connect_error);
}
// Enviamos un mensaje de conexión correcta
echo "Conectado correctamente";
?>