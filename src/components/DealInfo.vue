<template>
  <div class="deal-info">
    <div class="left fl">
      <div class="item">
        <div class="label"><div class="txt">建行物理网点数</div></div>
        <div class="value">{{sum.netSum}} 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">服务客户</div></div>
        <div class="value">492.89 万人</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">沉淀资金</div></div>
        <div class="value">281.00 亿</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">交易笔数</div></div>
        <div class="value">2393.94 万笔</div>
      </div>
    </div>
    <div class="right fr">
      <div class="item">
        <div class="label"><div class="txt">金湘通服务点数</div></div>
        <div class="value">60653 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">新增获客数</div></div>
        <div class="value orange">85.44 万人</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">本年新增沉淀资金</div></div>
        <div class="value orange">157.49 亿元</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">交易金额</div></div>
        <div class="value orange">177.64 亿</div>
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
    height: 25%;
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
