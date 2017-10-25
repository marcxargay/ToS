<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?php 


	class Fitxer
	{
		public $conected;
		private $fileName;

		function __construct($filename)
		{
			$path = dirname(__FILE__);
			$fileName = $path . "/" . $filename;	
			$this->fileName = $fileName;

			if(file_exists($this->fileName)){

				$file = fopen($this->fileName, "r") or exit ("No es pot obrir el fitxer.");
				fclose($file);
				$this->conected = true;
			}
			else{
				echo "No es troba fitxer.";
				$this->conected = false;
			}
		}
		function find($data){

			if($this->conected){

				$file = fopen($this->fileName, "r") or exit("No es pot obrir el fitxer.");
				$str = "";
				while(!feof($file) && (strcmp($data,$str))){
					$str = trim(fgets($file));
				}
				fclose($file);				
				return ($data == $str);
			}
			else
				echo "Not conected";
		}
		function write($data){
			if($this->conected){
				$content = file_get_contents($this->fileName);
				$content .= $data."\n"; 
				file_put_contents($this->fileName,$content);
			}
			else
				echo "Not conected";
		}
		function delete($data){
			if($this->conected){
				$content = file_get_contents($this->fileName);
				$lines = explode("\n",$content);
				$newcontent = "";
					foreach($lines as $line){
						if($line == $data)
							$line = "deleted";
							if(!($line =="deleted"))
								$newcontent .=  $line."\n";
					}
					file_put_contents($this->fileName, $newcontent);

			}
			else
				echo "Not conected.";
			
		}
	}






?>0