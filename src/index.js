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

const socketsOnline = [];

io.on('connection', (socket) => {
  socketsOnline.push(socket.id);

  // Basic events emission
  socket.emit('hello', 'world!');
  socket.on('server-hello', (data) => {
    console.log(data);
  });

  // Emit to all clients
  io.emit('emit-to-all', `${socket.id} connected`);

  // Emit to last client
  socket.on('last-hello', (data) => {
    const lastClient = socketsOnline[socketsOnline.length - 1];
    io.to(lastClient).emit('last', data);
  });
});

httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});