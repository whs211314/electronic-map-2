<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div class="item active flex-center">巡检记录展示</div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="header items">
        <div class="item flex-center" :key="index" :class="index===1?'flex-2':''"
          v-for="(item, index) in headers">
          <div class="txt">{{item}}</div>
        </div>
      </div>
      <div class="empty"></div>
      <div class="content" :class="{animation:animate}">
        <div class="row" :key="index"
            :class="txtCls(item.checkTypeName)"
            v-for="(item, index) in items">
          <div class="items">
            <div class="item flex-center"><div>{{item.cityName}}</div></div>
            <div class="item flex-center flex-2"><div>{{item.mchName}}</div></div>
            <div class="item flex-center"><div>{{item.jtmStartDate}}</div></div>
            <div class="item flex-center"><div>{{item.checkResult}}</div></div>
            <!-- <div class="item flex-center"><div>{{item.checkTypeName}}</div></div> -->
            <div class="item flex-center"><div>现场</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {
      animate: true,
      txt: 'txt',
      txt01: 'txt01',
      headers: ['地市', '金湘通服务点名称', '时间', '结果', '巡检方式']
    }
  },
  created () {
    console.log(this.items)
    setInterval(this.scroll, 2000)
  },
  methods: {
    scroll () {
      this.animate = true // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => { //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.items.push(this.items.shift()) // 将数组的第一个元素添加到数组的
        this.animate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 2000)
    },
    txtCls (name) {
      const map = {
        '现场': 'txt01',
        '远程': 'txt02'
      }
      if (map[name]) return map[name]
      return 'txt'
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.monitor-chart {
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
    height: 3%;
  }
  .header {
    height: 16%;
    font-weight: bold;
    font-size: var(--fontSize-12);
  }
  .content {
    height: 78%;
    line-height: 1;
    overflow: hidden;
    .row {
      height: 17%;
      text-align: center;
      font-size: var(--fontSize-12);
    }
  }
  .txt01 {
    color: #ffba00;
  }
  .txt02 {
    color: #00e9ff;
  }
  .txt {
    color: #ffffff;
  }
  .animation {
    transition: all 0.5s;
    margin-top: 0%;
  }
}
</style>
