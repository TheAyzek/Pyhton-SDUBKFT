const express = require('express');
const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../middleware/errorHandler');
const { uploadMiddleware, singleUpload, validateFiles, handleFileUpload, handleFileDownload, cleanupFiles } = require('../services/upload');
const { monitoringService } = require('../services/monitoring');
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

// Upload multiple files (admin only)
router.post('/files', authMiddleware, uploadMiddleware, validateFiles, catchAsync(async (req, res) => {
  await handleFileUpload(req, res);
  
  // Record upload in monitoring
  if (req.files && req.files.length > 0) {
    monitoringService.recordUpload(req.files.length);
  }
}));

// Upload single file (admin only)
router.post('/file', authMiddleware, singleUpload, catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileInfo = {
    originalName: req.file.originalname,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype,
    uploadDate: new Date()
  };

  // Record upload in monitoring
  monitoringService.recordUpload(1);

  logger.logger.info('Single file uploaded', {
    filename: fileInfo.filename,
    admin: req.admin.username
  });

  res.json({
    message: 'File uploaded successfully',
    file: fileInfo
  });
}));

// Download file
router.get('/files/:filename', catchAsync(async (req, res) => {
  await handleFileDownload(req, res);
}));

// Get uploaded files list (admin only)
router.get('/files', authMiddleware, catchAsync(async (req, res) => {
  const fs = require('fs').promises;
  const path = require('path');
  
  try {
    const uploadDir = path.join(__dirname, '../uploads');
    const files = await fs.readdir(uploadDir);
    
    const fileInfos = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        const stats = await fs.stat(filePath);
        
        return {
          filename,
          size: stats.size,
          uploadDate: stats.birthtime,
          lastModified: stats.mtime
        };
      })
    );

    // Sort by upload date (newest first)
    fileInfos.sort((a, b) => b.uploadDate - a.uploadDate);

    res.json({
      files: fileInfos,
      total: fileInfos.length
    });
  } catch (error) {
    logger.logger.error('Error getting file list:', error);
    res.json({
      files: [],
      total: 0,
      error: 'Could not retrieve file list'
    });
  }
}));

// Delete file (admin only)
router.delete('/files/:filename', authMiddleware, catchAsync(async (req, res) => {
  const { filename } = req.params;
  const fs = require('fs').promises;
  const filePath = path.join(__dirname, '../uploads', filename);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    
    logger.logger.info('File deleted', {
      filename,
      admin: req.admin.username
    });

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AppError('File not found', 404);
    }
    throw error;
  }
}));

// Bulk delete files (admin only)
router.delete('/files', authMiddleware, catchAsync(async (req, res) => {
  const { filenames } = req.body;
  
  if (!Array.isArray(filenames) || filenames.length === 0) {
    throw new AppError('Filenames array is required', 400);
  }

  const fs = require('fs').promises;
  const deletedFiles = [];
  const failedFiles = [];

  for (const filename of filenames) {
    try {
      const filePath = path.join(__dirname, '../uploads', filename);
      await fs.access(filePath);
      await fs.unlink(filePath);
      deletedFiles.push(filename);
    } catch (error) {
      failedFiles.push({ filename, error: error.message });
    }
  }

  logger.logger.info('Bulk file deletion', {
    deleted: deletedFiles.length,
    failed: failedFiles.length,
    admin: req.admin.username
  });

  res.json({
    success: true,
    deletedFiles,
    failedFiles,
    message: `Deleted ${deletedFiles.length} files, ${failedFiles.length} failed`
  });
}));

// Get file info (admin only)
router.get('/files/:filename/info', authMiddleware, catchAsync(async (req, res) => {
  const { filename } = req.params;
  const fs = require('fs').promises;
  const filePath = path.join(__dirname, '../uploads', filename);

  try {
    const stats = await fs.stat(filePath);
    
    const fileInfo = {
      filename,
      size: stats.size,
      uploadDate: stats.birthtime,
      lastModified: stats.mtime,
      isDirectory: stats.isDirectory(),
      permissions: stats.mode.toString(8)
    };

    res.json(fileInfo);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AppError('File not found', 404);
    }
    throw error;
  }
}));

// Upload directory cleanup (admin only)
router.post('/cleanup', authMiddleware, catchAsync(async (req, res) => {
  const fs = require('fs').promises;
  const path = require('path');
  const uploadDir = path.join(__dirname, '../uploads');
  
  try {
    const files = await fs.readdir(uploadDir);
    const filePaths = files.map(filename => path.join(uploadDir, filename));
    
    await cleanupFiles(filePaths);
    
    logger.logger.info('Upload directory cleaned', {
      filesDeleted: files.length,
      admin: req.admin.username
    });

    res.json({
      success: true,
      message: `Cleaned up ${files.length} files`,
      filesDeleted: files.length
    });
  } catch (error) {
    logger.logger.error('Cleanup error:', error);
    throw error;
  }
}));

// Get upload statistics (admin only)
router.get('/stats', authMiddleware, catchAsync(async (req, res) => {
  const fs = require('fs').promises;
  const path = require('path');
  const uploadDir = path.join(__dirname, '../uploads');
  
  try {
    const files = await fs.readdir(uploadDir);
    let totalSize = 0;
    const fileTypes = {};
    
    for (const filename of files) {
      const filePath = path.join(uploadDir, filename);
      const stats = await fs.stat(filePath);
      totalSize += stats.size;
      
      const ext = path.extname(filename).toLowerCase();
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;
    }

    const stats = {
      totalFiles: files.length,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      fileTypes,
      timestamp: new Date()
    };

    res.json(stats);
  } catch (error) {
    logger.logger.error('Error getting upload stats:', error);
    res.json({
      totalFiles: 0,
      totalSize: '0MB',
      fileTypes: {},
      error: 'Could not retrieve statistics'
    });
  }
}));

module.exports = router; 