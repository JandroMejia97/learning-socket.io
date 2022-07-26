const socket = io();

function checkSocketStatus() {
  if (socket.connected) {
    console.log('Socket is connected');
  } else {
    console.log('Socket is not connected');
  }
}

socket.on('connect', () => {
  checkSocketStatus();
});

socket.on('disconnect', () => {
  checkSocketStatus();
});

socket.on('connect_error', (err) => {
  console.log('Socket connection error: ', err);
});

socket.io.on('reconnect_attempt', () => {
  console.log('Attempting to reconnect to the server');
});

socket.io.on('reconnect', () => {
  console.log('Reconnected to the server');
});