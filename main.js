const baseUrl = window.location.origin;

function initVariantRoute() {
  if (window.location.pathname === '/urban' || window.location.pathname.startsWith('/urban/')) {
    document.body.classList.add('variant-urban');
    document.querySelectorAll('.main-nav a').forEach((link) => {
      const path = new URL(link.href).pathname;
      const mapping = {
        '/': '/urban',
        '/about': '/urban/about',
        '/services': '/urban/services',
        '/objects': '/urban/objects',
        '/contacts': '/urban/contacts',
        '/admin': '/urban/admin'
      };
      if (mapping[path]) link.href = mapping[path];
    });
  }
}

function initDynamicHeader() {
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('.main-nav');
  const navWrap = header?.querySelector('.nav-wrap');
  if (!header || !nav || !navWrap) return;

  const menuButton = document.createElement('button');
  menuButton.className = 'nav-menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Открыть меню');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '<span></span><span></span><span></span>';

  const headerAction = document.createElement('a');
  headerAction.className = 'header-action';
  headerAction.href = document.body.classList.contains('variant-urban') ? '/urban/contacts' : '/contacts';
  headerAction.textContent = 'Обсудить задачу';

  navWrap.append(menuButton, headerAction);

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('a').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }

    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Открыть меню');
    });
  });

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    header.classList.toggle('is-scrolled', currentScrollY > 12);
    if (currentScrollY > lastScrollY && currentScrollY > 180) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.section-heading, .info-grid .card, .service-card, .object-card, .advantage, .gallery-item, .contact-strip-inner, .map-block');
  if (!revealItems.length || !('IntersectionObserver' in window)) return;

  revealItems.forEach((element, index) => {
    element.classList.add('reveal-item');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((element) => observer.observe(element));
}

async function fetchContent() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) throw new Error('Not found');
    return await res.json();
  } catch (error) {
    return window.__staticContent || null;
  }
}

function renderServices(services) {
  const container = document.getElementById('servicesGrid') || document.getElementById('servicesPageGrid');
  if (!container || !Array.isArray(services)) return;
  container.innerHTML = services.map(service => `
    <article class="service-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `).join('');
}

function renderObjects(objects) {
  const homeGrid = document.getElementById('objectGrid');
  const pageGrid = document.getElementById('objectsPageGrid');
  const target = homeGrid || pageGrid;
  if (!target || !Array.isArray(objects)) return;
  target.innerHTML = objects.map(obj => `
    <article class="object-card">
      <img src="${obj.image}" alt="${obj.name}" loading="lazy" />
      <div class="object-card-content">
        <h3>${obj.name}</h3>
        <p><strong>${obj.address}</strong></p>
        <p>${obj.description}</p>
      </div>
    </article>
  `).join('');
}

function renderAdvantages(items) {
  const container = document.getElementById('advantagesList');
  if (!container || !Array.isArray(items)) return;
  container.innerHTML = items.map(item => `<div class="advantage">${item}</div>`).join('');
}

function renderContacts(contacts) {
  if (!contacts) return;
  document.querySelectorAll('[data-contact-phone]').forEach((element) => {
    element.textContent = contacts.phone || '';
    if (element.tagName === 'A') element.href = `tel:${(contacts.phone || '').replace(/[^+\d]/g, '')}`;
  });
  document.querySelectorAll('[data-contact-email]').forEach((element) => {
    element.textContent = contacts.email || '';
    if (element.tagName === 'A') element.href = `mailto:${contacts.email || ''}`;
  });
  document.querySelectorAll('[data-contact-address]').forEach((element) => { element.textContent = contacts.officeAddress || ''; });
  document.querySelectorAll('[data-contact-hours]').forEach((element) => { element.textContent = contacts.workHours || ''; });
}

function renderGallery(images) {
  const container = document.getElementById('galleryGrid');
  if (!container || !Array.isArray(images)) return;
  container.innerHTML = images.map((item, i) => `
    <figure class="gallery-item" data-index="${i}">
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
    </figure>
  `).join('');

  container.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(item.dataset.index));
  });
}

