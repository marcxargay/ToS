
/*
1.  5 ciudades.
2. Lista ciudades

*/
//var ciudades={761600,615702,1118370,2442047,44418}//Girona,paris,tokio,los Angeles, London
//crear lista de ciudades
var ciudades={Girona:761600, Paris:615702, Tokio:1118370, LosAngeles:2442047,London:44418};
var relojInterval;
crearListaCiudades();
/*
crearSelect();
function crearSelect(){
    var select= $("<select>");
    for(var propiedad in ciudades){
        var option=$("<option>").append(propiedad).attr({value:ciudades[propiedad]});
        select.append(option);
    }
    $("#seleccionarCiudad").append(select);
}

*/
function crearListaCiudades(){
    for(var propiedad in ciudades){
        var div=$("<div>").append(propiedad).attr({id:ciudades[propiedad]});
        div.click(function(){
            obtenerDatos(this.id)
        })
        div.hover(function(){
            $(this).css('cursor', 'pointer');
        })
          $("#seleccionarCiudad").append(div);
    }
    
}
//console.log(condicionesClimaticas["Partly Cloudy"]);

function obtenerDatos(codigo){
    var solicitud = "http://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid='"+codigo+"' and u='c'&format=json";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        // Si la petició s'ha completat correctament rebrem un codi 200 i serem a l'estat 4
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
        {
            // Tenim les dades rebudes del servidor dins de xmlhttp.responseText
            // Com que sabem que estan en format JSON convertim la resposta en 
            // un objecte que guardem a la variable "valorDivises"
            informacionCiudad = JSON.parse( xmlhttp.responseText );
            new Meteo(informacionCiudad);
            //new DatosCiudad(informacionCiudad);

            // Cridem a la funció que escriurà per pantalla el valor rebut
            // Com a paràmetre passem només el valor de la conversió a euros,
            // com que és un objecte podem llegir les seves propietats						
            //escriureValor(valorDivises.rates.EUR);
        }
    }
    // Indiquem el mètode (GET) i la URL del servidor que ens retornarà les dades
    // La URL dependrà de cada servei web concret
    // El tercer paràmetre indica que la crida és asíncrona, per tant l'execució de
    // la resta del codi JavaScript no s'atura per esperar la resposta
    xmlhttp.open("GET", solicitud, true);

    // Llancem la petició assíncrona al servidor remot
    xmlhttp.send();	
}

var iconos=({sunset:"img/sunset.png", sunrise:"img/sunrise.png", mapa:"/img/map.png", temperature:"img/temperature.png", humedad:"humidity.png"});

