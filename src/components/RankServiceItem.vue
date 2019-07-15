<template>
<div class="rank-service-item">
  <div class="content">
    <div class="left">
      <div class="name flex-center"><div class="txt">金湘通</div></div>
      <div class="rank flex-center"><div class="txt center">NO {{rank}}</div></div>
    </div>
    <div class="right">
      <div class="network flex-center"><div class="txt">金湘通服务网点1</div></div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">笔数</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#E77641;">3082万笔</div> </div>
      </div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">金额</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#E77641;">3082万元</div></div>
      </div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">占总比</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#E77641;">50%</div></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    rank: Number
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.rank-service-item {
  @include bgImage('../assets/images/rank.png');
  .content {
    position: absolute;
    left: -50%;
    right: -50%;
    top: -50%;
    bottom: -50%;
    transform: scale(0.5);
    font-weight: bold;
    .txt:not(.center) {
      width: 100%;
      text-align: left;
    }
    .left {
      position: absolute;
      left: 10%;
      width: 35%;
      height: 100%;
      .name {
        height: 20%;
        display: flex;
        align-content: center;
        font-size: calc(var(--fontSize-12) * 2);
      }
      .rank {
        position: absolute;
        top: 25%;
        bottom: 14%;
        width: 100%;
        color: $light-blue;
        font-size: calc(var(--fontSize-16) * 2);
        color:#E77641;
      }
    }
    .right {
      position: absolute;
      top: 12%;
      left: 48%;
      width: 38%;
      height: 72%;
      font-size: var(--fontSize-16);
      .item {
        height: 25%;
        &:not(:first-child) {
          padding-left: 4%;
        }
        > div {
          height: 100%;
        }
      }
      .network {
        height: 25%;
      }
    }
  }
}
</style>
