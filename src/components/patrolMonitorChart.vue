<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">巡检记录展示</div>
      </div>
    </div>
    <div class="chart">
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
          <div class="item flex-center flex-width"><div :class="index === 2?txt01:txt">{{item.money}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.dealStatus}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.riskStatus}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.isChange}}</div></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      txt: 'txt',
      txt01: 'txt01',
      headers: ['地市', '金湘通服务点名称', '时间', '结果', '方式'],
      items: Array.from({ length: 5 }, () => ({ type: '长治市', money: '长治市某服务网点', dealStatus: '12:00:56', riskStatus: '正常', isChange: '现场' }))
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
  .title {
    position: absolute;
    top: 1%;
    left: 20%;
    width: 100%;
    height: 12%;
    font-size: var(--fontSize-12);
    font-weight: bold;
    .tab {
      @extend .flex-center;
      justify-content: start;
      .item {
        width: 20%;
        &.active {
          background: #00b7b4;
        }
      }
    }
  }
  .chart {
    position: absolute;
    left: 20%;
    bottom: 0;
    height: 86%;
    width: 80%;
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
    text-align: center;
    color: #E77641;
    font-size: var(--fontSize-8);
  }
  .txt {
    width: 100%;
    text-align: center;
    font-size: var(--fontSize-8);
  }
  .flex-width {
    flex-grow: 0;
    flex-shrink: 0;
    width: 300px
  }
}
</style>
