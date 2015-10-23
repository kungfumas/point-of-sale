<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(count($_POST)==4){
	$s=mysql_query("INSERT INTO user (nom,prenom,mail,pass) VALUES ('{$_POST['nom']}','{$_POST['prenom']}','{$_POST['mail']}','{$_POST['pass']}')");
	$res=array();
	if($s==true){
		$s=mysql_query("SELECT * FROM user WHERE nom='{$_POST['nom']}' AND prenom='{$_POST['prenom']}' AND mail='{$_POST['mail']}' AND pass='{$_POST['pass']}'");
		$res[]=mysql_fetch_array($s);
		$res[0]['register']=true;
	}else
		$res[0]['register']=false;
	echo json_encode($res);
}