<?php


	include_once('model.php');
	$html = file_get_contents('index.html');
	$file = new Fitxer("prova.txt");
	echo $html;

	if(isset($_GET["data"]) && $file->conected){
		
		$data = $_GET["data"];
		if(isset($_GET["cercar"])){
			if($file->find($data))
				echo $data . " existeix.";
			else 
				echo $data . " no existeix.";
				
		}
		if(isset($_GET["insert"])){
			$file->write($data);
			echo "Dades inserides.";
		}
		if(isset($_GET["elimina"])){
			if($file->find($data)){
				$file->delete($data);
				echo "Dades eliminades.";
			}
			else
				echo "La paraula no existeix.";
		}
	}


  ?>
