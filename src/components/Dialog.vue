<template>
  <div class="view-dialog-wrapper" v-show="currentVisible">
    <div class="view-dialog">
      <div class="view-dialog-inner">
        <div class="view-dialog-header">
          <div class="title">视图信息</div>
          <span class="close" @click="currentVisible = false" />
        </div>
        <div class="cartonType">
          <div class="left-img">
            <div v-for="(e, i) in images" :key="i" class="avatar">
              <!-- <div class="txt">{{ e.txt }}</div> -->
              <img :src="e.src" alt />
            </div>
          </div>
          <div class="right-txt">
            <div class="item" v-for="item in items" :key="item.key">
              <div class="label">{{ item.label }}：</div>
              <div class="value">
                <template v-if="item.children">
                  <div v-for="sub in item.children" :key="sub.key">
                    {{ sub.label }} {{ dataObj[sub.key] }}
                  </div>
                </template>
                <span v-else>{{ dataObj[item.key] || '--' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dataObj: {
      type: Object
    }
  },
  data () {
    return {
      currentVisible: false,
      items: [
        { label: '服务点名称', key: 'mchName' },
        { label: '服务点类型', key: 'mchType' },
        { label: '业主名称', key: 'userName' },
        {
          label: '交易笔数',
          children: [
            { label: '累计', key: 'count' },
            { label: '本年', key: 'yearTranscount' }
          ]
        },
        {
          label: '交易金额',
          children: [
            { label: '累计', key: 'amount' },
            { label: '本年', key: 'yearTransamount' }
          ]
        },
        {
          label: '风险预警',
          children: [
            { label: '本年', key: 'yearRiskWarnCount' },
            { label: '一级', key: 'yearRiskWarnCount1' },
            { label: '二级', key: 'yearRiskWarnCount2' },
            { label: '三级', key: 'yearRiskWarnCount3' }
          ]
        },
        {
          label: '终端异常',
          children: [
            { label: '本年', key: 'yearTermErrorCount' },
            { label: '本月', key: 'monthTermErrorCount' }
          ]
        },
        {
          label: '服务手续费',
          children: [
            { label: '累计', key: 'reward' },
            { label: '上月', key: 'preMonthReward' }
          ]
        },
        { label: '客户经理', key: 'managerName' }
      ]
    }
  },
  computed: {
    images () {
      const list = [
        { key: 'businessUrl', txt: '营业执照' },
        { key: 'doorUrl', txt: '门头照' },
        { key: 'idUrl', txt: '身份证' },
        { key: 'cardUrl', txt: '卡号' }
      ]
      return list.map(e => ({ src: this.getImg(this.dataObj[e.key]), ...e }))
    }
  },
  methods: {
    getImg (src) {
      return src ? `http://54.0.94.84/jxt_image/${src}` : require('../assets/images/no-img.png')
    },
    // 点击新增弹窗里面确认按钮处理的数据
    addCheckedCitiesChange () {
    }
  },
  watch: {
    currentVisible (val) {
      this.$emit('update:dialogVisible', val)
    },
    dialogVisible: {
      handler (val) {
        this.currentVisible = val
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.view-dialog {
  box-sizing: border-box;
  padding: 30px;
  .view-dialog-inner {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 1px solid #91fff9;
    padding: 35px;
    padding-top: 45px;
    .view-dialog-header {
      position: relative;
      .title {
        position: absolute;
        top: -58px;
        left: -10px;
        font-size: 20px;
        padding: 0 10px;
        background-color: rgba(23, 45, 47, 0.9);
        font-weight: bold;
      }
      .close {
        position: absolute;
        top: -30px;
        right: -20px;
        display: inline-block;
        height: 1em;
        width: 1em;
        font-size: 34px;
        box-sizing: border-box;
        text-indent: -9999px;
        vertical-align: middle;
        cursor: pointer;
        &::before {
          content: '';
          box-sizing: inherit;
          position: absolute;
          left: 50%;
          top: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          width: 90%;
          border-top: 4px solid;
          -ms-transform: translate(-50%, -50%) rotate(45deg);
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &::after {
          content: '';
          box-sizing: inherit;
          position: absolute;
          left: 50%;
          top: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          height: 90%;
          border-left: 4px solid;
          -ms-transform: translate(-50%, -50%) rotate(45deg);
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
    }
  }
  .cartonType {
    color: #fff;
    overflow: hidden;
    .left-img {
      float: left;
      font-size: 0;
      width: 670px;
      .avatar {
        font-size: 14px;
        display: inline-block;
        text-align: center;
        margin-right: 20px;
        margin-bottom: 20px;
        img {
          width: 312px;
          height: 228px;
        }
      }
    }
    .right-txt {
      overflow: hidden;
      font-size: 18px;
      line-height: 30px;
      border-left: 1px solid #ccc;
      padding-left: 10px;
      display: table;
      .item {
        display: table-row;
        .label {
          display: table-cell;
          width: 120px;
          text-align: right;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
