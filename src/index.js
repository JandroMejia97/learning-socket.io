import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.SERVER_PORT || 3000;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  socket.connectedRoom = null;

  socket.on('connectToRoom', (room) => {
    if (socket.connectedRoom) {
      socket.leave(socket.connectedRoom);
    }
    socket.connectedRoom = room;
    socket.join(room);
  });

  socket.on('message', (message) => {
    const room = socket.connectedRoom;
    if (room) {
      io.to(room).emit('newMessage', {
        message,
        room,
        sender: socket.id,
      });
    }
  });
});

httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});