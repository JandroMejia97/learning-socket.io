const socket = io();

function sendMessage() {
  if (socket.connected) {
    socket.emit('message', 'Hello from client!');
  }
}

function disconnect() {
  socket.disconnect();
}

function reconnect() {
  socket.connect();
}