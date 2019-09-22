const WebSocket = require('ws');
const port = process.env.PORT || process.env.VUE_APP_PORT || 8080;
const wss = new WebSocket.Server({ port: port });
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