const socket = io();

socket.on('hello', (data) => {
  console.log(data);
});

socket.on('emit-to-all', (data) => { 
  console.log(data);
});

socket.on('last', (data) => {
  console.log(data);
});

const emitToServer = document.querySelector('#emit-to-server');
emitToServer.addEventListener('click', () => {
  socket.emit('server-hello', 'world!');
});

const emitToLast = document.querySelector('#emit-to-last');
emitToLast.addEventListener('click', () => {
  socket.emit('last-hello', 'world!');
});