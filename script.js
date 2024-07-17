document.addEventListener("DOMContentLoaded", () => {
    const projectList = document.getElementById('project-list');
  
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
            const projectCard = document.createElement('div');
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-delay', '100');
            projectCard.className = 'col-lg-4 col-md-6';
            projectCard.innerHTML = `
              <div class="hotel" >
                <div class="hotel-img">
                  <img src="${project.imageUrl}" alt="${project.title}" class="img-fluid" style="height:325px;width:356.66px;>
                </div>
                <div class="work-content">
                  <h3><a href="${project.link}">${project.title}</a></h3>
                  <p>${project.shortDescription}</p>
                </div>
              </div>
            `;
            projectList.appendChild(projectCard);
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