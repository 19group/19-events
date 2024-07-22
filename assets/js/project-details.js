document.addEventListener("DOMContentLoaded", () => {
  // Load the common sections
  $('#pageheadersection').load('projectheader.html');
  $('#projectdetailssection').load('projectdetails.html');
  $('#projecttestimonial').load('projecttestimonial.html');
  $('#contact').load('projectcontact.html');
  $('#projectexperience').load('projectexperience.html');
  $('.colorband').load('projectcolorband.html');
  $('#footer').load('projectfooter.html');

  // Retrieve the selected project title from local storage
  const selectedProjectTitle = localStorage.getItem('selectedProject');

  // Fetch the project data
  fetch('../projects/projects.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data.projects)) {
        const project = data.projects.find(p => p.title === selectedProjectTitle);
        if (project) {
          populateProjectDetails(project);
        } else {
          console.error('Error: Project not found');
        }
      } else {
        console.error('Error: Data is not an array');
      }
    })
    .catch(error => console.error('Error fetching project data:', error));
});

function populateProjectDetails(project) {
  // Populate the main header and paragraphs
  document.getElementById('mainheader').textContent = project.title;
  document.getElementById('mainparagraph').textContent = project.details.overview;
  document.getElementById('roleparagraph').textContent = project.details.role;

  // Populate additional paragraphs if available
  const paragraphs = ['subparagraph1', 'subparagraph2', 'subparagraph3', 'subparagraph4'];
  project.details.outcomes.forEach((outcome, index) => {
    if (index < paragraphs.length) {
      document.getElementById(paragraphs[index]).textContent = `${outcome.name}: ${outcome.number}`;
    }
  });

  // Populate event info
  const eventInfoContainer = document.getElementById('eventinfocontainer');
  project.details.eventInfo.forEach(info => {
    const infoItem = document.createElement('p');
    const infoLink = document.createElement('a');
    infoLink.href = info.link;
    infoLink.textContent = info.category;
    infoLink.target = '_blank';
    infoItem.appendChild(infoLink);
    eventInfoContainer.appendChild(infoItem);
  });

  // Populate testimonials if available
  if (project.details.testimonials) {
    const testimonialContainer = document.createElement('div');
    testimonialContainer.className = 'testimonials';
    project.details.testimonials.forEach(testimonial => {
      const testimonialBlock = document.createElement('blockquote');
      const testimonialText = document.createElement('p');
      const testimonialCite = document.createElement('cite');
      testimonialText.textContent = testimonial.testimonial;
      testimonialCite.textContent = `${testimonial.name}, ${testimonial.title}`;
      testimonialBlock.appendChild(testimonialText);
      testimonialBlock.appendChild(testimonialCite);
      testimonialContainer.appendChild(testimonialBlock);
    });
    document.querySelector('.p-dev-container').appendChild(testimonialContainer);
  }
}
