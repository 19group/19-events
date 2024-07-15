document.addEventListener("DOMContentLoaded", () => {
    const projectCardContainer = document.getElementById('project-card-container');
  
    fetch('path/to/projects.json')
      .then(response => response.json())
      .then(data => {
        data.projects.forEach(project => {
          const card = document.createElement('div');
          card.className = 'col-lg-4 col-md-6 mb-4';
          card.innerHTML = `
            <div class="card h-100">
              <img src="${project.image}" class="card-img-top" alt="${project.title}">
              <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
              </div>
              <div class="card-footer">
                <a href="${project.link}" class="btn btn-primary">View Project</a>
              </div>
            </div>
          `;
          projectCardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching project data:', error));
  });
  