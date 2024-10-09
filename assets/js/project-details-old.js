document.addEventListener("DOMContentLoaded", () => {
  // Load the common sections
  $('#pageheadersection').load('projectheader.html', () => {
    fetchProjectDataAndSetBackground();
  });
  $('#projectdetailssection').load('projectdetails.html');
  $('#projecttestimonial').load('projecttestimonial.html');
  $('#contact').load('projectcontact.html');
  $('#projectexperience').load('projectexperience.html');
  $('.colorband').load('projectcolorband.html');
  $('#footer').load('projectfooter.html');
});

function fetchProjectDataAndSetBackground() {
  // Retrieve the selected project title from local storage
  const selectedProjectTitle = localStorage.getItem('selectedProject');

  // Fetch the project data
  fetch('projects.json')
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
          console.log('Project found:', project); // Debug log
          
          // Set the hero header background
          setHeroHeaderBackground(project);

          // Populate the project details
          appendHTML(project);
        } else {
          console.error('Error: Project not found');
        }
      } else {
        console.error('Error: Data is not an array');
      }
    })
    .catch(error => console.error('Error fetching project data:', error));
}

function setHeroHeaderBackground(project) {
  const style = document.createElement('style');
  style.innerHTML = `
    #hero-header {
      background: url(${project.heroImage}) bottom center;
    }
  `;
  document.head.appendChild(style);
}

function appendHTML(data) {
  // Add more information to the page
  $.each(data.details.eventInfo, function(key, val) {
    var category = $("<label>" + val.category + "</label>" +
      "<a href='" + val.link + "' target='_blank'>" +
      "<p>" + val.link + "</p>" +
      "</a>");
    $("#eventinfocontainer").append(category);
  });
  
  var projectheader = "<h1 class='mb-4 pb-0'>" + data.title + "</h1>";
  // Add the main page components
  $("#pageheadercontainer").append(projectheader);
  $("#mainparagraph").append(data.details.overview);
  $("#subparagraph1").append(data.details.subparagraph1);
  $("#subparagraph2").append(data.details.subparagraph2);
  $("#subparagraph3").append(data.details.subparagraph3);
  $("#subparagraph4").append(data.details.subparagraph4);
  $("#roleparagraph").append(data.details.role);


  // Populate outcomes
  const outcomeContainer = document.getElementById('outcomecontainer');
  data.details.outcomes.forEach(outcome => {
    const outcomeDiv = document.createElement('div');
    outcomeDiv.className = 'col-lg-3 project-stats';
    outcomeDiv.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-11 col-lg-8 position-relative">
          <h1>${outcome.number}</h1>
          <p>${outcome.name}</p>
        </div>
      </div>
    `;
    outcomeContainer.appendChild(outcomeDiv);
  });
  //Populate Images if Available 
  const imageContainer = document.getElementById('imagelist');
  data.details.images.forEach(image => {
    const imagediv = document.createElement('div');
    imagediv.className = 'col-lg-3 col-md-4';
    imagediv.innerHTML = `
        <div class="venue-gallery">
          <a href="${image.link}" class="glightbox" data-gall="venue-gallery">
            <img src="${image.link}" alt="" class="img-fluid">
          </a>
        </div>
    `;
    imageContainer.appendChild(imagediv);
  });


  // Populate testimonials if available
  if (data.details.testimonials) {
    const testimonialContainer = document.createElement('div');
    testimonialContainer.className = 'testimonials';
    data.details.testimonials.forEach(testimonial => {
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
