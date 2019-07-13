<template>
  <div class="deal-info">
    <div class="left fl">
      <div class="item">
        <div class="label"><div class="txt">总网点/服务点数量</div></div>
        <div class="value">5345 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">交易总金额</div></div>
        <div class="value">456 万元</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">总存款</div></div>
        <div class="value">345677 万元</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">总金湘通发卡数量</div></div>
        <div class="value">6789 张</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">总金湘通卡存款</div></div>
        <div class="value">456 万元</div>
      </div>
    </div>
    <div class="right fr">
      <div class="item r1 extra">
        <div class="label"><div class="txt">总湘金卡客户<br/>产品覆盖度占比数量</div></div>
        <div class="value orange">80%</div>
      </div>
      <div class="item r2">
        <div class="label"><div class="txt">同比增长</div></div>
        <div class="value">3%</div>
      </div>
      <div class="item r3 extra">
        <div class="label"><div class="txt">银行同步率<br/>总湘金卡手机</div></div>
        <div class="value orange">80%</div>
      </div>
      <div class="item r4">
        <div class="label"><div class="txt">同比增长</div></div>
        <div class="value">3%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
