var cellWH = 80;
var boardWH = cellWH * 8;
var arrayPieces = [];
var arrayPosPieces = [["04"],["03"],["00","07"],["02","05"],["01","06"],["10","11","12","13","14","15","16","17"],["74"],["73"],["70","77"],["72","75"],["71","76"],["60","61","62","63","64","65","66","67"]];
var timeWhite = 0;
var timeBlack = 0;
var torn = false;
var c ={};
var pieces = [{}];
//&#9812
$(document).ready(function(){
	board();
	buttons(6,'');
	buttons(6,'b');
	c = new clock;
	c.start();
	fillArrayPieces();
	initPieces();

})
function board(){
	//append > append ->body 
	$("body").append($("<div>").attr({id: "main"}).append(
		$("<div>").attr({id: "Board", class: "board"}).css({width:boardWH, height: boardWH})
	));
	var color = "";
	//switch de colors
	//x
	for(var i = 7; i >= 0; i--){ 
		//y
		for(var j = 0; j < 8; j++){ 
			if(i%2 == 0)
				j%2 == 0 ? color = "black" : color = "white";
			else 
				j%2 != 0 ? color = "black" : color = "white";
			var id = "" + i  + j;
			//pinta
			var newcell = new cell(id,color, i,j);
			$("#Board").append(newcell);
		}
	}
}
function initPieces(){
	var color = "";
	var count = 0;
	for(var i = 0; i < arrayPosPieces.length; i++){
		i > 5 ? color = "Black" : color ="White";
		for(var j = 0; j < arrayPosPieces[i].length; j++){
			var p = new piece(count,arrayPosPieces[i][j],arrayPieces[i],color);
			pieces[count] = p ;
			count++;
		}
	}
	
}
function cell(id,color){
 	var cellD = $("<div>").attr({id:id ,class:color,}).css({width:cellWH, height:cellWH})
 	.droppable({
 		drop: function(event, ui){
 			var idCell = this.id;
 			var idPiece = ui.draggable[0].id;
 			var defPiece = 99;
 			for(var i = 0; i < pieces.length; i ++)
 			{
 				console.log("position peca"+ pieces[i].position) ;
 				console.log("postion cela"+ idCell);
 				if(pieces[i].position == idCell){
 					defPiece = pieces[i].id;
 					
 				}
 				console.log("def piece  " + defPiece)
 			}
 			//comprova si hi ha una peça amb la posicio de la id de la cela
 			if(defPiece != 99){
	 			if(idCell == pieces[defPiece].position){
	 				//comprova si la peça es del mateix color
		 			if(!(pieces[idPiece].checkColor(defPiece))){
		 				
	 					$("#"+defPiece).html("");
						console.log(this)
						c.changeTurn();
					}
				}
			}
			pieces[idPiece].position = this.id;
			c.changeTurn();
 		}
 	});
 	$(cellD).addClass("cell");
 	return cellD;
}
function piece(id,position,pieceCode,color){

	this.id = id;
	this.position = String(position);
	this.pieceCode = pieceCode;
	this.color = color;
	$parent = this;

	$("#"+position).append(
		$("<span>").attr({id: $parent.id, class: "piece p"+color})
			.html(pieceCode));

	$(".piece").draggable({
		grid: [80,80],
	});
	//retorna true si el color de la peça es igual a la la id que li passem
	this.checkColor = function(id){
		for(var i = 0; i < pieces.length; i++){
			if(pieces[id].color == $parent.color){
				$("#"+$parent.id).position({
					my:"center",
					at:"center",
					of: ""
				})
				return true;
			}	
		}
		return false;
	}
	return this;
}
function clock(){

	this.whiteTime = 0;
	this.blackTime = 0;
	this.turn = false;
	var parent = this;
	var time;

	$("body").append($("<div>").attr({id: "timer"}).append(
			$("<div>").attr({id: "timerWhite"}),
			$("<div>").attr({id: "timerBlack"})
		));
	//init
	this.start = function(){
		time = setInterval(function(){
			 	torn ? parent.whiteTime++ : parent.blackTime++;
				$("#timerWhite").html(parent.whiteTime); 
				$("#timerBlack").html(parent.blackTime);
			},1000);
	}
	//canvi turn;
	this.changeTurn = function(){
		if(torn){
			torn = false;
			$(".pWhite").draggable('enable');
			$(".pBlack").draggable('disable');
		} 
		else{
			torn = true;
			$(".pWhite").draggable('disable');
			$(".pBlack").draggable('enable');
		}
		
	}
	//reset rellotge
	this.reset = function(){
		parent.whiteTime = 0;
		parent.blackTime = 0;
		$("#timeWhite").html(parent.whiteTime); 
		$("#timeBlack").html(parent.blackTime);
		clearInterval(time);
	}
	//retorna el color te torn
	this.turnToStr = function(){
		return parent.turn ? "white" : "black";
	}
}
function fillArrayPieces(){
	for (var i = 12; i < 24; i++){
		var pcode = "&#98"+i;
		arrayPieces[i-12] = pcode;
	}
}
function buttons(n,c){
	$("body").append($("<div>").attr({id : "selectors"}));
	//crea els buttons per canviar d'estils.
	for(var i = 0; i < n ; i++){
		var s;
		c == 'b' ? s = "changeStyle" : s ="changeStyleB";
		var btn = $("<button>").attr({onclick : s+"(" +i+")"}).html("Estil " + i);
		$("#selectors").append(btn);
	}
}
