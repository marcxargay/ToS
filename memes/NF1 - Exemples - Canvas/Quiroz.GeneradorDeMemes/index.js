var anchoPantalla=$(window).width();
var altoPantalla=$(window).height();
var anchoCanvas=485;
var altoCanvas=500;
var nMaxFotos=5;
pathImagenes="img/";
var cv;
var ctx;
var inputTitulo1;
var inputTitulo2;
var inputSubtitulo1;
var inputSubtitulo1;
var objetoActual=inputTitulo1;
body=document.body
body.style.margin="0px";
body.style.padding="0px";
body.style.minWidth=anchoPantalla-10+"px";
var arrayCookies=Array();
var arrayValues=Array();
var nombresParaCookies=['texto','colorLetra','colorBorde','tamanoLetra','tamanoBorde','posicionLetra','mayusculas'];
var t1TextoCookie, t1ColorLCookie, t1ColorBCookie, t1TamanoLCookie, t1TamanoBCookie, t1PoslCookie, t1MayusculaCookie;
var t2TextoCookie, t2ColorLCookie, t2ColorBCookie, t2TamanoLCookie, t2TamanoBCookie, t2PoslCookie, t2MayusculaCookie;
var s1TextoCookie, s1ColorLCookie, s1ColorBCookie, s1TamanoLCookie, s1TamanoBCookie, s1PoslCookie, s1MayusculaCookie;
var s2TextoCookie, s2ColorLCookie, s2ColorBCookie, s2TamanoLCookie,s2TamanoBCookie, s2PoslCookie, s2MayusculaCookie;
//inicializarFunciones
crearGaleria();
crearCanvas();
iniciarCanvas();
//obtenerCookie();
comprovaCookie();

