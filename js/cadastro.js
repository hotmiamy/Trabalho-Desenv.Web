async function addTeam(event)
{
    const maxTeamresponse = await fetch("api/listar_json.php");

    const teams = await maxTeamresponse.json();

    if (teams.length >= 8){
        alert("Número máximo de times");
        return ;
    }
    
    event.preventDefault();

    const input = document.getElementById("team-input");

    const teamName = input.value.trim();

    if (teamName === "") {
      alert("Digite um nome válido!");
      return;
    }

    const response = await fetch("api/criar_json.php", 
    {
        method: "POST",
        headers: {
            "Content-type":  "application/json"
        },
        body: JSON.stringify({
            name: teamName
        })
    });

    const data = await response.json();

    console.log(data);

    input.value = "";

    loadTeams();
}

async function loadTeams() {

    const response = await fetch("api/listar_json.php");

    const teams = await response.json();

    const table = document.getElementById("teamTable");

    table.innerHTML = "";

    teams.forEach(team => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="teamInfo">
                    ${team.name}
                </div>
            </td>
            <td>
                <div class="team-actions">
                    <button 
                    class="button button--edit"
                    data-id="${team.id}">
                        Editar
                    </button>
                
                    <button 
                    class="button button--delete"
                    data-id="${team.id}">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        table.appendChild(row);
    });
}

async function deleteTeam(id) {

    await fetch("api/deleta_json.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    });

    loadTeams();
}

function editTeam(button, id) {

    const row = button.closest("tr");

    const nameCell = row.querySelector(".teamInfo");

    const currentName = nameCell.innerText;

    nameCell.innerHTML = `
        <input
            type="text"
            value="${currentName}"
            class="editInput"
        >
    `;

    const input = nameCell.querySelector("input");

    input.focus();

    input.addEventListener(
        "keydown", function(event) {
            if (event.key === "Enter")
                updateTeam(id, input.value);
        }
    );
}

async function updateTeam(id, name) {

    await fetch("api/atualiza_json.php",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                id: id,
                name: name
            })
        });

    loadTeams();
}

async function goNext(){
    const response = await fetch("api/listar_json.php");

    const teams = await response.json();

    if (teams.length !== 8){
        alert("Deve exatamente oito times para completar as chaves");
        return ;
    }
    window.location.href = "chaves.html";
}

const form = document.getElementById("team-form");
form.addEventListener("submit", addTeam);

const button = document.getElementById("nextButton");
button.addEventListener("click", goNext);

const table = document.getElementById("teamTable");
table.addEventListener("click", function(event) 
{
    const button = event.target;
    if (button.classList.contains("button--delete"))
        deleteTeam(button.dataset.id);
    if (button.classList.contains("button--edit"))
        editTeam(button, button.dataset.id);
});

loadTeams();