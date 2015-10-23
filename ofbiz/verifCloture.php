<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$res=mysql_query("SELECT * FROM Cloture WHERE date=DATE(NOW())");
$json=array();
if(!mysql_num_rows($res)){
	$res=mysql_query("SELECT * FROM Cloture");
	$ini=0;
	for($i=0;$i<mysql_num_rows($res);$i++){
		$tab=mysql_fetch_array($res);
		$ini=$tab['restant'];
	}
	$json['initial']=$ini;
	$json['exist']=false;
}else{
	$tab=mysql_fetch_array($res);
	$json['initial']=$tab['initial'];
	$json['exist']=true;
}
echo json_encode($json);