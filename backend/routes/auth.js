const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const PendingAdmin = require('../models/PendingAdmin');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const router = express.Router();

// Nodemailer ayarları (gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // ör: sdubkft@gmail.com
    pass: process.env.MAIL_PASS  // uygulama şifresi
  }
});

// Admin kaydı (ilk kurulum için, sonra kapatılabilir)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Bu kullanıcı zaten var.' });
    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hash });
    await admin.save();
    res.json({ message: 'Admin oluşturuldu.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Admin kayıt isteği (kullanıcıdan)
router.post('/register-request', async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Bu kullanıcı zaten var.' });
    const existingPending = await PendingAdmin.findOne({ username });
    if (existingPending) return res.status(400).json({ message: 'Bu kullanıcı zaten başvuru yaptı.' });
    const hash = await bcrypt.hash(password, 10);
    const approvalToken = crypto.randomBytes(32).toString('hex');
    const pending = new PendingAdmin({ name, username, password: hash, approvalToken });
    await pending.save();
    // Mail gönder
    const approveUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/auth/approve/${approvalToken}`;
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: 'Yeni Admin Üyelik Başvurusu',
      text: `Yeni bir admin başvurusu var:\nAdı: ${name}\nKullanıcı adı: ${username}\nOnaylamak için: ${approveUrl}`
    });
    res.json({ message: 'Başvuru alındı. Onay bekleniyor.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Admin başvurusunu onayla (mail linki)
router.get('/approve/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const pending = await PendingAdmin.findOne({ approvalToken: token, approved: false });
    if (!pending) return res.status(400).send('Geçersiz veya onaylanmış başvuru.');
    // Admin olarak ekle
    const admin = new Admin({ username: pending.username, password: pending.password });
    await admin.save();
    pending.approved = true;
    await pending.save();
    res.send('Üyelik başarıyla onaylandı! Artık giriş yapabilirsiniz.');
  } catch (err) {
    res.status(500).send('Sunucu hatası.');
  }
});

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("[LOGIN] Giriş denemesi:", { username, password: password ? password : "<boş>" });
  try {
    // Önce normal admin kontrolü
    const admin = await Admin.findOne({ username });
    console.log("[LOGIN] Admin bulundu mu?", admin ? "EVET" : "HAYIR");
    if (admin) {
      console.log("[LOGIN] Admin DB kaydı:", admin);
      // Şifresiz admin kontrolü
      if (admin.noPassword && !password) {
        console.log("[LOGIN] Şifresiz giriş başarılı (noPassword flag)");
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return res.json({ token, username: admin.username });
      }
      // Normal şifre kontrolü
      if (admin.password) {
        console.log("[LOGIN] Hash DB:", admin.password);
        console.log("[LOGIN] Girilen şifre:", password);
        const valid = await bcrypt.compare(password, admin.password);
        console.log("[LOGIN] Şifre doğru mu?", valid);
        if (valid) {
          const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '2h' });
          return res.json({ token, username: admin.username });
        }
      }
    }
    // Admin bulunamadıysa, pending admin kontrolü
    const pendingAdmin = await PendingAdmin.findOne({ username });
    console.log("[LOGIN] Pending admin bulundu mu?", pendingAdmin ? "EVET" : "HAYIR");
    if (pendingAdmin) {
      console.log("[LOGIN] Pending DB kaydı:", pendingAdmin);
      const valid = await bcrypt.compare(password, pendingAdmin.password);
      console.log("[LOGIN] Pending şifre doğru mu?", valid);
      if (valid) {
        return res.status(401).json({ 
          message: 'Henüz üyeliğiniz onaylanmamıştır. Lütfen onay mailini bekleyin.',
          pending: true 
        });
      }
    }
    // Hiçbir kullanıcı bulunamadı
    console.log("[LOGIN] Kullanıcı bulunamadı veya şifre yanlış.");
    res.status(400).json({ message: 'Kullanıcı bulunamadı veya şifre yanlış.' });
  } catch (err) {
    console.error("[LOGIN] Sunucu hatası:", err);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router; 