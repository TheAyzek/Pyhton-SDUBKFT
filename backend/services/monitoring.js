const logger = require('../middleware/logger');
const { CacheService } = require('./cache');

class MonitoringService {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      applications: 0,
      logins: 0,
      uploads: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    this.startTime = Date.now();
    this.cacheService = new CacheService();
  }

  // Increment metric
  incrementMetric(metric, value = 1) {
    if (this.metrics[metric] !== undefined) {
      this.metrics[metric] += value;
    }
  }

  // Record request
  recordRequest(req, res, duration) {
    this.incrementMetric('requests');
    
    const requestData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    };

    if (res.statusCode >= 400) {
      this.incrementMetric('errors');
    }

    logger.logger.debug('Request recorded', requestData);
  }

  // Record application submission
  recordApplication(application) {
    this.incrementMetric('applications');
    logger.logger.info('Application recorded', {
      id: application._id,
      timestamp: new Date()
    });
  }

  // Record login attempt
  recordLogin(success, username) {
    this.incrementMetric('logins');
    logger.logger.info('Login recorded', {
      success,
      username,
      timestamp: new Date()
    });
  }

  // Record file upload
  recordUpload(fileCount) {
    this.incrementMetric('uploads', fileCount);
    logger.logger.info('Upload recorded', {
      fileCount,
      timestamp: new Date()
    });
  }

  // Record cache hit/miss
  recordCacheHit() {
    this.incrementMetric('cacheHits');
  }

  recordCacheMiss() {
    this.incrementMetric('cacheMisses');
  }

  // Get system metrics
  getMetrics() {
    const uptime = Date.now() - this.startTime;
    const cacheHitRate = this.metrics.requests > 0 
      ? (this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) * 100).toFixed(2)
      : 0;

    return {
      ...this.metrics,
      uptime: `${Math.floor(uptime / 1000)}s`,
      cacheHitRate: `${cacheHitRate}%`,
      timestamp: new Date()
    };
  }

  // Get performance metrics
  async getPerformanceMetrics() {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    return {
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
      },
      cpu: {
        user: `${Math.round(cpuUsage.user / 1000)}ms`,
        system: `${Math.round(cpuUsage.system / 1000)}ms`
      },
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date()
    };
  }

  // Get application statistics
  async getApplicationStats() {
    try {
      const Application = require('../models/Application');
      const FormField = require('../models/FormField');
      const Admin = require('../models/Admin');

      const [
        totalApplications,
        todayApplications,
        totalFields,
        totalAdmins
      ] = await Promise.all([
        Application.countDocuments(),
        Application.countDocuments({
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }),
        FormField.countDocuments(),
        Admin.countDocuments()
      ]);

      return {
        totalApplications,
        todayApplications,
        totalFields,
        totalAdmins,
        timestamp: new Date()
      };
    } catch (error) {
      logger.logger.error('Error getting application stats:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    const checks = {
      database: false,
      cache: false,
      memory: true,
      uptime: true
    };

    try {
      // Database check
      const mongoose = require('mongoose');
      checks.database = mongoose.connection.readyState === 1;

      // Cache check
      checks.cache = this.cacheService.isConnected;

      // Memory check
      const memoryUsage = process.memoryUsage();
      checks.memory = memoryUsage.heapUsed < 500 * 1024 * 1024; // Less than 500MB

      const overallHealth = Object.values(checks).every(check => check);

      return {
        status: overallHealth ? 'healthy' : 'unhealthy',
        checks,
        timestamp: new Date()
      };
    } catch (error) {
      logger.logger.error('Health check failed:', error);
      return {
        status: 'error',
        error: error.message,
        timestamp: new Date()
      };
    }
  }

  // Generate report
  async generateReport() {
    try {
      const [metrics, performance, stats, health] = await Promise.all([
        this.getMetrics(),
        this.getPerformanceMetrics(),
        this.getApplicationStats(),
        this.healthCheck()
      ]);

      return {
        metrics,
        performance,
        stats,
        health,
        generatedAt: new Date()
      };
    } catch (error) {
      logger.logger.error('Error generating report:', error);
      throw error;
    }
  }

  // Reset metrics (for testing or daily reset)
  resetMetrics() {
    this.metrics = {
      requests: 0,
      errors: 0,
      applications: 0,
      logins: 0,
      uploads: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    this.startTime = Date.now();
    logger.logger.info('Metrics reset');
  }
}

// Create singleton instance
const monitoringService = new MonitoringService();

// Middleware to record requests
const monitoringMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    monitoringService.recordRequest(req, res, duration);
  });

  next();
};

module.exports = {
  monitoringService,
  monitoringMiddleware
}; 