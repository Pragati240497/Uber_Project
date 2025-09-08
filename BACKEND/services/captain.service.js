const Captain = require('../Models/captain.model');

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password, // already hashed by controller
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    const err = new Error('All fields are required');
    err.status = 400;
    throw err;
  }

  try {
    const captain = await Captain.create({
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    return captain;
  } catch (error) {
    // Handle duplicate email nicely
    if (error?.code === 11000 && error?.keyPattern?.email) {
      const err = new Error('Email already registered');
      err.status = 409;
      throw err;
    }
    error.status = error.status || 500;
    throw error;
  }
};
