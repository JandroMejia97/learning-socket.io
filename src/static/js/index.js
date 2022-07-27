const user = prompt('What is your username?');
const adminUsers = ['admin', 'root'];
const isAdmin = adminUsers.includes(user);
let socketNameSpace, group;

const chatElement = document.getElementById('chat');
const namespaceElement = document.getElementById('namespace');

if (isAdmin) {
  socketNameSpace = io('/admins');
  group = 'admins';
} else {
  socketNameSpace = io('/users');
  group = 'users';
}

socketNameSpace.on('connect', () => {
  namespaceElement.textContent = group.toUpperCase();
});

socketNameSpace.on('newMessage', (data) => {
  receiveMessage(data);
});

function receiveMessage({ sender, message }) {
  const liElement = document.createElement('li');
  liElement.innerHTML += `<p><strong>${sender}</strong>: ${message}</p>`;
  chatElement.appendChild(liElement);
}


function sendMessage() {
  const messageElement = document.getElementById('message');
  const message = messageElement.value;
  if (message) {
    socketNameSpace.emit('sendMessage', {
      message,
      sender: user,
    });
  }
}