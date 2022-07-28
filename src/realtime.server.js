import { Server } from 'socket.io';

export default function realtimeServer(httpServer, Server) {
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.info(`Client connected: ${socket.id}`);
    socket.on('disconnect', () => {
      console.info('Client disconnected');
    });

    socket.on('sendMessage', (message) => {
      const from = socket.handshake.headers.cookie.match(/username=([^;]+)/)[1];
      io.emit('newMessage', {
        message,
        from,
      });
    });
  });
}
