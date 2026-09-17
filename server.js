const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');
const publicDir = __dirname;

const defaultContent = {
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

function readContent() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    const dir = path.dirname(DATA_FILE);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultContent, null, 2), 'utf8');
    return defaultContent;
  }
}

function writeContent(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(publicDir, 'contacts.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin.html'));
});

app.get('/api/content', (req, res) => {
  const content = readContent();
  res.json(content);
});

app.post('/api/content', (req, res) => {
  const incoming = req.body || {};
  const current = readContent();
  const merged = {
    ...current,
    ...incoming,
    contacts: { ...current.contacts, ...(incoming.contacts || {}) },
    services: Array.isArray(incoming.services) ? incoming.services : current.services,
    objects: Array.isArray(incoming.objects) ? incoming.objects : current.objects,
    gallery: Array.isArray(incoming.gallery) ? incoming.gallery : current.gallery,
    advantages: Array.isArray(incoming.advantages) ? incoming.advantages : current.advantages,
    groupCompanies: Array.isArray(incoming.groupCompanies) ? incoming.groupCompanies : current.groupCompanies
  };

  writeContent(merged);
  res.json({ success: true, message: 'Контент успешно обновлён.' });
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, subject, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ success: false, message: 'Пожалуйста, заполните обязательные поля.' });
  }

  const emailTo = process.env.EMAIL_TO || 'info@konstanta.ru';
  const mailBody = {
    from: `"${name}" <${email}>`,
    to: emailTo,
    subject: `Обращение с сайта: ${subject || 'Общий вопрос'}`,
    text: `Имя: ${name}\nТелефон: ${phone}\nE-mail: ${email}\nТема: ${subject || 'Общий вопрос'}\n\nСообщение:\n${message}`
  };

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.log('Email form submitted:', mailBody);
    return res.json({ success: true, message: 'Сообщение принято. Для реальной отправки настройте SMTP в .env.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user,
        pass
      }
    });

    await transporter.sendMail(mailBody);
    res.json({ success: true, message: 'Сообщение успешно отправлено.' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ success: false, message: 'Не удалось отправить сообщение. Попробуйте позже.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
