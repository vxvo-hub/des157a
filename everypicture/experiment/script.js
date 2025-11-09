(function() {
  'use strict';
  console.log('reading js');

  const images = document.querySelectorAll('#scroll-container img');
  const container = document.querySelector('#scroll-container');

  const observer = new IntersectionObserver(callback, {
    threshold: 0.5,
    root: container
  });

  images.forEach(img => observer.observe(img));

  function callback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }
})();