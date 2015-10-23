<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$res=mysql_query("SELECT * FROM Ticket WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY)");
$tab=array();
for($i=0;$i<mysql_num_rows($res);$i++){
	$tab[]=mysql_fetch_array($res);
}
echo json_encode($tab);