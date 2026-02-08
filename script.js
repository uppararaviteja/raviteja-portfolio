// Smooth scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add animation to skill tags
  const skillTags = document.querySelectorAll('.tag');
  skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
    
    setTimeout(() => {
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1)';
    }, 100);
  });

  // Add counter animation for achievements
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + '%';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '%';
      }
    }, 30);
  };

  // Observe achievement cards for counter animation
  const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const h3 = entry.target.querySelector('h3');
        if (h3 && h3.textContent === '60%') {
          h3.textContent = '0%';
          animateCounter(h3, 60);
          achievementObserver.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });

  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach(card => {
    achievementObserver.observe(card);
  });

  // Add parallax effect to hero section
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
});

// Add dynamic year to footer
const updateFooterYear = () => {
  const footer = document.querySelector('.footer p');
  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Raviteja Uppara. All rights reserved.`;
  }
};

updateFooterYear();