//Esta funcion crea la galeria con el metodo jquery, le asigna un id para poderlo cargar en el body
function crearGaleria() {
	var galeria=$("<div></div>").attr({id:"galeria"});
		for (var i = 0; i < nMaxFotos; i++) {
			var foto=$("<img>").addClass("foto").attr({ src: pathImagenes+i+".jpg", id: "img"+i, height:"100%", width:"100%"});
			$(galeria).append(foto);
		}

		imagenActual=galeria.children()[0]//inicializar la varibale imagenActual con la primer foto de la galeria
		$(galeria).children().click(function() {//galeria.children()accede al hijo, aqui pinta la imagen seleccionada en el canvas
				imagenActual=this;//actualiza la variable imagen actual con la imagen clickada
				pintarCanvas();
		})
		$(body).append(galeria);
}
function crearCanvas() {
	cv=$("<canvas>").attr({id:"canvasId",style:"border:1px solid #000000;",height:altoCanvas+"px",width:anchoCanvas+"px"});
	$(body).append(cv);
	ctx=document.getElementById("canvasId").getContext("2d");
	//pintarTexto();
}
function pintarCanvas() {//esta funcion se ejecuta siempre que cambiamos de foto,texto,tamano,etc
	ctx.clearRect(0, 0, cv[0].width,cv[0].height);//vacear canvas
	ctx.drawImage(imagenActual,0,0,cv[0].width,cv[0].height)//llenar canvas

}
//funcion que retorna un array de objeto con el nombre de el input y el elemento input, esta funcion se usa para hacer las tablas de los inputs
//tambien para asignar valores al objeto
function Controles(idInput, texto, posLetra) {
	var inputUp1=$("<input></input>").addClass(idInput).attr({id:"text"+idInput,type:"text",name:"0-20",value:texto, oninput:"pintar(this)"});
	var colorLetraUp=$("<input></input>").addClass(idInput).attr({id:"colorLetraUp"+idInput,type:"color",value:"#ffffff", oninput:"pintar(this)"});
	var colorBordeLetraUp=$("<input></input>").addClass(idInput).attr({id:"colorBordeUp"+idInput,type:"color",value:"#000000", oninput:"pintar(this)"});
	var tamanoLetraUp=$("<input></input>").addClass(idInput).attr({id:"tamanoLetra"+idInput,type:"range",min:"10",max:"50",step:"1", value:25, oninput:"pintar(this)"});
	var tamanoBordeLetraUp=$("<input></input>").addClass(idInput).attr({id:"tamanoBordeUp"+idInput,type:"range",min:"0",max:"10",step:"1",value:"1", oninput:"pintar(this)"});
	var posLetra=$("<input></input>").addClass(idInput).attr({id:"posLetra"+idInput,type:"range",min:"30",max:altoCanvas,step:"1", value:posLetra, oninput:"pintar(this)"});
	var cbMayusculaUp=$("<input></input>").addClass(idInput).attr({id:"mayuscula"+idInput,type:"checkbox",onchange:"pintar(this)"});
	var arrayControles=[{Nombre:"Texto",Control:inputUp1},
							{Nombre:"Color Letra",Control:colorLetraUp},
							{Nombre:"Color Borde",Control:colorBordeLetraUp},
							{Nombre:"Tamaño Letra",Control:tamanoLetraUp},
							{Nombre:"Tamaño Borde",Control:tamanoBordeLetraUp},
							{Nombre:"Posicion Letra",Control:posLetra},
							{Nombre:"Mayusculas cabecera",Control:cbMayusculaUp}];
	return arrayControles;
}
//Funcion que crea una tabla, se pasa por parametro el array del objeto
function crearTabla(arrayControles) {
	var tabla=$('<table></table>').attr({border:"1px",cellspacing:"0"});
	for (var i = 0; i < arrayControles.length; i++) {
		var tr=$('<tr></tr>');
		var td=$('<td></td>');
		var td1=$('<td></td>');
		td.append(arrayControles[i].Nombre);
		td1.append(arrayControles[i].Control);
		tr.append(td);
		tr.append(td1);
		tabla.append(tr);
	}
	return tabla;
}
//crea un objeto con los valores de los inputs
function ObjetoInput(arrayControles) {
	this.arrayControles=arrayControles;
	var devolver=
	{texto:arrayControles[0].Control[0].value
	,colorLetra:arrayControles[1].Control[0].value
	,colorBorde:arrayControles[2].Control[0].value
	,tamanoLetra:arrayControles[3].Control[0].value
	,tamanoBorde:arrayControles[4].Control[0].value
	,posLetra:arrayControles[5].Control[0].value
	,mayusculas:arrayControles[6].Control[0].checked
};
	return devolver;
}
inputTitulo1=new Controles("t1","",20);//crea el array de objetos
inputTitulo1Obj=new ObjetoInput(inputTitulo1);//crea el objeto con valores
tablaTitulo1=crearTabla(inputTitulo1);//crea la tabla que luego va dentro de los tabs

inputSubtitulo1=new Controles("s1","",40);
inputSubtitulo1Obj=new ObjetoInput(inputSubtitulo1);
tablaSubtitulo1=crearTabla(inputSubtitulo1);

inputTitulo2=new Controles("t2","",480);
inputTitulo2Obj=new ObjetoInput(inputTitulo2);
tablaTitulo2=crearTabla(inputTitulo2);

inputSubtitulo2=new Controles("s2","",500);
inputSubtitulo2Obj=new ObjetoInput(inputSubtitulo2);
tablaSubtitulo2=crearTabla(inputSubtitulo2);
//esta pequeña funcion es para crear tabs (pestañas) con jQuery
$( function() {
	$( "#tabs" ).tabs();
	$('#tabTitulo1').append(tablaTitulo1);
	$('#tabSubtitulo1').append(tablaSubtitulo1);
	$('#tabTitulo2').append(tablaTitulo2);
	$('#tabSubtitulo2').append(tablaSubtitulo2);
});

