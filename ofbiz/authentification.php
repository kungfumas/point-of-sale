<?php 
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
if(isset($_POST['mail'])&&isset($_POST['pass'])){
	$user=mysql_query("SELECT * FROM user WHERE mail='{$_POST['mail']}' AND pass='{$_POST['pass']}'");
	$res=array();
	if(mysql_num_rows($user)){
		$res[]=mysql_fetch_array($user);
		$res[0]['auth']=true;
	}else
		$res[0]['auth']=false;
	echo json_encode($res);
}