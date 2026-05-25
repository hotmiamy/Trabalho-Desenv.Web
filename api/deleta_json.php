<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$data = readJsonInput();

$teams = readTeams();

$id = $data["id"];

$filteredTeams = array_filter(
    $teams,
    function($team) use ($id) {
        return $team["id"] != $id;
    }
);

saveTeams(array_values($filteredTeams));

jsonResponse([
    "success" => true
]);