const mongoose = require('mongoose');
const logger = require('../middleware/logger');
require('./Admin');
require('./PendingAdmin');
require('./FormField');
require('./FormText');
require('./Application');

// Create indexes for better performance
const createIndexes = async () => {
  try {
    // Admin indexes
    await mongoose.model('Admin').createIndexes({
      username: 1
    }, { unique: true });

    await mongoose.model('Admin').createIndexes({
      createdAt: -1
    });

    // PendingAdmin indexes
    await mongoose.model('PendingAdmin').createIndexes({
      username: 1
    }, { unique: true });

    await mongoose.model('PendingAdmin').createIndexes({
      approvalToken: 1
    }, { unique: true });

    await mongoose.model('PendingAdmin').createIndexes({
      createdAt: -1
    });

    // FormField indexes
    await mongoose.model('FormField').createIndexes({
      order: 1
    });

    await mongoose.model('FormField').createIndexes({
      type: 1
    });

    // FormText indexes
    await mongoose.model('FormText').createIndexes({
      order: 1
    });

    // Application indexes
    await mongoose.model('Application').createIndexes({
      createdAt: -1
    });

    await mongoose.model('Application').createIndexes({
      'answers.field': 1
    });

    await mongoose.model('Application').createIndexes({
      'answers.selectedOption': 1
    });

    logger.logger.info('Database indexes created successfully');
  } catch (error) {
    logger.logger.error('Error creating database indexes:', error);
  }
};

// Database connection monitoring
const setupDatabaseMonitoring = () => {
  const db = mongoose.connection;

  db.on('connected', () => {
    logger.logger.info('MongoDB connected successfully');
  });

  db.on('error', (err) => {
    logger.logger.error('MongoDB connection error:', err);
  });

  db.on('disconnected', () => {
    logger.logger.warn('MongoDB disconnected');
  });

  // Monitor slow queries
  mongoose.set('debug', process.env.NODE_ENV === 'development');
};

// Database health check
const checkDatabaseHealth = async () => {
  try {
    const db = mongoose.connection;
    
    if (db.readyState !== 1) {
      return {
        status: 'error',
        message: 'Database not connected',
        readyState: db.readyState
      };
    }

    // Test query
    const startTime = Date.now();
    await mongoose.model('Admin').countDocuments();
    const queryTime = Date.now() - startTime;

    return {
      status: 'healthy',
      message: 'Database is healthy',
      queryTime: `${queryTime}ms`,
      readyState: db.readyState
    };
  } catch (error) {
    logger.logger.error('Database health check failed:', error);
    return {
      status: 'error',
      message: 'Database health check failed',
      error: error.message
    };
  }
};

// Database backup simulation (for production, use proper backup tools)
const simulateBackup = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const backupInfo = {
      timestamp: new Date(),
      collections: collections.map(col => col.name),
      status: 'simulated'
    };

    logger.logger.info('Database backup simulation completed', backupInfo);
    return backupInfo;
  } catch (error) {
    logger.logger.error('Database backup simulation failed:', error);
    throw error;
  }
};

// Query optimization helpers
const optimizeQueries = {
  // Pagination helper
  paginate: (query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return query.skip(skip).limit(limit);
  },

  // Select specific fields
  selectFields: (fields) => {
    return fields.join(' ');
  },

  // Populate with specific fields
  populateFields: (path, select) => {
    return { path, select };
  },

  // Sort helper
  sortBy: (field, order = 'asc') => {
    const sortOrder = order === 'desc' ? -1 : 1;
    return { [field]: sortOrder };
  }
};

// Database statistics
const getDatabaseStats = async () => {
  try {
    const stats = await mongoose.connection.db.stats();
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    const collectionStats = await Promise.all(
      collections.map(async (col) => {
        const count = await mongoose.connection.db.collection(col.name).countDocuments();
        return {
          name: col.name,
          count
        };
      })
    );

    return {
      database: stats.db,
      collections: stats.collections,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize,
      collectionDetails: collectionStats
    };
  } catch (error) {
    logger.logger.error('Error getting database stats:', error);
    throw error;
  }
};

module.exports = {
  createIndexes,
  setupDatabaseMonitoring,
  checkDatabaseHealth,
  simulateBackup,
  optimizeQueries,
  getDatabaseStats
}; 