<?php	
	$codis_postals = simplexml_load_file( "codis_postals.xml" );
	
	$llista = "";
	
	// Retornar la llista de provincies
	if ( isset ( $_GET[ "provincies" ] ) )
	{
		foreach( $codis_postals -> provincia as $provincia )
		{
			if ( $llista != "" ) $llista .= ", ";
			$llista .= " \"" . $provincia[ "nombre" ] . "\"";
		}
		
		echo "{ \"provincies\" : [" . $llista . " ] }";
	}
	else
	// Retornar la llista de municipis d'una provincia
	if ( isset ( $_GET[ "p" ] ) )
	{
		$p = $_GET[ "p" ];
		
		foreach( $codis_postals -> provincia as $provincia )
		{
			if ($provincia[ "nombre" ] == $p )
			{
				foreach( $provincia -> { 'codigo-postal' } as $cp )
				{
					foreach( $cp -> municipio as $municipi )
					{
						if ( $llista != "") $llista .= ", ";
						$llista .= " \"" . $cp[ "value" ] . " - " . $municipi[ "nombre" ] . "\"";
					}
				}
			}
		}
		
		echo "{ \"municipis\" : [" . $llista . " ] }";
	}
?>
