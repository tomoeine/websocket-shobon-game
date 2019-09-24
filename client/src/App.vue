<template>
  <div id="app">
    <h2>(´・ω・｀) をゴールに導こう！</h2>
    <p>{{ clientsNum }} 人が接続中</p>
    <Shobon
      :x="shobonX"
      :y="shobonY"
    />
    <div class="buttons">
      <button
        type="button"
        class="button"
        @click="sendMessage('上')"
      >
        上
      </button><br>
      <button
        type="button"
        class="button"
        @click="sendMessage('左')"
      >
        左
      </button>
      <button
        type="button"
        class="ml-10 button"
        @click="sendMessage('右')"
      >
        右
      </button><br>
      <button
        type="button"
        class="button"
        @click="sendMessage('下')"
      >
        下
      </button>
    </div>

    <div
        class="error"
        v-if="serverError"
    >
      <p>
        （´・ω:;.:…<br>
        おっと、どうやらサーバーとの接続がうまくいかないようです<br>
        しばらく待ってもこのメッセージが消えなければ、再読み込みを試してください<br>
        （´:;….::;.:. :::;.. …..
      </p>
    </div>
  </div>
</template>

<script>
  import Shobon from '../components/Shobon.vue'

  export default {
    components: {
      Shobon
    },
    data() {
      return {
        sock: null,
        shobonX: 0,
        shobonY: 0,
        clientsNum: 0,
        serverError: false,
      }
    },
    created() {
      this.openWebSocket()
      document.addEventListener('touchend', this.avoidZoomByTap, false)
    },
    destroyed: function () {
      if (this.sock) {
        this.sock.removeEventListener('message', this.receiveMessage, false)
        this.sock.removeEventListener('open', this.onOpen, false)
        this.sock.removeEventListener('error', this.onError, false)
        if ( this.sock && this.sock.readyState === WebSocket.OPEN) {
          this.sock.close()
        }
      }
      document.removeEventListener('touched', this.avoidZoomByTap, false)
    },
    methods: {
      openWebSocket() {
        this.sock = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL)
        this.sock.addEventListener('message', this.receiveMessage, false)
        this.sock.addEventListener('open', this.onOpen, false)
        this.sock.addEventListener('error', this.onError, false)
      },
      receiveMessage(e) {
        const obj = JSON.parse(e.data)
        this.shobonX = obj.x
        this.shobonY = obj.y
        this.clientsNum = obj.clientsNum
      },
      sendMessage(direction) {
        if (this.sock.readyState === WebSocket.CLOSING || this.sock.readyState === WebSocket.CLOSED) {
          this.openWebSocket()
        }
        if (this.sock.readyState === WebSocket.OPEN) {
          this.sock.send(direction)
        }
      },
      onOpen() {
        this.serverError = false
      },
      onError(e) {
        console.log(e)
        this.serverError = true
        setTimeout(this.openWebSocket, 1000)
      },
      // iPhoneでダブルタップ時に画面が拡大するのを避ける
      avoidZoomByTap(event) {
        event.preventDefault()
        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true )
        event.target.dispatchEvent(evt)
      },
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  h2 {
    color: #333;
    font-size: 20px;
    margin: 10px 0 0;
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .buttons {
    margin-top: 10px;
  }
  .button {
    padding: 20px;
    display: inline-block;
    line-height: 1;
    font-size: 16px;
    text-decoration: none;
    background-color: #2c3e50;
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
  }
  .ml-10 {
    margin-left: 100px;
  }
  .error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: auto;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 10002;
    text-align: center;
  }
  .error p {
    position: relative;
    top: 100px;
    margin: auto;
    font-weight: bold;
    font-size: 24px;
    width: 400px;
  }
</style>
