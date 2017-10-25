<?php
	header( 'Content-Type: text/event-stream' );
	header( 'Cache-Control: no-cache' );

	$time = rand( 0, 5 );
	echo "data: [$time] \n\n";
	flush();
	
	sleep( $time );
?>
