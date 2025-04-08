
//animation scroll page
const animatedSections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.1
});

animatedSections.forEach((section) => {
  sectionObserver.observe(section);
});

//langues animation
const observerLang = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const bar = entry.target;
    const fill = bar.querySelector('.fill');
    if (entry.isIntersecting) {
      if (fill.classList.contains('full')) fill.style.width = '100%';
      if (fill.classList.contains('high')) fill.style.width = '85%';
      if (fill.classList.contains('middle')) fill.style.width = '50%';
    } else {
      fill.style.width = '0';
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.lang-bar').forEach(bar => observerLang.observe(bar));

//scroll toi top et cv flottant

document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTop");
  const firstSection = document.querySelector("section");

  window.addEventListener("scroll", () => {
    const sectionTop = firstSection.offsetTop + firstSection.offsetHeight;
    if (window.scrollY > sectionTop) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


//scroll section
document.addEventListener("DOMContentLoaded", function () {
  const animatedSections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.25
  });

  animatedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

//menu burger
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const navLinks = nav.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("show");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
      toggle.classList.remove("active");
    });
  });
});



//formulaire ajax
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.prenom,
    data.name,
    data.email,
    data.message,
    data.rgpd ? "Oui" : "Non"
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

//submit form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const loader = document.getElementById('formLoader'); // Optionnel : vérifie qu'il existe dans ton HTML

  if (!form) {
    console.error("❌ Le formulaire #contactForm est introuvable.");
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    if (loader) loader.classList.add('show');

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (loader) loader.classList.remove('show');
        if (response.ok) {
          form.reset();
          success.classList.add('show');
          setTimeout(() => {
            success.classList.remove('show');
          }, 4000);
        } else {
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
      })
      .catch(error => {
        if (loader) loader.classList.remove('show');
        alert("Erreur : " + error.message);
      });
  });
});




// pdf-slider
document.addEventListener("DOMContentLoaded", () => {
  const totalPages = 60;
  const track = document.getElementById("slider-track");
  let currentIndex = 0;

  // Génère dynamiquement les images
  for (let i = 1; i <= totalPages; i++) {
    const img = document.createElement("img");
    img.src = `assets/pdf-slider/page${i}.png`;
    img.alt = `Page ${i}`;
    track.appendChild(img);
  }

  const slides = track.querySelectorAll("img");

  function updateSlider() {
    const width = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  window.changeSlide = function (direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = totalPages - 1;
    if (currentIndex >= totalPages) currentIndex = 0;
    updateSlider();
  };

  window.goToPageInput = function () {
    const input = document.getElementById("pageInput");
    const page = parseInt(input.value);

    if (isNaN(page) || page < 1 || page > totalPages) {
      alert(`Merci d’entrer un numéro entre 1 et ${totalPages}`);
      return;
    }

    currentIndex = page - 1;
    updateSlider();
  };

  // Appuyer sur Entrée fonctionne aussi
  document.getElementById("pageInput")?.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      goToPageInput();
    }
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();
});