//esta funcion se ejecuta cada vez que se ejecuta un oninput, detecta el input y ejecuta la funcion de acuerdo al nombre de la clase
function pintar(input) {
	switch(input.className){
		case "t1":
		actualizarInputText(inputTitulo1[0].Control[0],inputTitulo1Obj);
		actualizarInputColorLetra(inputTitulo1[1].Control[0],inputTitulo1Obj);
		actualizarInputColorBorde(inputTitulo1[2].Control[0],inputTitulo1Obj);
		actualizarTamanoLetra(inputTitulo1[3].Control[0],inputTitulo1Obj);
		actualizarTamanoBorde(inputTitulo1[4].Control[0],inputTitulo1Obj);
		actualizarPosicionLetra(inputTitulo1[5].Control[0],inputTitulo1Obj);
		actualizarCheckbox(inputTitulo1[6].Control[0],inputTitulo1Obj,inputTitulo1[0].Control[0]);
		break;
		case "s1":
		actualizarInputText(inputSubtitulo1[0].Control[0],inputSubtitulo1Obj);
		actualizarInputColorLetra(inputSubtitulo1[1].Control[0],inputSubtitulo1Obj);
		actualizarInputColorBorde(inputSubtitulo1[2].Control[0],inputSubtitulo1Obj);
		actualizarTamanoLetra(inputSubtitulo1[3].Control[0],inputSubtitulo1Obj);
		actualizarTamanoBorde(inputSubtitulo1[4].Control[0],inputSubtitulo1Obj);
		actualizarPosicionLetra(inputSubtitulo1[5].Control[0],inputSubtitulo1Obj);
		actualizarCheckbox(inputSubtitulo1[6].Control[0],inputSubtitulo1Obj,inputSubtitulo1[0].Control[0]);
		break;
		case "t2":
		actualizarInputText(inputTitulo2[0].Control[0],inputTitulo2Obj);
		actualizarInputColorLetra(inputTitulo2[1].Control[0],inputTitulo2Obj);
		actualizarInputColorBorde(inputTitulo2[2].Control[0],inputTitulo2Obj);
		actualizarTamanoLetra(inputTitulo2[3].Control[0],inputTitulo2Obj);
		actualizarTamanoBorde(inputTitulo2[4].Control[0],inputTitulo2Obj);
		actualizarPosicionLetra(inputTitulo2[5].Control[0],inputTitulo2Obj);
		actualizarCheckbox(inputTitulo2[6].Control[0],inputTitulo2Obj,inputTitulo2[0].Control[0]);
		break;
		case "s2":
		actualizarInputText(inputSubtitulo2[0].Control[0],inputSubtitulo2Obj);
		actualizarInputColorLetra(inputSubtitulo2[1].Control[0],inputSubtitulo2Obj);
		actualizarInputColorBorde(inputSubtitulo2[2].Control[0],inputSubtitulo2Obj);
		actualizarTamanoLetra(inputSubtitulo2[3].Control[0],inputSubtitulo2Obj);
		actualizarTamanoBorde(inputSubtitulo2[4].Control[0],inputSubtitulo2Obj);
		actualizarPosicionLetra(inputSubtitulo2[5].Control[0],inputSubtitulo2Obj);
		actualizarCheckbox(inputSubtitulo2[6].Control[0],inputSubtitulo2Obj,inputSubtitulo2[0].Control[0]);
		break;
	}
}
//actualiza el valor del checbok cuando se clicak
function actualizarCheckbox(control, objeto,controlTexto) {
	if(control.checked){
		objeto.texto=controlTexto.value.toUpperCase()
		objeto.mayusculas=true;
		}
	else{
		objeto.texto=controlTexto.value
		objeto.mayusculas=false;
	}
	pintarTexto();
}
function actualizarPosicionLetra(control, objeto) {
	$(control).on('input',function() {
			objeto.posLetra=control.value;
			pintarTexto();
})
//titulo 
}
function actualizarTamanoLetra(control, objeto) {
	$(control).on('input',function() {
			objeto.tamanoLetra=control.value;
			pintarTexto();
})
}
function actualizarTamanoBorde(control, objeto) {
	$(control).on('input',function() {
			objeto.tamanoBorde=control.value;
			pintarTexto();
})
}
function actualizarInputColorLetra(control, objeto) {
$(control).change(function() {
			objeto.colorLetra=control.value;
			pintarTexto();
});
}
function actualizarInputColorBorde(control, objeto) {
$(control).change(function() {
			objeto.colorBorde=control.value;
			pintarTexto();
});
}
function actualizarInputText(control, objeto) {
		$(control).keyup(function(){
		objeto.texto = $(this).val();
		pintarTexto();
});
}
//esta funcion pinta el canvas con los 4 objetos de tipo object input, se ejecuta cada vez que se hace un oninput.
function pintarTexto() {
	ctx.drawImage(imagenActual,0, 0, cv[0].width,cv[0].height)
	//tCabecera
	ctx.font = inputTitulo1Obj.tamanoLetra+"px"+" Impact";
    ctx.fillStyle = inputTitulo1Obj.colorLetra;
    ctx.strokeStyle = inputTitulo1Obj.colorBorde;
    ctx.lineWidth = inputTitulo1Obj.tamanoBorde;
    ctx.fillText(inputTitulo1Obj.texto, cv[0].width/2, inputTitulo1Obj.posLetra);
    ctx.strokeText(inputTitulo1Obj.texto, cv[0].width/2, inputTitulo1Obj.posLetra);
    ctx.textAlign="center"; 

     //sCabecera
    ctx.font = inputSubtitulo1Obj.tamanoLetra+"px"+" Impact";
    ctx.fillStyle = inputSubtitulo1Obj.colorLetra;
    ctx.strokeStyle = inputSubtitulo1Obj.colorBorde;
    ctx.lineWidth = inputSubtitulo1Obj.tamanoBorde;
    ctx.fillText(inputSubtitulo1Obj.texto, cv[0].width/2, inputSubtitulo1Obj.posLetra);
    ctx.strokeText(inputSubtitulo1Obj.texto, cv[0].width/2, inputSubtitulo1Obj.posLetra);
    ctx.textAlign="center"; 
    //tPie
	ctx.font = inputTitulo2Obj.tamanoLetra+"px"+" Impact";
    ctx.fillStyle = inputTitulo2Obj.colorLetra;
    ctx.strokeStyle = inputTitulo2Obj.colorBorde;
    ctx.lineWidth = inputTitulo2Obj.tamanoBorde;
    ctx.fillText(inputTitulo2Obj.texto, cv[0].width/2, inputTitulo2Obj.posLetra);
    ctx.strokeText(inputTitulo2Obj.texto, cv[0].width/2, inputTitulo2Obj.posLetra);
    ctx.textAlign="center"; 

    //sPie
    ctx.font = inputSubtitulo2Obj.tamanoLetra+"px"+" Impact";
    ctx.fillStyle = inputSubtitulo2Obj.colorLetra;
    ctx.strokeStyle = inputSubtitulo2Obj.colorBorde;
    ctx.lineWidth = inputSubtitulo2Obj.tamanoBorde;
    ctx.fillText(inputSubtitulo2Obj.texto, cv[0].width/2, inputSubtitulo2Obj.posLetra);
    ctx.strokeText(inputSubtitulo2Obj.texto, cv[0].width/2, inputSubtitulo2Obj.posLetra);
    ctx.textAlign="center"; 
    setCookie()

}
//esta funcion es para iniciar el canvas con los valores predefinidos
function iniciarCanvas() {//esta funcion solo se usa para inicializar, pinta la imagen en el canvas
	imagenActual.onload=function () {
		ctx.clearRect(0, 0, cv.width,cv.height);//vacear canvas
		ctx.drawImage(imagenActual,0,0,cv.width,cv.height)//llenar canvas
		pintarTexto();
	}
}
$(body).append($("<a>Descargar</a>").attr('id','descargar'));

