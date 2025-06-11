require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Import middleware and services
const { setupSecurity, apiLimiter, formLimiter } = require('./middleware/security');
const { requestLogger } = require('./middleware/logger');
const { globalErrorHandler, notFound } = require('./middleware/errorHandler');
const { monitoringMiddleware } = require('./services/monitoring');
const { createIndexes, setupDatabaseMonitoring } = require('./models/indexes');

const app = express();

// Setup security middleware
setupSecurity(app);

// Request logging
app.use(requestLogger);

// Monitoring middleware
app.use(monitoringMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test endpoint (her durumda çalışsın)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const { monitoringService } = require('./services/monitoring');
  const health = await monitoringService.healthCheck();
  res.json(health);
});

// Seed endpoint - Vercel'de admin hesabı oluşturmak için (MongoDB bağlantısından bağımsız)
app.post('/api/seed', async (req, res) => {
  try {
    // MongoDB bağlantısını kontrol et
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'MongoDB bağlantısı yok' });
    }
    
    const bcrypt = require('bcryptjs');
    const Admin = require('./models/Admin');
    
    // Mevcut admin hesaplarını kontrol et
    const existingAdmin = await Admin.findOne({ username: 'testadmin' });
    if (existingAdmin) {
      return res.json({ message: 'Test admin hesabı zaten mevcut', username: 'testadmin', password: 'test123' });
    }
    
    // Yeni test admin oluştur
    const hashedPassword = await bcrypt.hash('test123', 10);
    const admin = new Admin({
      username: 'testadmin',
      password: hashedPassword
    });
    
    await admin.save();
    res.json({ message: 'Test admin hesabı oluşturuldu', username: 'testadmin', password: 'test123' });
  } catch (error) {
    console.error('Seed hatası:', error);
    res.status(500).json({ error: 'Seed işlemi başarısız: ' + error.message });
  }
});

// MongoDB bağlantısı ve route'lar
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/frpdb?retryWrites=true&w=majority') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(async () => {
      console.log('MongoDB bağlantısı başarılı');
      
      // Setup database monitoring
      setupDatabaseMonitoring();
      
      // Create database indexes
      await createIndexes();
      
      // Admin routes (rate limiting'den tamamen muaf)
      const adminRouter = require('./routes/admin');
      app.use('/api/admin', adminRouter);
      
      // Auth routes (sadece login için rate limiting)
      const { authLimiter } = require('./middleware/security');
      app.use('/api/auth/login', authLimiter);
      const authRouter = require('./routes/auth');
      app.use('/api/auth', authRouter);
      
      // API rate limiting (admin ve auth hariç)
      app.use('/api', apiLimiter);
      
      // Form submission rate limiting
      app.use('/api/form/application', formLimiter);
      
      // Route'ları burada ekle
      const formRouter = require('./routes/form');
      app.use('/api/form', formRouter);

      // Spotify routes
      const spotifyRouter = require('./routes/spotify');
      app.use('/api/spotify', spotifyRouter);

      // File upload routes
      const uploadRouter = require('./routes/upload');
      app.use('/api/upload', uploadRouter);

      // 404 handler
      app.use(notFound);

      // Global error handler
      app.use(globalErrorHandler);

      // Sunucuyu burada başlat
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
      });
    })
    .catch((err) => {
      console.error('MongoDB bağlantı hatası:', err);
      process.exit(1);
    });
} else {
  console.log('MongoDB URI yapılandırılmamış, lütfen .env dosyanızı kontrol edin.');
  process.exit(1);
} 