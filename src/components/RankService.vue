<template>
  <div class="rank-service position-space">
    <div class="title flex-center"><div class="txt">服务点交易排名</div></div>
    <div class="swiper">
      <swipe class="swipe"
        ref="swipe"
        :auto="5000"
        :disabled="true"
        :show-indicators="false"
        @change="handleSwipeChange">
        <swipe-item class="items">
          <RankServiceItem class="item" :rank="1" />
          <RankServiceItem class="item" :rank="2" />
          <RankServiceItem class="item" :rank="3" />
        </swipe-item>
        <swipe-item class="items">
          <RankServiceItem class="item" :rank="4" />
          <RankServiceItem class="item" :rank="5" />
          <RankServiceItem class="item" :rank="6" />
        </swipe-item>
        <swipe-item class="items">
          <RankServiceItem class="item" :rank="7" />
          <RankServiceItem class="item" :rank="8" />
          <RankServiceItem class="item" :rank="9" />
        </swipe-item>
      </swipe>
    </div>
    <div class="indicator flex-center">
      <div class="indicator-item"
        :class="{active: currentIndex===i}"
        v-for="(_, i) in 3" :key="i"
        @click="handleSwipeGo(i)"></div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vue-swipe'
import RankServiceItem from './RankServiceItem'

export default {
  components: { Swipe, SwipeItem, RankServiceItem },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleSwipeChange (index) {
      this.currentIndex = index
    },
    handleSwipeGo (index) {
      this.$refs.swipe.goto(index)
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
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 12%;
    width: 100%;
    height: 62%;
  }
  .items .item {
    display: inline-block;
    height: 100%;
    width: 33%;
    position: relative;
  }
  .indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12%;
    .indicator-item {
      @include bgImage('../assets/images/indicator.png');
      cursor: pointer;
      width: 6%;
      height: 50%;
      &.active {
        @include bgImage('../assets/images/indicator-active.png');
      }
    }
  }
}
</style>
