<template>
  <div class="popup" @click="$emit('update:visible', false)">
    <div class="center" :style="{left:`${popup.x}px`,top:`${popup.y}px`}">
      <div class="item" :class="item.position"
        v-for="item in items" :key="item.id"
        @click.stop="$emit('deployEvent', popup.data,item.id)">
        <div class="icon" :class="item.icon"></div>
        <div class="label">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popup: Object,
    visible: Boolean
  },
  data () {
    return {
      items: [
        { id: 1, label: '基本信息', icon: 'fuwudian', position: 'top' },
        { id: 2, label: '客户经理', icon: 'jingli', position: 'top-r' },
        { id: 3, label: '交易', icon: 'jiaoyi', position: 'bottom' },
        { id: 4, label: '远程巡检', icon: 'xunjian', position: 'bottom-l' },
        { id: 5, label: '巡检记录', icon: 'xunjian1', position: 'top-l' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.popup {
  position: absolute;
  top: -5%;
  right: -5%;
  bottom: -5%;
  left: -5%;
  .center {
    position: absolute;
    width: 0;
    height: 0;
    padding: 30%;
    @include bgImage('../assets/images/tanchuang.png');
    transform: translate3d(-50%, -50%, 0) scale(.4);
    transform-origin: center center;
  }
  .item {
    position: absolute;
    padding: 18%;
    width: 0;
    height: 0;
    background-color: #01BDBA;
    border-radius: 50%;
    border: 1px solid #00D7D4;
    font-size: var(--fontSize-20);
    cursor: pointer;
    &:hover {
      color: #FC7D12;
      .icon {
        &.fuwudian {
          @include bgImage('../assets/images/fuwudian-active.png');
        }
        &.jiaoyi {
          @include bgImage('../assets/images/jiaoyi-active.png');
        }
        &.jingli {
          @include bgImage('../assets/images/jingli-active.png');
        }
        &.xunjian {
          @include bgImage('../assets/images/xunjian-active.png');
        }
        &.yongjin {
          @include bgImage('../assets/images/yongjin-active.png');
        }
        &.xunjian1 {
          @include bgImage('../assets/images/xunjian1-active.png');
        }
      }
    }
    .icon {
      position: absolute;
      left: 24%;
      right: 24%;
      top: 8%;
      bottom: 40%;
      &.fuwudian {
        @include bgImage('../assets/images/fuwudian.png');
      }
      &.jiaoyi {
        @include bgImage('../assets/images/jiaoyi.png');
      }
      &.jingli {
        @include bgImage('../assets/images/jingli.png');
      }
      &.xunjian {
        @include bgImage('../assets/images/xunjian.png');
      }
      &.yongjin {
        @include bgImage('../assets/images/yongjin.png');
      }
      &.xunjian1 {
        @include bgImage('../assets/images/xunjian1.png');
      }
    }
    .label {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20%;
      text-align: center;
      white-space: 2px;
      line-height: 1;
      font-weight: bold;
    }
    &.top {
      top: 0;
      left: 50%;
      transform: translate3d(47%, -52%, 0);
    }
    &.bottom {
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 78%, 0);
    }
    &.top-l {
      top: 0;
      left: 0;
      transform: translate3d(-73%, 135%, 0);
    }
    &.top-r {
      top: 0;
      right: 0;
      transform: translate3d(70%, 137%, 0);
    }
    &.bottom-l {
      bottom: 0;
      left: 0;
      transform: translate3d(-12%, -222%, 0);
    }
    &.bottom-r {
      bottom: 0;
      right: 0;
      transform: translate3d(42%, -8%, 0);
    }
  }
}
</style>
