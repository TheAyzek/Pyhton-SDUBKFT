const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Admin registration validation
const validateAdminRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  handleValidationErrors
];

// Admin login validation
const validateAdminLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Form field validation
const validateFormField = [
  body('label')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Label must be between 1 and 100 characters'),
  body('type')
    .isIn(['text', 'select', 'textarea', 'email', 'number'])
    .withMessage('Invalid field type'),
  body('required')
    .optional()
    .isBoolean()
    .withMessage('Required must be a boolean'),
  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a positive integer'),
  body('options')
    .if(body('type').equals('select'))
    .isArray({ min: 1 })
    .withMessage('Select fields must have at least one option'),
  body('maxResponses')
    .if(body('type').equals('select'))
    .optional()
    .isArray()
    .withMessage('Max responses must be an array'),
  handleValidationErrors
];

// Application submission validation
const validateApplication = [
  body('answers')
    .isArray({ min: 1 })
    .withMessage('At least one answer is required'),
  body('answers.*.field')
    .notEmpty()
    .withMessage('Field ID is required for each answer'),
  body('answers.*.value')
    .if(body('answers.*.selectedOption').not().exists())
    .notEmpty()
    .withMessage('Value is required when no option is selected'),
  body('answers.*.selectedOption')
    .if(body('answers.*.value').not().exists())
    .isInt({ min: 0 })
    .withMessage('Selected option must be a valid index'),
  handleValidationErrors
];

module.exports = {
  validateAdminRegistration,
  validateAdminLogin,
  validateFormField,
  validateApplication,
  handleValidationErrors
}; 