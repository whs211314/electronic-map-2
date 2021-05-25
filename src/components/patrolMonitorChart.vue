<template>
  <div class="monitor-chart position-space">
    <div class="title">
      <div class="tab">
        <div
          v-for="item in tabs"
          :key="item.key"
          class="item flex-center"
          :class="{ active: item.key === active }"
          @click="handleTabChange(item.key)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="header items">
        <div
          class="item flex-center"
          :key="index"
          :class="index === 1 ? 'flex-2' : ''"
          v-for="(item, index) in headers"
        >
          <div class="txt">{{ item }}</div>
        </div>
      </div>
      <div class="empty"></div>
      <div class="content" :class="{ animation: animate }">
        <div
          class="wrapper"
          :style="animate ? animateStyle : initStyle"
          @transitionend="handleTransitionEnd"
        >
          <div
            class="row"
            :key="index"
            :class="txtCls(item.checkTypeName)"
            v-for="(item, index) in items"
          >
            <div class="items">
              <div class="item flex-center">
                <div>{{ item.cityName }}</div>
              </div>
              <div class="item flex-center flex-2">
                <div>{{ item.mchName }}</div>
              </div>
              <div class="item flex-center">
                <div>{{ item.changeDate }}</div>
              </div>
              <div class="item flex-center">
                <div>{{ item.checkResult }}</div>
              </div>
              <!-- <div class="item flex-center"><div>{{item.checkTypeName}}</div></div> -->
              <div class="item flex-center"><div>{{active === 1 ? '现场': '远程'}}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
export default {
  data () {
    return {
      items: [],
      index: 1,
      animate: false,
      active: 1,
      tranEndTimes: 1,
      tabs: [
        { key: 1, label: '现场巡检' },
        { key: 2, label: '远程巡检' }
      ],
      txt: 'txt',
      txt01: 'txt01',
      headers: ['地市', '金湘通服务点名称', '时间', '结果', '巡检方式'],
      initStyle: {
        transition: 'none',
        transform: 'translate3d(0, 0, 0)'
      },
      animateStyle: {
        transition: 'all 1s',
        transform: 'translate3d(0, -20%, 0)'
      }
    }
  },
  created () {
    this.getData()
    this.timer = setInterval(this.scroll, 1000)
  },
  watch: {
    tranEndTimes (val) {
      if (val === 10) {
        this.index += 1
        this.getData()
      }
    }
  },
  methods: {
    handleTabChange (key) {
      this.active = key
      this.reset()
      this.getData()
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(this.scroll, 1000)
    },
    scroll () {
      this.animate = true
    },
    reset () {
      this.index = 1
      this.tranEndTimes = 1
    },
    handleTransitionEnd () {
      this.animate = false
      this.items.push(this.items.shift())
      this.tranEndTimes += 1
    },
    txtCls (name) {
      const map = {
        '现场': 'txt01',
        '远程': 'txt02'
      }
      if (map[name]) return map[name]
      return 'txt'
    },
    getData () {
      api.getCheckInfoPage({ pageIndex: this.index, checkType: this.active }).then(res => {
        this.tranEndTimes = 1
        this.items = res.data
      })
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
    height: 75%;
    line-height: 1;
    overflow: hidden;
    > .wrapper {
      height: 100%;
      .row {
        height: 20%;
        text-align: center;
        font-size: var(--fontSize-12);
      }
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
