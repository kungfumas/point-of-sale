	var app = {
	
		initialize : function() {
			this.bindEvents();
		},
	
		bindEvents : function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
	
		onDeviceReady : function() {
	
		},
	
	};
	
	app.initialize();
	// ////////////////////////////////////////////////////////////////////
	$(document).ready(function() {
	
	
	
		
		var userpanel='<div data-role="panel" id="userconfig" data-display="overlay" data-position="left" data-theme="a"><div data-role="main" class="ui-content"><label id="date" style="text-align:center;"></label><label id="unom" style="text-align:center;"></label><a href="#" data-transition="fade" class="ui-btn ui-btn-c ui-btn-icon-top ui-icon-forward" id="retourAttente">RETOUR EN ATTENTE</a><a href="#" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-top ui-icon-tag" id="cloture">CLOTURE JOURNEE</a><a href="#" id="logout" class="ui-btn ui-btn-b ui-corner-all">log out</a></div></div>';
		
		var panel='<div data-role="panel" id="panier" data-display="overlay" data-position="right" data-theme="a"><div data-role="main" class="ui-content"><label id="cnom" style="text-align:center;"></label><table data-role="table" id="panierProd" class="ui-responsive ui-table ui-table-reflow ui-body-a table-stripe"><thead><tr><th data-priority="1">Code</th><th data-priority="1">Qte</th><th data-priority="1">P.V.</th><th data-priority="1" class="ui-body-c">Total</th></tr></thead><tbody></tbody></table></div><div data-role="footer" ><label for="total">Total Price :</label><div class="ui-input-text ui-corner-all  ui-shadow-inset ui-body-b"><input type="text" name="total" id="total" disabled="true" value=""></div><a href="#" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-body-c ui-btn-icon-left ui-icon-check" id="encaisseProd">ENCAISSER</a><a href="#" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-left ui-icon-clock" id="miseAttente">MISE EN ATTENTE</a></div></div>';
		
		var popup='<div data-role="popup" id="facture" data-theme="a"><div data-role="header" class="ui-header ui-bar-inherit"><h1 class="ui-title" role="heading" aria-level="1">Reglement Ticket</h1></div><div data-role="main" class="ui-content"><table data-role="table" id="FactureProd" class="ui-responsive ui-corner-all"><tr><td><label for="fraction">Fractionner</label></td><td><div class="ui-input-text ui-corner-all  ui-shadow-inset ui-body-a"><input type="text" name="fraction" id="fraction" value=""></div></td></tr><tr><td colspan="2"><a href="#" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-left ui-icon-shop ui-btn-inline">Espece</a><a href="#" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-left ui-icon-shop ui-btn-inline">Cheque</a><a href="#" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-left ui-icon-shop ui-btn-inline">Carte</a></td></tr><tr><td><label for="reste">Reste</label></td><td><div class="ui-input-text ui-corner-all  ui-shadow-inset ui-body-b"><input type="text" name="reste" disabled="true" id="reste" value=""></div></td></tr><tr><td colspan="2"><table data-role="table" id="reglement" class="ui-responsive ui-table ui-table-reflow ui-body-a table-stripe"><thead><tr><th data-priority="1">Mode reglement</th><th data-priority="1">Montant</th></tr></thead><tbody></tbody></table></td></tr><tr><td colspan="2"><a href="#" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-btn-b ui-btn-icon-left ui-icon-check" id="ticket">Valider TICKET</a></td></tr></table></div></div>';
		
		var attpopup='<div data-role="popup" id="Attente" data-theme="a"><div data-role="header" class="ui-header ui-bar-inherit"><h1 class="ui-title" role="heading" aria-level="1">Ticket en attente</h1></div><div data-role="main" class="ui-content" id="attente"></div></div>'
		
		
		$(document).one('pagebeforecreate', function () {
			$.mobile.pageContainer.prepend(panel);
			$.mobile.pageContainer.prepend(userpanel);
			$.mobile.pageContainer.prepend(popup);
			$.mobile.pageContainer.prepend(attpopup);
			$("#panier").panel();
			$("#userconfig").panel();
			$("#facture").popup();
			$("#Attente").popup();
			CallService('getTicket.php','');
		});
		
		selectedCat = '';
		selectedProd = '';
		webServiceURL = 'http://localhost/ofbiz/';
	
		$("#localip").on("tap", function() {
			webServiceURL = 'http://' + $("#ip").val() + '/ofbiz/';
		});
	
		$("#categorie").on("tap", function() {
			if ($("#cat").children().length == 0) {
				CallService('getCategorie.php', '');
			}
		});
	
		$(document).on('tap', ".ListCat", function() {
			if (selectedCat != $(this).attr('id')) {
				selectedCat = $(this).attr('id');
				data = {
					id : $(this).attr('id')
				}
				CallService('getProduct.php', data);
				$("#slectedCat").text($(this).text());
							
			}
		});
	
		$(document).on('tap', ".ListProd", function() {
			
			if (selectedProd != $(this).attr('id')) {
				selectedProd = $(this).attr('id');
				data = {
					id : $(this).attr('id')
				}
				CallService('getColor.php', data);
			}
		});
	
		$("select").change(function() {
			$("select option:selected").each(function() {
				data = {
					id : selectedProd,
					couleur : $("select option:selected").attr('value')
				}
				CallService('getDetail.php',data);
			});
		}).trigger("change");
		
		$("#validProd").on("tap",function(){
			for(i=0;i<$('#panierProd tbody tr').length;i++){
				if(	$('#panierProd tbody tr:eq('+i+')').attr('id')==Prod['id'] ){
					$('#panierProd tbody tr:eq('+i+') td:eq(1)').text(
						new Number($('#panierProd tbody tr:eq('+i+') td:eq(1)').text())+1);
					$('#panierProd tbody tr:eq('+i+') td:eq(3)').text(
					new Number($('#panierProd tbody tr:eq('+i+') td:eq(3)').text())
					+new Number($('#panierProd tbody tr:eq('+i+') td:eq(2)').text()));
					break;
				}
			}
			if(i==$('#panierProd tbody tr').length){
				$("#panierProd tbody").append($("<tr>",{
				id:Prod['id']
				}).append($("<td>").text(Prod['codeArticle'])
				).append($("<td>").text(1)
				).append($("<td>").text(Prod['prix'])
				).append($("<td>",{class:'ui-body-c'}).text(Prod['prix'])
			));
			  $("#panierProd").trigger("create");
			  $("#miseAttente").removeClass("ui-btn-b").addClass("ui-btn-c");
			  $("#retourAttente").removeClass("ui-btn-c").addClass("ui-btn-b");
			}
			/*$("#panierProd tbody tr").on("tap",function(){
				//$("#DetailProd tbody tr").css('background-color','');
				//$(this).css('background-color','#A2A2A2');
				$("#panierProd tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-btn-b");
			});*/
			/*$("#panierProd tbody tr").on("taphold",function(){
				//$("#DetailProd tbody tr").css('background-color','');
				//$(this).css('background-color','#A2A2A2');
				if($(this).find("td:eq(1)").text()=="1"){
					$(this).remove();
					$("#miseAttente").removeClass("ui-btn-c").addClass("ui-btn-b");
					$("#retourAttente").removeClass("ui-btn-b").addClass("ui-btn-c");
				}else{
					
					$(this).find("td:eq(1)").text(
					new Number($(this).find("td:eq(1)").text())-1);	
					$(this).find("td:eq(3)").text(
					new Number($(this).find("td:eq(3)").text())
					-new Number($(this).find("td:eq(2)").text())); 
				}
				$(document).trigger("total");
			});*/
			$(document).trigger("total");
		});
		
		$(document).on("tap","#panierProd tbody tr",function(){
				/*$("#DetailProd tbody tr").css('background-color','');
				$(this).css('background-color','#A2A2A2');*/
				$("#panierProd tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-body-b");
		});
		
		$(document).on("taphold","#panierProd tbody tr",function(){
				/*$("#DetailProd tbody tr").css('background-color','');
				$(this).css('background-color','#A2A2A2');*/
				if($(this).find("td:eq(1)").text()=="1"){
					$(this).remove();
					$("#miseAttente").removeClass("ui-btn-c").addClass("ui-btn-b");
					$("#retourAttente").removeClass("ui-btn-b").addClass("ui-btn-c");
				}else{
					
					$(this).find("td:eq(1)").text(
					new Number($(this).find("td:eq(1)").text())-1);	
					$(this).find("td:eq(3)").text(
					new Number($(this).find("td:eq(3)").text())
					-new Number($(this).find("td:eq(2)").text())); 
				}
				$(document).trigger("total");
		});
		
		$(document).on("total",function(){
			var sum=0;
			for(i=0;i<$("#panierProd tbody tr").length;i++){
					sum+=new Number($("#panierProd tbody tr:eq("+i+") td:eq(3)").text());
			}
			$("[name='total']").attr('value',sum);
		});
		
		$(document).on('tap','#encaisseProd',function(){
			$("#facture").popup("open");
			var amount=0;
			for(i=0;i<$("#reglement tbody tr").length;i++){
					amount+=new Number($('#reglement tbody tr:eq('+i+') td:eq(1)').text());
			}
			$("[name='reste']").attr('value',$("[name='total']").attr('value')-amount);
		});
		
		$(document).on('tap','.ui-btn.ui-btn-b.ui-btn-icon-left.ui-icon-shop.ui-btn-inline',function(){
			if($("[name='reste']").attr('value')!=0){
			var amount=$("[name='fraction']").val();
			if(amount=='' || new Number(amount)>new Number($("[name='reste']").attr('value')))
				amount=$("[name='reste']").val();
			$("#reglement tbody").append($("<tr>").append($("<td>").text($(this).text() ) ).append($("<td>").text(amount)));
			$("[name='reste']").attr('value',new Number($("[name='reste']").attr('value'))-amount);
			if($("[name='reste']").attr('value')==0)
				$('#ticket').removeClass('ui-btn-b').addClass('ui-btn-a');
			}
		});
		$(document).on('tap',"#reglement tbody tr",function(){
				/*$("#DetailProd tbody tr").css('background-color','');
				$(this).css('background-color','#A2A2A2');*/
				$("#reglement tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-body-b");
		});
		
		$(document).on('taphold','#reglement tbody tr',function(){
			$("[name='reste']").attr('value',new Number($("[name='reste']").attr('value'))+new Number($(this).find("td:eq(1)").text()));
			$(this).remove();
			if($("[name='reste']").attr('value')!=0)
				$('#ticket').removeClass('ui-btn-a').addClass('ui-btn-b');
		});
		
		$(document).on('tap','#ticket',function(){
			if($(this).hasClass('ui-btn-a')){
			var data=new Object();
			data['cnom']=$("#cnom").text();
			data['unom']=$("#unom").text();
			data['total']=$("#total").val();
			data['fraction']=$("#fraction").val();
			data['reste']=$("#reste").val();
			data['reglement']=new Array();
			data['panier']=new Array();
			console.log($("#reglement tbody tr").length);
			for(i=0;i<$("#reglement tbody tr").length;i++){
				data['reglement'][i]=new Object();
				for(j=0;j<$('#reglement tbody tr:eq('+i+') td').length;j++){
					data['reglement'][i][j]=$('#reglement tbody tr:eq('+i+') td:eq('+j+')').text();
				}
			}
			for(i=0;i<$("#panierProd tbody tr").length;i++){
				data['panier'][i]=new Object();
				data['panier'][i]['id']=$('#panierProd tbody tr:eq('+i+')').attr('id');
				for(j=0;j<$('#panierProd tbody tr:eq('+i+') td').length;j++){
					data['panier'][i][j]=$('#panierProd tbody tr:eq('+i+') td:eq('+j+')').text();
				}
			}
			CallService("addTicket.php",{json:JSON.stringify(data)});
			console.log(JSON.stringify(data));
			$(document).trigger('restart',"#home");
			}
		});
		//////////////////////////// LOGIN
		
		$("#connexion").on("tap",function() {
			
			
			data = {
					mail : $("#login").val(),
					pass :$("#pass").val(),
				}
				CallService('authentification.php', data);
			
			var days = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
			var months= ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"];
			var d=new Date();
			$("#date").text(days[d.getDay()]+' '+d.getDate()+' '+months[d.getMonth()]);
			
		});
		
		$("#validation").on("tap",function() {
			
			if($("#mpass").val()!=$("#repass").val()){
				$( "#falsepass" ).popup( "open" );
			}else {
			data = {
					nom : $("#nom").val(),
					prenom :$("#prenom").val(),
					mail :$("#mail").val(),
					pass : $("#mpass").val(),
					
				}
				CallService('register.php', data);
			
			}
			
		});
		$(document).on('tap', "#logout", function() {
		
			user=null;
			Client=null;
			$.mobile.changePage("#home");
  			location.reload();
		});
		
		$("#ListProducts").on("tap",function(){
			
			if ($("#bodyProd").children().length == 0) {
				
				CallService('getAllProduct.php', '');
			}
		});
		$("#ProdValid").on("tap",function(){
			
			if (selectedProd != Prod['codeArticle']) {
				selectedProd = Prod['codeArticle'];
				data = {
					id : Prod['codeArticle']
				}
				CallService('getColor.php', data);
				
							
			}
		});
		
		$(".Lcancel").on("tap",function(){
			
			$("#ProdList tbody .ui-body-b").removeClass("ui-body-b");
			$("#ProdImg").removeAttr("src");
		});
		
		$(".Pcancel").on("tap",function(){
			
			$("#DetailProd tbody .ui-body-b").removeClass("ui-body-b");
		});
		
		$(".LCcancel").on("tap",function(){
			
			$("#ClientList tbody .ui-body-b").removeClass("ui-body-b");
		});
		
		
		$("#ListClients").on("tap",function(){
			
			if ($("#bodyClient").children().length == 0) {
				CallService('getClient.php', '');
			}
		});
		$("#ClientValid").on("tap",function(){
			$("#cnom").text(Client['nom']+' '+Client['prenom']);
			
			
		});
		
		////////////// MISE-RETOUR EN ATTENTE
		
		$(document).on('restart',function(event,url){
			$.mobile.changePage(url);
  				location.reload();
		});
		
		$(document).on('tap','#miseAttente',function(){
			if($(this).hasClass("ui-btn-b"))
				return;
			var data=new Object();
			data['cnom']=$("#cnom").text();
			data['unom']=$("#unom").text();
			data['total']=$("#total").val();
			data['fraction']=$("#fraction").val();
			data['reste']=$("#reste").val();
			data['reglement']=new Array();
			data['panier']=new Array();
			console.log($("#reglement tbody tr").length);
			for(i=0;i<$("#reglement tbody tr").length;i++){
				data['reglement'][i]=new Object();
				for(j=0;j<$('#reglement tbody tr:eq('+i+') td').length;j++){
					data['reglement'][i][j]=$('#reglement tbody tr:eq('+i+') td:eq('+j+')').text();
				}
			}
			for(i=0;i<$("#panierProd tbody tr").length;i++){
				data['panier'][i]=new Object();
				data['panier'][i]['id']=$('#panierProd tbody tr:eq('+i+')').attr('id');
				for(j=0;j<$('#panierProd tbody tr:eq('+i+') td').length;j++){
					data['panier'][i][j]=$('#panierProd tbody tr:eq('+i+') td:eq('+j+')').text();
				}
			}
			CallService("addList.php",{json:JSON.stringify(data)});
			console.log(JSON.stringify(data));
			$(document).trigger('restart',"#home");
		});
		
		$(document).on('tap','#retourAttente',function(){
			if($(this).hasClass("ui-btn-b"))
				return;
			$("#Attente").popup("open");
			CallService("getAllList.php",'');
		});
		
		$(document).on('tap','#cloture',function(){
			//CallService('getTicket.php','');
			if($(this).hasClass('ui-btn-c'))
				$.mobile.changePage("#pageCloture");
		});
		
		$(document).on('tap',"#ClotureList tbody tr",function(){
			$("ClotureList tbody .ui-body-b").removeClass('ui-body-b');
			$(this).addClass('ui-body-b');
		});
		
		$("#defcloture").on('tap',function(){
			var data={
				initial:$("#minitial").attr('value'),
				vente:$("#mvente").attr('value'),
				retrait:$("#mretrait").val(),
				restant:$("#mrestant").attr('value')
			}
			CallService('Cloture.php',data);
			$(document).trigger('restart',"#home");
		});
		
		function CallService(service, data) {
			$.ajax({
				url : webServiceURL + service,
				type : "POST",
				data : data,
				dataType : "json",
				success : OnSuccess,
				error : OnError,
				context : {
					service : service
				},
				async : false
			});
			return false;
		}
	
		function OnSuccess(data, status) {
			console.log(data);
			if (this.service == "getCategorie.php") {
				for (i = 0; i < data.length; i++) {
	
					$("#cat").append($('<li>', {
						class : 'ListCat',
						'id' : data[i]['id'],
						'data-icon' : false
	
					}).append($('<a>', {
						'href' : '#products'
					}).append($('<label>', {
						text : data[i]['name']
					})))
	
					);
					$("#cat").trigger("create");
				}
			}else if (this.service == "getProduct.php") {
				
				$("#prod").empty();
				$("#prod").append($("<div>", {
					'data-role' : 'controlgroup',
					'data-type' : 'horizontal'
				}));
				for (i = 0; i < data.length; i++) {
					$("#prod div").append($("<a>", {
						id : data[i]['codeArticle'],
						width : '110',
						height : '130',
						href : '#product',
						class : 'ui-btn ListProd',
					}).append($("<label>", {
						style : 'white-space: normal;',
						text : data[i]['article'],
					}),$("<img>",{
						src : webServiceURL+ data[i]['url'],
						style : 'height : 80px;width : 80px ; position: absolute;bottom: 0; margin-left : auto;                    		margin-right : auto;left:0;right:0; margin-bottom:10px',
					})));
				}
				$("#prod").trigger("create");
	
			}else if (this.service == "getColor.php") {
	
				$("#imgProd").attr("src", webServiceURL + data[0]['url']);
				$("#slectedProd").text(data[0]['article']);
				$("#codeProd").text(data[0]['codeArticle']);
				$("#colorProd").empty();
	
				for (i = 0; i < data.length; i++) {
	
					$("#colorProd").append($("<option>", {
						value : data[i]['couleur'],
						text : data[i]['couleur'],
					}));
				}
	
				data = {
					id : selectedProd,
					couleur : data[0]['couleur']
				}
				CallService('getDetail.php', data);
	
				$("#colorProd").trigger("create");
				//$("select").selectmenu('refresh', true);
				$("select").selectmenu("refresh");
			} else if(this.service == "getDetail.php") {
				$("#DetailProd tbody").empty();
						
				for (i = 0; i < data.length; i++) {
							
					$("#DetailProd tbody").append($("<tr>",{
						id:i
						}).append($("<td>").text(data[i]['taille'])
						).append($("<td>").text(data[i]['prix'])
						).append($("<td>").text(data[i]['solde'])
						).append($("<td>").text(data[i]['stock'])
					));
				}
				$("#DetailProd").trigger("create");
				$("#DetailProd tbody tr").on("tap",function(){
				/*$("#DetailProd tbody tr").css('background-color','');
				$(this).css('background-color','#A2A2A2');*/
				$("#DetailProd tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-body-b");
				idProd=$(this).attr('id');
				Prod=data[idProd];
				});
						
			}else if (this.service == "authentification.php") {
				data=data[0];
				if(data['auth']==true){
					user=data;
					$("#unom").text(data['nom']+' '+data['prenom']);
					$("#login").val('');
					$("#pass").val('');
					user=data;
					if ($("#cat").children().length == 0) {
					CallService('getCategorie.php', '');
					}
					$.mobile.changePage( $('#categories') );
				}else {
					$("#login").val('');
					$("#pass").val('');
			
					$( "#false" ).popup( "open" );
				}
			}else if(this.service == "register.php") {
				data=data[0];
				if(data['register']==true){
					user=data;
					$("#unom").text(data['nom']+' '+data['prenom']);
					
					$("#nom").val('');
					$("#prenom").val('');
					$("#mail").val('');
					$("#mpass").val('');
					
					user=data;
					
					if ($("#cat").children().length == 0) {
					CallService('getCategorie.php', '');
					}
					$( "#success" ).popup( "open" );
					$.mobile.changePage( $('#categories') );
				}
				
				else {
					$("#nom").val('');
					$("#prenom").val('');
					$("#mail").val('');
					$("#mpass").val('');
			
					$( "#failed" ).popup( "open" );
				
				}
			}else if(this.service == "getAllProduct.php") {
				
				$("#ProdList tbody").empty();
						
				for (i = 0; i < data.length; i++) {
							
					$("#ProdList tbody").append($("<tr>",{
						id:i
						}).append($("<td>").text(data[i]['codeArticle'])
						).append($("<td>").text(data[i]['article'])
						).append($("<td>").text(data[i]['prix'])
						).append($("<td>").text(data[i]['solde'])
						).append($("<td>").text(data[i]['stock'])
					));
				}
				$("#ProdList").trigger("create");
				$("#ProdList tbody tr").on("tap",function(){
				
				$("#ProdList tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-body-b");
				idProd=$(this).attr('id');
				Prod=data[idProd];
				
				$("#ProdImg").attr('src',webServiceURL + Prod['url']);
				});
						
			}else if(this.service == "getClient.php") {
				
				$("#ClientList tbody").empty();
						
				for (i = 0; i < data.length; i++) {
							
					$("#ClientList tbody").append($("<tr>",{
						id:i
						}).append($("<td>").text(data[i]['numEnregistrement'])
						).append($("<td>").text(data[i]['nom']+' '+data[i]['prenom'])
						).append($("<td>").text(data[i]['tel'])
						).append($("<td>").text(data[i]['numCB'])
						).append($("<td>").text(data[i]['cin'])
					));
				}
				$("#ClientList").trigger("create");
				$("#ClientList tbody tr").on("tap",function(){
				
				$("#ClientList tbody .ui-body-b").removeClass("ui-body-b");
				$(this).addClass("ui-body-b");
				idClient=$(this).attr('id');
				Client=data[idClient];
				
				//$("#ClientImg").attr('src',webServiceURL + Prod['url']);
				});
						
			}else if(this.service=="getAllList.php") {
				$("#attente").empty();
				$("#attente").append($("<div>", {
					'data-role' : 'controlgroup',
					'data-type' : 'horizontal'
				}));
				for (i = 0; i < data.length; i++) {
					var obj=JSON.parse(data[i]['json']);
					$("#attente div").append($("<a>", {
						id : i,
						href : '#categories',
						class : 'ui-btn ui-icon-check ui-icon-left ListTicket',
					}).append($("<label>", {
						style : '',
						text : 'Client : '+obj['cnom'],
					}),$("<label>", {
						style : '',
						text : 'Vendeur : '+obj['unom'],
					}),$("<label>", {
						style : '',
						text : 'Total Ticket : '+obj['total'],
					})
					
					
					));
				}
				$("#attente").trigger("create");
				$("#attente div a").on('tap',function(){
					$("#retourAttente").removeClass("ui-btn-c").addClass("ui-btn-b");
					$("#miseAttente").removeClass("ui-btn-b").addClass("ui-btn-c");
					i=$(this).attr('id');
					var obj=JSON.parse(data[i]['json']);
					$("#cnom").text(obj['cnom']);
					$("#unom").text(obj['unom']);
					$("#total").attr('value',obj['total']);
					$("#fraction").attr('value',obj['fraction']);
					$("#reste").attr('value',obj['reste']);
					
					for(i=0;i<obj['panier'].length;i++){
						
						$("#panierProd tbody").append($("<tr>",{
				id:obj['panier'][i]['id']
				}).append($("<td>").text(obj['panier'][i][0])
				).append($("<td>").text(obj['panier'][i][1])
				).append($("<td>").text(obj['panier'][i][2])
				).append($("<td>",{class:'ui-body-c'}).text(obj['panier'][i][3])
						));
					}
					
					for(i=0;i<obj['reglement'].length;i++){
						$("#reglement tbody").append($("<tr>").append($("<td>").text(obj['reglement'][i][0] ) ).append($("<td>").text(obj['reglement'][i][1])));	
					}
					$("#userconfig").panel("close");
					i=$(this).attr('id');
					CallService("getList.php",{id:data[i]['id']});
					$(document).trigger("total");
				});
				
			}else if(this.service=='getTicket.php'){
				
				if(data.length==0)
					return;
				else
					$("#cloture").removeClass("ui-btn-b").addClass("ui-btn-c");
				
				for (i = 0; i < data.length; i++) {
					var obj=JSON.parse(data[i]['json']);
					var c=obj['cnom'];
					if(c=='')
						c='vente Caisse';
					$("#ClotureList tbody").append($("<tr>",{
						id:i
						}).append($("<td>").text('T'+data[i]['id'])
						).append($("<td>").text(obj['total'])
						).append($("<td>").text(c)
					));
				}
				$("#vArticle").on('tap',function(){
					if($("#ClotureList tbody .ui-body-b").length==0)
						return;
					i=$("#ClotureList tbody .ui-body-b").attr('id');
					var obj=JSON.parse(data[i]['json']);
					$("[name='vtotal']").attr('value',obj['total']);
					$("#vpanierProd tbody").empty();
					for(i=0;i<obj['panier'].length;i++){
						
						$("#vpanierProd tbody").append($("<tr>",{
				id:obj['panier'][i]['id']
				}).append($("<td>").text(obj['panier'][i][0])
				).append($("<td>").text(obj['panier'][i][1])
				).append($("<td>").text(obj['panier'][i][2])
				).append($("<td>",{class:'ui-body-c'}).text(obj['panier'][i][3])
						));
					}
					$("#vpanier").popup();
					$("#vpanier").popup("open");
				});
				
				$("#vReglement").on('tap',function(){
					if($("#ClotureList tbody .ui-body-b").length==0)
						return;
					var id=$("#ClotureList tbody .ui-body-b").attr('id');
					var obj=JSON.parse(data[id]['json']);
					$("#vreglement tbody").empty();
					var c=obj['cnom'];
					if(c=='')
						c='vente Caisse';
					for(i=0;i<obj['reglement'].length;i++){
						$("#vreglement tbody").append($("<tr>"
							).append($("<td>").text('T'+data[id]['id'])
							).append($("<td>").text(c)
							).append($("<td>").text(data[id]['date'])
							).append($("<td>").text(obj['reglement'][i][0]) 
							).append($("<td>").text(obj['reglement'][i][1])
							
							));	
					}
					c=0;
					for(i=0;i<obj['reglement'].length;i++)
						c+=new Number(obj['reglement'][i][1]);
					$("#rtotal").attr('value',c);
					$("#vfacture").popup();
					$("#vfacture").popup("open");
				});
				
				$("#clotureJ").on('tap',function(){
			
					CallService('verifCloture.php','');
					var v=0;
					for(i=0;i<data.length;i++){
						var obj=JSON.parse(data[i]['json']);
						v+=new Number(obj['total']);
					}
					$("#mvente").attr('value',v);
					
				});
	
			}else if(this.service=='verifCloture.php'){
				
				if(data['exist']){
					$("#verifCloture").popup();
					$("#verifCloture").popup("open");
					$("#OCloture").on('tap',function(){
						$("#verifCloture").popup("close");
						$("#verifCloture").on('popupafterclose',function(){
							$("#fincloture").popup();
							$("#fincloture").popup("open");
						});
						$("#minitial").attr('value',data['initial']);
					});
				}else{
					$("#fincloture").popup();
					$("#fincloture").popup("open");	
					$("#minitial").attr('value',data['initial']);
				}
				$("#mreste").attr('value',new Number($("#minitial").attr('value'))+new Number($("#mvente").attr('value')));
				$("#mretrait").on('input',function(){
					if($("#mretrait").val()>new Number($("#minitial").attr('value'))+new Number($("#mvente").attr('value')))
					$("#mretrait").val(new Number($("#minitial").attr('value'))+new Number($("#mvente").attr('value')));
					$("#mrestant").attr('value',new Number($("#minitial").attr('value'))+new Number($("#mvente").attr('value'))-new Number($("#mretrait").val() ));
				});
				
					
			}
			
							
		}
	
		function OnError(request, status, error) {
			console.log(error);
		}
	});
