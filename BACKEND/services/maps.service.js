const axios = require('axios');
const captainModel = require('../Models/captain.model');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('getAddressCoordinate error:', error.response?.data || error.message || error);
        throw new Error('Unable to fetch coordinates');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error('Origin and destination are required');
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.rows.length > 0) {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') throw new Error('No routes found');
            return element;
        } else {
            // Log the full response for debugging
            console.error('Google API response:', response.data);
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        // Log the full error object for debugging
        if (error.response) {
            console.error('getDistanceTime error:', error.response.data);
        } else {
            console.error('getDistanceTime error:', error.message);
        }
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) throw new Error('Input is required');
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_MAPS_API_KEY}&types=geocode`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description);
        } else {
            throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
        }
    } catch (error) {
        console.error('getAutoCompleteSuggestions error:', error.message);
        throw error;
    }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    // radius in km
    if (typeof lat !== 'number' || typeof lng !== 'number' || typeof radius !== 'number') {
        throw new Error('Latitude, longitude, and radius must be numbers');
    }
    return await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius / 6371]
            }
        }
    });
};