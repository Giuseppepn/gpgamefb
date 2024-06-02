async function loadScores() {
  const container = document.getElementById("leaderboard-container");
  if (!container) {
    console.error("Elemento con id 'leaderboard-container' non trovato.");
    return;
  }

  container.innerHTML = ""; // Clear the container before adding new elements
  if (!document.getElementById("title")) {
    const title = document.createElement("h1");
    title.id = "title";
    title.innerHTML = "RUNNER";
    container.appendChild(title);
  }

  try {
    const response = await fetch('http://localhost:3000/api/score');
    if (!response.ok) {
      throw new Error('Errore di connessione');
    }
    const data = await response.json();
    
    if (data.leaderboard && data.leaderboard.length > 0) {
      data.leaderboard.forEach((element, index) => {
        let div = document.createElement("div");
        div.classList.add("leaderboard-entry");

        let place = document.createElement("p");
        place.classList.add("place");
        place.innerHTML = index + 1; 

        let username = document.createElement("p");
        username.classList.add("username");
        username.innerHTML = element.username;

        let time = document.createElement("p");
        time.classList.add("time");
        time.innerHTML = element.time;

        div.appendChild(place);
        div.appendChild(username);
        div.appendChild(time);
        container.appendChild(div);
      });
    } else {
      console.warn("errore");
    }
  } catch (error) {
    console.error('errore durante il caricamento dei punteggi:', error);
  }
}

