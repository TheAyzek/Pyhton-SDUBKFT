const Redis = require('ioredis');
const logger = require('../middleware/logger');

class CacheService {
  constructor() {
    this.redis = null;
    this.isConnected = false;
    this.init();
  }

  async init() {
    try {
      if (process.env.REDIS_URL) {
        this.redis = new Redis(process.env.REDIS_URL);
      } else if (process.env.REDIS_HOST) {
        this.redis = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: process.env.REDIS_PORT || 6379,
          password: process.env.REDIS_PASSWORD,
          retryDelayOnFailover: 100,
          maxRetriesPerRequest: 3,
        });
      }

      if (this.redis) {
        this.redis.on('connect', () => {
          this.isConnected = true;
          logger.logger.info('Redis connected successfully');
        });

        this.redis.on('error', (err) => {
          this.isConnected = false;
          logger.logger.error('Redis connection error:', err);
        });

        this.redis.on('disconnect', () => {
          this.isConnected = false;
          logger.logger.warn('Redis disconnected');
        });
      }
    } catch (error) {
      logger.logger.error('Redis initialization error:', error);
      this.isConnected = false;
    }
  }

  // Set cache with TTL
  async set(key, value, ttl = 3600) {
    if (!this.isConnected || !this.redis) return false;
    
    try {
      const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
      await this.redis.setex(key, ttl, serializedValue);
      return true;
    } catch (error) {
      logger.logger.error('Cache set error:', error);
      return false;
    }
  }

  // Get cache
  async get(key) {
    if (!this.isConnected || !this.redis) return null;
    
    try {
      const value = await this.redis.get(key);
      if (!value) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      logger.logger.error('Cache get error:', error);
      return null;
    }
  }

  // Delete cache
  async del(key) {
    if (!this.isConnected || !this.redis) return false;
    
    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      logger.logger.error('Cache delete error:', error);
      return false;
    }
  }

  // Clear all cache
  async clear() {
    if (!this.isConnected || !this.redis) return false;
    
    try {
      await this.redis.flushall();
      return true;
    } catch (error) {
      logger.logger.error('Cache clear error:', error);
      return false;
    }
  }

  // Get cache keys by pattern
  async keys(pattern) {
    if (!this.isConnected || !this.redis) return [];
    
    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      logger.logger.error('Cache keys error:', error);
      return [];
    }
  }

  // Check if key exists
  async exists(key) {
    if (!this.isConnected || !this.redis) return false;
    
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.logger.error('Cache exists error:', error);
      return false;
    }
  }

  // Increment counter
  async incr(key, ttl = 3600) {
    if (!this.isConnected || !this.redis) return 0;
    
    try {
      const result = await this.redis.incr(key);
      await this.redis.expire(key, ttl);
      return result;
    } catch (error) {
      logger.logger.error('Cache increment error:', error);
      return 0;
    }
  }
}

// Cache middleware
const cacheMiddleware = (ttl = 300, keyGenerator = null) => {
  return async (req, res, next) => {
    const cacheService = new CacheService();
    
    if (!cacheService.isConnected) {
      return next();
    }

    const cacheKey = keyGenerator ? keyGenerator(req) : `api:${req.originalUrl}`;
    
    try {
      const cachedData = await cacheService.get(cacheKey);
      if (cachedData) {
        return res.json(cachedData);
      }
    } catch (error) {
      logger.logger.error('Cache middleware error:', error);
    }

    // Store original send method
    const originalSend = res.json;
    
    // Override send method to cache response
    res.json = function(data) {
      cacheService.set(cacheKey, data, ttl).catch(err => {
        logger.logger.error('Cache set error in middleware:', err);
      });
      return originalSend.call(this, data);
    };

    next();
  };
};

// Cache invalidation middleware
const invalidateCache = (patterns = []) => {
  return async (req, res, next) => {
    const cacheService = new CacheService();
    
    if (cacheService.isConnected) {
      try {
        for (const pattern of patterns) {
          const keys = await cacheService.keys(pattern);
          for (const key of keys) {
            await cacheService.del(key);
          }
        }
      } catch (error) {
        logger.logger.error('Cache invalidation error:', error);
      }
    }
    
    next();
  };
};

module.exports = {
  CacheService,
  cacheMiddleware,
  invalidateCache
}; 