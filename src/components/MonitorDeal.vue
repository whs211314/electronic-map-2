<template>
  <div class="monitor-deal position-space">
    <div class="title flex-center">
      <div class="txt">交易监控</div>
    </div>
    <div class="empty"></div>
    <div class="header items">
      <div class="item flex-center" :key="index"
        v-for="(item, index) in headers">
        <div class="txt">{{item}}</div>
      </div>
    </div>
    <div class="content">
      <div class="row" :key="index"
          v-for="(item, index) in items">
        <div class="items">
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.type}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.money}}元</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.dealStatus}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.riskStatus}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.isChange}}</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      txt: 'txt',
      txt01: 'txt01',
      headers: ['交易种类', '交易金额', '交易状态', '风险状态', '是否移机']
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-deal {
  position: absolute;
  font-size: var(--fontSize-12);
  .title {
    height: 12%;
    line-height: 1;
    font-weight: bold;
    .txt {
      width: 100%;
      padding-left: 3%;
      text-align: left;
    }
  }
  .items {
    display: flex;
    .item {
      flex: 1;
    }
  }
  .empty {
    height: 2%;
  }
  .header {
    height: 16%;
    font-weight: bold;
  }
  .content {
    height: 70%;
    line-height: 1;
    overflow: hidden;
    .row {
      height: 20%;
    }
  }
  .txt01 {
    width: 100%;
    padding-left: 3%;
    text-align: center;
    color: #E77641;
  }
  .txt {
    width: 100%;
    padding-left: 3%;
    text-align: center;
  }
}
</style>
