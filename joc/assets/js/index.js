$(document).ready(function(e){
	//variables globals
	var cellW = "30px";
	var cellH = "30px";
	var arrayPieces = [];
	var currentPiece = "1";
	var jugador = new player();

	//funcio que inicia el joc
	function start(){
		$("#taula").remove();
		marcador();
		initBoard();
		initPieces();
		jugador.init();
		jugador.reset();
		
	}
	//crea la taula
	function initBoard(){
		$("body").append($("<table>").attr({id:"taula"}));
		for(var i = 0; i < 16; i++){
			$("#taula").append($("<tr>").attr({id:"row" + i}));
			for(var j = 0; j < 16; j++){
				
				$("#row" + i).append($("<td>").attr({id: j + "," + i, class:"cell"}).css({height:cellH, width:cellW}));
			}
		}
	}
	//crea les fitxes
	function initPieces(){
		var position ="";
		var x = 0;
		var y = 0;
		for(var i = 1; i <= 50; i++){
			do{
				//obtenir la posicio de les fitxes
				x = Math.floor(Math.random() * (16));
				y = Math.floor(Math.random() * (16));
				position = x + "," + y;
			}
			//comprova que la posicio de la fitxe que es crearà no existeixi
			while(checkPositionInArray(position));
			//crea fitxe i insereix a la cel·la
			var f = new piece(x,y,i);
			arrayPieces.push(f);
			var pieces  = document.createElement("SPAN");
			pieces.setAttribute("ID",i);
			pieces.setAttribute("CLASS","fitxa");
			pieces.innerHTML = i;
			document.getElementById(position).appendChild(pieces);
		}
		
	}
	//comprova si ja existeix una fitxa a la posicio que l'hi passem
	function checkPositionInArray(pos){
		if(pos == "0,0") return true;
		for(var i = 0; i <arrayPieces.length; i++){
			if(arrayPieces[i].position == pos)
				return true;
		}
		return false;
	}
	//objecte fitxa
	function piece(x,y,n){
		this.n = n;
		this.x = x;
		this.y = y;
		this.position = x + "," + y;
		return this;
	}
	//objecte jugador
	function player(){
		this.x = 0;
		this.y = 0;
		this.id = "p";
		this.position = this.x +","+this.y;
		var ply = document.createElement("SPAN");
		ply.setAttribute("ID", this.id);
		ply.setAttribute("CLASS", "jugador");

		//inicia el jugador a la posicio 0,0
		this.init = function(){
			document.getElementById("0,0").appendChild(ply);
		}
		//funcio per moure
		this.move = function(n,m){
			var px = parseInt(this.x) + n;
			var py = parseInt(this.y) + m;
			//comprovacio de limits de la taula
			if(!(px < 0 || px > 15 || py < 0 || py > 15)){
				$("#"+this.id).remove();
				//actualitza la posicio del jugador
				this.x = parseInt(this.x) + n;
				this.y = parseInt(this.y) + m;
				this.position = this.x +","+this.y;
				//mou el jugador a la nova cel·la
				document.getElementById(this.x + "," + this.y).appendChild(ply);	
				checkPiece();
			}
		}
		//funcio per reiniciar el jugador a la cel·la 0.0
		this.reset = function(){
			this.x = 0;
			this.y = 0;
			this.position = this.x +","+this.y;
		}
		return this;
	}
	//funcio que comprova si hi ha una fitxa a la cel·la a la que es mou el jugador i si la fitxa es la que toca
	function checkPiece(){
		
		for(var i = 0; i < arrayPieces.length; i++){
			if(arrayPieces[i].position == jugador.position && currentPiece == arrayPieces[i].n ){
				
				$("#"+arrayPieces[i].n).remove();
				
				currentPiece = parseInt(currentPiece) + 1;
				if(currentPiece == "51")
					$(".textend").css({visibility:"visible"})
			}
		}
	}
	
	//marcador de temps i fitxa acutual
	function marcador(){
		var temps = 0;
		var min = 0;
		$("body").append($("<div>").attr({id:"marcador"}),
						$("<div>").attr({id:"temps"}));
		var intervalMarcador = setInterval(function(){
			//parar el temps quan hem agafat l'ultima fitxa
			if(currentPiece == 51) clearInterval(intervalMarcador);
			temps += 1;
			$("#marcador").html("Fitxa actual: " + currentPiece);
			if(temps >= 60){ min += 1; temps = 0}
			$("#temps").html("Temps: " + min + ":" + temps);
		},1000)
	}
	//agafar el codi de les flextes del teclat i moure el jugador
	$(document).keydown(function(e){
		switch (e.keyCode){
			case 37:
				jugador.move(-1,0)
				
				break;
			case 38:
				jugador.move(0,-1);
				break;
			case 39:
				jugador.move(1,0);
				break;
			case 40:
				jugador.move(0,1);
				break;
		}
	})
	$("#btnend").click(function(){
		start();
	});
	

})