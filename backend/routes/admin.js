const express = require('express');
const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../middleware/errorHandler');
const { validateAdminLogin } = require('../middleware/validation');
const { authLimiter } = require('../middleware/security');
const { monitoringService } = require('../services/monitoring');
const { getDatabaseStats, checkDatabaseHealth, simulateBackup } = require('../models/indexes');
const emailService = require('../services/email');
const logger = require('../middleware/logger');

const router = express.Router();

// Auth middleware
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz' });
  }
  
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
}

// Get system dashboard data
router.get('/dashboard', authMiddleware, catchAsync(async (req, res) => {
  const [metrics, performance, stats, health] = await Promise.all([
    monitoringService.getMetrics(),
    monitoringService.getPerformanceMetrics(),
    monitoringService.getApplicationStats(),
    monitoringService.healthCheck()
  ]);

  res.json({
    metrics,
    performance,
    stats,
    health
  });
}));

// Get system health
router.get('/health', catchAsync(async (req, res) => {
  const health = await monitoringService.healthCheck();
  res.json(health);
}));

// Get database statistics
router.get('/database/stats', authMiddleware, catchAsync(async (req, res) => {
  const stats = await getDatabaseStats();
  res.json(stats);
}));

// Get database health
router.get('/database/health', authMiddleware, catchAsync(async (req, res) => {
  const health = await checkDatabaseHealth();
  res.json(health);
}));

// Simulate database backup
router.post('/database/backup', authMiddleware, catchAsync(async (req, res) => {
  const backup = await simulateBackup();
  res.json(backup);
}));

// Get system logs (last 100 entries)
router.get('/logs', authMiddleware, catchAsync(async (req, res) => {
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const logPath = path.join(__dirname, '../logs/combined.log');
    const logContent = await fs.readFile(logPath, 'utf8');
    const lines = logContent.split('\n').filter(line => line.trim());
    const lastLines = lines.slice(-100);
    
    res.json({
      logs: lastLines,
      total: lines.length
    });
  } catch (error) {
    res.json({
      logs: [],
      total: 0,
      error: 'Logs not available'
    });
  }
}));

// Send system notification
router.post('/notifications/send', authMiddleware, catchAsync(async (req, res) => {
  const { subject, message } = req.body;
  
  if (!subject || !message) {
    throw new AppError('Subject and message are required', 400);
  }

  const success = await emailService.sendSystemNotification(subject, message);
  
  res.json({
    success,
    message: success ? 'Notification sent successfully' : 'Failed to send notification'
  });
}));

// Get cache statistics
router.get('/cache/stats', authMiddleware, catchAsync(async (req, res) => {
  const { CacheService } = require('../services/cache');
  const cacheService = new CacheService();
  
  if (!cacheService.isConnected) {
    return res.json({
      connected: false,
      message: 'Cache not connected'
    });
  }

  const keys = await cacheService.keys('*');
  const stats = {
    connected: true,
    totalKeys: keys.length,
    keys: keys.slice(0, 10), // Show first 10 keys
    timestamp: new Date()
  };

  res.json(stats);
}));

// Clear cache
router.post('/cache/clear', authMiddleware, catchAsync(async (req, res) => {
  const { CacheService } = require('../services/cache');
  const cacheService = new CacheService();
  
  if (!cacheService.isConnected) {
    return res.status(400).json({
      success: false,
      message: 'Cache not connected'
    });
  }

  const success = await cacheService.clear();
  
  res.json({
    success,
    message: success ? 'Cache cleared successfully' : 'Failed to clear cache'
  });
}));

// Reset monitoring metrics
router.post('/metrics/reset', authMiddleware, catchAsync(async (req, res) => {
  monitoringService.resetMetrics();
  
  res.json({
    success: true,
    message: 'Metrics reset successfully'
  });
}));

// Get admin activity log
router.get('/activity', authMiddleware, catchAsync(async (req, res) => {
  const Admin = require('../models/Admin');
  const Application = require('../models/Application');
  
  const [admins, recentApplications] = await Promise.all([
    Admin.find().select('username createdAt').sort('-createdAt').limit(10),
    Application.find().select('createdAt').sort('-createdAt').limit(10)
  ]);

  res.json({
    admins,
    recentApplications,
    timestamp: new Date()
  });
}));

// System configuration
router.get('/config', authMiddleware, catchAsync(async (req, res) => {
  const config = {
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    timestamp: new Date()
  };

  res.json(config);
}));

// Update system configuration
router.put('/config', authMiddleware, catchAsync(async (req, res) => {
  const { setting, value } = req.body;
  
  // In a real application, you would update configuration in database
  // For now, we'll just log the change
  logger.logger.info('Configuration update requested', {
    setting,
    value,
    admin: req.admin.username
  });

  res.json({
    success: true,
    message: 'Configuration updated successfully',
    setting,
    value
  });
}));

module.exports = router; 