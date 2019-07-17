<template>
  <div class="m-button position-space" :class="btnCls" @click="handleClick">
    <span class="txt position-center">{{txt}}</span>
    <div class="prompt-dialog" :class="[position, isLarge?'large':'']" v-show="visible">{{dialogTxt}}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 1
    },
    hasDialog: {
      type: Boolean,
      default: false
    },
    position: String,
    isLarge: {
      type: Boolean,
      default: false
    },
    txt: String,
    dialogTxt: String
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    btnCls () {
      return `btn-${this.type}`
    }
  },
  methods: {
    handleClick () {
      if (!this.hasDialog) return
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 2 * 1000)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';

.m-button {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  font-weight: bold;
  .txt {
    word-break: keep-all;
  }
  .prompt-dialog {
    position: absolute;
    left: 100%;
    width: 140%;
    height: 360%;
    padding: calc(var(--fontSize-14) / 2);
    background-image: url(../assets/images/cpm.png);
    background-size: 100% 100%;
    background-origin: border-box;
    background-repeat: no-repeat;
    font-size: var(--fontSize-12);
    z-index: 12;
    &.large {
      width: 180%;
      height: 450%;
    }
    &.top {
      top: 0;
    }
    &.middle {
      top: 0;
      transform: translate3d(0, -50%, 0)
    }
    &.bottom {
      bottom: 0;
    }
  }
}

.btn-1 {
  background-image: url(../assets/images/btn-1.png);
}
.btn-2 {
  background-image: url(../assets/images/btn-2.png);
}
.btn-3 {
  background-image: url(../assets/images/btn-3.png);
}
.btn-4 {
  background-image: url(../assets/images/btn-4.png);
}
</style>
