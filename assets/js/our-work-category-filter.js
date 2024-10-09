document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectList = document.getElementById('project-list');
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter') || 'all';

  // Attach event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      updateURLFilter(filter);
      fetchAndDisplayProjects(filter);
    });
  });

  // Fetch and display projects initially based on filter from URL
  fetchAndDisplayProjects(filterParam);

  // Function to fetch projects and display them based on the filter and status
  function fetchAndDisplayProjects(filter) {
    fetch('projects/projects.json')
      .then(handleFetchResponse)
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
      .catch(handleFetchError);
  }

 // Function to display filtered and published projects
  function displayProjects(projects, filter) {
    projectList.innerHTML = ''; // Clear the existing project list
    const filteredProjects = projects.filter(project => filter === 'all' || project.category === filter);

    if (filteredProjects.length === 0) {
      projectList.innerHTML = '<p>No projects found for the selected category.</p>';
      return;
    }

    filteredProjects.forEach(project => {
      const projectCard = createProjectCard(project);
      projectList.appendChild(projectCard);
    });
  }

  // Function to create a project card element
  function createProjectCard(project) {
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
    return projectCard;
  }

  // Update the URL filter parameter and history state
  function updateURLFilter(filter) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('filter', filter);
    window.history.pushState({ path: newUrl.href }, '', newUrl.href);
  }

  // Function to handle fetch response and check for errors
  function handleFetchResponse(response) {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  }

  // Function to handle fetch errors
  function handleFetchError(error) {
    console.error('Error fetching project data:', error);
  }
});

// Function to handle project view and navigation
function viewProject(title) {
  localStorage.setItem('selectedProject', title);
  window.location.href = 'projects/index.html';
}