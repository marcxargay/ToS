
var cellWH = 80;
var boardWH = cellWH * 8;
var letters = ["a" ,"b", "c", "d", "e", "f", "g", "h"];
//var letters = ["h" ,"g", "f", "e", "d", "c", "b", "a"];
var currentPiece;
var newPos;

$(document).ready(function(){
	init();
})

function init(){
	
	new board();
	insertPieces();
	buttons(6,'');
	buttons(6,'b');
}
function board(){
	var board = $("<div>").attr({id: "Board", class: "board"}).css({width:boardWH, height: boardWH});
	$("body").append(board);
	var color = "";
	for(var i = 0; i < 8; i++){ 

		for(var j = 0; j < 8; j++){ 
			
			if(i%2 == 0)
				j%2 == 0 ? color = "black" : color = "white";
			else 
				j%2 != 0 ? color = "black" : color = "white";
			id = "" + i + j;
			var newcell = new cell(id,color, i,j);
			$("#Board").append(newcell);
		}
	}
}
function cell(id,color){
 	var cellD = $("<div>").attr({id:id ,class:color,}).css({width:cellWH, height:cellWH})
 	.droppable({

 		drop: function(event, ui){
 			assignNewPos(currentPiece,$(this)[0].id);
 		}
 	});
 	$(cellD).addClass("cell");
 	return cellD;
}
//Types
//White: King = 12, Queen = 13, Rook = 14, Bishop = 15, Knigt = 16, Pawn = 17
//Black: King = 18, Queen = 19, Rook = 20, Bishop = 21, Knight = 22, Pawn = 23
function piece(type,color,p){

	this.color = color + "Piece";

	var pieceCode = "&#98" + type;

	var p = $("<span>").attr({class: "piece", id: pieceCode, pos: p}).html(pieceCode)
	.draggable({
		grid: [80,80], revert:"invalid",
		drag: function(event, ui){
			currentPiece = $(this)[0];
		}
	});
	$(p).addClass(this.color);

	return p;

}
function assignNewPos(id,newPos){
	$(id).attr({pos:newPos})
}
function insertPieces(){

	for(var i = 0; i < 8; i++){
		//white pawns
		$("#"+ 6 + i).append(new piece(17,"white"));
		//black pawns
		$("#"+ 1 + i).append(new piece(23, "black"));
	}
	//rooks
	$("#70").append(new piece(14,"white",'70'));
	$("#77").append(new piece(14,"white",'77'));

	$("#07").append(new piece(20, "black",'07'));
	$("#00").append(new piece(20, "black",'00'));
	//bishops
	$("#72").append(new piece(15, "white",'71'));
	$("#75").append(new piece(15, "white",'75'));

	$("#02").append(new piece(21, "black",'01'));
	$("#05").append(new piece(21, "black",'06'));
	//knights
	$("#71").append(new piece(16, "white",'71'));
	$("#76").append(new piece(16, "white",'76'));

	$("#01").append(new piece(22, "black",'02'));
	$("#06").append(new piece(22, "black",'05'));
	//kings
	$("#04").append(new piece(12, "white",'04'));
	$("#74").append(new piece(18, "black",'74'));
	//queens
	$("#03").append(new piece(13, "white",'03'));
	$("#73").append(new piece(19, "black",'73'));
}
function changeStyle(n){
	switch(n){
		case 0:
			$(".whitePiece").css("color" , "black");
			$(".blackPiece").css("color" , "black");
			break;
		case 1:
			$(".whitePiece").css("color" , "lightgreen");
			$(".blackPiece").css("color" , "green");
			break;
		case 2:
			$(".whitePiece").css("color" , "yellow");
			$(".blackPiece").css("color" , "yellow");
			break;
		case 3:
			$(".whitePiece").css("color" , "orange");
			$(".blackPiece").css("color" , "purple");
			break;
		case 4:
			$(".whitePiece").css("color" , "powderblue");
			$(".blackPiece").css("color" , "blue");
			break;
		case 5:
			$(".whitePiece").css("color" , "pink");
			$(".blackPiece").css("color" , "red");
			break;
	}
}
function changeStyleB(n){
	switch(n){
		case 0:
			$(".white").css("background-color" , "white");
			$(".black").css("background-color" , "black");
			break;
		case 1:
			$(".white").css("background-color" , "lightgreen");
			$(".black").css("background-color" , "green");
			break;
		case 2:
			$(".white").css("background-color" , "yellow");
			$(".black").css("background-color" , "orange");
			break;
		case 3:
			$(".white").css("background-color" , "orange");
			$(".black").css("background-color" , "purple");
			break;
		case 4:
			$(".white").css("background-color" , "powderblue");
			$(".black").css("background-color" , "blue");
			break;
		case 5:
			$(".white").css("background-color" , "pink");
			$(".black").css("background-color" , "red");
			break;
	}
}
function buttons(n,c){
	
	for(var i = 0; i < n ; i++){
		var s;
		c == 'b' ? s = "changeStyle" : s ="changeStyleB";
		var btn = $("<button>").attr({onclick : s+"(" +i+")"}).html("Estil " + i);
		$("body").append(btn);
	}
}
