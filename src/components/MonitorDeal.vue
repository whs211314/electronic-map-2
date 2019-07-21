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
    <div class="content">
      <div class="wrapper" :style="animate?animateStyle:initStyle"
        @transitionend="handleTransitionEnd">
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
      txt: 'txt',
      txt01: 'txt01',
      headers: ['地市', '金湘通服务点名称', '交易时间', '交易种类', '交易金额', '交易状态'],
      tranEndTimes: 1,
      // 交易种类字典
      transactionTypes: {
        助农终端参数下载: '参数下载',
        获取流水号: '获取流水号',
        公交IC卡信息查询: '公交IC',
        公交IC卡充值: '公交IC',
        公交IC卡写卡确认: '公交IC',
        通讯缴费查询: '电信缴费',
        信用卡还款验证: '信用卡',
        转账验证: '转账验证',
        转账: '转账',
        郴电国际费用查询: '郴电国际',
        郴电国际缴费: '郴电国际',
        水电煤欠费查询: '水电煤',
        联通保证金充值确认: '联通保证金',
        获取读卡密钥: '获取读卡密钥',
        水电煤缴费: '水电煤',
        卡表充值: '卡表充值',
        写卡日志更新: '写卡日志更新',
        水电煤缴费撤销: '水电煤',
        电费收据打印: '电费',
        电费明细单打印: '电费',
        现金汇款: '现金汇款',
        转账汇款: '转账汇款',
        国税参保查询: '行政代收缴',
        国税缴费基数或档次查询: '行政代收缴',
        国税灵活就业查询: '行政代收缴',
        国税城乡居民查询: '行政代收缴',
        国税社保缴费: '行政代收缴',
        国网电力缴费信息查询: '国网电力',
        国网电力缴费: '国网电力',
        查询补打: '查询补打',
        国网电力票据打印请求: '国网电力',
        国税社保缴费撤销: '行政代收缴',
        衡阳燃气普表查询: '衡阳燃气',
        衡阳燃气普表缴费: '衡阳燃气',
        衡阳燃气IC表用户信息查询: '衡阳燃气',
        衡阳燃气IC表缴费: '衡阳燃气',
        衡阳燃气明细查询: '衡阳燃气',
        批上送: '批上送',
        灵活医保缴费查询: '灵活医保',
        灵活医保缴费: '灵活医保',
        灵活医保个人账户查询: '灵活医保',
        灵活医保撤销: '灵活医保',
        扫码付消费撤销: '扫码消费',
        内部报文错误: '内部报文错误',
        参数信息查询: '参数查询',
        银行卡余额查询: '余额查询',
        结算: '结算',
        消费: '消费',
        消费冲正: '消费冲正',
        消费撤销: '消费撤销',
        本省通讯缴费: '通讯缴费',
        保证金手续费查询: '手续费查询',
        保证金确认: '保证金确认',
        卡表充值查询: '卡表查询',
        中燃燃气查询: '燃气查询',
        被扫: '被扫',
        中燃燃气缴费: '燃气缴费',
        有线电视查询: '有线电视',
        有线电视缴费: '有线电视',
        建行卡转账查询: '转账查询',
        建行卡转账通知: '转账通知',
        建行卡转账确认: '转账确认',
        建行卡转账查询二: '转账查询',
        助农取款冲正: '冲正',
        未裁决违法缴费: '违法缴费',
        未裁决违法查询: '违法查询',
        已裁决违法缴费: '违法缴费',
        已裁决违法查询: '违法查询',
        缴费结果查询: '缴费查询',
        交通罚款注册: '交通罚款',
        预约登记: '预约登记',
        新卡首笔交易: '新卡首笔交易',
        湘西花垣电力查询: '花垣电力',
        湘西花垣电力缴费: '花垣电力'
      },
      initStyle: {
        transition: 'none',
        transform: 'translate3d(0, 0, 0)'
      }
    }
  },
  computed: {
    animateStyle () {
      return {
        transition: `all ${this.getDuration()}s`,
        transform: 'translate3d(0, -20%, 0)'
      }
    }
  },
  created () {
    this.getData()
    setInterval(this.scroll, 1000)
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
    getDuration () {
      const currHour = new Date().getHours()
      if (currHour >= 8 && currHour <= 22) return 1
      return 30
    },
    scroll () {
      this.animate = true
    },
    handleTransitionEnd () {
      this.animate = false
      this.items.push(this.items.shift())
      this.tranEndTimes += 1
    },
    getData () {
      // 实施监控
      api.getTransLog({ pageIndex: this.index }).then(res => {
        this.tranEndTimes = 1
        res.data.forEach((item, index) => {
          if (index > 1 && (item.mchName !== res.data[index - 1].mchName) && (item.mchName !== res.data[index - 2].mchName)) {
            item.txnDtTm = new Date().getHours() + ':' + new Date().getMinutes()
            item.genproffinTxnamt = item.genproffinTxnamt / 100
            item.tradeName = this.transactionTypes[item.tradeName] ? this.transactionTypes[item.tradeName] : item.tradeName.split('（')[0]
            this.items.push(item)
          }
        })
      })
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
    .wrapper {
      height: 100%;
      .row {
        height: 20%;
      }
      &.anim {
        transition: all 1s;
        transform: translate3d(0, -20%, 0);
      }
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
}
</style>
