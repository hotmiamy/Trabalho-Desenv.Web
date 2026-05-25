<?php

require "../includes/functions.php";

header("Content-Type: application/json");

$teams = readTeams();

jsonResponse($teams);