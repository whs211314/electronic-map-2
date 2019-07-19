<template>
  <div class="team-view">
    <div class="title flex-center">
      <div class="txt">合作视图</div>
    </div>
    <div class="empty"></div>
    <div class="items" v-if="Object.keys(items).length === 9">
      <ViewButton class="item"
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @itemClick="handleClick(item)" />
    </div>
  </div>
</template>

<script>
import ViewButton from './ViewButton'
import * as api from '@/api'
const labels = ['政务', '卫健', '扶贫', '退伍军人', '通讯', '商超', '餐饮', '快递', '电商']

export default {
  components: { ViewButton },
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
        labels.forEach(item => {
          this.$set(this.items, item, {
            tradeName: item,
            mix: data[item] ? data[item][0].mix : 0,
            count: data[item] ? data[item][0].count : 0
          })
        })
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
  .title{
    height: 4%;
    font-size: calc(var(--fontSize-13) * 2);
    font-weight: bold;
    .txt {
      margin-left: 12%;
    }
  }
  .empty {
    height: 2%;
  }
  .items {
    width: 68%;
    height: 85%;
    margin-left: 14%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 100%;
      height: 10%;
      .top {
        color: $grey;
        font-size: var(--fontSize-18);
      }
    }
  }
}
</style>
