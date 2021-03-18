<template>
  <div
    class="m-button position-space"
    :class="btnCls"
    :style="{ zIndex: visible ? 999 : 'initial' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <span class="txt position-center">{{ txt }}</span>
    <div class="prompt-dialog" :class="[position, isLarge ? 'large' : '']" v-show="visible" v-html="dialogTxt" />
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
    noBg: {
      type: Boolean,
      default: false
    },
    txt: {
      type: String,
      default: ''
    },
    dialogTxt: String
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    btnCls () {
      let ret = `btn-${this.type}`
      if (this.txt.length > 6) ret += ' small'
      if (this.noBg) ret += ' no-bg'
      return ret
    }
  },
  methods: {
    // handleClick () {
    //   if (!this.hasDialog) return
    //   this.visible = true
    //   setTimeout(() => {
    //     this.visible = false
    //   }, 2 * 1000)
    // }
    handleMouseEnter () {
      if (!this.txt || !this.dialogTxt) return
      this.visible = true
    },
    handleMouseLeave () {
      this.visible = false
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
  cursor: pointer;
  &.small {
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    transform: scale(0.5);
    transform-origin: center;
    .txt {
      font-size: var(--fontSize-20);
    }
    .prompt-dialog {
      padding: var(--fontSize-16);
      font-size: calc(var(--fontSize-12) * 2);
    }
  }
  .txt {
    word-break: keep-all;
    font-size: var(--fontSize-12);
  }
  .prompt-dialog {
    position: absolute;
    left: 100%;
    min-width: 50%;
    white-space: nowrap;
    padding: calc(var(--fontSize-16) / 2);
    border: 3px solid rgb(1, 255, 211);
    border-radius: 5px;
    background: rgb(32, 70, 70);
    font-size: var(--fontSize-12);
    z-index: 12;
    &.top {
      top: 0;
    }
    &.middle {
      top: 0;
      transform: translate3d(0, -50%, 0);
    }
    &.bottom {
      bottom: 0;
    }
  }
}

.no-bg {
  background-image: url(../assets/images/bg-002.png) !important;
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
.btn-5 {
  background-image: url(../assets/images/btn-5.png);
}
.btn-6 {
  background-image: url(../assets/images/btn-6.png);
}
.btn-7 {
  background-image: url(../assets/images/btn-7.png);
  > .txt {
    font-size: var(--fontSize-12);
  }
}
</style>
