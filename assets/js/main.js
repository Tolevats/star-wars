document.addEventListener("DOMContentLoaded", function () {
    //definiendo los rangos para cada sección
    const ranges = [
      { elementId: "section-1-5", start: 1, end: 5 },
      { elementId: "section-6-11", start: 6, end: 11 },
      { elementId: "section-12-17", start: 12, end: 17 }
    ];
  
    //realizar el fetch y desplegar los personajes
    async function fetchAndDisplayCharacters(start, end, container) {
      container.innerHTML = ""; // Clear previous data
      for (let id = start; id <= end; id++) {
        try {
          const response = await fetch(`https://swapi.dev/api/people/${id}/`);
          const character = await response.json();
  
          //inyectar info de personajes en el contenedor
          const characterHTML = `
          <div class="col-12 col-md-6 col-lg-4">
            <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;>
              <div class="character-card">
                <h5>${character.name}</h5>
                <p>Estatura: ${character.height} cm</p>
                <p>Peso: ${character.mass} kg</p>
              </div>
            <div>
          <div>`;
          container.insertAdjacentHTML("beforeend", characterHTML);
        } catch (error) {
          console.error("Error fetching character:", error);
        }
      }
    }
  
    //añadir event listeners para cada sección
    ranges.forEach(({ elementId, start, end }) => {
      const sectionElement = document.getElementById(elementId);
      const displayContainer = document.createElement("div");
      displayContainer.classList.add("character-container");
      sectionElement.appendChild(displayContainer);
  
      sectionElement.addEventListener("mouseenter", () => {
        fetchAndDisplayCharacters(start, end, displayContainer);
      });
    });
  });