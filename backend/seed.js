const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function seedAdmin() {
  try {
    console.log('Environment variables:');
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'NOT SET');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
    console.log('Current directory:', __dirname);
    console.log('Env file path:', path.join(__dirname, '.env'));
    
    // Vercel'de environment variables'ları kontrol et
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI environment variable is not set!');
      console.log('Please check your Vercel environment variables.');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB bağlantısı başarılı');
    
    // Mevcut admin hesaplarını kontrol et
    const existingAdmin = await Admin.findOne({ username: 'testadmin' });
    if (existingAdmin) {
      console.log('Test admin hesabı zaten mevcut: testadmin / test123');
      process.exit(0);
    }
    
    // Tüm admin hesaplarını sil
    await Admin.deleteMany({});
    console.log('Tüm admin hesapları silindi');
    
    // Yeni test admin oluştur
    const hashedPassword = await bcrypt.hash('test123', 10);
    const admin = new Admin({
      username: 'testadmin',
      password: hashedPassword
    });
    
    await admin.save();
    console.log('Test admin kullanıcısı oluşturuldu: testadmin / test123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed hatası:', error);
    process.exit(1);
  }
}

seedAdmin(); 