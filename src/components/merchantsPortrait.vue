<template>
  <div class="deal-info">
    <div v-if="isPicture" class="left fl">
      <div class="picture"></div>
    </div>
    <div class="right fr">
      <div class="item r1 extra">
        <div class="label"><div class="txt">服务点位置</div></div>
        <div class="value orange">某某某位置</div>
      </div>
      <div class="item r2">
        <div class="label"><div class="txt">经营范围</div></div>
        <div class="value">某某范围~某某范围</div>
      </div>
      <div class="item r3 extra">
        <div class="label"><div class="txt">业主基本信息</div></div>
        <div class="value orange">基本信息1</div>
        <div class="value orange">基本信息2</div>
        <div class="value orange">基本信息3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPicture: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.deal-info {
  position: absolute;
  left: -50%;
  right: -50%;
  top: -50%;
  bottom: -50%;
  transform: scale(0.5);
  .txt {
    width: 100%;
    text-align: left;
  }
  .left, .right {
    width: 50%;
    height: 100%;
  }
  .picture {
    height: 70%;
    width: 85%;
    background: #019897;
  }
  .item {
    height: 20%;
    .label {
      height: 30%;
    }
    .value {
      height: 70%;
    }
    &.extra {
      height: 24%;
      .label {
        height: 50%;
      }
      .value {
        height: 50%;
      }
    }
  }
  .right {
    position: relative;
    .r3 {
      position: absolute;
    }
    .r4 {
      position: absolute;
      bottom: 0;
    }
  }
  .label {
    @extend .flex-center;
    font-size: var(--fontSize-16);
  }
  .value {
    font-size: calc(var(--fontSize-12) * 2);
    color: $light-blue;
    font-weight: bold;
    &.orange {
      color: #00FFF0;
    }
  }
}
</style>
