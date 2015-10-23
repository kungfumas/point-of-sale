<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$client=mysql_query("SELECT * FROM client");
$tab=array();
for($i=0;$i<mysql_num_rows($client);$i++){
	$tab[]=mysql_fetch_array($client);
}
echo json_encode($tab);