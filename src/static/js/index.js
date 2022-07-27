const socket = io();

const circle = document.querySelector('#circle');

function dragStart(e) {
  const { clientX, clientY } = e;
  const position = {
    top: `${clientY}px`,
    left: `${clientX}px`,
  };

  moveCircle(position);
  socket.volatile.emit('circlePosition', position);
}

function moveCircle(data) {
  circle.style.top = data.top;
  circle.style.left = data.left;
}

document.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', dragStart);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', dragStart);
});

socket.on('moveCirclePosition', moveCircle);
