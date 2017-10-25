<?php 
  $article = $_POST[ 'valor' ];
  
  echo "<span>Informació de l'article nº" . $article . "</span><br>";
  
  switch ( $article )
  {
    case 1:
      $titol = "Caixa vermella";
      $desc = "Gran capacitat, per guardar-hi qualsevol cosa."; 
      $preu = "10";
      break;
      
    case 2:
      $titol = "Caixa verda"; 
      $desc = "Disseny simple però eficient i ecològic."; 
      $preu = "15";
      break;
      
    case 3:
      $titol = "Caixa blava";
      $desc = "Un color que mai passa de moda!"; 
      $preu = "20";
      break;
  }
  
  echo "<b>$titol</b><br>";
  echo "$desc<br>";
  echo "<i>Preu: $preu €</i>";
?>
