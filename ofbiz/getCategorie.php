<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$cat=mysql_query("SELECT * FROM Category");
$tab=array();
for($i=0;$i<mysql_num_rows($cat);$i++){
	$tab[]=mysql_fetch_array($cat);
}
echo json_encode($tab);
