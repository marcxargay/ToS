 $(document).ready(function(e){
 	//variables globals
	var tempsBlanques = 0;
	var tempsNegres = 0;
	var minB = 0;
	var minN = 0;
	var tempsB = "", tempsN = "";
	var interval;
 	var arrayWhitePieceCode = ["&#9814","&#9815","&#9816","&#9812","&#9813","&#9816","&#9815","&#9814"];
 	var arrayBlackPieceCode = ["&#9820","&#9822","&#9821","&#9818","&#9819","&#9821","&#9822","&#9820"];
 	var arrayPieces = [];
 	var torn = true;
 	initBoard();
 	initPieces();
 	initMarcador();

 	//pinta la taula
 	function initBoard(){
 		$("body").append($("<table>").attr({id:"board"}));
 		for(var i = 0; i < 8; i++){
 			$("#board").append($("<tr>").attr({id:"row"+i}));
 			for(var j = 0; j < 8; j++){
 				if(i%2 == 0)
					j%2 == 0 ? color = "black" : color = "white";
				else 
					j%2 != 0 ? color = "black" : color = "white";
 				$("#row"+ i).append($("<td>").attr({id: j+"-"+i, class:color+" cell"}).css({height:"60px",width:"60px"}));
 			}
 		}
 	}
 	//pinta les peces
 	function initPieces(){
 		for(var i = 0; i < 8; i++){
 			var p = new piece(i,1,"black","&#9823").crear();
 			var p1 = new piece(i,6,"white","&#9817").crear();
 			var p2 = new piece(i,0,"black", arrayBlackPieceCode[i]).crear();
 			var p3 = new piece(i,7,"white", arrayWhitePieceCode[i]).crear()
 			arrayPieces.push(p,p1,p2,p3);
 			console.log(arrayPieces);
 		}
 	}
 	//inicia el marcador
 	function initMarcador(){
 		$("body").append($("<div>").attr({id: "marcador"}));
 		$("#marcador").append($("<div>").attr({id: "tempsB"}),
 						$("<div>").attr({id: "tempsN"}),
 						$("<div>").attr({id: "torn"}),
 						$("<button>").attr({id:"start"})
 						)
 		$("#start").html("Tornar a començar");
 		$("#tempsB").html("Temps Blanques: " + "0:0");
 		$("#tempsN").html("Temps Negres: " + "0:0"); 
 		if(torn){
 				$("#torn").empty();
 				$("#torn").html("Blanques Mouen");
 			}
		else{
			$("#torn").empty();
			$("#torn").html("Negres Mouen");
		}
 	}
 	//inicia el temps de joc
 	function iniciarTempsDeJoc(){
 		clearInterval(interval);
 		interval = setInterval(function(){
 			tempsB = minB + ":" + tempsBlanques;
 			tempsN = minN + ":" + tempsNegres;
 			$("#tempsB").html("Temps Blanques: " + tempsB);
 			$("#tempsN").html("Temps Negres: " + tempsN); 
 			if(tempsBlanques == 60){
 				minB +=  1;
 				tempsBlanques = 0;
 			}
 			if(tempsNegres == 60){
 				minN += 1;
 				tempsNegres = 0;
 			}
 			torn?tempsBlanques += 1 : tempsNegres += 1;
 		},1000);
 	}
 	//objecte peça
 	function piece(x,y,color,code){
 		this.x = x;
 		this.y = y;
 		this.position = this.x + "-" + this.y;
 		this.color = color;
 		//pinta la peça
 		this.crear = function(){
 			$("#"+this.position).append($("<span>").attr({class:this.color+"Piece piece"}).html(code));
 			return this;
 		}
 		return this;
 	}
 	//funcio per canviar de torn
 	function changeTurn(){
		torn = !torn;
		if(torn){
 				$("#torn").empty();
 				$("#torn").html("Blanques Mouen");
 			}
		else{
			$("#torn").empty();
			$("#torn").html("Negres Mouen");
		}
		checkTurn();
 	}
 	//funcio que comprova a qui li toca i habilita el drag al color que toca moure
 	function checkTurn(){
 		if(torn){
		 	$(".whitePiece").draggable({
		 		grid: [60,60],
		 		disabled:false
		 	})
		 	$(".blackPiece").draggable({
		 		disabled:true
		 		});
		}
		else{
			$(".blackPiece").draggable({
				grid: [60,60],
				disabled:false
			})
		 	$(".whitePiece").draggable({
		 		disabled:true
		 	});
		}
 	}
 	//funcio per reiniciar la partida
 	function reset(){
 		torn = true;
 		$("#board").remove();
 		$("#marcador").remove();
 		initBoard();
	 	initPieces();
 		clearInterval(interval);
	 	initMarcador();
	 	$(".cell").droppable({
	 		drop: function(event,ui){
	 			changeTurn();
	 			iniciarTempsDeJoc();
	 			console.log(torn);
	 		}
	 	})
	 	$(".piece").hover(function(){
 		checkTurn();
	 	})
	 	$(".cell").hover(function(){
	 		checkTurn();
	 	})
	 	$("#start").click(function(){
			reset();
	 	})
	 	tempsBlanques = 0;
		tempsNegres = 0;
		minB = 0;
		minN = 0;
 	}


 	$(".cell").droppable({
	 		drop: function(event,ui){
	 			changeTurn();
	 			iniciarTempsDeJoc();
	 			console.log(torn);
	 		}
	 	})
 	$("#start").click(function(){
		reset();
 	})
 	$(".piece").hover(function(){
 		checkTurn();
 	})
 	$(".cell").hover(function(){
 		checkTurn();
 	})
 	












 })