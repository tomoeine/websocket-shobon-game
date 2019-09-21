# shobon-game

ブラウザで遊べる (´・ω・｀) のゲームです。  
みんなで接続すると楽しい！

![image](https://user-images.githubusercontent.com/31984716/65368361-1ac95100-dc7b-11e9-84d6-466c53dfe976.png)


## 遊び方

```sh
// Install dependencies
cd server && yarn install && cd ../
cd client && yarn install && cd ../
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
同じネットワークから http://192.168.XXX.XXX:3000 に接続してみんなで遊ぼう！