function downloadCanvas(link,filename) {
	canvas=document.getElementById('canvasId')
    link.href = canvas.toDataURL("image/png");//convertimos el canvas a una imagen con url y asignamos el nuevo valor al atributo href
    link.download = filename;
}
document.getElementById('descargar').addEventListener('click', function() {
    downloadCanvas(this, "algo.png");
}, false);

//De aqui para abajo son las Cookies
function setCookie() {
	var tExpira=1;
	var cookie=document.cookie;
	var d= new Date();
	d.setTime(d.getTime()+(tExpira*24*60*60*10000));
	var expires="expires"+d.toUTCString();
	
	llenarNombresParaCookies(nombresParaCookies,"t1");
	llenarNombresParaCookies(nombresParaCookies,"s1");
	llenarNombresParaCookies(nombresParaCookies,"t2");
	llenarNombresParaCookies(nombresParaCookies,"s2");
	llenarArrayValues(inputTitulo1Obj);
	llenarArrayValues(inputSubtitulo1Obj);
	llenarArrayValues(inputTitulo2Obj);
	llenarArrayValues(inputSubtitulo2Obj);
	for (var i = 0; i < arrayCookies.length; i++) {
		document.cookie=arrayCookies[i]+"="+arrayValues[i]+";expires="+expires;
	}
}
function llenarArrayValues(objeto) {
	arrayValues.push(objeto.texto);
	arrayValues.push(objeto.colorLetra);
	arrayValues.push(objeto.colorBorde);
	arrayValues.push(objeto.tamanoLetra);
	arrayValues.push(objeto.tamanoBorde);
	arrayValues.push(objeto.posLetra);
	arrayValues.push(objeto.mayusculas);
}
function llenarNombresParaCookies(arrayNombres, id) {
	for (var i = 0; i <arrayNombres.length; i++) {
		arrayCookies.push(arrayNombres[i]+id);
	}
	return arrayCookies;
}
function getCookie(nomCookie)
			{
				// Creem una variable amb en nom + el símbol =
				var nom = nomCookie + "=";
				
				// Amb split() convertim un string separat per ";" en un array
				var arrayCookies = document.cookie.split( ';' );

				// Recorrem l'array que hem generat amb split() element per element
				for( var i = 0; i < arrayCookies.length; i++ )
				{
					// Per cada element llegit, amb trim() eliminem els espais anteriors i posteriors
					var c = arrayCookies[ i ].trim();
					
					// Si "nomCookie=" forma part de l'array, és el que busquem
					if ( c.indexOf( nom ) == 0 ) 
						// Ens quedem només amb el que hi ha darrera del "=" i ho retornem
						// En el moment de fer return, acabem l'execució de la funció
						return c.substring( nom.length, c.length );
				}
				
				// Si no s'ha trobat la cookie retornarà una cadena buida
				return "";
			}

