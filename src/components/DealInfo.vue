<template>
  <div class="deal-info">
    <div class="left fl">
      <div class="item">
        <div class="label"><div class="txt">建行物理网点数</div></div>
        <div class="value">{{ sum.netSum | amount }} 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">服务客户</div></div>
        <div class="value">{{ sum.cardAllSum | amount }}</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">沉淀资金</div></div>
        o
        <div class="value">{{ sum.transAllSum | amount }}</div>
      </div>
      <div class="item" v-show="sum.phoneCustomerCount">
        <div class="label"><div class="txt">交易笔数</div></div>
        <div class="value">{{ sum.phoneCustomerCount | amount }}</div>
      </div>
    </div>
    <div class="right fr">
      <div class="item">
        <div class="label"><div class="txt">金湘通服务点数</div></div>
        <div class="value">{{ sum.serverCount | amount }} 个</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">新增获客数</div></div>
        <div class="value orange">{{ sum.yearCardCount | amount }}</div>
      </div>
      <div class="item">
        <div class="label"><div class="txt">本年新增沉淀资金</div></div>
        <div class="value orange">{{ sum.yearAddCardMoney | amount }}</div>
      </div>
      <div class="item" v-show="sum.rate">
        <div class="label"><div class="txt">交易金额</div></div>
        <div class="value orange">{{ sum.rate | amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
function _numFixed (num, dig) {
  return Number(num / Math.pow(10, dig)).toFixed(2)
}
export default {
  props: {
    sum: {
      type: Object
    }
  },
  filters: {
    amount: (num) => {
      if (!num) return '-'
      let str = String(num)
      // 去除小数
      str = str.replace(/\.\d+/, '')
      const len = str.length
      if (len <= 5) {
        return num
      } else if (len <= 9) {
        return `${_numFixed(num, 4)} 万`
      } else if (len <= 12) {
        return `${_numFixed(num, 8)} 亿`
      } else {
        return `${_numFixed(num, 12)} 亿亿`
      }
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
  .left,
  .right {
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
