<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">巡检记录展示</div>
      </div>
    </div>
    <div class="chart">
      <div class="header items">
      <div class="item flex-center" :key="index" :class="index===1?'flex-2':''"
        v-for="(item, index) in headers">
        <div class="txt">{{item}}</div>
      </div>
    </div>
    <div class="content" :class="{anim:animate==true}">
      <div class="row" :key="index"
          v-for="(item, index) in items">
        <div class="items">
          <div class="item flex-center"><div :class="index === 2?txt01:txt">{{item.type}}</div></div>
          <div class="item flex-center flex-2"><div :class="index === 2?txt01:txt">{{item.money}}</div></div>
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
      items: [
        { type: '长治市', money: '长沙市某某服务网点', dealStatus: '02:22:54', riskStatus: '异常', isChange: '现场' },
        { type: '长沙市', money: '长沙市某某服务网点', dealStatus: '12:32:43', riskStatus: '正常', isChange: '现场' },
        { type: '永州市', money: '长沙市某某服务网点', dealStatus: '16:43:2', riskStatus: '异常', isChange: '现场' },
        { type: '怀化市', money: '长沙市某某服务网点', dealStatus: '07:20:21', riskStatus: '正常', isChange: '现场' },
        { type: '衡阳市', money: '长沙市某某服务网点', dealStatus: '09:14:23', riskStatus: '异常', isChange: '现场' },
        { type: '邵阳市', money: '长沙市某某服务网点', dealStatus: '23:32:32', riskStatus: '正常', isChange: '现场' }
      ]
    }
  },
  created () {
    setInterval(this.scroll, 1000)
  },
  methods: {
    scroll () {
      this.animate = true // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.items.push(this.items[0]) // 将数组的第一个元素添加到数组的
        this.items.shift() // 删除数组的第一个元素
        this.animate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 2000)
    }
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
        cursor: pointer;
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
  .flex-2 {
    flex: 2;
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
  .anim{
    transition: all 0.5s;
    margin-top: 0%;
  }
}
</style>
