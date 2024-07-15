document.addEventListener("DOMContentLoaded", () => {
    const projectCardContainer = document.getElementById('project-list');
  
    fetch('/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.projects)) {
          data.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
              <div class="card h-100">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                  <h5 class="card-title">${project.title}</h5>
                  <p class="card-text">${project.shortDescription}</p>
                  <p class="card-date">${project.date}</p>
                </div>
                <div class="card-footer">
                    <button onclick="viewProject('${project.title}')" class="btn btn-primary">View Details</button>
                </div>
              </div>
            `;
            projectCardContainer.appendChild(card);
          });
        } else {
          console.error('Error: Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching project data:', error));
  });
  
  function viewProject(title) {
    localStorage.setItem('selectedProject', title);
    window.location.href = 'project-det.html';
  }