<?php
	header( 'Content-Type: text/event-stream' );
	header( 'Cache-Control: no-cache' );
	
	$arxiu = "38 - Server-Sent Events (SSE) 2.txt";

	if ( file_exists( $arxiu ) )
	{
		if ( filesize( $arxiu ) > 0 )
		{
			$linies = file( $arxiu );
			
			$a = fopen( $arxiu, "r+" );
			ftruncate( $a, 0 );
			fclose( $a );

			foreach ( $linies as $linia )
			{
				echo "data: $linia \n\n";
				flush();
				
				sleep( 1 );
			}
		}
	}
?>
