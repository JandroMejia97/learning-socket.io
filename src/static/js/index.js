const socket = io();

function sendMessage() {
  const message = document.getElementById('message');
  const messageValue = message.value;
  if (messageValue) {
    socket.emit('sendMessage', messageValue);
    message.value = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendMessage();
  }
})

socket.on('newMessage', ({ message, from }) => {
  const messageBlock = document.createRange().createContextualFragment(`
    <div class="message">
      <div class="image-container">
        <img src="/images/michi.jpeg" alt="">
      </div>
      <div class="message-body">
        <div class="user-info">
          <span class="username">
            ${from}
          </span>
          <span class="time">
            ${new Date().toLocaleTimeString()}
          </span>
        </div>
        <p>
          ${message}
        </p>
      </div>
    </div>
  `);
  const messages = document.getElementById('all-messages');
  messages.append(messageBlock);
});