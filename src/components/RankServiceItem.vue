<template>
<div class="rank-service-item" @click.stop="$emit('itemClick')">
  <div class="content">
    <div class="left">
      <div class="name flex-center"><div class="txt">金湘通</div></div>
      <div class="rank flex-center"><div class="txt center">NO {{rank}}</div></div>
    </div>
    <div class="right">
      <div class="network flex-center"><div class="txt oh">{{item.mchName}}</div></div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">服务点类别</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#feb901;">{{item.industryName}}</div> </div>
      </div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">本月交易</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#feb901;">{{item.countSumMonth}}</div></div>
      </div>
      <div class="item">
        <div class="label fl flex-center"><div class="txt">本年交易</div></div>
        <div class="value fr flex-center"><div class="txt" style="color:#feb901;">{{item.countSumYear}}</div></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    rank: Number
  },
  filters: {
    // money (value) {
    //   const str = String(value)
    //   const len = str.length
    //   if (len < 6) {
    //     return str
    //   } else if (len < 10) {
    //     return str.slice(0, -4) + '万'
    //   } else {
    //     return str.slice(0, -8) + '亿'
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.rank-service-item {
  @include bgImage('../assets/images/rank.png');
  .oh {
    overflow: hidden;
  }
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
      white-space: nowrap;
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
        color:#feb901;
      }
    }
    .right {
      position: absolute;
      top: 12%;
      left: 48%;
      width: 39%;
      height: 72%;
      font-size: var(--fontSize-16);
      .item {
        height: 26%;
        &:not(:first-child) {
          padding-left: 2%;
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
