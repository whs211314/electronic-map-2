<template>
  <div class="deal-info">
    <div class="left fl">
      <div class="item">
        <div class="label"><div class="txt">总网点/服务点数量</div></div>
        <div class="value">{{sum.number}} 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">总金湘通发卡数量</div></div>
        <div class="value">{{sum.number1}} 张</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">总金湘通卡存款</div></div>
        <div class="value">{{sum.number2}} 亿元</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">手机银行签约客户数</div></div>
        <div class="value">{{sum.number3}} 万个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">建行物理网点数</div></div>
        <div class="value">{{sum.number8}} 个</div>
      </div>
    </div>
    <div class="right fr">
      <div class="item">
        <div class="label"><div class="txt">行政区数量</div></div>
        <div class="value">{{sum.number4}} 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">金湘通发卡本年数量</div></div>
        <div class="value orange">{{sum.number5}} 张</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">金湘通卡存款本年增长</div></div>
        <div class="value orange">{{sum.number6}} 万元</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">同步率</div></div>
        <div class="value orange">{{sum.number7}} %</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">金湘通服务点数</div></div>
        <div class="value">{{sum.number}} 个</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sum: {
      type: Object
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
      bottom: 20%;
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
    font-size: calc(var(--fontSize-18) * 2);
    color: $light-blue;
    font-weight: bold;
    &.orange {
      color: $orange;
    }
  }
}
</style>
