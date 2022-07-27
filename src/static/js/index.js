const socket = io();

function connectTo() {
  const connectRoom = document.getElementById('connect-room');
  const connectRoomValue = connectRoom.value;
  if (connectRoomValue) {
    socket.emit('connectToRoom', `room${connectRoomValue}`);
  }
}

function sendMessage() {
  const message = document.getElementById('message');
  const messageValue = message.value;
  if (messageValue) {
    socket.emit('message', messageValue);
    message.value = '';
  }
}

function receiveMessage({ room, sender, message }) {
  const roomElement = document.getElementById(room);
  const messageElement = document.createElement('li');
  messageElement.textContent = `${sender}: ${message}`;
  roomElement.appendChild(messageElement);
}

socket.on('newMessage', receiveMessage);
