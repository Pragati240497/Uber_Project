const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../Controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// ✅ Registration validators (match nested body structure)
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname')
      .isLength({ min: 3 })
      .withMessage('Last name must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('vehicle.color')
      .isLength({ min: 3 })
      .withMessage('Color must be at least 3 characters long'),
    // allow common plate formats (letters/digits/spaces/hyphens), length 6-13
    body('vehicle.plate')
      .matches(/^[A-Z0-9 -]{6,13}$/i)
      .withMessage('Please fill a valid vehicle plate number'),
    body('vehicle.capacity')
      .isInt({ min: 1 })
      .withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
      .isIn(['car', 'motorcycle', 'auto'])
      .withMessage('Vehicle type must be car, motorcycle, or auto'),
  ],
  captainController.registerCaptain
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  captainController.loginCaptain
);

// Protected routes
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

// Add this route for nearby captains
router.get('/nearby', captainController.getNearbyCaptains);

module.exports = router;
