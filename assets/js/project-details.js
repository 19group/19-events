document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    { id: '#pageheadersection', file: 'projectheader.html', callback: fetchProjectDataAndSetBackground },
    { id: '#projectdetailssection', file: 'projectdetails.html' },
    { id: '#projecttestimonial', file: 'projecttestimonial.html' },
    { id: '#contact', file: 'projectcontact.html' },
    { id: '#projectexperience', file: 'projectexperience.html' },
    { id: '.colorband', file: 'projectcolorband.html' },
    { id: '#footer', file: 'projectfooter.html' }
  ];

  sections.forEach(section => {
    $(section.id).load(section.file, section.callback || null);
  });
});

function fetchProjectDataAndSetBackground() {
  const selectedProjectTitle = localStorage.getItem('selectedProject');
  
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      const project = data.projects?.find(p => p.title === selectedProjectTitle);
      if (project) {
        setHeroHeaderBackground(project);
        appendProjectDetails(project);
      } else {
        console.error('Error: Project not found');
      }
    })
    .catch(error => console.error('Error fetching project data:', error));
}

//Set Background Image
function setHeroHeaderBackground(project) {
  document.getElementById('hero-header').style.background = `url(${project.heroImage}) bottom center`;
}

// Append Project Details to the Page
function appendProjectDetails(data) {
  const appendElements = {
    '#pageheadercontainer': `<h1 class='mb-4 pb-0'>${data.title}</h1>`,
    '#mainparagraph': data.details.overview,
    '#subparagraph1': data.details.subparagraph1,
    '#subparagraph2': data.details.subparagraph2,
    '#subparagraph3': data.details.subparagraph3,
    '#subparagraph4': data.details.subparagraph4,
    '#roleparagraph': data.details.role
  };
  
  for (let [selector, content] of Object.entries(appendElements)) {
    if (content) {
      document.querySelector(selector).innerHTML = content;
    }
  }

  // Append event info
  data.details.eventInfo.forEach(event => {
    const category = `<label>${event.category}</label>
      <a href="${event.link}" target='_blank'>
        <p>${event.link}</p>
      </a>`;
    document.querySelector("#eventinfocontainer").insertAdjacentHTML('beforeend', category);
  });

  // Append outcomes
  const outcomeContainer = document.getElementById('outcomecontainer');
  data.details.outcomes.forEach(outcome => {
    outcomeContainer.insertAdjacentHTML('beforeend', `
      <div class="col-lg-3 project-stats">
        <div class="row justify-content-center">
          <div class="col-11 col-lg-8 position-relative">
            <h1>${outcome.number}</h1>
            <p>${outcome.name}</p>
          </div>
        </div>
      </div>`);
  });

  // Append images
  const imageContainer = document.getElementById('imagelist');
  data.details.images.forEach(image => {
    imageContainer.insertAdjacentHTML('beforeend', `
      <div class="col-lg-3 col-md-4">
        <div class="venue-gallery">
          <a href="${image.link}" class="glightbox" data-gall="venue-gallery">
            <img src="${image.link}" alt="" class="img-fluid">
          </a>
        </div>
      </div>`);
  });

  // Append testimonials
  if (data.details.testimonials) {
    const testimonialContainer = document.createElement('div');
    testimonialContainer.className = 'testimonials';
    data.details.testimonials.forEach(testimonial => {
      testimonialContainer.insertAdjacentHTML('beforeend', `
        <blockquote>
          <p>${testimonial.testimonial}</p>
          <cite>${testimonial.name}, ${testimonial.title}</cite>
        </blockquote>`);
    });
    document.querySelector('.p-dev-container').appendChild(testimonialContainer);
  }
}