<template>
  <div id="app">
    <h2>(´・ω・｀) をゴールに導こう！</h2>
    <Shobon
      :x="shobon_x"
      :y="shobon_y"
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

    <p id="received-message">
      {{ receivedMessage }}
    </p>
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
        message: '',
        receivedMessage: '',
        shobon_x: 0,
        shobon_y: 0
      }
    },
    created() {
      this.openWebSocket()
      document.addEventListener('touchend', this.avoidZoomByTap, false)
    },
    destroyed: function () {
      if (this.sock) {
        this.sock.removeEventListener('message', this.receiveMessage, false)
        if ( this.sock && this.sock.readyState === WebSocket.OPEN) {
          this.ws.close()
        }
      }
      document.removeEventListener('touched', this.avoidZoomByTap, false)
    },
    methods: {
      openWebSocket() {
        try {
          this.sock = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL)
          this.sock.addEventListener('message', this.receiveMessage, false)
        } catch (e) {
          console.log(e)
        }
      },
      receiveMessage(e) {
        const obj = JSON.parse(e.data)
        this.shobon_x = obj.x
        this.shobon_y = obj.y
      },
      sendMessage(direction) {
        if (this.sock.readyState === WebSocket.CLOSING || this.sock.readyState === WebSocket.CLOSED) {
          this.openWebSocket()
        }
        if (this.sock.readyState === WebSocket.OPEN) {
          this.sock.send(direction)
          this.message = ''
        }
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
    margin: 10px 0 10px;
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
</style>
