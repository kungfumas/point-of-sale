<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(count($_POST)==4){
	$res=mysql_query("SELECT * FROM Cloture WHERE date=DATE(NOW())");
	if(!mysql_num_rows($res))
		mysql_query("INSERT INTO Cloture (initial,vente,retrait,restant,date) VALUES ({$_POST['initial']},{$_POST['vente']},{$_POST['retrait']},{$_POST['restant']},NOW())");
	else
		mysql_query("UPDATE Cloture SET initial={$_POST['initial']}, vente={$_POST['vente']}, retrait={$_POST['retrait']}, restant={$_POST['restant']} WHERE date=DATE(NOW())");
}
echo json_encode(null);