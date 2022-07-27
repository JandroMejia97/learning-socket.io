const token = null
const socket = io({
  auth: {
    token,
  }
});

socket.on('connect_error', (error) => {
  console.log(error.data.details);
});