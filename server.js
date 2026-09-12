const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'content.json');
const publicDir = path.join(__dirname, 'public');

const defaultContent = {
  companyName: 'ООО «Константа»',
  tagline: 'Управляющая компания для комфортного и безопасного проживания',
  yearsOnMarket: 14,
  groupCompanies: ['ООО «Бизнес плюс»', 'ООО «Респектабельность К»'],
  services: [],
  objects: [],
  gallery: [],
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
  res.sendFile(path.join(publicDir, 'urban.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(publicDir, 'services.html'));
});

app.get('/objects', (req, res) => {
  res.sendFile(path.join(publicDir, 'objects.html'));
});

app.get('/contacts', (req, res) => {
  res.sendFile(path.join(publicDir, 'contacts.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin.html'));
});

app.get('/premium', (req, res) => {
  res.sendFile(path.join(publicDir, 'premium.html'));
});

app.get('/tech', (req, res) => {
  res.sendFile(path.join(publicDir, 'tech.html'));
});

app.get('/urban', (req, res) => {
  res.sendFile(path.join(publicDir, 'urban.html'));
});

app.get('/urban/about', (req, res) => {
  res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/urban/services', (req, res) => {
  res.sendFile(path.join(publicDir, 'services.html'));
});

app.get('/urban/objects', (req, res) => {
  res.sendFile(path.join(publicDir, 'objects.html'));
});

app.get('/urban/contacts', (req, res) => {
  res.sendFile(path.join(publicDir, 'contacts.html'));
});

app.get('/urban/admin', (req, res) => {
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
