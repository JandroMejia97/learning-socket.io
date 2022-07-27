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

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    next();
  } else {
    const error = new Error('Authentication error')
    error.status = 401;
    error.data = { details: 'Authentication error' };
    next(error);
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
