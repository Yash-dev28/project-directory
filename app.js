const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const createRoute = require('./routes/create');
const readRoute = require('./routes/read');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://yg2707320:AWFJ9SeRkqe57kNf@cluster0.tuvqvvh.mongodb.net/new?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.urlencoded({ extended: true }));  // Ensure bodyParser handles URL-encoded data
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/create', createRoute);
app.use('/api/read', readRoute);

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('joinRoom', async ({ email, password }) => {
        try {
            const user = await User.findOne({ email });

            if (user && user.password === password) { // Ideally, you should hash the password and compare
                socket.join('live users');
                user.isLive = true;
                await user.save();

                io.to('live users').emit('userJoined', {
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    socketId: socket.id
                });
            } else {
                socket.emit('authError', 'Invalid email or password');
            }
        } catch (err) {
            console.error('Error joining room:', err);
        }
    });

    socket.on('disconnect', async () => {
        try {
            const user = await User.findOneAndUpdate(
                { socketId: socket.id },
                { isLive: false }
            );
            if (user) {
                socket.leave('live users');
            }
        } catch (err) {
            console.error('Error updating user status:', err);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
