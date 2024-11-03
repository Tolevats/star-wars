let fetchedCharacters = [];

document.addEventListener("DOMContentLoaded", function () {
    //definiendo los rangos para cada sección
    const ranges = [
      { elementId: "section-1-5", start: 1, end: 5, iconClass: "main" },
      { elementId: "section-6-11", start: 6, end: 11, iconClass: "secondary" },
      { elementId: "section-12-17", start: 12, end: 17, iconClass: "other" }
    ];
  
    //realizar el fetch y desplegar los personajes
    async function fetchAndDisplayCharacters(start, end, container, iconClass) {
        const maxCharacters = 5; //definir el número máximo de personajes
        container.classList.add("row", "justify-contente-start");

        for (let id = start; id <= end && id < start + maxCharacters; id++) {
          if (!fetchedCharacters.includes(id)) {
            try {
            const response = await fetch(`https://swapi.dev/api/people/${id}/`);
            const character = await response.json();
  
            //inyectar info de personajes en el contenedor
            const characterHTML = `
            <div class="col-12 col-md-6 col-lg-4">
              <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;>
               <div class="character-card">
                  <div class="timeline-icon ${iconClass}"></div>
                  <div class="timeline-text">
                    <h5>${character.name}</h5>
                   <p>Estatura: ${character.height} cm.</p>
                    <p>Peso: ${character.mass} kg.</p>
                 </div>
               </div>
              <div>
            <div>`;
           container.insertAdjacentHTML("beforeend", characterHTML);
            fetchedCharacters.push(id);
          } catch (error) {
           console.error("Error al obtener personaje:", error);
         }
        }
      }
    }

    //añadir event listeners para cada sección
    ranges.forEach(({ elementId, start, end, iconClass }) => {
      const sectionElement = document.getElementById(elementId);
      const displayContainer = document.createElement("div");
      displayContainer.classList.add("character-container");
      sectionElement.appendChild(displayContainer);
  
      sectionElement.addEventListener("mouseenter", () => {
        fetchAndDisplayCharacters(start, end, displayContainer, iconClass);
      });
    });
  });