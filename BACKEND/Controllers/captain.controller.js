const Captain = require('../Models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../Models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check existence
    const isCaptainExists = await Captain.findOne({ email });
    if (isCaptainExists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await Captain.hashPassword(password);

    // Create via service
    const captain = await captainService.createCaptain({
      firstName: fullname.firstname,
      lastName: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    });

    // JWT
    const token = captain.generateAuthToken();

    // Optional: secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ token, captain });
  } catch (err) {
    console.error('❌ registerCaptain:', err);
    return res
      .status(err.status || 500)
      .json({ message: err.message || 'Server error' });
  }
};

module.exports.loginCaptain = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ token, captain });
  } catch (err) {
    console.error('❌ loginCaptain:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await blacklistTokenModel.create({ token });
    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('❌ logoutCaptain:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    if (!req.captain) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ captain: req.captain });
  } catch (err) {
    console.error('❌ getCaptainProfile:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getNearbyCaptains = (req, res) => {
  // Replace with your actual logic
  res.status(200).json({ captains: [] }); // Always return an array
};
