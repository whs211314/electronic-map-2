<template>
  <div class="m-button position-space" :class="btnCls"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <span class="txt position-center">{{txt}}</span>
    <div class="prompt-dialog"
      :class="[position, isLarge?'large':'']"
      v-show="visible">{{dialogTxt}}</div>
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
      if (this.txt.length > 5) return `small btn-${this.type}`
      return `btn-${this.type}`
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
    transform: scale(.5);
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
    width: 160%;
    height: 360%;
    padding: calc(var(--fontSize-16) / 2);
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
