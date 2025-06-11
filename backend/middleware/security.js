const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Rate limiting middleware
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100, message = 'Too many requests') => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Auth rate limiter (daha esnek)
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 dakika
  20, // 20 deneme (artırıldı)
  'Too many login attempts, please try again later'
);

// API rate limiter (daha esnek)
const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 dakika
  500, // 500 istek (artırıldı)
  'Too many API requests'
);

// Form submission limiter
const formLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 saat
  3, // 3 başvuru
  'Too many form submissions, please try again later'
);

// Security middleware setup
const setupSecurity = (app) => {
  // Basic security headers
  app.use(helmet());
  
  // Prevent NoSQL injection
  app.use(mongoSanitize());
  
  // Prevent XSS attacks
  app.use(xss());
  
  // Prevent HTTP Parameter Pollution
  app.use(hpp());
  
  // CORS configuration
  app.use((req, res, next) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:5002',
      'http://localhost:3000'
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
};

module.exports = {
  authLimiter,
  apiLimiter,
  formLimiter,
  setupSecurity
}; 