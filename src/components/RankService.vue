<template>
  <div class="rank-service position-space">
    <div class="title flex-center">
      <div
        :key="tab.id"
        v-for="tab in tabs"
        @click="toggle(tab)"
        :class="{ txt: true, active: tab.id === active }"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="swiper" v-if="items.length">
      <div class="items">
        <RankServiceItem
          class="item"
          v-for="item in items"
          :key="item.rank"
          :item="item"
          :rank="item.rank"
          @itemClick="handleClick(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RankServiceItem from './RankServiceItem'
import * as api from '@/api'

export default {
  components: { RankServiceItem },
  data () {
    return {
      active: 0,
      tabs: [
        { id: 0, label: '交易量TOP50' }
        // { id: 1, label: '去年排名TOP50' }
      ],
      originItems: [],
      items: [],
      index: 0
    }
  },
  created () {
    this.getData()
  },
  destroyed () {
    this.reset()
  },
  methods: {
    getData () {
      this.reset()
      api.getTop(this.active).then(res => {
        this.originItems = res.data.map((e, i) => Object.assign(e, { rank: i + 1 })).slice(0, 50)
        this.getItems(this.index)
        this.$nextTick(() => {
          this.handleRun()
        })
      })
    },
    reset () {
      this.index = 0
      this.items = []
      this.originItems = []
      this.timer && clearInterval(this.timer)
    },
    toggle (tab) {
      this.active = tab.id
      this.getData()
    },
    handleRun () {
      this.timer = setInterval(() => {
        this.getItems(++this.index)
      }, 6000)
    },
    getItems (start) {
      const len = this.originItems.length
      if (start + 5 <= len) {
        this.items = this.originItems.slice(start, start + 5)
      } else {
        this.items = [...this.originItems.slice(start, len), ...this.originItems.slice(0, start + 5 - len)]
      }
      // console.log(this.items)
      // console.log(this.items.map(e => e.rank))
      if (start === len - 1) this.index = 0
    },
    handleClick (item) {
      this.$emit('topEvent', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.rank-service {
  .title {
    height: 19%;
    justify-content: left;
    .txt {
      padding: 0 1.2%;
      font-size: var(--fontSize-12);
      font-weight: bold;
      cursor: pointer;
      // &.active {
      //   color: yellow;
      // }
    }
  }
  .swiper {
    position: absolute;
    left: 0;
    bottom: 8%;
    width: 100%;
    height: 62%;
    overflow: hidden;
  }
  .items {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    margin-left: 0;
    animation: run 6s linear infinite;
    .item {
      display: inline-block;
      height: 100%;
      width: 33%;
      position: relative;
      cursor: pointer;
    }
  }
}
@keyframes run {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-33%, 0, 0);
  }
}
</style>
