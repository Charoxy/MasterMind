<?php



$file = 'score.txt';
$name = $_GET['pseudo'];
$score = $_GET['score'];

$current = file_get_contents($file);

$current .= "$name : $score;";

file_put_contents($file, $current);

print $_GET["pseudo"].$_GET["score"];

header("Location: index.html");