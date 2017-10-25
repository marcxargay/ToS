var interval;
function getTemps(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
		{
			var req = JSON.parse( xmlhttp.responseText );
			console.log(req);
			pintar(req);
			
		}
	}
	//Girona predefinida
	city = $("#city").val();
	if(city == undefined) city = "761600";
	xmlhttp.open("GET", "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid=%27" + city + "%27%20and%20u=%27c%27&format=json", true);
	xmlhttp.send();		
}
function pintar(req){
	
	
	var x = req.query.results.channel;
	$("body").css({background: "url('assets/img/ciutats/"+ x.location.city+".jpg') no-repeat fixed"})
	$("#nom").html(x.location.city);

	$("#date").html(x.lastBuildDate.substring(0,16));
	$("#sortida").html("Sortida: " + To24h(x.astronomy.sunrise)+ "h" );	
	$("#posta").html("Posta: " + To24h(x.astronomy.sunset) + "h");
	$("#humitat").html("Humitat: " + x.atmosphere.humidity);
	$("#presio").html("Presió: " + x.atmosphere.pressure);
	$("#imgTemps").attr({src:"assets/img/"+x.item.condition.code+".png"});
	$("#temperatura").html(x.item.condition.temp + "ºC");
	$("#p1").empty();$("#p2").empty();$("#p3").empty();
	$("#p1").append(
		$("<img>").attr({src: "assets/img/" + x.item.forecast[1].code +".png"}),
		$("<div>").html("Max: " + x.item.forecast[1].high +"º").attr({class:"max"}),
		$("<div>").html("Min: " + x.item.forecast[1].low +"º").attr({class:"min"})
		)
	$("#p2").append(
		$("<img>").attr({src: "assets/img/" + x.item.forecast[2].code +".png"}),
		$("<div>").html("Max: " + x.item.forecast[1].high +"º").attr({class:"max"}),
		$("<div>").html("Min: " + x.item.forecast[1].low +"º").attr({class:"min"})
		)
	$("#p3").append(
		$("<img>").attr({src: "assets/img/" + x.item.forecast[3].code +".png"}),
		$("<div>").html("Max: " + x.item.forecast[1].high +"º").attr({class:"max"}),
		$("<div>").html("Min: " + x.item.forecast[1].low +"º").attr({class:"min"})
		)
	clock(req);
}
function clock(req){
	clearInterval(interval);
    interval = setInterval(function(){
        var d=new Date();
		d.setHours(req.query.results.channel.lastBuildDate.split(" ")[4].split(":")[0]); 
        var hours=parseInt(d.getHours());
        var minutes=parseInt(d.getMinutes());
        var seconds=parseInt(d.getSeconds());
        if (hours < 10) {hours   = "0"+d.getHours();}
        if (minutes < 10) {minutes = "0"+d.getMinutes();}
        if (seconds < 10) {seconds = "0"+d.getSeconds();}
        $("#rellotge").html(hours+":"+minutes+":"+seconds);
    }, 1000);
}
function To24h(time){
	if(time.split(" ")[1] == "pm") {
		return parseInt(time.split(" ")[0].split(":")[0]) + 12 + ":" + time.split(" ")[0].split(":")[1] ;
	}
	return time.split(" ")[0];
}