<template>
  <div class="dashboard">
    <div class="dashboard-bg position-space"></div>
    <!-- <div class="logo"></div> -->
    <!-- 便民服务 -->
    <div class="show-top">
      <div class="title-show flex-center">
        <div class="txt">便民服务</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services1" :key="index">
          <MButton type="1" :txt="item.type" :hasDialog="true" position="top" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 政务服务能力 -->
    <div class="show-middle">
      <div class="title-show flex-center">
        <div class="txt">政务服务</div>
      </div>
      <div class="empty"></div>
      <div class="items-show" style="height:70%">
        <div class="item" v-for="(item, index) in services2" :key="index">
          <MButton type="2" :txt="item.type" :hasDialog="true" position="top" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 实体经济服务 -->
    <div class="show-bottom">
      <div class="title-show flex-center">
        <div class="txt">实体经济</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services3" :key="index" :style="{zIndex: index>2?6-index:'auto'}">
          <MButton :type="item.id || 5" :txt="item.type" :hasDialog="true" position="bottom" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 扶贫能力展示 -->
    <div class="show-right">
      <div class="title-show flex-center">
        <div class="txt">扶贫能力</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services4" :key="index">
          <MButton type="2" :txt="item.type" :hasDialog="true" :noBg="!item.type" position="bottom" :isLarge="true" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 饼图部分 -->
    <div class="pie">
      <Pie :pieList= 'pieList' :tier='tier'/>
    </div>
    <!-- 交易信息区 -->
    <div class="summary">
      <DealInfo v-if="!internalNetwork" :sum='sum'/>
      <!-- 商户画像 -->
      <merchantsPortrait :home_url="home_url" :home_url1='home_url1' :basicInfo="basicInfo" :client="client" :patrol="patrol" :record="record" :deal="deal" :data="currJmpInfo" v-if="internalNetwork" />
    </div>
    <!-- 地图 -->
    <div class="map-bk"></div>
    <div class="map-transform"></div>
    <div class="map">
      <component
        :ref="chartType"
        :is="chartType"
        :topData="topItem"
        @popup="handlePopup"
        @goDown="handleGoDown"
        @showDeploy="chartType='ChartDeploy'" />
      <MPopup v-show="popupVisible"
        :popup="popup"
        :visible.sync="popupVisible"
        @deployEvent="handleDeployEvent" />
    </div>
    <!-- 地图操作 -->
    <div class="map-operation">
      <div class="deal fr flex-center"
        :class="{active:chartType==='ChartDeal'}"
        @click="handleChart('ChartDeal')">
        <div class="txt">交易地图</div>
      </div>
      <div class="deploy fl flex-center"
        :class="{active:chartType!=='ChartDeal'}"
        @click="handleChart('ChartDeploy')">
        <div class="txt">分布地图</div>
      </div>
    </div>
    <!-- 合作视图 -->
    <div class="teamview">
      <TeamView @teamview="handleTeamview" ref="teamviewRef" />
    </div>
    <!-- 实时监控 -->
    <div class="monitor-top-r">
      <MonitorDeal :items="monitorDealList" />
    </div>
    <!-- 监控按钮 active -->
    <div class="monitor-top-l items-monitor flex-center">
      <div class="item flex-center" :key="index" :class="monitorIndex == index ? 'active':''"
        v-for="(item, index) in monitors" @click="monitorClick(index)">
        <div class="txt">{{item.type}}</div>
      </div>
    </div>
    <!-- 服务点视图-->
    <div v-if="monitorIndex === 0" class="monitor-middle">
      <serviceMonitorChart />
    </div>
    <!-- 异常终端视图 -->
    <div v-if="monitorIndex === 1" class="monitor-middle">
      <terminalMonitorChart />
    </div>
    <!-- 交易视图 -->
    <div v-if="monitorIndex === 2" class="monitor-middle">
      <transactionMonitorChart />
    </div>
    <!-- 风险预警 -->
    <div v-if="monitorIndex === 3" class="monitor-middle">
      <riskMonitorChart />
    </div>
    <!-- 巡检 -->
    <div v-if="monitorIndex === 4" class="monitor-middle">
      <patrolMonitorChart :items='monitorIndexList'/>
    </div>
    <!-- 服务点交易排名 -->
    <div class="monitor-bottom">
      <RankService @topEvent="handleTopEvent" />
    </div>
  </div>
</template>

