const phrases = ["sinh viên Công nghệ thông tin", "người thích học hỏi", "người mê máy móc", "người hướng tới giải pháp CNTT"];
let pIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById("typingText");

// Randomize each panel independently while preserving its 3D hover transforms.
document.querySelectorAll(".hero-board, .custom-card, .avatar-card").forEach(box => {
  const direction = Math.random() < 0.5 ? -1 : 1;
  const angle = direction * (0.5 + Math.random() * 1);
  box.style.setProperty("--random-tilt", `${angle.toFixed(2)}deg`);
  box.style.setProperty("--metal-delay", `${(Math.random() * 4.8).toFixed(2)}s`);
});
const reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false; 
function typeText() {
  if (!typingEl) return;
  let current = phrases[pIdx];
  typingEl.textContent = current.substring(0, cIdx);
  if (!deleting && cIdx < current.length) { cIdx++; setTimeout(typeText, 70); }
  else if (!deleting) { deleting = true; setTimeout(typeText, 1200); }
  else if (cIdx > 0) { cIdx--; setTimeout(typeText, 35); }
  else { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeText, 200); }
}
if (!reduceMotion) typeText();

const sidebar = document.getElementById("sidebar"), 
      scrim = document.getElementById("sidebarScrim"), 
      toggle = document.getElementById("menuToggle");

function toggleSidebar(open) {
  sidebar.classList.toggle("is-open", open);
  scrim.classList.toggle("is-visible", open);
  toggle?.setAttribute("aria-expanded", String(open));
}
toggle?.addEventListener("click", () => toggleSidebar(true));
scrim?.addEventListener("click", () => toggleSidebar(false));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") toggleSidebar(false);
});

const navLinks = document.querySelectorAll(".side-link");
const currentSectionLabel = document.getElementById("currentSection");
const sectionLabels = { 
  home: "OVERVIEW", 
  about: "ABOUT ME", 
  education: "EDUCATION", 
  skills: "MY TOOLKIT", 
  projects: "SELECTED WORK", 
  interests: "INTERESTS", 
  contact: "GET IN TOUCH" 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${id}`) { link.classList.add("active"); }
        else { link.classList.remove("active"); }
      });
      if (currentSectionLabel && sectionLabels[id]) { currentSectionLabel.textContent = sectionLabels[id]; }
    }
  });
}, { rootMargin: "-10% 0px -30% 0px", threshold: 0.1 });

document.querySelectorAll("section[id]").forEach(section => observer.observe(section));

let scrollFrame = null;
window.addEventListener("scroll", () => {
  if (scrollFrame !== null) return;
  scrollFrame = requestAnimationFrame(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    document.getElementById("scrollProgress")?.style.setProperty("transform", `scaleX(${progress})`);
    if (!reduceMotion) document.body.style.setProperty("--ambient-y", `${window.scrollY * -0.035}px`);

    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 30) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#contact"));
      if (currentSectionLabel) currentSectionLabel.textContent = sectionLabels.contact;
    }
    scrollFrame = null;
  });
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("sideYear").textContent = new Date().getFullYear();

document.getElementById("contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const mailto = `mailto:25050016@student.bdu.edu.vn?subject=Liên hệ từ Portfolio&body=Tên: ${data.get("name")}%0D%0AEmail: ${data.get("email")}%0D%0A%0D%0A${data.get("message")}`;
  document.getElementById("formNote").textContent = "Đang mở ứng dụng email...";
  window.location.href = mailto;
});

let scrollAnimationId = null;
['wheel', 'touchmove', 'keydown'].forEach(eventType => {
  window.addEventListener(eventType, () => {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
    }
  }, { passive: true });
});

function customSmoothScroll(targetY) {
  if (reduceMotion) { window.scrollTo(0, targetY); return; }
  if (scrollAnimationId) cancelAnimationFrame(scrollAnimationId);

  const startPosition = window.pageYOffset;
  const distance = targetY - startPosition;
  const duration = 600; 
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    window.scrollTo(0, startPosition + distance * ease);
    if (timeElapsed < duration) {
      scrollAnimationId = requestAnimationFrame(animation);
    } else {
      scrollAnimationId = null;
    }
  }
  scrollAnimationId = requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', function () {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      customSmoothScroll(0);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const targetY = elementPosition - headerOffset;
        customSmoothScroll(targetY);
        if (window.innerWidth <= 768) toggleSidebar(false);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.hero-board, section > .mb-4, .custom-card, #contactForm, footer');
  const skillTracks = document.querySelectorAll('.skill-track > span');

  skillTracks.forEach(track => {
    track.dataset.progress = track.style.width;
    track.style.width = '0%';
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-revealed'));
    skillTracks.forEach(track => { track.style.width = track.dataset.progress; });
  } else {
    revealItems.forEach((item, index) => {
      item.classList.add('scroll-reveal');
      item.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
  }

  if ('IntersectionObserver' in window && !reduceMotion) {
    const skillObserver = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.width = entry.target.dataset.progress;
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    skillTracks.forEach(track => skillObserver.observe(track));
  } else {
    skillTracks.forEach(track => { track.style.width = track.dataset.progress; });
  }

  if (!reduceMotion) {
    const pointerCards = document.querySelectorAll('.avatar-card, .custom-card:not(.bg-dark)');
    pointerCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--pointer-x', `${x * 100}%`);
        card.style.setProperty('--pointer-y', `${y * 100}%`);
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 14}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 14}deg`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });

    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('pointermove', event => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty('--magnet-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.12}px`);
        button.style.setProperty('--magnet-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.12 - 2}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
      button.addEventListener('click', event => {
        const bounds = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = `${event.clientX - bounds.left}px`;
        ripple.style.top = `${event.clientY - bounds.top}px`;
        button.append(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      });
    });
  }

  // Give each visual panel an independent, stable random lean between 2° and 5°.
  document.querySelectorAll('.hero-board, .custom-card, .avatar-card').forEach((box, index) => {
    const magnitude = 2 + Math.random() * 3;
    const direction = (index % 2 === 0 ? -1 : 1) * (Math.random() < .5 ? 1 : -1);
    box.style.setProperty('--random-lean', `${(magnitude * direction).toFixed(2)}deg`);
  });

  const toggleBtn = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem('theme'); }
  catch (error) { /* Storage can be unavailable for local files or private contexts. */ }
  const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
  htmlElement.setAttribute('data-bs-theme', initialTheme);

  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('.theme-toggle-icon');
  const label = toggleBtn.querySelector('.theme-toggle-label');
  const updateToggle = theme => {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('aria-pressed', String(isDark));
    if (icon) icon.textContent = isDark ? '☀' : '☾';
    if (label) label.textContent = 'Dark / Light';
  };

  updateToggle(initialTheme);
  toggleBtn.addEventListener('click', () => {
    const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-bs-theme', newTheme);
    try { window.localStorage.setItem('theme', newTheme); }
    catch (error) { /* Theme still changes for this session when storage is unavailable. */ }
    updateToggle(newTheme);
  });
});