document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Menu Toggle ---
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.setAttribute('aria-expanded',
        navLinks.classList.contains('active') ? 'true' : 'false'
      );
    });
  }

  // --- 2. Dark Mode Toggle ---
  const darkToggle = document.querySelector(".dark-mode-toggle");

  if (darkToggle) {
    // Check for saved preference
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }

    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // --- 3. Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // --- 4. Modal / Form Logic (Preserved but Cleaned) ---
  const contactBtn = document.getElementById("contactbtn");
  const modal = document.getElementById("contactFormBox");
  const closeBtn = document.getElementById("closeBtn");

  if (contactBtn && modal) {
    contactBtn.addEventListener("click", () => {
      modal.style.display = "flex"; // Ensure it's visible based on CSS logic
      modal.classList.add("active");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      setTimeout(() => { modal.style.display = "none"; }, 300); // Wait for transition
    });
  }

  // Clean up: Close modal if clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // --- 6. 3D Tilt Effect ---
  // --- 6. Spotlight & 3D Tilt Effect ---
  const spotlightCards = document.querySelectorAll('.card1, .imagebox, .imagebox2, .testimonial-card, .skill-item, .profile-container');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set CSS variables for spotlight gradient
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Apply 3D Tilt only to larger cards + profile
      if (card.classList.contains('card1') ||
        card.classList.contains('imagebox') ||
        card.classList.contains('imagebox2') ||
        card.classList.contains('testimonial-card') ||
        card.classList.contains('profile-container')) {

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Allow spotlight to fade via CSS. Reset tilt.
      if (card.classList.contains('card1') ||
        card.classList.contains('imagebox') ||
        card.classList.contains('imagebox2') ||
        card.classList.contains('testimonial-card') ||
        card.classList.contains('profile-container')) {

        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      }
    });
  });

  // --- 7. Text Reveal on Scroll ---
  const revealElements = document.querySelectorAll('.reveal-text');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    root: null,
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- 8. Download CV ---
  const downloadBtn = document.getElementById('btn') || document.querySelector('.btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadCV);
  }

});
const cards = document.querySelectorAll(".card1");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active-card"));
    card.classList.add("active-card");
  });
});

function downloadCV() {
  const link = document.createElement("a");
  link.href = "Assets/cv/Balaji_S_Resume Updated.pdf";
  link.download = "Balaji_S_Resume Updated.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/* ===== MOBILE NAV TOGGLE ===== */
const navbar = document.querySelector(".navbar");
const navMenuLinks = document.querySelector(".nav-links");

if (navbar && navMenuLinks) {
  navbar.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      navMenuLinks.classList.toggle("active");
    }
  });

  /* close menu on link click */
  document.querySelectorAll(".nav-links a, .contact, .btn")
    .forEach(item => {
      item.addEventListener("click", () => {
        navMenuLinks.classList.remove("active");
      });
    });
}
