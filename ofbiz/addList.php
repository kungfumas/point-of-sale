<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(isset($_POST['json'])){
	mysql_query("INSERT INTO list (json) VALUES ('{$_POST['json']}')");
}