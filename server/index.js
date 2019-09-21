const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let x = 0
let y = 0

wss.on('connection',function(ws){

  sendMessage('{ "x": ' + x + ', "y": ' + y + ' }')

  ws.on('message',function(message){

    console.log("Received: " + message);

    if (message === '右') {
      x = x + 10
    } else if (message === '左') {
      x = x - 10
    } else if (message === '下') {
      y = y + 10
    } else if (message === '上') {
      y = y - 10
    }
    sendMessage('{ "x": ' + x + ', "y": ' + y + ' }')
  });

  ws.on('close',function(){
    console.log('connection closed');
  });

});

const sendMessage = (message) => {
  wss.clients.forEach(function(client){
    client.send(message)
  });
}