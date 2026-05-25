<?php



function readJsonInput() {

    return json_decode(
        file_get_contents("php://input"),
        true
    );
}

function readTeams() {

    $file = __DIR__ . "/../data/times.json";

    return json_decode(
        file_get_contents($file),
        true
    );
}

function saveTeams($teams) {

    $file = __DIR__ . "/../data/times.json";

    file_put_contents(
        $file,
        json_encode(
            $teams,
            JSON_PRETTY_PRINT
        )
    );
}

function jsonResponse($data) {

    header("Content-Type: application/json");

    echo json_encode($data);
}