function comprovaCookie()
{
	//input 1
	t1TextoCookie = getCookie("textot1");
	t1ColorLCookie = getCookie("colorLetrat1");
	t1ColorBCookie = getCookie("colorBordet1");
	t1TamanoLCookie = getCookie("tamanoLetrat1");
	t1TamanoBCookie = getCookie("tamanoBordet1");
	t1PoslCookie = getCookie("posicionLetrat1");
	t1MayusculaCookie = getCookie("mayusculast1");
	//input2
	s1TextoCookie = getCookie("textos1");
	s1ColorLCookie = getCookie("colorLetras1");
	s1ColorBCookie = getCookie("colorBordes1");
	s1TamanoLCookie = getCookie("tamanoLetras1");
	s1TamanoBCookie = getCookie("tamanoBordes1");
	s1PoslCookie = getCookie("posicionLetras1");
	s1MayusculaCookie = getCookie("mayusculass1");
		//input3
	t2TextoCookie = getCookie("textot2");
	t2ColorLCookie = getCookie("colorLetrat2");
	t2ColorBCookie = getCookie("colorBordet2");
	t2TamanoLCookie = getCookie("tamanoLetrat2");
	t2TamanoBCookie = getCookie("tamanoBordet2");
	t2PoslCookie = getCookie("posicionLetrat2");
	t2MayusculaCookie = getCookie("mayusculast2");
		//input4
	s2TextoCookie = getCookie("textos2");
	s2ColorLCookie = getCookie("colorLetras2");
	s2ColorBCookie = getCookie("colorBordes2");
	s2TamanoLCookie = getCookie("tamanoLetras2");
	s2TamanoBCookie = getCookie("tamanoBordes2");
	s2PoslCookie = getCookie("posicionLetras2");
	s2MayusculaCookie = getCookie("mayusculass2");

}
//asigna el valor obtenido de la cookie guardada en el objeto y en el input
//input 1
inputTitulo1Obj.texto=t1TextoCookie;inputTitulo1[0].Control[0].value=t1TextoCookie;
inputTitulo1Obj.colorLetra=t1ColorLCookie;inputTitulo1[1].Control[0].value=t1ColorLCookie;
inputTitulo1Obj.colorBorde=t1ColorBCookie;inputTitulo1[2].Control[0].value=t1ColorBCookie;
inputTitulo1Obj.tamanoLetra=t1TamanoLCookie;inputTitulo1[3].Control[0].value=t1TamanoLCookie;
inputTitulo1Obj.tamanoBorde=t1TamanoBCookie;inputTitulo1[4].Control[0].value=t1TamanoBCookie;
inputTitulo1Obj.posLetra=t1PoslCookie;inputTitulo1[5].Control[0].value=t1PoslCookie;
inputTitulo1Obj.mayusculas=t1MayusculaCookie;inputTitulo1[6].Control[0].checked=t1MayusculaCookie;
//input2
inputSubtitulo1Obj.texto=s1TextoCookie;inputSubtitulo1[0].Control[0].value=s1TextoCookie;
inputSubtitulo1Obj.colorLetra=s1ColorLCookie;inputSubtitulo1[1].Control[0].value=s1ColorLCookie;
inputSubtitulo1Obj.colorBorde=s1ColorBCookie;inputSubtitulo1[2].Control[0].value=s1ColorBCookie;
inputSubtitulo1Obj.tamanoLetra=s1TamanoLCookie;inputSubtitulo1[3].Control[0].value=s1TamanoLCookie;
inputSubtitulo1Obj.tamanoBorde=s1TamanoBCookie;inputSubtitulo1[4].Control[0].value=s1TamanoBCookie;
inputSubtitulo1Obj.posLetra=s1PoslCookie;inputSubtitulo1[5].Control[0].value=s1PoslCookie;
inputSubtitulo1Obj.mayusculas=s1MayusculaCookie;inputSubtitulo1[6].Control[0].checked=s1MayusculaCookie;

