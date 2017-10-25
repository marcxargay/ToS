hora=0;
var t;
self.addEventListener("message", function(e) {
    
    clearTimeout(t);        
    hora=e.data;
    timedCount();
    
}, false);

function timedCount() {
    d=new Date();
    d.setHours(hora); 
    var hours=parseInt(d.getHours());
    var minutes=parseInt(d.getMinutes());
    var seconds=parseInt(d.getSeconds());
    if (hours < 10) {hours   = "0"+d.getHours();}
    if (minutes < 10) {minutes = "0"+d.getMinutes();}
    if (seconds < 10) {seconds = "0"+d.getSeconds();}
    postMessage(hours+":"+minutes+":"+seconds);//+":"+d.getMinutes()+":"+d.getSeconds());
    t=setTimeout("timedCount()", 1000);
    
    
}

