document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.getElementById('project-list');

  fetch('projects/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data.projects)) {
        // Filter projects that have status 'publish'
        const publishedProjects = data.projects.filter(project => project.status === 'publish');
        
        // Now display only the projects that are published
        displayProjects(publishedProjects, filter);
      } else {
        console.error('Error: Data is not an array');
      }
    })
    .catch(error => console.error('Error fetching project data:', error));

  function displayProjects(projects, filter) {
    projectList.innerHTML = '';
    projects
      .filter(project => filter === 'all' || project.category === filter)
      .forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', '100');
        projectCard.className = 'col-lg-4 col-md-6';
        projectCard.innerHTML = `
          <div class="hotel" onclick="viewProject('${project.title}')">
            <div class="hotel-img">
              <img src="${project.imageUrl}" alt="${project.title}" class="img-fluid" style="height:325px;">
            </div>
            <div class="work-content">
              <h3><a href="projects/index.html">${project.title}</a></h3>
              <p>${project.shortDescription}</p>
            </div>
          </div>
        `;
        projectList.appendChild(projectCard);
      });
  }
});

function viewProject(title) {
  localStorage.setItem('selectedProject', title);
  window.location.href = 'projects/index.html';
}
  