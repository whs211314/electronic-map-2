<template>
  <div class="team-view">
    <div class="title flex-center">
      <div class="txt">合作视图</div>
    </div>
    <div class="empty"></div>
    <div class="items" v-if="Object.keys(items).length">
      <ViewButton
        class="item"
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :active="currentTradeName === item.tradeName"
        @itemClick="handleClick(item)"
      />
    </div>
  </div>
</template>

<script>
import ViewButton from './ViewButton'
import * as api from '@/api'

export default {
  components: { ViewButton },
  props: ['currentTradeName'],
  data () {
    return {
      items: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (areaType = 0, cityName = '') {
      api.getTrade({ areaType, cityName }).then(res => {
        const { data } = res
        const labels = Object.keys(data).sort((a, b) => Number(data[a][0].tradeType) - Number(data[b][0].tradeType))
        labels.forEach(item => {
          this.$set(this.items, item, {
            tradeName: item,
            tradeType: Number(data[item][0].tradeType),
            mix: data[item] ? Math.round(data[item][0].mix * 10000) / 100 : 0,
            count: data[item] ? data[item][0].count : 0
          })
        })
        console.log('---getTrade', cityName, this.items)
      })
    },
    handleClick (item) {
      this.$emit('teamview', item.tradeName)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/style/index.scss';
.team-view {
  position: absolute;
  left: -50%;
  right: -50%;
  top: -50%;
  bottom: -50%;
  transform: scale(0.5);
  .title {
    height: 4%;
    font-size: calc(var(--fontSize-13) * 2);
    font-weight: bold;
    .txt {
      margin-left: 12%;
    }
  }
  .empty {
    height: 3%;
  }
  .items {
    width: 68%;
    height: 86%;
    margin-left: 14%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 100%;
      height: 9.4%;
      .top {
        color: $grey;
        font-size: var(--fontSize-18);
      }
    }
  }
}
</style>
