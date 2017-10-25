function $( e ) { return document.getElementById( e ) };
var arrayFotos = ["assets/images/aliens.jpg" , "assets/images/marc.jpg", "assets/images/alex.jpg", "assets/images/keanu.jpg","assets/images/ferrel.jpg" ];
var arrayValors = [];
var t1,t2,t3,t4,col1,col2,col3,col4,m1,m2,maj1,maj2;
var currentImg = new Image();
currentImg.src = arrayFotos[0];
var c = $( "canvas" );
var ctx = c.getContext( "2d" );
var galeria = document.createElement("DIV");
document.body.appendChild(galeria);

crearGaleria();

function crearGaleria()
{
	for(var i = 0; i < arrayFotos.length;i++)
	{
		var id = "foto" + i;
		
		img = new Image();
		img.src = arrayFotos[i];

		foto = new fotoGaleria(id, img);
		galeria.appendChild(foto.crear());

		arrayClassImg = document.getElementsByClassName("imgClass");
		arrayClassImg[i].style.backgroundImage =  "url('" + arrayFotos[i] + "')";
	}	
}
function fotoGaleria(id,image)
{
	this.id = id;
	this.image = image;

	this.crear = function(){
		var foto = document.createElement("DIV");
		foto.setAttribute("ID",id);
		foto.classList.add("imgClass");

		foto.onclick = function()
		{
			drawImg( image );
			currentImg = image; 
			rescriuCanvas();
		}
		return foto;
	}
}
function drawImg(image)
{
	ctx.drawImage( image , 0, 0, 600, 500);
}
//agafar imputs
vtext1 = $("text1");
vtext2 = $("text2");
vtext3 = $("text3");
vtext4 = $("text4");
vc1 = $("c1");
vc2 = $("c2");
vc3 = $("c3");
vc4 = $("c4");
mida1 = $("r1");
pos1 = $("r2");
mida2 = $("r3");
pos2 = $("r4");
//reescriu canvas cada cop que es fa una acció en els parametres
vc1.onchange = function(e){rescriuCanvas();}
vc2.onchange = function(e){rescriuCanvas();}
vc3.onchange = function(e){rescriuCanvas();}
vc4.onchange = function(e){rescriuCanvas();}
vtext1.onkeyup = function(e){rescriuCanvas();}
vtext2.onkeyup = function(e){rescriuCanvas();}
vtext3.onkeyup = function(e){rescriuCanvas();}
vtext4.onkeyup = function(e){rescriuCanvas();}
mida1.onmouseup = function(e){
	rescriuCanvas();
	$("m1").innerHTML = mida1.value +"px";
}
mida2.onmouseup = function(e){
	rescriuCanvas();
	$("m2").innerHTML = mida2.value +"px";
}
pos1.onmousedown = function(e){
	rescriuCanvas();
	$("p1").innerHTML = pos1.value +"px";
}
pos2.onmouseup = function(e){
	rescriuCanvas();
	$("p2").innerHTML = pos2.value +"px";
}
cb1.onchange = function(e){rescriuCanvas();}
cb2.onchange = function(e){rescriuCanvas();}

function rescriuCanvas(){
	//posicions
	var p1 = parseInt(pos1.value) + 40;
	var p2 = parseInt(pos1.value) + 110;
	var p3 = parseInt(pos2.value) + 330;
	var p4 = parseInt(pos2.value) + 400;
	//comprovació checked
	if($("cb1").checked)
	{
		text1.value = text1.value.toUpperCase();
		text2.value = text2.value.toUpperCase();
	}
	else if(!($("cb1").checked))
	{
		text1.value = text1.value.toLowerCase();
		text2.value = text2.value.toLowerCase();
	}
	if($("cb2").checked)
	{
		text3.value = text3.value.toUpperCase();
		text4.value = text4.value.toUpperCase();
	}else if(!($("cb2").checked))
	{
		text3.value = text3.value.toLowerCase();
		text4.value = text4.value.toLowerCase();
	}
	//dibuixar
	ctx.clearRect(0,0,c.width,c.height);
	drawImg(currentImg);
	ctx.lineWidth = 2;
	ctx.font = mida1.value + "px Impact";
	ctx.fillStyle = c1.value;
	ctx.strokeStyle = c2.value;
	ctx.fillText(text1.value, 250,p1);
	ctx.fillText(text2.value, 250,p2);
	ctx.strokeText(text1.value,250,p1);
	ctx.strokeText(text2.value, 250,p2);
	ctx.font = mida2.value + "px Impact";
	ctx.fillStyle = c3.value;
	ctx.strokeStyle = c4.value;
	ctx.fillText(text3.value, 250,p3);
	ctx.fillText(text4.value, 250,p4);
	ctx.strokeText(text3.value,250,p3);
	ctx.strokeText(text4.value, 250,p4);
	ctx.textAlign = "center";
	//cokies
	ckievalor = assiganrValors(p1,p2,p3,p4)
	setCookie(ckievalor , 20);
	splitAssignar();
}
function splitAssignar()
{
	var ckieRet = getCookie("ckie");
	console.log(ckieRet);
}
function assiganrValors(p1,p2,p3,p4)
{
	t1 = text1.value;
	t2 = text2.value;
	t3 = text3.value;
	t4 = text4.value;
	col1 = c1.value;
	col2 = c2.value;
	col3 = c3.value;
	col4 = c4.value;
	m1 = mida1.value;
	m2 = mida2.value;
	arrayValors = [t1,t2,t3,t4,col1,col2,col3,col4,m1,m2,p1,p2,p3,p4];

	var ckieString = "";
	for(var i = 0; i < arrayValors.length;i++)
	{
		ckieString = ckieString + arrayValors[i]+":";
	}
	return ckieString;
}

function setCookie(cvalor,dies)
{
	var d = new Date();
	d.setTime(d.getTime() + dies*24*60*60*1000);
	var venciment = "expires=" + d.toUTCstring;
	document.cookie = "ckie=" + cvalor + ";" + venciment;

}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//download imatge
function downloadCanvas(link, canvas, nomArxiu) {
    link.href = document.getElementById(canvas).toDataURL();
    link.download = nomArxiu;
}
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'meme.png');
}, false);
