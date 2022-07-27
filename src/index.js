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

const adminsIo = io.of('/admins');
const usersIo = io.of('/users');

adminsIo.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    shareNewMessage(data, adminsIo);
  });
});

usersIo.on('connection', (socket) => {
  socket.on('sendMessage', (data) => {
    shareNewMessage(data, usersIo);
  });
});

httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

function shareNewMessage(data, namespace) {
  namespace.emit('newMessage', data);
}