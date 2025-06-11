const express = require('express');
const FormField = require('../models/FormField');
const FormText = require('../models/FormText');
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');
const { validateFormField, validateApplication } = require('../middleware/validation');

const router = express.Router();

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Yetkisiz' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
}

// Form metinlerini getir
router.get('/texts', async (req, res) => {
  const texts = await FormText.find().sort('order');
  res.json(texts);
});

// Form metinlerinin son güncelleme zamanını getir
router.get('/texts/last-update', async (req, res) => {
  const lastText = await FormText.findOne().sort({ updatedAt: -1 });
  const lastField = await FormField.findOne().sort({ updatedAt: -1 });
  
  const textUpdate = lastText ? lastText.updatedAt : null;
  const fieldUpdate = lastField ? lastField.updatedAt : null;
  
  const lastUpdate = textUpdate && fieldUpdate 
    ? Math.max(textUpdate, fieldUpdate)
    : textUpdate || fieldUpdate;
    
  res.json({ lastUpdate });
});

// Form metni ekle
router.post('/texts', authMiddleware, async (req, res) => {
  const { title, content, order } = req.body;
  const text = new FormText({ title, content, order });
  await text.save();
  res.json(text);
});

// Form metni güncelle
router.put('/texts/:id', authMiddleware, async (req, res) => {
  const { title, content, order } = req.body;
  const text = await FormText.findByIdAndUpdate(
    req.params.id,
    { title, content, order, updatedAt: Date.now() },
    { new: true }
  );
  res.json(text);
});

// Form metni sil
router.delete('/texts/:id', authMiddleware, async (req, res) => {
  await FormText.findByIdAndDelete(req.params.id);
  res.json({ message: 'Silindi' });
});

// Form sorularını getir (dolu seçenekleri gizle)
router.get('/fields', async (req, res) => {
  const fields = await FormField.find().sort('order');
  
  // Çoktan seçmeli sorular için dolu seçenekleri kontrol et
  const fieldsWithAvailability = await Promise.all(fields.map(async (field) => {
    if (field.type === 'select' && field.maxResponses && field.maxResponses.length > 0) {
      // Her seçenek için mevcut yanıt sayısını hesapla
      const responseCounts = await Promise.all(field.maxResponses.map(async (maxCount, index) => {
        const currentCount = await Application.countDocuments({
          'answers.field': field._id,
          'answers.selectedOption': index
        });
        return {
          option: field.options[index],
          maxCount: maxCount,
          currentCount: currentCount,
          available: currentCount < maxCount
        };
      }));
      
      // Sadece müsait seçenekleri göster
      const availableOptions = responseCounts
        .filter(item => item.available)
        .map(item => item.option);
      
      return {
        ...field.toObject(),
        options: availableOptions,
        responseCounts: responseCounts // Admin paneli için tam bilgi
      };
    }
    return field;
  }));
  
  res.json(fieldsWithAvailability);
});

// Admin için tam form bilgilerini getir (dolu seçenekler dahil)
router.get('/fields/admin', authMiddleware, async (req, res) => {
  const fields = await FormField.find().sort('order');
  
  // Admin için tüm seçenekleri ve yanıt sayılarını göster
  const fieldsWithCounts = await Promise.all(fields.map(async (field) => {
    if (field.type === 'select' && field.maxResponses && field.maxResponses.length > 0) {
      const responseCounts = await Promise.all(field.maxResponses.map(async (maxCount, index) => {
        const currentCount = await Application.countDocuments({
          'answers.field': field._id,
          'answers.selectedOption': index
        });
        return {
          option: field.options[index],
          maxCount: maxCount,
          currentCount: currentCount,
          available: currentCount < maxCount
        };
      }));
      
      return {
        ...field.toObject(),
        responseCounts: responseCounts
      };
    }
    return field;
  }));
  
  res.json(fieldsWithCounts);
});

// Soru ekle
router.post('/fields', authMiddleware, validateFormField, async (req, res) => {
  const { label, type, options, maxResponses, order } = req.body;
  const field = new FormField({ label, type, options, maxResponses, order });
  await field.save();
  res.json(field);
});

// Soru güncelle
router.put('/fields/:id', authMiddleware, validateFormField, async (req, res) => {
  const { label, type, options, maxResponses, order } = req.body;
  const field = await FormField.findByIdAndUpdate(
    req.params.id,
    { label, type, options, maxResponses, order },
    { new: true }
  );
  res.json(field);
});

// Soru sil
router.delete('/fields/:id', authMiddleware, async (req, res) => {
  await FormField.findByIdAndDelete(req.params.id);
  res.json({ message: 'Silindi' });
});

// Başvuru gönder
router.post('/application', validateApplication, async (req, res) => {
  const { answers } = req.body;
  
  try {
    // Zorunlu alan kontrolü
    const fields = await FormField.find();
    for (const field of fields) {
      if (field.required) {
        const answer = answers.find(a => a.field == field._id.toString());
        if (!answer || !answer.value || answer.value.trim() === "") {
          return res.status(400).json({ message: `Zorunlu alan: '${field.label}' doldurulmalıdır.` });
        }
      }
    }
    // Çoktan seçmeli sorular için seçenek kontrolü yap
    for (const answer of answers) {
      const field = await FormField.findById(answer.field);
      if (field && field.type === 'select' && answer.selectedOption !== undefined) {
        // Seçilen seçeneğin hala müsait olup olmadığını kontrol et
        const currentCount = await Application.countDocuments({
          'answers.field': field._id,
          'answers.selectedOption': answer.selectedOption
        });
        
        const maxCount = field.maxResponses[answer.selectedOption] || 0;
        if (currentCount >= maxCount && maxCount > 0) {
          return res.status(400).json({ 
            message: 'Seçtiğiniz seçenek artık dolu. Lütfen başka bir seçenek seçin.' 
          });
        }
      }
    }
    
    const app = new Application({ answers });
    await app.save();
    res.json({ message: 'Başvuru kaydedildi.' });
  } catch (err) {
    res.status(500).json({ message: 'Başvuru gönderilirken hata oluştu.' });
  }
});

// Tüm başvuruları getir
router.get('/applications', authMiddleware, async (req, res) => {
  const apps = await Application.find().populate('answers.field');
  res.json(apps);
});

// Tek başvuru sil
router.delete('/applications/:id', authMiddleware, async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }
    res.json({ message: 'Başvuru silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Başvuru silinirken hata oluştu' });
  }
});

// Tüm soruları temizle
router.delete('/fields/clear', authMiddleware, async (req, res) => {
  try {
    await FormField.deleteMany({});
    res.json({ message: 'Tüm sorular temizlendi' });
  } catch (err) {
    res.status(500).json({ message: 'Sorular temizlenirken hata oluştu' });
  }
});

// Tüm metinleri temizle
router.delete('/texts/clear', authMiddleware, async (req, res) => {
  try {
    await FormText.deleteMany({});
    res.json({ message: 'Tüm metinler temizlendi' });
  } catch (err) {
    res.status(500).json({ message: 'Metinler temizlenirken hata oluştu' });
  }
});

// Tüm başvuruları temizle
router.delete('/applications/clear', authMiddleware, async (req, res) => {
  try {
    await Application.deleteMany({});
    res.json({ message: 'Tüm başvurular temizlendi' });
  } catch (err) {
    res.status(500).json({ message: 'Başvurular temizlenirken hata oluştu' });
  }
});

module.exports = router; 