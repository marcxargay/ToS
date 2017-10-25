//arrays
var bolesArray = new Array();
var colorArray = new Array( "red", "green", "yellow", "blue", "magenta", "orange", "grey" );

//classe/contructor
function boles(x, y, dx, dy, color)
{
	//id 
	var  nId = bolesArray.length + 1;
	var id = "bola" + nId;
	
	//propietats
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
	var sy = Math.round( ( Math.random() * 20 ) + 1 );
	this.creaBola = function()
	{
		//creacio div
		document.write( "<div class='objecte' id='" + id + "'></div>" );

		//assignacio estils
		var obj = document.getElementById( id );
		obj.style.width = this.dx + "px";
		obj.style.height = this.dy + "px";
		obj.style.left = this.x + "px";
		obj.style.top = this.y + "px";
		obj.style.backgroundColor = this.color;
		obj.style.borderRadius = "50%";
		obj.style.opacity = "0.5";
		obj.style.position = "absolute";
	}
	this.caure = function()
	{
		//parar quan arribi abaix
		if( this.y >= ( window.innerHeight-this.dy ))sy = 0;
		//incrementar nomes 'y' per caure en vertical
		this.y = this.y + sy;
		//donar nova posicio
		var obj = document.getElementById( id );
		//reescriure y
		obj.style.top = this.y + "px";
	}
	this.creaBola();
}
function moureBoles()
{	
	//crida a la funció .caure() de cada element de l'array
	for( var i = 0; i < bolesArray.length; i++ )
	{
		bolesArray[i].caure();
	}
}

//variables
var numObj = 100;
var dimensio = 20;
var posicioY =  7;


for( var n = 0; n < numObj; n++ )
{
	//posicio random a l'eix x perquè no estiguin totes les boles una sobre l'altre
	var posicioX = Math.round( Math.random() * ( window.innerWidth - dimensio ) );
	//colors diferents
	var rcolor = colorArray[ Math.round( Math.random() * ( colorArray.length - 1) ) ];
	//.push afageix un element al final de l'array
	bolesArray.push(new boles( posicioX, posicioY, dimensio , dimensio, rcolor))

	//crida al metode moureBoles
	setInterval( moureBoles, 10 );
}
