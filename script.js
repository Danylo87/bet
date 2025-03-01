// Token-ul tău API
const apiKey = "95df6201635e43169e7cae27a99eb0a3"; // Înlocuiește cu propriul tău token
const url = "https://api.football-data.org/v2/competitions/PL/matches";

// Funcția pentru a obține meciuri și a actualiza interfața
async function fetchMatchData() {
  const matchesDiv = document.getElementById('matches');
  const loadingDiv = document.getElementById('loading');

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "X-Auth-Token": apiKey }
    });

    if (response.ok) {
      const data = await response.json();
      loadingDiv.style.display = "none"; // Ascunde mesajul de încărcare

      // Adaugă datele despre meciuri
      data.matches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.className = "match";
        matchDiv.innerHTML = `
          <p><strong>${match.homeTeam.name}</strong> vs <strong>${match.awayTeam.name}</strong></p>
          <p>Data: ${new Date(match.utcDate).toLocaleString()}</p>
        `;
        matchesDiv.appendChild(matchDiv);
      });
    } else {
      loadingDiv.innerText = "Eroare la încărcarea datelor!";
    }
  } catch (error) {
    console.error("Eroare:", error);
    loadingDiv.innerText = "Nu s-a putut conecta la API!";
  }
}

// Apelez funcția după încărcarea paginii
fetchMatchData();
