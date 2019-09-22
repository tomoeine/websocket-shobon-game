# shobon-game

ブラウザで遊べる (´・ω・｀) のゲームです。  
WebSocket だから、みんなで接続すると楽しい！

![image](https://user-images.githubusercontent.com/31984716/65368361-1ac95100-dc7b-11e9-84d6-466c53dfe976.png)


## 遊び方

```sh
// Install dependencies
cd server && yarn install && cd ../
cd client && yarn install && cd ../
```

```sh
// Prepare .env
cp client/.env.example client/.env
```

```sh
// Run WebSocket server
cd server && node index.js
```
```sh
// Run express server for client
cd client && yarn run serve
```

http://localhost:3000 にブラウザから接続します。  

`client/.env` を変更して `http://192.168.XXX.XXX:3000` に接続すれば、同じネットワークに繋がったみんなで遊べます（オススメ）

```.env
VUE_APP_WEBSOCKET_URL=ws://192.168.XXX.XXX:8080
```
