<?php

require "../includes/functions.php";
header("Content-Type: application/json");

$data = readJsonInput();

$teams = readTeams();

foreach ($teams as &$team)
{
    if ($team["id"] == $data["id"])
        $team["name"] = $data["name"];
}

saveTeams($teams);

jsonResponse([
    "success" => true
]);