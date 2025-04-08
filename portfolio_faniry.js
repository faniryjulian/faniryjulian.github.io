
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
document.addEventListener("DOMContentLoaded", function () {
  const totalPages = 60;
  const track = document.getElementById('slider-track');
  const pageCounter = document.getElementById('pageCounter');
  let currentIndex = 0;

  if (!track) {
    console.warn("⚠️ Élément #slider-track introuvable");
    return;
  }

  // Génération dynamique des images
  for (let i = 1; i <= totalPages; i++) {
    const img = document.createElement('img');
    img.src = `assets/pdf-slider/page${i}.png`;
    img.alt = `Page ${i}`;
    img.loading = 'lazy';
    img.classList.add('slider-image');
    img.addEventListener("click", () => openFullscreen(document.getElementById('pdf-slider')));
    track.appendChild(img);
  }

  function updatePageCounter() {
    if (pageCounter) {
      pageCounter.textContent = `Page ${currentIndex + 1} / ${totalPages}`;
    }
  }

  // Fonction navigation horizontale
  window.slide = function (direction) {
    const slides = document.querySelectorAll('#slider-track img');
    if (!slides.length) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    currentIndex += direction;

    if (currentIndex >= slides.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slides.length - 1;

    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updatePageCounter();
  };

  // Plein écran avec gestion du scroll vertical mobile
  function openFullscreen(el) {
    if (!el) return;

    const isMobile = window.innerWidth <= 768;

    // Active fullscreen
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();

    el.classList.add("fullscreen-mode");

    if (isMobile) {
      enableVerticalScrollMode();
    }

    // Événement de sortie du plein écran
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        el.classList.remove("fullscreen-mode");
        disableVerticalScrollMode();
      }
    });

    showFullscreenHelp(); // Aide utilisateur
  }

  // Scroll vertical mobile
  function enableVerticalScrollMode() {
    const container = document.querySelector('.slider-container');
    if (container) {
      container.classList.add("vertical-scroll");
    }
  }

  function disableVerticalScrollMode() {
    const container = document.querySelector('.slider-container');
    if (container) {
      container.classList.remove("vertical-scroll");
    }
  }

  // Swipe mobile
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) slide(1);
    else if (endX - startX > 50) slide(-1);
  });

  // Navigation clavier
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") slide(1);
    if (e.key === "ArrowLeft") slide(-1);
  });

  // Aide flottante fullscreen
  function showFullscreenHelp() {
    const help = document.getElementById('fullscreen-help');
    if (!help) return;
    help.style.display = 'block';
    setTimeout(() => {
      help.style.display = 'none';
    }, 3000);
  }

  track.style.transition = "transform 0.5s ease-in-out";
  updatePageCounter();
});




