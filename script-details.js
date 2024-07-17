// script-details.js
document.addEventListener('DOMContentLoaded', function() {
    const selectedProjectTitle = localStorage.getItem('selectedProject');
  
    fetch('projects.json')
      .then(response => response.json())
      .then(data => {
        const project = data.find(p => p.title === selectedProjectTitle);
  
        if (project) {  
          document.getElementById('mainheader').textContent = `${project.beginningname} ${project.emphasisname} ${project.lastname}`;
          document.getElementById('mainparagraph').textContent = project.details.overview;
          document.getElementById('subparagraph1').textContent = project.details.subparagraph1 || '';
          document.getElementById('subparagraph2').textContent = project.details.subparagraph2 || '';
          document.getElementById('subparagraph3').textContent = project.details.subparagraph3 || '';
          document.getElementById('subparagraph4').textContent = project.details.subparagraph4 || '';
          document.getElementById('roleparagraph').textContent = project.details.role;
  
          const outcomeContainer = document.getElementById('outcomecontainer');
          if (project.details.outcomes) {
            project.details.outcomes.forEach(outcome => {
              const outcomeElement = document.createElement('div');
              outcomeElement.className = 'col-lg-3 col-md-6';
              outcomeElement.innerHTML = `
                <div class="outcome-item">
                  <h3>${outcome.number}</h3>
                  <p>${outcome.name}</p>
                </div>
              `;
              outcomeContainer.appendChild(outcomeElement);
            });
          }
  
          const eventInfoContainer = document.getElementById('eventinfocontainer');
          if (project.details.eventInfo) {
            project.details.eventInfo.forEach(info => {
              const infoElement = document.createElement('div');
              infoElement.className = 'col-lg-3 col-md-6';
              infoElement.innerHTML = `
                <div class="event-info-item">
                  <h3>${info.category}</h3>
                  <p><a href="${info.link}" target="_blank">View ${info.category}</a></p>
                </div>
              `;
              eventInfoContainer.appendChild(infoElement);
            });
          }
        }
      });
  });
  