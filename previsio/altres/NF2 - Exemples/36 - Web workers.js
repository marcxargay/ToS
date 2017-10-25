{
	var actiu = false;
	var maxW = 0;
	var maxH = 0;
	
	onmessage = function ( event )
	{
		var info = event.data;
		
		maxW = info.maxW;
		maxH = info.maxH;
		
		if ( actiu != info.actiu )
		{
			actiu = info.actiu;
			
			if ( actiu ) comptador();
		}		
	}

	function comptador() 
	{    		
		if ( actiu ) 
		{
			var info = {};
			
			info.oX = Math.floor( Math.random() * maxW );
			info.oY = Math.floor( Math.random() * maxH );
			info.dX = Math.floor( Math.random() * maxW );
			info.dY = Math.floor( Math.random() * maxH );
			
			postMessage( info );

			setTimeout( comptador, 100 );
		}
	}
}
