<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(isset($_POST['json'])){
	mysql_query("INSERT INTO ticket (date,json) VALUES (NOW(),'{$_POST['json']}')");
}