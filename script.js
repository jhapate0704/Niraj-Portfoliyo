/**
 * @file script.js
 * @description Main JavaScript file handling UI interactions, animations, modal logic, 
 * and form submissions for the portfolio application.
 * Refactored to vanilla JavaScript (ES6+) for optimal performance.
 */

document.addEventListener("DOMContentLoaded", () => {
  initSplashAnimation();
  initTypedText();
  initScrollReveal();
  initNavigation();
  initBackToTop();
  initContactForm();
});

/**
 * Initializes the splash screen animation and hides it after a delay.
 */
function initSplashAnimation() {
  const splashScreen = document.getElementById("splash-screen");
  if (!splashScreen) return;
  
  setTimeout(() => {
    splashScreen.classList.add("hidden");
    setTimeout(() => {
      splashScreen.style.display = "none";
    }, 1000);
  }, 3000);
}

/**
 * Initializes the Typed.js text animation for the hero section.
 */
function initTypedText() {
  const element = document.querySelector("#element");
  if (element && typeof Typed !== 'undefined') {
    new Typed("#element", {
      strings: [
        "Full Stack Developer", 
        "UI/UX Designer", 
        "AI Enthusiast", 
        "Tech Innovator", 
        "Researcher", 
        "Architect designer"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      cursorChar: "|",
      loop: true,
    });
  }
}

/**
 * Handles scroll-based reveal animations for sections.
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const revealElements = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      } else {
        reveal.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", revealElements);
  revealElements(); // Trigger on initial load
}

/**
 * Initializes smooth scrolling navigation and the "Scroll Down" arrow.
 */
function initNavigation() {
  // Arrow scroll down
  const arrow = document.querySelector(".arrow");
  if (arrow) {
    arrow.addEventListener("click", () => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
  }

  // Navigation menu smooth scroll
  const navItems = document.querySelectorAll(".__container [data-section]");
  navItems.forEach(item => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Initializes the "Back to Top" button behavior.
 */
function initBackToTop() {
  const btn = document.getElementById("button");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Force scroll to top on initial page reload
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Initializes the contact form submission logic with EmailJS integration.
 */
function initContactForm() {
  const form = document.getElementById("myForm");
  const alertDialog = document.querySelector(".alert");
  if (!form || !alertDialog) return;

  // Initialize EmailJS using your Public Key
  // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
  if (typeof emailjs !== 'undefined') {
    emailjs.init("-RLf4SUpvVN2SWUdY");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("e-mail").value.trim();
    const message = document.getElementById("message").value.trim();

    // Standard email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !message || !email) {
      showFormAlert(alertDialog, "red", "Ensure that all fields are filled out accurately.");
      return;
    } 
    
    if (!emailRegex.test(email)) {
      showFormAlert(alertDialog, "red", "The email entered is invalid.");
      return;
    }

    // Show a loading/sending state
    showFormAlert(alertDialog, "#007bff", "Sending message...");

    // Send form data via EmailJS
    // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual IDs from your EmailJS dashboard
    emailjs.sendForm('service_owxks3k', 'template_bcijw7n', form)
      .then(() => {
        showFormAlert(alertDialog, "green", "Thanks for your message. I'll respond soon.");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showFormAlert(alertDialog, "red", "Oops! Something went wrong. Please try again later.");
      });
  });
}

/**
 * Helper to display form validation alerts.
 * @param {HTMLElement} dialog - The alert dialog element.
 * @param {string} color - The background color (e.g., "red", "green").
 * @param {string} message - The message to display.
 */
function showFormAlert(dialog, color, message) {
  dialog.style.backgroundColor = color;
  dialog.style.color = "white";
  dialog.style.display = "flex";
  dialog.innerHTML = message;
  
  if (color === "green") {
    setTimeout(() => {
      dialog.style.display = "none";
    }, 3000);
  }
}

/* ==========================================================================
   Project Hover Image Functions (Global scope for inline HTML handlers)
   ========================================================================== */

window.hoverImage1 = (element) => { element.src = "public/project img/ChromExtension-2.png"; };
window.unhoverImage1 = (element) => { element.src = "public/project img/ChromExtension-1.png"; };

window.hoverImage2 = (element) => { element.src = "public/project img/aiprviewer2.png"; };
window.unhoverImage2 = (element) => { element.src = "public/project img/aiprviewer1.png"; };

/* ==========================================================================
   Certification Modal Lightbox Functions
   ========================================================================== */

window.openLightbox = (imgSrc) => {
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  if (modal && modalImg) {
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
  }
};

window.closeLightbox = () => {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};