//input 3
inputTitulo2Obj.texto=t2TextoCookie;inputTitulo2[0].Control[0].value=t2TextoCookie;
inputTitulo2Obj.colorLetra=t2ColorLCookie;inputTitulo2[1].Control[0].value=t2ColorLCookie;
inputTitulo2Obj.colorBorde=t2ColorBCookie;inputTitulo2[2].Control[0].value=t2ColorBCookie;
inputTitulo2Obj.tamanoLetra=t2TamanoLCookie;inputTitulo2[3].Control[0].value=t2TamanoLCookie;
inputTitulo2Obj.tamanoBorde=t2TamanoBCookie;inputTitulo2[4].Control[0].value=t2TamanoBCookie;
inputTitulo2Obj.posLetra=t2PoslCookie;inputTitulo2[5].Control[0].value=t2PoslCookie;
inputTitulo2Obj.mayusculas=t2MayusculaCookie;inputTitulo2[6].Control[0].checked=t2MayusculaCookie;
//input4
inputSubtitulo2Obj.texto=s2TextoCookie;inputSubtitulo2[0].Control[0].value=s2TextoCookie;
inputSubtitulo2Obj.colorLetra=s2ColorLCookie;inputSubtitulo2[1].Control[0].value=s2ColorLCookie;
inputSubtitulo2Obj.colorBorde=s2ColorBCookie;inputSubtitulo2[2].Control[0].value=s2ColorBCookie;
inputSubtitulo2Obj.tamanoLetra=s2TamanoLCookie;inputSubtitulo2[3].Control[0].value=s2TamanoLCookie;
inputSubtitulo2Obj.tamanoBorde=s2TamanoBCookie;inputSubtitulo2[4].Control[0].value=s2TamanoBCookie;
inputSubtitulo2Obj.posLetra=s2PoslCookie;inputSubtitulo2[5].Control[0].value=s2PoslCookie;
inputSubtitulo2Obj.mayusculas=s2MayusculaCookie;inputSubtitulo2[6].Control[0].checked=s2MayusculaCookie;