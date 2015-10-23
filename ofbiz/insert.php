<?php 
	require_once 'connexion.php';
	if(count($_POST)){
		mysql_query("INSERT INTO product (id_category,article,codeArticle,url,couleur,taille,prix,solde,stock) VALUES ({$_POST['category']},'{$_POST['article']}','{$_POST['codeArticle']}','images/{$_POST['codeArticle']}.jpg','{$_POST['couleur']}','{$_POST['taille']}',{$_POST['prix']},0,{$_POST['stock']})");
	}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<form action="insert.php" method="post">
<table>
	<tr>
		<td>Category</td>
		
		<td><select name="category">
		<?php 
			$cat=mysql_query("SELECT * FROM category");
			for($i=0;$i<mysql_num_rows($cat);$i++){
				$row=mysql_fetch_array($cat);
				echo '<option value="'.($i+1).'">'.$row['name'].'</option>';
			}
		?>
		</select></td>
	</tr>
	<tr>
		<td>Article</td>
		<td><input type="text" name="article" /></td>
	</tr>
	<tr>
		<td>codeArticle</td>
		<td><input type="text" name="codeArticle" /></td>
	</tr>
	<!--  <tr>
		<td>URL</td>
		<td><input type="text" name="url" /></td>
	</tr>-->
	<tr>
		<td>
			<select name="couleur">
				<option value="NOIR">NOIR</option>
				<option value="ECRU">ECRU</option>
				<option value="FUSHIA">FUSHIA</option>
				<option value="ROSE">ROSE</option>
				<option value="ORANGE">ORANGE</option>
				<option value="VERT">VERT</option>
				<option value="BLEU">BLEU</option>
				<option value="ROUGE">ROUGE</option>
				<option value="PARME">PARME</option>
				<option value="TURQUOISE">TURQUOISE</option>
				<option value="GRIS">GRIS</option>
				<option value="BLEU">ROUGE</option>
				<option value="ENTHRACITE">ANTHRACITE</option>
				<option value="BEIGE">BEIGE</option>
				<option value="BLANC">BLANC</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>
			<select name="taille">
				<option value="XXS">XXS</option>
				<option value="XS">XS</option>
				<option value="S">S</option>
				<option value="M">M</option>
				<option value="L">L</option>
				<option value="XL">XL</option>
				<option value="XXL">XXL</option>
				<option value="XXXL">XXXL</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>Prix</td>
		<td><input type="text" name="prix"/></td>
	</tr>
	<!--  <tr>
		<td>Solde</td>
		<td><input type="text" name="solde"/></td>
	</tr>-->
	<tr>
		<td>Stock</td>
		<td><input type="text" name="stock"/></td>
	</tr>
	<tr>
		<td><input type="submit" /></td>
	</tr>
</table>
</form>
</body>
</html>