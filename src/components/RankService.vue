<template>
  <div class="rank-service position-space">
    <div class="title flex-center"><div class="txt">综合排名TOP100</div></div>
    <div class="swiper" v-if="items.length">
      <div class="items">
        <RankServiceItem class="item"
          v-for="item in items"
          :key="item.rank"
          :item="item"
          :rank="item.rank"
          @itemClick="handleClick(item)" />
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
      originItems: [],
      items: [],
      move: false,
      index: 0
    }
  },
  created () {
    api.getTop().then(res => {
      this.originItems = res.data.map((e, i) => Object.assign(e, { rank: i + 1 }))
      this.getItems(this.index)
      this.$nextTick(() => {
        this.handleRun()
      })
    })
  },
  destroyed () {
    this.handlePause()
  },
  methods: {
    handleRun () {
      this.timer = setInterval(() => {
        this.getItems(++this.index)
      }, 3000)
    },
    handlePause () {
      this.timer && clearInterval(this.timer)
    },
    getItems (start) {
      const len = this.originItems.length
      if (start + 5 <= len) {
        this.items = this.originItems.slice(start, start + 5)
      } else {
        this.items = [...this.originItems.slice(start, len), ...this.originItems.slice(0, start + 5 - len)]
      }
      console.log(this.items)
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
    .txt {
      width: 100%;
      text-align: left;
      padding-left: 1.2%;
      font-size: var(--fontSize-12);
      font-weight: bold;
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
    animation: run 3s linear infinite;
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
