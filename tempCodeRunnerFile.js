const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('userConnected', async (userId) => {
        await User.findByIdAndUpdate(userId, {isLive: true});
        const user = await User.findById(userId);
        io.emit('userStatusUpdate', user);
    });