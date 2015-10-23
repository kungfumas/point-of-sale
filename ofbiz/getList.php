<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(isset($_POST['id'])){
	mysql_query("DELETE FROM list WHERE id={$_POST['id']}");
	echo json_encode(null);
}