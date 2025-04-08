import { body, validationResult } from 'express-validator';

// Common validation rules
export const validateUserRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['couple', 'vendor', 'guest'])
    .withMessage('Invalid role')
];

export const validateUserLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

export const validateTask = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('description').trim().notEmpty().withMessage('Task description is required'),
  body('dueDate').isISO8601().withMessage('Invalid due date format'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority level'),
  body('wedding').isMongoId().withMessage('Invalid wedding ID')
];

export const validateWedding = [
  body('date').isISO8601().withMessage('Invalid date format'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('budget').isNumeric().withMessage('Budget must be a number')
];

export const validateVendor = [
  body('name').trim().notEmpty().withMessage('Vendor name is required'),
  body('category').trim().notEmpty().withMessage('Vendor category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('contactEmail').isEmail().withMessage('Please provide a valid email'),
  body('contactPhone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('services').isArray().withMessage('Services must be an array'),
  body('pricing').isObject().withMessage('Pricing must be an object')
];

export const validateRSVP = [
  body('status')
    .isIn(['pending', 'attending', 'not attending'])
    .withMessage('Invalid RSVP status'),
  body('plusOne').optional().isObject().withMessage('Plus one must be an object'),
  body('plusOne.name').if(body('plusOne').exists()).trim().notEmpty().withMessage('Plus one name is required'),
  body('plusOne.dietaryRestrictions').optional().isString(),
  body('dietaryRestrictions').optional().isString(),
  body('specialRequests').optional().isString()
];

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
}; 