<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$tab=array();
$rep=array();

$prod=mysql_query("SELECT * FROM product");
for($i=0;$i<mysql_num_rows($prod);$i++){
	$temp=mysql_fetch_array($prod);
	if(!isset($rep[$temp['codeArticle']])){
		$tab[]=$temp;
		$rep[$temp['codeArticle']]=true;
	}
}
echo json_encode($tab);