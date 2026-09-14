const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('serviceSelect');
    if (select) select.value = link.dataset.service;
  });
});

const leadForm = document.getElementById('leadForm');
leadForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(leadForm);
  const lines = [
    'Hello ECD Centre Solutions, I would like to request a consultation.',
    '',
    `Name: ${data.get('name')}`,
    `Centre: ${data.get('centre') || 'Not provided'}`,
    `Town/City: ${data.get('location')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Service: ${data.get('service')}`,
    `Message: ${data.get('message') || 'I would like to discuss how you can help my centre.'}`
  ];
  const url = `https://wa.me/263788202359?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.getElementById('year').textContent = new Date().getFullYear();
