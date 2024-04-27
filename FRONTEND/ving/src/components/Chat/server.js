const http = require('http');
const Stomp = require('stomp-broker-js');

const server = http.createServer();
const stompServer = new Stomp({ server });

stompServer.on('connected', function(sessionId) {
    console.log('A client connected with session:', sessionId);
});

stompServer.on('disconnected', function(sessionId) {
    console.log('A client disconnected with session:', sessionId);
});

stompServer.subscribe('/topic/messages', function(msg, headers) {
  var message = JSON.parse(msg.body);
  console.log('Received message:', message);
  stompServer.send('/topic/messages', {}, JSON.stringify(message));
});

server.listen(8080, function() {
    console.log('Server is listening on port 8080');
});