function openLightbox(index) {
  const images = (window.__siteData?.gallery || []);
  if (!images.length) return;

  const modal = document.createElement('div');
  modal.className = 'modal is-open';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn" aria-label="Закрыть">×</button>
      <img src="${images[index].src}" alt="${images[index].alt}" />
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.remove();
  });
}

function renderAdminEditor(data) {
  const editor = document.getElementById('contentEditor');
  if (!editor) return;
  editor.value = JSON.stringify(data, null, 2);
}

async function saveContent() {
  const editor = document.getElementById('contentEditor');
  const status = document.getElementById('adminStatus');
  if (!editor) return;

  try {
    const parsed = JSON.parse(editor.value);
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed)
    });

    const result = await res.json();
    status.textContent = result.message || 'Сохранено';
    status.style.color = res.ok ? '#0f4c81' : '#b42318';
  } catch (error) {
    status.textContent = 'Ошибка: проверьте корректность JSON';
    status.style.color = '#b42318';
  }
}

async function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = document.getElementById('formStatus');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    status.textContent = 'Отправка...';
    status.style.color = '#0f4c81';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      status.textContent = result.message || 'Сообщение отправлено';
      status.style.color = result.success ? '#0f4c81' : '#b42318';
      if (result.success) form.reset();
    } catch (error) {
      status.textContent = 'Не удалось отправить сообщение';
      status.style.color = '#b42318';
    }
  });
}

function renderMap(objects) {
  const mapEl = document.getElementById('map');
  if (!mapEl || !Array.isArray(objects)) return;

  const coords = {
    'Борисовская, д. 1А': [55.839, 37.694],
    'Химки, Береговая 1А': [55.893, 37.428],
    'Химки, Береговая 1': [55.893, 37.428],
    'Химки, Береговая 8': [55.893, 37.428],
    'Химки, Береговая 6': [55.893, 37.428],
    'Химки, Береговая 4': [55.893, 37.428],
    'Химки, Береговая 5': [55.893, 37.428],
    'Преображенская площадь': [55.795, 37.706],
    'Большая Черкизовская, д. 1': [55.805, 37.736]
  };

  const mapPoints = objects.map((obj) => {
    const [lat, lon] = coords[obj.address] || [55.7558, 37.6173];
    return `${lon},${lat},pm2rdm`;
  }).join('~');
  const points = objects.map((obj) => `<li><strong>${obj.name}</strong><span>${obj.address}</span><a href="https://yandex.ru/maps/?text=${encodeURIComponent(obj.address)}" target="_blank" rel="noopener">Открыть маршрут</a></li>`).join('');

  const html = `
    <div class="map-widget">
      <iframe title="Карта объектов ООО Константа" loading="lazy" src="https://yandex.ru/map-widget/v1/?ll=37.6173%2C55.7558&z=10&pt=${encodeURIComponent(mapPoints)}"></iframe>
      <aside class="map-addresses"><h3>Объекты на карте</h3><ul>${points}</ul></aside>
    </div>
  `;
  mapEl.innerHTML = html;
}

function initThemeSwitcher() {
  if (!document.querySelector('[data-theme]')) return;

  const current = localStorage.getItem('konstanta-theme') || 'premium';
  document.body.classList.add(`theme-${current}`);

  document.querySelectorAll('[data-theme]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = button.dataset.theme;
      document.body.classList.remove('theme-premium', 'theme-tech', 'theme-urban');
      document.body.classList.add(`theme-${next}`);
      localStorage.setItem('konstanta-theme', next);
    });
  });
}

async function boot() {
  initVariantRoute();
  initDynamicHeader();
  initRevealAnimations();
  const content = await fetchContent();
  const data = content || {
    services: [],
    objects: [],
    advantages: [],
    gallery: [],
    contacts: {}
  };
  window.__siteData = data;

  renderServices(data.services);
  renderObjects(data.objects);
  renderAdvantages(data.advantages);
  renderGallery(data.gallery);
  renderContacts(data.contacts);
  renderMap(data.objects);

  if (document.getElementById('contentEditor')) {
    renderAdminEditor(data);
    document.getElementById('saveContentBtn')?.addEventListener('click', saveContent);
  }

  initThemeSwitcher();
  initContactForm();
}

window.addEventListener('DOMContentLoaded', boot);
