let teams = [];

let selectedTeams = [];

let championshipStarted = false;

async function loadTeams() {
    try {
        const response = await fetch("api/listar_json.php");   
        teams = await response.json();

        populateDropdowns();

    } catch (error) {
        console.error("Erro ao carregar times:", error);
    }
}

function validateStartButton() {

    const selections =
        document.querySelectorAll(".team-selected");

    let valid = true;

    selections.forEach(selection => {

        if (
            selection.textContent.startsWith("Time")
        ) {
            valid = false;
        }
    });

    const button =
        document.getElementById("start-btn");

    button.disabled = !valid;
}

function populateDropdowns() {

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {

        dropdown.innerHTML = "";

        teams.forEach(team => {
            // verifica por ID
            if (selectedTeams.includes(team.id))
                return;

            const option = document.createElement("div");

            option.classList.add("dropdown-item");

            option.textContent = team.name;

            option.addEventListener("click", () => {

                const selected = dropdown.parentElement.querySelector(".team-selected");

                const oldTeamId = Number(selected.dataset.teamId);

                // remove antigo
                if (!isNaN(oldTeamId)) 
                    selectedTeams = selectedTeams.filter(id => id != oldTeamId);
                
                // ADICIONA NOVO
                selectedTeams.push(team.id);

                // salva ID no HTML
                selected.dataset.teamId = team.id;

                // mostra nome
                selected.textContent = team.name;

                dropdown.style.display = "none";

                // atualiza TODOS dropdowns
                populateDropdowns();

                // verifica botão
                validateStartButton();
            });

            dropdown.appendChild(option);
        });
    });
}

document.querySelectorAll(".team-selector").forEach(selector => {
        const selected = selector.querySelector(".team-selected");
        const dropdown = selector.querySelector(".dropdown");

        selected.addEventListener("click", (e) => {
            if (championshipStarted == true)
                return;

            e.stopPropagation();    

            document.querySelectorAll(".dropdown").forEach(d => {
                if (d !== dropdown) 
                    d.style.display = "none";
            });

            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown").forEach(d => {
        d.style.display = "none";
        });
});

function getQuarterTeams() {

    const selectedTeams = [];

    document.querySelectorAll(".team-selected").forEach(team => {
        selectedTeams.push(team.textContent);
    });

    return selectedTeams;
}

function delay(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

function simulateMatch(team1, team2) {

    let score1 = Math.floor(Math.random() * 5);
    let score2 = Math.floor(Math.random() * 5);

    // evita empate
    while (score1 === score2) {
        score2 = Math.floor(Math.random() * 5);
    }

    return {
        team1,
        team2,
        score1,
        score2,
        winner: score1 > score2 ? team1 : team2
    };
}

async function simulateQuarterFinals() {

    const teams = getQuarterTeams();

    const matches = [
        [teams[0], teams[1]],
        [teams[2], teams[3]],
        [teams[4], teams[5]],
        [teams[6], teams[7]]
    ];

    const winners = [];

    for (let i = 0; i < matches.length; i++) {

        const [team1, team2] = matches[i];

        await delay(2000);

        const result = simulateMatch(team1, team2);

        winners.push(result.winner);

        updateQuarterResult(i, result);

        updateSemiFinal(i, result.winner);
    }

    return winners;
}

function updateQuarterResult(index, result) {

    const matches = document.querySelectorAll(".match.q1, .match.q2, .match.q3, .match.q4");

    const teams = matches[index].querySelectorAll(".team-selected");

    teams[0].textContent = `${result.team1} (${result.score1})`;

    teams[1].textContent = `${result.team2} (${result.score2})`;
}

async function simulateSemiFinals(quarterWinners) {

    const semiMatches = [
        [quarterWinners[0], quarterWinners[1]],
        [quarterWinners[2], quarterWinners[3]]
    ];

    const winners = [];

    for (let i = 0; i < semiMatches.length; i++) {

        const [team1, team2] = semiMatches[i];

        await delay(2500);

        const result = simulateMatch(team1, team2);

        winners.push(result.winner);

        updateSemiResult(i, result);

        updateFinal(result.winner, i);
    }

    return winners;
}

function updateSemiFinal(index, winner) {

    const semiTeams = document.querySelectorAll(".semi-team");

    semiTeams[index].textContent = winner;
}

function updateSemiResult(index, result) {

    const semiMatches = document.querySelectorAll(".s1, .s2");

    const teams = semiMatches[index].querySelectorAll(".semi-team");

    teams[0].textContent = `${result.team1} (${result.score1})`;

    teams[1].textContent = `${result.team2} (${result.score2})`;
}

function updateFinal(winner, index) {

    const finalTeams = document.querySelectorAll(".final-team");

    finalTeams[index].textContent = winner;
}

async function simulateFinal(semiWinners) {

    await delay(3000);

    const result = simulateMatch(semiWinners[0],semiWinners[1]);

    updateFinalResult(result);

    showChampion(result.winner);

    return result.winner;
}

function updateFinalResult(result) {

    const finalTeams = document.querySelectorAll(".final-team");

    finalTeams[0].textContent = `${result.team1} (${result.score1})`;

    finalTeams[1].textContent = `${result.team2} (${result.score2})`;
}

function showChampion(team) {

    const champion = document.getElementById("champion");

    champion.textContent = `🏆 Campeão: ${team}`;

    champion.classList.add("winner");
}

async function startChampionship() {
    if (championshipStarted)
        return;

    championshipStarted = true;

    const quarterWinners = await simulateQuarterFinals();

    await delay(3000);

    const semiWinners = await simulateSemiFinals(quarterWinners);

    await delay(3000);

    const champion = await simulateFinal(semiWinners);

    await delay(8000);

    location.reload();
}

document.getElementById("start-btn").addEventListener("click", startChampionship);

loadTeams();