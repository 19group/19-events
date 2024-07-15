// script.js
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const projectList = document.getElementById('project-list');
    data.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.date}</p>
        <p>${project.shortDescription}</p>
        <button onclick="viewProject('${project.title}')">View Details</button>
      `;
      projectList.appendChild(projectCard);
    });
  });

function viewProject(title) {
  localStorage.setItem('selectedProject', title);
  window.location.href = 'project-det.html';
}
