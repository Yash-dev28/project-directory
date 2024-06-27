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
const MONGODB_URI = 'mongodb+srv://yg2707320:xD5utFhvWQ13vg5L@cluster0.w8zqidt.mongodb.net/my_database?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

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

  socket.on('joinLiveUsers', async () => {
    try {
      const users = await User.find();
      users.forEach(user => {
        socket.join('live users');
        io.to('live users').emit('userJoined', {
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          socketId: socket.id
        });
      });
    } catch (err) {
      console.error('Error joining live users:', err);
    }
  });

    //socket.on('disconnect', () => {
    //console.log(`Socket disconnected: ${socket.id}`);
 });


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
