const socketIo = require('socket.io');
const userModel = require('./Models/user.model');
const captainModel = require('./Models/captain.model');

let io;

function initializeSocket(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: [
                'http://localhost:5173',
                'https://uberfrontend-seven.vercel.app',
                'https://uberfrontend-5cnw1t7ex-pragati240497s-projects.vercel.app'
            ],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
    // ...existing code...

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            // ...existing code...
        });
    });
}

// Utility to send a message to a specific socket ID
const sendMessageToSocketId = (socketId, messageObject) => {
    // ...existing code...
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
    // ...existing code...
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
