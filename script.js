/* ==== JS PROTECT LAYER ==== */
(function(){
  const _lock = ['log','warn','info','error'];

  _lock.forEach(function(method){
    const original = console[method];
    console[method] = function(){
      return null;
    };
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.trust-card, .process-step, .package-card, .why-item');
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
});

document.head.insertAdjacentHTML('beforeend', `
  <style>
    .trust-card.visible,
    .process-step.visible,
    .package-card.visible,
    .why-item.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
// ==== JS PROTECT DEVTOOLS SOFT ====
setInterval(function () {
  if (
    window.outerWidth - window.innerWidth > 160 ||
    window.outerHeight - window.innerHeight > 160
  ) {
    document.body.classList.add('devtools');
  }
}, 1000);
// ==== DEVTOOLS OVERLAY ====
(function () {
  const el = document.getElementById('devtools-overlay');

  function check() {
    const open =
      window.outerWidth - window.innerWidth > 160 ||
      window.outerHeight - window.innerHeight > 160;

    if (open) {
      el.style.display = 'flex';
      document.body.style.userSelect = 'none';
    } else {
      el.style.display = 'none';
      document.body.style.userSelect = 'auto';
    }
  }

  setInterval(check, 1000);
})();
