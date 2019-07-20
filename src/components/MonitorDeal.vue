<template>
  <div class="monitor-deal position-space">
    <div class="title flex-center">
      <div class="txt">实时监控</div>
    </div>
    <div class="empty"></div>
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
          <div class="item flex-center"><div :class="index === 2?txt:txt">{{item.cityName}}</div></div>
          <div class="item flex-center flex-2"><div :class="index === 2?txt:txt">{{item.mchName}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt:txt">{{item.txnDtTm}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt:txt">{{item.tradeName}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt:txt">{{item.genproffinTxnamt}}</div></div>
          <div class="item flex-center"><div :class="index === 2?txt:txt">正常</div></div>
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
      animate: true,
      txt: 'txt',
      txt01: 'txt01',
      headers: ['地市', '金湘通服务点名称', '交易时间', '交易种类', '交易金额', '交易状态']
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
.monitor-deal {
  position: absolute;
  font-size: var(--fontSize-10);
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
    padding-left: 3%;
    text-align: center;
    color: #E77641;
  }
  .txt {
    width: 100%;
    padding-left: 3%;
    text-align: center;
  }
  .anim{
    transition: all 1s;
    margin-top: 0%;
  }
}
</style>