function Meteo(ciudad){
    console.log(ciudad);
    this.nom=ciudad.query.results.channel.location.city
    this.dataLocal=formatearFecha(ciudad.query.results.channel.lastBuildDate).fecha;
    this.horaLocal=formatearFecha(ciudad.query.results.channel.lastBuildDate).hora;
    this.sunrise=formatearFecha(this.dataLocal+ " " + ciudad.query.results.channel.astronomy.sunrise).horaYMinuto;
    this.sunrise=({hora:this.sunrise.split(":")[0], minuto:this.sunrise.split(":")[1], horaCompleta:this.sunrise});
    this.sunset=formatearFecha(this.dataLocal+ " " + ciudad.query.results.channel.astronomy.sunset).horaYMinuto;
    this.sunset=({hora:this.sunset.split(":")[0], minuto:this.sunset.split(":")[1], horaCompleta:this.sunset});
    this.humedad=ciudad.query.results.channel.atmosphere.humidity;
    this.presion=ciudad.query.results.channel.atmosphere.pressure;
    this.temperatura=ciudad.query.results.channel.item.condition.temp;
    this.previsio=ciudad.query.results.channel.item.forecast;
    this.previsio=({hoy:this.previsio[0], manana:this.previsio[1], pasado:this.previsio[2], pasadoManana:this.previsio[3]});
    this.unidades=ciudad.query.results.channel.units;
    this.pintar=pintar;
    this.pintarPrevisiones=pintarPrevisiones;
    
    this.crearRelojDigital=crearRelojDigital(this);
    function crearRelojDigital(reloj){
        clearInterval(relojInterval);
        relojInterval=setInterval(function(){
            d=new Date();
            d.setHours(reloj.horaLocal); 
            var hours=parseInt(d.getHours());
            var minutes=parseInt(d.getMinutes());
            var seconds=parseInt(d.getSeconds());
            if (hours < 10) {hours   = "0"+d.getHours();}
            if (minutes < 10) {minutes = "0"+d.getMinutes();}
            if (seconds < 10) {seconds = "0"+d.getSeconds();}
             $("#reloj").html(hours+":"+minutes+":"+seconds);
        }, 1000);
    }
    function formatearFecha(fecha){
        var campos=fecha.split(" ");
        var retornarFecha=campos[0]+" "+campos[1]+ " "+campos[2]+ " "+campos[3];
        var hora=campos[4]+ " "+campos[5];        
        
        var campos=fecha.split(' ');
        fecha=campos[0]+" "+campos[1]+" "+campos[2]+" "+campos[3]+" "+campos[4]+" "+campos[5];       
        var date = new Date(fecha);
        var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric' };//weekday long para mostrar todo el texto
        //options.timeZone = 'UTC';
        options.timeZoneName = 'short';
        var fRetornar=date.toLocaleDateString('es-ES',options);
        var hora=fRetornar.split(" ")[2].split(":")[0];
        var minuto=fRetornar.split(" ")[2].split(":")[1];
        return ({fecha:retornarFecha, hora:hora, horaYMinuto:hora+":"+minuto})
        
    }
    function pintar(){
        $("#tiempoImage").empty();
        $("#nombreCiudad").empty();
        $("#nombreCiudad").append($("<img>").addClass("img-ico").attr({src:iconos.mapa}),this.nom)
        $("#fecha").html(this.dataLocal);
        this.crearRelojDigital;
        nomImg="img/"+this.previsio.hoy.code+".png"
        var img=$("<img>").attr({src:nomImg, width:"50px", height:"70px"});
        $("#tiempoImage").append(img);
        $("#sunriseAndSunset").append($("<img>").addClass("img-ico").attr({src:iconos.sunrise}),this.sunrise.horaCompleta+"-",$("<img>").addClass("img-ico").attr({src:iconos.sunset}),this.sunset.horaCompleta);
        $("#humedad").html(this.humedad);
        $("#presio").html(this.presion);
        $("#temperatura").html(this.temperatura + this.unidades.temperature);
        $("#tiempoActual").append("Hoy",$("#nombreCiudad"),$("#fecha"), $("#tiempoImage"),$("#sunriseAndSunset"),$("#humedad"),$("#presio"), $("#temperatura"), $("#reloj") );
        //$("#tiempoActual").hide();
    }
    function pintarPrevisiones(){
        
        //$("#previsiones")
        for(var propiedad in this.previsio){
            if(propiedad!="hoy"){
                var datoPrevision=this.previsio[propiedad];
                console.log(datoPrevision);
                var img=$("<div>").append($("<img>").attr({src:"img/"+datoPrevision.code+".png"}));
                var fecha=$("<div>").append(datoPrevision.day+" "+ datoPrevision.date);
                var temperatura=$("<div>").append(datoPrevision.high + " "+datoPrevision.low);
                $("#previsiones").append(img, fecha, temperatura);
            }
        }
    }
        /*
        
        worker = new Worker('js/reloj.js');
        worker.addEventListener('message', function(e) {
            $("#reloj").html(e.data);
        }, false);

        worker.postMessage(reloj.horaLocal); // Send data to our worker.
        */

    
    this.pintar();
    this.pintarPrevisiones();
}
/*
//iniciar webWorker
var w;
function startReloj() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("js/reloj.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
    
}
*/