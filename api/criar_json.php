<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$data = readJsonInput();

$teams = readTeams();

if (empty($teams)){

    $newTeam = [
    "id" => 0,
    "name" => $data["name"]
];

} else {

    $lastTeam = end($teams);
    $newTeam = [
    "id" => $lastTeam["id"] + 1,
    "name" => $data["name"]
];

}



$teams[] = $newTeam;

saveTeams($teams);

jsonResponse([
    "success" => true,
    "team" => $newTeam
]);