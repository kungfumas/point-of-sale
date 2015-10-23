<?php
require_once 'connexion.php';
header('Access-Control-Allow-Origin: *');
$tab=array();
$rep=array();
if(isset($_POST['id']) && isset($_POST['couleur'])){
	$prod=mysql_query("SELECT * FROM product WHERE codeArticle='{$_POST['id']}' and couleur='{$_POST['couleur']}'");
	for($i=0;$i<mysql_num_rows($prod);$i++){
		$tab[]=mysql_fetch_array($prod);
	}
	echo json_encode($tab);
}