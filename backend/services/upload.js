const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const logger = require('../middleware/logger');

// Ensure upload directory exists
const ensureUploadDir = async (dir) => {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    await ensureUploadDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }

  if (file.size > maxSize) {
    return cb(new Error('File too large'), false);
  }

  cb(null, true);
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  }
});

// Upload middleware
const uploadMiddleware = upload.array('files', 5);

// Single file upload
const singleUpload = upload.single('file');

// File validation middleware
const validateFiles = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const validFiles = req.files.filter(file => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return allowedTypes.includes(file.mimetype);
  });

  if (validFiles.length === 0) {
    return res.status(400).json({ error: 'No valid files found' });
  }

  req.validFiles = validFiles;
  next();
};

// File cleanup service
const cleanupFiles = async (filePaths) => {
  try {
    for (const filePath of filePaths) {
      await fs.unlink(filePath);
      logger.logger.info(`File deleted: ${filePath}`);
    }
  } catch (error) {
    logger.logger.error('File cleanup error:', error);
  }
};

// Get file info
const getFileInfo = (file) => {
  return {
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
    uploadDate: new Date()
  };
};

// File upload route handler
const handleFileUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const fileInfos = req.files.map(getFileInfo);
    
    logger.logger.info('Files uploaded successfully', {
      count: fileInfos.length,
      files: fileInfos.map(f => f.originalName)
    });

    res.json({
      message: 'Files uploaded successfully',
      files: fileInfos
    });
  } catch (error) {
    logger.logger.error('File upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
};

// File download route handler
const handleFileDownload = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  } catch (error) {
    logger.logger.error('File download error:', error);
    res.status(500).json({ error: 'File download failed' });
  }
};

module.exports = {
  upload,
  uploadMiddleware,
  singleUpload,
  validateFiles,
  cleanupFiles,
  getFileInfo,
  handleFileUpload,
  handleFileDownload
}; 