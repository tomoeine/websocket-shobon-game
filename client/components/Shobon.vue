<template>
  <div class="app">
    <div
      id="shobon"
      :style="{ top: y + 'px', left: x + 'px'}"
    >
      {{ shobonText }}
    </div>
    <div
      id="goal"
      :style="{ top: goalY + 'px', left: goalX + 'px'}"
    >
      ゴール
    </div>
    <div
      v-show="isGoaled"
      id="goalMessage"
    >
      🎉🎉🎉🎉🎉🎉🎉🎉🎉<br>
      ゴール！やったね<br>
      🎉🎉🎉🎉🎉🎉🎉🎉🎉
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        goalX: 200,
        goalY: 240
      }
    },
    computed: {
      shobonText() {
        if (this.isGoaled) {
          return '(｀・∀・ ´)'
        }
        return '(´ ・ω・｀)'
      },
      isGoaled() {
        return this.x === this.goalX && this.y === this.goalY
      }
    },
  }
</script>

<style scoped>
  .app {
    position: relative;
    margin: auto;
    width: 320px;
    height: 320px;
    background-color: #DDD;
  }
  #shobon {
    position: absolute;
    z-index: 10000;
    background-color: #FFF;
    border-radius:10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }
  #goal {
    position: absolute;
    border-radius:10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    left: 200px;
    top: 200px;
    background-color: #F06d24;
    color: #FFF;
    font-weight: bold;
  }
  #goalMessage {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 100px;
    z-index: 10001;
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }
</style>