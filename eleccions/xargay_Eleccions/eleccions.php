<!DOCTYPE html>
<html>
<head>
	<title>Eleccions</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="eleccions.css">
</head>
<body>
<?php 
//error a georigia , nevada , oklahoma, south dakota
		 	
$dades = "Alabama;WTA;9;718491;1308704;43796;9300*
Alaska;WTA;3;93007;130415;14593;4445*
Arizona;WTA;11;891028;977665;75398;23776*
Arkansas;WTA;6;378632;681765;29593;9406*
California;WTA;55;5488261;2969532;281922;152539*
Colorado;WTA;9;1199971;1133146;12827;32534*
Connecticut;WTA;7;82336;637919;45999;21539*
Delaware;WTA;3;235581;185103;14751;5865*
D.C.;WTA;3;260223;11553;4501;3995*
Florida;WTA;29;4487657;4607146;206189;6406*
Georgia;WTA;16;1856509;2078064;124;0* 
Hawaii;WTA;4;266827;128815;15949;12727*
Idaho;WTA;4;190971;412525;28452;8524*
Illinois;WTA;20;2982415;2121573;204672;74026*
Indiana;WTA;11;1024180;1544609;133001;1829*
Iowa;WTA;6;65078;798923;58893;11406*
Kansas;WTA;6;414572;65647;53559;22717*
Kentucky;WTA;8;628834;1202942;53749;13913*
Louisiana;WTA;8;779535;1178004;3795;14018*
Maine;CD;4;352156;332418;37513;13995*
Maryland;WTA;10;1502820;878615;71514;32019*
Massachusetts;WTA;11;1967667;1084400;136568;46931*
Michigan;WTA;16;2264807;2277914;172726;5142*
Minnesota;WTA;10;1364067;1321120;112778;36921*
Mississippi;WTA;6;462127;678284;13834;359*
Missouri;WTA;10;1054889;1585753;96404;25086*
Montana;WTA;3;174281;273879;27216;7662*
Nebraska;CD;5;273181;485326;37576;8335*
Nevada;WTA;6;537753;511319;37299;0*
New Hampshire;WTA;4;348497;34581;30484;6377*
New Jersey;WTA;14;1967444;1509688;66993;35305*
New Mexico;WTA;5;380923;316134;73712;974*
New York;WTA;29;4145376;2638135;162136;100033*
North Carolina;WTA;15;2162822;2339830;127746;590*
North Dakota;WTA;3;93526;216133;21351;3769*
Ohio;WTA;18;2320596;2776683;168565;44278*
Oklahoma;WTA;7;419788;947934;83334;0*
Oregon;WTA;7;949319;751438;88145;4651*
Pennsylvania;WTA;20;2817409;2890633;141476;48588*
Rhode Island;WTA;4;227062;166454;13523;5763*
South Carolina;WTA;9;850629;1147045;48888;12945*
South Dakota;WTA;3;117442;227701;20845;0*
Tennessee;WTA;11;868853;1519926;70266;15952*
Texas;WTA;38;3867816;4681590;282524;71307*
Utah;WTA;6;222858;375006;25732;5484*
Vermont;WTA;3;178082;95114;10037;6727*
Virginia;WTA;13;1916148;1729932;115998;27248*
Washington;WTA;12;1210824;831631;91427;3054*
West Virginia;WTA;5;187519;486304;22777;8016*
Wisconsin;WTA;10;1383926;1411432;106449;30942*
Wyoming;WTA;3;55964;174383;13282;2482";
//crida de funcions
$aDades = explode("*", $dades);
$dadesRecollides = recollir($aDades);
$partitsResultat = recorer($dadesRecollides);
$percentatge = percentatges($partitsResultat);

$puntsRep = $partitsResultat[1];
$puntsDem = $partitsResultat[0] - $partitsResultat[1];
$totalpunts = $partitsResultat[0];

contingut($percentatge,$puntsRep,$puntsDem);


function recollir($arrayDades)
{
	//segon explode per agafar l'array que contindrá les dades separades
	$principal = array();
	for($i= 0;$i < count($arrayDades);$i++)
	{
		$principal[$i] = explode(";", $arrayDades[$i]);
	}
	return $principal;
}
function recorer($dadesRec)
{
	//variables
	$valorAlt = 0;
	$partitGuanyador = 0;
	$puntsPartitGuanyador = 0;
	//array de partits
	$partits = array(0,0,0,0);
	//for que reccorre array1
	for($i = 0; $i < count($dadesRec);$i++)
	{
		//comprovacio estats diferents
		if($dadesRec[$i][1] == "CD" && $dadesRec[$i][0] == "Maine" )
			{
				$partits[0] += 3;
				$partits[1] += 1;
			}
		else if ($dadesRec[$i][1] == "CD" && $dadesRec[$i][0] == "Nebraska")
			{
				$partits[1] += 5;	
			}
		//for que rrecorre array2, de la posicio 3 a les 6
		else
		{
			for($j = 3; $j <= 6;$j++)
			{
				if($dadesRec[$i][$j] >= $valorAlt)
					{//recollida de dades del array
						$valorAlt = $dadesRec[$i][$j]; //agafa el valor alt
						$partitGuanyador = $j; //agafa el numero del partit guanyador
						$puntsPartitGuanyador = (int)$dadesRec[$i][2]; //agafa els punts que estan a la p2 de l'array
						$partits[$partitGuanyador - 3] += $puntsPartitGuanyador; // suma els punts al partit corresponent, es r	
					}
			}
			//reset valor alt
			$valorAlt = 0;
		}
	}
	return $partits;
}
function percentatges($partits)
{
	//donada l'array partits calculem els percentatges dels dos partits guanyador
	$puntsRep = $partits[1];
	$puntsDem = $partits[0] - $partits[1];
	$totalpunts = $partits[0];

	$pcntRep = (int)(($puntsRep * 100) / $totalpunts);
	$pcntDem = (int)(100 - $pcntRep);
	$percentatges = array($pcntDem,$pcntRep);
	return $percentatges;
}
function contingut($percentatges,$puntsRep,$puntsDem)
{
	echo "<table cellspacing='0' cellpadding='0'>";
		echo "<tr>";
			echo "<td rowspan='3' id='img1'>";
				echo "<img src='hc.png'>";
			echo "</td>";
			echo "<td><p id='ph'>Hillary Clinton<p></td>";
			echo "<td><p id='pt'>Pato Donalnd<p></td>";
			echo "<td rowspan='3' id='img2'>";
				echo "<img src='dt.png'>";
			echo "</td>";
		echo "</tr>";
		echo "<tr>";
				echo "<td class='barra1' width='".$percentatges[0]."%'  bgcolor='blue'>";
					echo "<p class='vots'>".$puntsDem."</p>";	
				echo "</td>";
				echo "<td class='barra2' width='".$percentatges[1]."%'  bgcolor='red'>";
					echo "<p class='vots' id='pbr'>".$puntsRep."<p>";
				echo "</td>";
		echo "</tr>";
		echo "<tr>";
			echo "<td><p id='p3'><p></td>";
			echo "<td><p id='p4'><p></td>";
		echo "</tr>";
	echo "</table>";
}
?>
</body>
</html>