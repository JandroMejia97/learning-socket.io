const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('Socket.io', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });


  it('should be able to receive a circlePosition', (done) => {
    const position = {
      top: '100px',
      left: '100px',
    };
    clientSocket.on('circlePosition', (data) => {
      try {
        expect(data.left).toEqual(position.left);
        expect(data.top).toEqual(position.top);
        done();
      } catch (error) {
        done(error);
      } 
    });
    serverSocket.emit('circlePosition', position);
  });

  it('should receive a acknowledgement when a circlePosition is received', (done) => {
    serverSocket.on('acknowledgement', (callback) => {
      callback('acknowledged');
    });
    clientSocket.emit('acknowledgement', (arg) => {
      try {
        expect(arg).toBeDefined();
        expect(arg).toEqual('acknowledged');
        done();
      } catch (error) {
        done(error);
      }
    });
  });
  
})