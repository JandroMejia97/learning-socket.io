import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://admin.socket.io',
    ],
    credentials: true,
  }
});

const port = process.env.SERVER_PORT || 3000;

instrument(io, {
  auth: {
    type: 'basic',
    username: process.env.SOCKET_USERNAME || 'admin',
    password: process.env.SOCKET_PASSWORD || '$2a$12$dE3INtYWvmRexD.w0fxx/Oi2vgiupmDRP9OZg.tJOINAfGTCvPNre',
  }
});

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  socket.on('circlePosition', (data) => {
    socket.broadcast.emit('moveCirclePosition', data);
  });
});

httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});