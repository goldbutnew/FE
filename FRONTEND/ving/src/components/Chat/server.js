const http = require('http');
const sockjs = require('sockjs');
const Stomp = require('stompjs');

const sockjs_opts = {sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'};
const sockjs_echo = sockjs.createServer(sockjs_opts);
const server = http.createServer();

sockjs_echo.installHandlers(server, {prefix:'/stomp'});
server.listen(8080, '0.0.0.0');

const stompServer = Stomp.over(sockjs_echo);

stompServer.connect({}, function(sessionId) {
    stompServer.subscribe('/topic/messages', function(message) {
        const body = JSON.parse(message.body);
        console.log('Received message:', body);

        // 메시지를 다시 보내기
        stompServer.send('/topic/messages', {}, message.body);
    });
}, function(error) {
    console.log('STOMP error', error);
});

console.log('STOMP server running on port 8080');

