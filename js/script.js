"use strict";

// ===== Theme Toggle =====
const themeToggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

setTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Respect system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light");
    }
  });

// ===== Navigation Scroll Effect =====
const nav = document.getElementById("nav");

function handleNavScroll() {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavScroll, { passive: true });
handleNavScroll();

// ===== Mobile Menu =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll(".mobile-menu__link");

function toggleMobileMenu() {
  const isActive = hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = isActive ? "hidden" : "";
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", toggleMobileMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById("typewriter");
const phrases = ["Jason Jara", "a Web Developer", "a UX Designer"];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 60;
const pauseAfterType = 2000;
const pauseAfterDelete = 500;

function typewrite() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typewrite, pauseAfterType);
      return;
    }
    setTimeout(typewrite, typeSpeed);
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typewrite, pauseAfterDelete);
      return;
    }
    setTimeout(typewrite, deleteSpeed);
  }
}

setTimeout(typewrite, 800);

// ===== Scroll Reveal (IntersectionObserver) =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== Contact Modal =====
const contactModal = document.getElementById("contact-modal");
const openBtns = document.querySelectorAll("[data-open-contact]");
const closeBtns = document.querySelectorAll("[data-close-contact]");

function openContactModal(e) {
  e.preventDefault();
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  contactModal.classList.remove("active");
  document.body.style.overflow = "";
}

openBtns.forEach((btn) => btn.addEventListener("click", openContactModal));
closeBtns.forEach((btn) => btn.addEventListener("click", closeContactModal));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && contactModal.classList.contains("active")) {
    closeContactModal();
  }
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById("scroll-top");

function handleScrollTop() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScrollTop, { passive: true });

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPosition =
        targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ===== Remove Hash from URL =====
function removeLocationHash() {
  const noHashURL = window.location.href.replace(/#.*$/, "");
  window.history.replaceState("", document.title, noHashURL);
}

window.addEventListener("popstate", removeLocationHash);
window.addEventListener("hashchange", (e) => {
  e.preventDefault();
  removeLocationHash();
});
