const nodemailer = require('nodemailer');
const logger = require('../middleware/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    try {
      if (process.env.MAIL_USER && process.env.MAIL_PASS) {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        });
        this.isConfigured = true;
        logger.logger.info('Email service configured successfully');
      } else {
        logger.logger.warn('Email service not configured - missing MAIL_USER or MAIL_PASS');
      }
    } catch (error) {
      logger.logger.error('Email service initialization error:', error);
      this.isConfigured = false;
    }
  }

  // Send email
  async sendEmail(options) {
    if (!this.isConfigured || !this.transporter) {
      logger.logger.warn('Email service not configured, skipping email send');
      return false;
    }

    try {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.logger.info('Email sent successfully', {
        to: options.to,
        subject: options.subject,
        messageId: result.messageId
      });
      return true;
    } catch (error) {
      logger.logger.error('Email send error:', error);
      return false;
    }
  }

  // Application notification
  async sendApplicationNotification(application) {
    const subject = 'Yeni FRP Başvurusu Alındı';
    const text = `
      Yeni bir FRP başvurusu alındı.
      
      Başvuru ID: ${application._id}
      Tarih: ${new Date(application.createdAt).toLocaleString('tr-TR')}
      
      Başvuru detayları için admin paneline giriş yapın.
    `;

    const html = `
      <h2>Yeni FRP Başvurusu Alındı</h2>
      <p><strong>Başvuru ID:</strong> ${application._id}</p>
      <p><strong>Tarih:</strong> ${new Date(application.createdAt).toLocaleString('tr-TR')}</p>
      <p>Başvuru detayları için admin paneline giriş yapın.</p>
    `;

    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
      subject,
      text,
      html
    });
  }

  // Admin approval notification
  async sendAdminApprovalNotification(pendingAdmin) {
    const subject = 'Admin Başvurunuz Onaylandı';
    const text = `
      Merhaba ${pendingAdmin.name},
      
      Admin başvurunuz onaylanmıştır. Artık sisteme giriş yapabilirsiniz.
      
      Kullanıcı adınız: ${pendingAdmin.username}
      
      İyi çalışmalar!
    `;

    const html = `
      <h2>Admin Başvurunuz Onaylandı</h2>
      <p>Merhaba <strong>${pendingAdmin.name}</strong>,</p>
      <p>Admin başvurunuz onaylanmıştır. Artık sisteme giriş yapabilirsiniz.</p>
      <p><strong>Kullanıcı adınız:</strong> ${pendingAdmin.username}</p>
      <p>İyi çalışmalar!</p>
    `;

    return this.sendEmail({
      to: process.env.MAIL_USER, // Pending admin email would be stored in the future
      subject,
      text,
      html
    });
  }

  // Password reset notification
  async sendPasswordResetNotification(admin, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const subject = 'Şifre Sıfırlama Talebi';
    const text = `
      Merhaba ${admin.username},
      
      Şifre sıfırlama talebinde bulundunuz. Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:
      
      ${resetUrl}
      
      Bu link 1 saat geçerlidir.
      
      Eğer bu talebi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.
    `;

    const html = `
      <h2>Şifre Sıfırlama Talebi</h2>
      <p>Merhaba <strong>${admin.username}</strong>,</p>
      <p>Şifre sıfırlama talebinde bulundunuz. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
      <p><a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Şifremi Sıfırla</a></p>
      <p>Bu link 1 saat geçerlidir.</p>
      <p>Eğer bu talebi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
    `;

    return this.sendEmail({
      to: process.env.MAIL_USER, // Admin email would be stored in the future
      subject,
      text,
      html
    });
  }

  // System notification
  async sendSystemNotification(subject, message) {
    const text = `
      Sistem Bildirimi
      
      ${message}
      
      Bu otomatik bir bildirimdir.
    `;

    const html = `
      <h2>Sistem Bildirimi</h2>
      <p>${message}</p>
      <p><em>Bu otomatik bir bildirimdir.</em></p>
    `;

    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
      subject,
      text,
      html
    });
  }

  // Welcome email
  async sendWelcomeEmail(admin) {
    const subject = 'SDU BKFT Sistemine Hoş Geldiniz';
    const text = `
      Merhaba ${admin.username},
      
      SDU BKFT admin sistemine hoş geldiniz!
      
      Sistem özellikleri:
      - Form yönetimi
      - Başvuru görüntüleme
      - Müzik widget kontrolü
      - Sistem ayarları
      
      İyi çalışmalar!
    `;

    const html = `
      <h2>SDU BKFT Sistemine Hoş Geldiniz</h2>
      <p>Merhaba <strong>${admin.username}</strong>,</p>
      <p>SDU BKFT admin sistemine hoş geldiniz!</p>
      <h3>Sistem özellikleri:</h3>
      <ul>
        <li>Form yönetimi</li>
        <li>Başvuru görüntüleme</li>
        <li>Müzik widget kontrolü</li>
        <li>Sistem ayarları</li>
      </ul>
      <p>İyi çalışmalar!</p>
    `;

    return this.sendEmail({
      to: process.env.MAIL_USER, // Admin email would be stored in the future
      subject,
      text,
      html
    });
  }
}

// Create singleton instance
const emailService = new EmailService();

module.exports = emailService; 