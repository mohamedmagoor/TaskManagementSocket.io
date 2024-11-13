const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('addTodo', (todo) => {
        io.emit('todoAdded', todo);
    });

    socket.on('editTodo', (updatedTodo) => {
        io.emit('todoUpdated', updatedTodo);
    });

    socket.on('deleteTodo', (id) => {
        io.emit('todoDeleted', id);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
