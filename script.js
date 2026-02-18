// Smooth scrolling for anchor links
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

// Counter animation function
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '%';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '%';
    }
  }, 16);
}

// Add intersection observer for fade-in animations and counter
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Trigger counter animation for achievement cards
      if (entry.target.classList.contains('achievement-card')) {
        const h3 = entry.target.querySelector('h3');
        const text = h3.textContent;
        
        // Check if it's the 60% achievement
        if (text.includes('60%')) {
          h3.textContent = '0%';
          setTimeout(() => animateCounter(h3, 60), 200);
        }
      }
      
      // Unobserve after animation triggers once
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-detail, .achievement-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Add active state to contact links
document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Track download button clicks
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function(e) {
    // Add a small animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
}

// Add scroll progress indicator
const createScrollIndicator = () => {
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    width: 0%;
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(indicator);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    indicator.style.width = scrolled + '%';
  });
};

createScrollIndicator();

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'font-size: 16px; color: #2563eb; font-weight: bold;');
console.log('%cFeel free to reach out if you have any questions.', 'font-size: 14px; color: #6b7280;');