import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import realtimeServer from './realtime.server.js';
import routes from './routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Setting up the server
const port = process.env.SERVER_PORT || 3000;
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));

// Setting up static files
app.use(express.static(path.join(__dirname, 'static')));

// Setting up the routes
app.use(routes);

// Setting up the server
httpServer.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

// Setting up the realtime server
realtimeServer(httpServer, Server);
