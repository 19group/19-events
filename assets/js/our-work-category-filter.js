document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter') || 'all';
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        updateFilter(filter);
      });
    });
  
    fetch('projects/projects.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.projects)) {
          displayProjects(data.projects, filterParam);
        } else {
          console.error('Error: Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching project data:', error));
  
    function displayProjects(projects, filter) {
      const projectList = document.getElementById('project-list');
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
                <img src="projects/index.html" alt="${project.title}" class="img-fluid" style="height:325px;">
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
  
    function updateFilter(filter) {
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('filter', filter);
      window.history.pushState({ path: newUrl.href }, '', newUrl.href);
      fetch('projects/projects.json')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.projects)) {
            displayProjects(data.projects, filter);
          }
        })
        .catch(error => console.error('Error fetching project data:', error));
    }
  });
  
  function viewProject(title) {
    localStorage.setItem('selectedProject', title);
    window.location.href = 'projects/index.html';
  }
  