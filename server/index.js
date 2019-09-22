const WebSocket = require('ws');
const port = process.env.PORT || process.env.VUE_APP_PORT || 8080;
const wss = new WebSocket.Server({ port: port });
let x = 0
let y = 0
let num = 0

wss.on('connection',function(ws){

  calcClients()
  sendMessage()

  ws.on('message',function(message){

    console.log("Received: " + message);

    if (message === '右' && x < 220) {
      x = x + 10
    } else if (message === '左' && x > 0) {
      x = x - 10
    } else if (message === '下' && y < 280) {
      y = y + 10
    } else if (message === '上' && y > 0) {
      y = y - 10
    }
    sendMessage()
  });

  ws.on('close',function(){
    calcClients()
    sendMessage()
    console.log('connection closed');
  });

});

const sendMessage = () => {
  for(const client of wss.clients) {
    if (client.isAlive === false) {
      return client.terminate()
    }
    client.send('{ "x": ' + x + ', "y": ' + y + ', "clientsNum": ' + num + ' }')
  }
}

const calcClients = () => {
  num = 0
  for(const client of wss.clients) {
    if (client.isAlive === false) {
      return client.terminate()
    }
    num = num + 1
  }
}