<script>
import MButton from '@/components/MButton'
import TeamView from '@/components/TeamView'
import MonitorDeal from '@/components/MonitorDeal'
import Pie from '@/components/Pie'
import DealInfo from '@/components/DealInfo'
import merchantsPortrait from '@/components/merchantsPortrait'
import RankService from '@/components/RankService'
import serviceMonitorChart from '@/components/serviceMonitorChart'
import terminalMonitorChart from '@/components/terminalMonitorChart'
import transactionMonitorChart from '@/components/transactionMonitorChart'
import riskMonitorChart from '@/components/riskMonitorChart'
import patrolMonitorChart from '@/components/patrolMonitorChart'
import ChartDeploy from '@/components/ChartDeploy'
import ChartDeal from '@/components/ChartDeal'
import ChartTop from '@/components/ChartTop'
import MPopup from '@/components/MPopup'
import * as api from '@/api'

export default {
  components: {
    MButton,
    TeamView,
    MonitorDeal,
    Pie,
    DealInfo,
    merchantsPortrait,
    RankService,
    serviceMonitorChart,
    terminalMonitorChart,
    transactionMonitorChart,
    riskMonitorChart,
    patrolMonitorChart,
    ChartDeploy,
    ChartDeal,
    ChartTop,
    MPopup
  },
  data () {
    return {
      internalNetwork: false, // 是否内部网点弹窗
      monitorIndex: 0, // 监控按钮初始化索引
      basicInfo: false, // 基本信息
      client: false, // 客户信息
      patrol: false, // 远程巡检
      record: false, // 巡检记录
      deal: false, // 交易
      chartType: 'ChartDeploy', // 地图类型
      monitorIndexList: [],
      tier: [],
      numberId: '',
      home_url: '',
      home_url1: '',
      popupVisible: false,
      popup: {},
      topItem: {},
      currJmpInfo: {}, // 当前服务点数据
      monitorPageNo: 1,
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      }, // 饼图数据
      sum: {
        netSum: '',
        serverCount: '',
        cardAllSum: '',
        transAllSum: '',
        phoneCustomerCount: '',
        areaCount: '',
        yearCardCount: '',
        yearAddCardMoney: '',
        rate: ''
      },
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
      services1: [
        { type: '现金业务', name: '个人客户小额存取现服务，累计交易笔数为265899笔，占总交易笔数17.13%，累计交易金额29111.55万元，占总交易金额12.07%。' },
        { type: '贷款业务', name: '个人商户农商贷金融产品服务9630客户，累计发放贷款金额1060万元。' },
        { type: '转账业务', name: '银行卡实时转账服务，累计交易笔数为92098笔，占总交易笔数6%，累计交易金额17360.43万元，占总交易金额7.2%。' },
        { type: '缴费业务', name: '水、电、气、话费等查询缴费服务，累计交易笔数为469339笔，占总交易笔数30.24%，交易金额21358.92万元，占总交易金额8.85%。' },
        { type: '投资理财', name: '建信人寿意外险、财产险、车险等保险，贵金属、专属理财产品等投资理财产品购买服务，累计交易2.38万人，服务贫困人口138人，金融精准扶贫贷款余额115.09亿元。' },
        { type: '快递代理', name: '顺丰、圆通等快递业务代理服务，累计服务1473人。' },
        { type: '电商业务', name: '农产品进城电商线上产品服务，累计服务6539人，消费金额87.6万。' },
        { type: '家电维修', name: '与海尔合作提供家电维修预约服务，累计服务1075人。' },
        { type: '通讯运营商', name: '电信运营商手机号卡发放、充值、套餐购买等服务，累计服务1075人。' }
      ],
      services2: [
        { type: '社保业务', name: '城乡居民养老保险查询及缴费服务，累计服务客户9.8万人，缴费金额5600万元。' },
        { type: '医保业务', name: '城乡居民医疗保险查询及缴费服务，累计服务客户18.6万人，缴费金额8490万元。' },
        { type: '交通违章', name: '车辆违章查询及缴费服务，累计服务客户8534人，缴费金额135600元。' },
        { type: '医院挂号', name: '电子健康卡注册及医院远程预约挂号服务，累计服务客户670人。' },
        { type: '党费云', name: '单位和党员党费缴纳服务，累计服务客户18745人，缴费金额342190元。' },
        { type: '公交充值', name: '公交IC卡充值服务，累计服务客户18745人，缴费金额342190元。' },
        { type: '燃气充值', name: '燃气IC卡充值服务，累计服务客户12405人，缴费金额856.00万元。' },
        { type: '有线电视', name: '湖南有线电视节目定制及购买服务，累计服务客户6380人，缴费金额1786.00万元。' },
        { type: '生育证办理', name: '居民生育证等证件在线办理和邮递服务，累计服务客户43人。' }
      ],
      services3: [
        { id: 1, type: '惠懂你', name: '扫码注册、贷款申请等线上服务，累计惠懂你下载1.6万户。' },
        { id: 1, type: '特色产业', name: '信贷资源向农业产业化龙头企业和新型农业生产经营主体倾斜，累计在贫困地区普惠金融贷款余额45.84亿元，累计扶持小微企业客户1000多户。' },
        { type: '预约开户', name: '银行账户预约开户服务。' },
        { type: '对公客户存取现', name: '单位结算卡小额存取现及缴税服务。' },
        { type: '对公客户缴费税', name: '单位结算卡缴税和缴费服务。' },
        { type: '对公客户转账', name: '单位结算卡转账服务。' }
      ],
      services4: [
        { type: '扶贫贷款', name: '乡镇客户提供贷款融资现服务，直接帮扶带动贫困人口2.38万人，服务贫困人口183人，金融精准扶贫贷款余额115.09亿元。' },
        { type: '定点扶贫', name: '建行扶贫村94个全覆盖，举办水稻种植、黑斑蛙养殖、土鸡养殖、特色水果种植等培训班3次，参训村民90余人次。' },
        { type: '金智惠民', name: '村民民金融服务，培训内容包括讲授党课、农业政策、金融知识、养殖种植等，举办惠民培训80期，覆盖10623人次，定期举办“金融知识万里行”活动，金融服务下乡活动1521场。' },
        { type: '电商扶贫', name: '组织善融扶贫 爱心助力线上专题活动116场，销售扶贫商品7920件，扶贫销售额6.08亿元。' },
        { },
        { }
      ],
      monitors: [{ type: '服务点视图' }, { type: '异常终端视图' }, { type: '交易视图' }, { type: '风险预警' }, { type: '巡检' }],
      monitorDealList: []
    }
  },
  created () {
    api.getPieData().then(res => {
      this.pieList.taCountryYearCount = (res.data[0].taProvinceYearCount / res.data[0].taCountryYearCount).toFixed(2) * 100
      this.pieList.taCountryCount = (res.data[0].taProvinceCount / res.data[0].taCountryCount).toFixed(2) * 100
      console.log(this.pieList)
    })
    this.monitorTask()
    this.pieBotton()
  },
  watch: {
    popupVisible (val) {
      if (!val) {
        this.internalNetwork = false
        this.numberId = ''
      }
    }
  },
  methods: {
    // 监控按钮弹窗
    monitorClick (index) {
      this.monitorIndex = index
      if (index === 4) {
        api.getCheckInfoPage({ 'pageIndex': 1 }).then(res => {
          this.monitorIndexList = res.data
        })
        console.log(this.monitorIndexList)
      }
    },
    // 地图切换
    handleChart (type) {
      if (type === 'ChartDeploy') {
        this.tier = []
        this.$nextTick(() => {
          this.$refs.ChartDeploy.goBackInitMap()
          this.$refs.teamviewRef.getData()
          this.pieBotton()
        })
      }
      this.chartType = type
    },
    handlePopup (popup) {
      this.popupVisible = true
      this.popup = popup
    },
    handleDeployEvent (data, code) {
      this.internalNetwork = true
      // let arr = [81072069, 86617567, 90231567, 93538191, 97778229, 98662928, 99593687, 99901760, 68729821, 68758978, 68988123, 69366959, 69830902, 72018175, 72317666, 71303370, 79658960, 80915399, 79976903, 83026812, 92665315, 93008812, 91368263, 97702962]
      console.warn('--点击部署选项触发--', data, code)
      if (this.numberId === '') {
        this.numberId = data.id
        // this.home_url = require('../../assets/jingli/' + arr[Math.floor(Math.random() * arr.length)] + '.png')
      }
      this.currJmpInfo.essential = data // 基础信息
      this.home_url1 = 'http://54.0.94.84/jxt_image/' + data.jpmDoorHeadImagePath + ''
      console.log(this.currJmpInfo)
      switch (code) {
        case 1:
          this.basicInfo = true // 基本信息
          this.client = false
          this.patrol = false
          this.record = false
          this.deal = false
          break
        case 2:
          this.basicInfo = false
          this.patrol = false
          this.record = false
          this.deal = false
          api.getManagerInfo({ 'mchId': data.jpmMchId }).then(res => {
            this.currJmpInfo.client = res.data[0]
            this.home_url = 'http://54.0.94.84/kehujingli/' + res.data[0].managerCode + '.png'
            this.client = true // 客户信息 home_url
          })
          // if (Number(this.numberId) === data.id) {
          //   this.home_url = this.home_url
          // } else {
          //   this.home_url = require('../../assets/jingli/' + arr[Math.floor(Math.random() * arr.length)] + '.png')
          // }
          break
        case 3:
          this.client = false
          this.basicInfo = false
          this.patrol = false
          this.record = false
          api.getMchTrans({ 'mchId': data.jpmMchId }).then(res => {
            console.log(res)
            this.currJmpInfo.deal = res.data
            this.deal = true // 交易
          })
          break
        case 4:
          this.patrol = true // 巡检信息
          this.client = false
          this.basicInfo = false
          this.record = false
          this.deal = false
          break
        case 5:
          this.patrol = false // 巡检记录
          this.client = false
          this.basicInfo = false
          this.deal = false
          api.getCheckInfo({ 'mchId': data.jpmMchId }).then(res => {
            console.log(res)
            this.currJmpInfo.record = res.data
            this.record = true
          })
          break
      }
    },
    handleGoDown (e) {
      console.warn('--部署地图下钻触发--')
      console.info(JSON.stringify(e))
      this.tier.push(e)
      console.log(this.tier)
      // 事实监控
      // this.monitorTask(e)
      const { level, name } = e
      // 合作视图仅在市县级更新
      if (level === 2) this.$refs.teamviewRef.getData(1, name)
      if (level === 1) this.$refs.teamviewRef.getData()
      // 饼图下数据
      this.pieBotton(e)
    },
    pieBotton (e) {
      let pieBotton = {
        areaType: 0,
        cityName: e ? e.name : '',
        areaName: '',
        pageIndex: this.monitorPageNo
      }
      if (e && e.allName) {
        pieBotton.areaType = 1
        this.proportion = String(Math.floor(Math.random() * (15 - 56) + 56))
      }
      if (e && e.allName.split('_').length > 1) {
        pieBotton.cityName = e.allName.split('_')[0]
        pieBotton.areaName = e.allName.split('_')[1]
        pieBotton.pageIndex = this.monitorPageNo
        pieBotton.areaType = 2
        this.proportion = String(Math.floor(Math.random() * (15 - 56) + 56))
      }
      // 饼图下数据
      api.getDataSum(pieBotton).then(res => {
        this.sum.cardAllSum = res.data[0].cardAllSum
        this.sum.netSum = res.data[0].netSum
        this.sum.serverCount = res.data[0].serverCount
        this.sum.transAllSum = String(parseInt(res.data[0].transAllSum / 1000000))
        this.sum.phoneCustomerCount = res.data[0].phoneCustomerCount
        this.sum.areaCount = res.data[0].areaCount
        this.sum.yearCardCount = res.data[0].yearCardCount
        this.sum.yearAddCardMoney = Math.round(res.data[0].yearAddCardMoney / 1000000)
        this.sum.rate = String(res.data[0].rate).substring(0, 3)
      })
    },
    MonitorDeal (e) {
      let page = {
        cityName: e ? e.name : '',
        areaName: '',
        pageIndex: this.monitorPageNo
      }
      if (e && e.allName.split('_').length > 1) {
        page.cityName = e.allName.split('_')[0]
        page.areaName = e.allName.split('_')[1]
        page.pageIndex = this.monitorPageNo
      }
      // 实施监控
      api.getTransLog(page).then(res => {
        // let list = []
        // list.push(res.data[0])
        res.data.forEach((item, index) => {
          if (index > 1 && (item.mchName !== res.data[index - 1].mchName) && (item.mchName !== res.data[index - 2].mchName)) {
            item.txnDtTm = new Date().getHours() + ':' + new Date().getMinutes()
            item.genproffinTxnamt = item.genproffinTxnamt / 100
            item.tradeName = this.transactionTypes[item.tradeName] ? this.transactionTypes[item.tradeName] : item.tradeName.split('（')[0]
            this.monitorDealList.push(item)
          }
        })
        // this.monitorDealList = list.map(item => Object.assign(item, {
        //   txnDtTm: new Date().getHours() + ':' + new Date().getMinutes(), // + ':' + new Date().getSeconds(), // item.txnDtTm ? item.txnDtTm.split('T')[1] : '',
        //   genproffinTxnamt: item.genproffinTxnamt / 100,
        //   tradeName: this.transactionTypes[item.tradeName] ? this.transactionTypes[item.tradeName] : item.tradeName.split('（')[0]
        // }))
        this.monitorPageNo += 1
      })
    },
    monitorTask (e) {
      this.monitorPageNo = 1
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.MonitorDeal(e)
      }, 10 * 1000)
    },
    fromData (time) {
      var dateee = new Date(time).toJSON()
      console.log(dateee)
      var date = new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

      return date
    },
    // 点击排行榜
    handleTopEvent (item) {
      console.log(item)
      this.popupVisible = false
      this.chartType = 'ChartTop'
      this.topItem = item
      this.$nextTick(() => {
        this.$refs[this.chartType].mapChart()
      })
    },
    handleTeamview (tradeName) {
      this.chartType = 'ChartDeploy'
      this.$nextTick(() => {
        this.$refs[this.chartType].handleFilter(tradeName)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/dashboard.scss';
</style>
