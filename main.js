const baseUrl = window.location.origin;

window.__staticContent = {
  companyName: 'ООО «Константа»',
  tagline: 'Управляющая компания для комфортного и безопасного проживания',
  yearsOnMarket: 14,
  groupCompanies: ['ООО «Бизнес плюс»', 'ООО «Респектабельность К»'],
  services: [
    {
      title: 'Управление многоквартирными домами (МКД)',
      description: 'Комплексное управление жилищным фондом: содержание, текущий ремонт, взаимодействие с собственниками и контроль качества выполняемых работ.'
    },
    {
      title: 'Техническая эксплуатация зданий и сооружений',
      description: 'Плановый осмотр, техническое сопровождение, поддержание исправного состояния инженерных систем и соблюдение нормативных требований.'
    },
    {
      title: 'Электротехнические работы',
      description: 'Диагностика, замена и обслуживание электросетей, освещения, распределительных устройств и систем безопасности.'
    },
    {
      title: 'Сантехническое обслуживание и отопление',
      description: 'Ремонт и профилактика водоснабжения, канализации, отопления, санитарного оборудования и внутренних сетей здания.'
    },
    {
      title: 'Аварийно-диспетчерская служба 24/7',
      description: 'Оперативное реагирование на обращения, координация аварийных бригад и контроль сроков устранения неисправностей.'
    },
    {
      title: 'Благоустройство придомовой территории',
      description: 'Уход за общедомовой территорией, санитарное содержание, поддержание порядка и внешнего состояния прилегающей инфраструктуры.'
    }
  ],
  objects: [
    {
      name: 'Борисовская, д. 1А',
      address: 'Борисовская, д. 1А',
      description: 'Жилой дом с регулярным обслуживанием, контролем состояния общего имущества и организацией текущего ремонта по графику.',
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Химки, Береговая 1А',
      address: 'Химки, Береговая 1А',
      description: 'Комфортное содержание жилого комплекса, эксплуатация инженерных систем и поддержание надлежащего состояния общего имущества.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Жилой квартал на Береговой',
      address: 'Химки, Береговая 1, 8, 6, 4, 5',
      description: 'Комплексное обслуживание жилого квартала с контролем дворовых территорий, инженерных систем и взаимодействием с собственниками.',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Преображенская площадь',
      address: 'Преображенская площадь',
      description: 'Объект общественного назначения с проведением регулярных осмотров, управлением техническим состоянием и поддержанием порядка.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Большая Черкизовская, д. 1',
      address: 'Большая Черкизовская, д. 1',
      description: 'МКД с плановым обслуживанием, ремонтом инженерного оборудования и постоянным контролем качества выполнения работ.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    }
  ],
  advantages: [
    '14 лет опыта в управлении жилыми и коммерческими объектами',
    'Прозрачная коммуникация с собственниками и подрядчиками',
    'Комплексный подход к содержанию и эксплуатации помещений',
    'Постоянный контроль качества и сроков выполнения работ'
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80', alt: 'Фасад жилого дома' },
    { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', alt: 'Подъезд и холл многоквартирного дома' },
    { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', alt: 'Жилой дом и прилегающая территория' },
    { src: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80', alt: 'Обслуживание инженерных систем' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80', alt: 'Работа электрика и техническое обслуживание' },
    { src: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80', alt: 'Плановые работы по содержанию дома' }
  ],
  news: [
    {
      date: '10.09.2026',
      title: 'Подготовка к отопительному сезону',
      text: 'Завершена проверка узлов учета и промывка внутренних систем отопления.'
    }
  ],
  contacts: {
    phone: '+7 (495) 000-00-00',
    email: 'info@konstanta.ru',
    officeAddress: 'Москва, ул. Московская, д. 12, офис 401',
    workHours: 'Пн–Пт: 09:00–18:00'
  }
};

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

  navWrap.append(menuButton);

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
      status.textContent = 'Сообщение принято к отправке (демо-режим).';
      status.style.color = '#1e40af';
      form.reset();
    }
  });
}

function renderMap(objects) {
  const mapEl = document.getElementById('map');
  if (!mapEl || !Array.isArray(objects)) return;

  const markers = [
    [37.666, 55.859, 'Борисовская, д. 1А'],
    [37.469, 55.898, 'Химки, Береговая 1А'],
    [37.443, 55.893, 'Жилой квартал на Береговой'],
    [37.714, 55.791, 'Преображенская площадь'],
    [37.737, 55.814, 'Большая Черкизовская, д. 1']
  ];

  const pt = markers.map(([lng, lat]) => `${lng},${lat},pm2rdm`).join('~');
  const mapFrame = `https://yandex.ru/map-widget/v1/?ll=37.62,55.84&z=10&pt=${pt}`;
  const points = objects.map((obj) => `
    <li class="map-address-item">
      <div class="map-address-head">
        <span class="map-pin" aria-hidden="true">📍</span>
        <div class="map-address-copy">
          <strong>${obj.name}</strong>
          <span>${obj.address}</span>
        </div>
      </div>
      <a class="route-link" href="https://yandex.ru/maps/?text=${encodeURIComponent(obj.address)}" target="_blank" rel="noopener">Маршрут <span aria-hidden="true">→</span></a>
    </li>
  `).join('');

  mapEl.innerHTML = `
    <div class="map-canvas">
      <iframe title="Карта объектов ООО Константа" loading="lazy" src="${mapFrame}" referrerpolicy="unsafe-url" allowfullscreen></iframe>
    </div>
    <aside class="map-addresses">
      <h3>Объекты на карте</h3>
      <ul>${points}</ul>
    </aside>
  `;
}

async function boot() {
  initDynamicHeader();
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

  initContactForm();
}

window.addEventListener('DOMContentLoaded', boot);
