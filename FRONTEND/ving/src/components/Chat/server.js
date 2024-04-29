const WebSocketServer = require('ws').Server;
const Stomp = require('stompjs');

const wss = new WebSocketServer({ port: 8080 });
const stompServer = Stomp.over(wss);

stompServer.connect({}, function(frame) {
    stompServer.subscribe('/topic/messages', function(message) {
        const body = JSON.parse(message.body);
        console.log('received message', body);
        
        // echo back the message
        stompServer.send('/topic/messages', {}, message.body);
    });
}, function(error) {
    console.log('STOMP error', error);
});

console.log('STOMP server running on port 8080');
