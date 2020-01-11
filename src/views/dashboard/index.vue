<template>
  <div class="dashboard" v-if="isReady">
    <div class="dashboard-bg position-space"></div>
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
        <div class="item" v-for="(item, index) in services2" :key="index" :style="{zIndex: index>2?6-index:'auto'}">
          <MButton :type="item.id || 5" :txt="item.type" :hasDialog="true" position="top" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 实体经济服务 -->
    <div class="show-bottom">
      <div class="title-show flex-center">
        <div class="txt">产业服务</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services3" :key="index" :style="{zIndex: index>2?6-index:'auto', paddingLeft: index===3?'66%':'33%' }">
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
    <!-- 百度地图 -->
    <BDMap class="map" v-show="isShowBdMap" :lng='lng' :lat='lat' @back='closeBdMap'></BDMap>
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
import BDMap from '@/components/BDMap'
import * as api from '@/api'
import resizeMixin from '@/components/resize'

export default {
  mixins: [resizeMixin],
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
    BDMap,
    MPopup
  },
  data () {
    return {
      lng: 112.66422891165496,
      lat: 26.880964432436038,
      isShowBdMap: false, // 是否显示百度地图
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
      monitoringIndex: 1, // 监控id
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
      services1: [
        { type: '现金业务', name: '个人客户小额存取现服务，累计交易笔数为265899笔，占总交易笔数17.13%，累计交易金额29111.55万元，占总交易金额12.07%。' },
        { type: '贷款业务', name: '个人商户农商贷金融产品服务2500客户，累计发放贷款金额1.4亿元。' },
        { type: '转账业务', name: '银行卡实时转账服务，累计交易笔数为92098笔，占总交易笔数6%，累计交易金额17360.43万元，占总交易金额7.2%。' },
        { type: '投资理财', name: '水、电、气、话费等查询缴费服务，累计交易笔数为469339笔，占总交易笔数30.24%，交易金额21358.92万元，占总交易金额8.85%。' },
        { type: '缴费业务', name: '建信人寿意外险、财产险、车险等保险，贵金属、专属理财产品等投资理财产品购买服务，累计交易2.38万人，服务贫困人口138人，金融精准扶贫贷款余额115.09亿元。' },
        { type: '燃气充值', name: '顺丰、圆通等快递业务代理服务，累计服务1473人。' },
        { type: '家电维修', name: '农产品进城电商线上产品服务，累计服务6539人，消费金额87.6万。' },
        { type: '快递代办', name: '与海尔合作提供家电维修预约服务，累计服务1075人。' },
        { type: '通讯代理', name: '电信运营商手机号卡发放、充值、套餐购买等服务，累计服务91075人。' },
        { type: '医院挂号', name: '电子健康卡注册及医院远程预约挂号服务，累计服务客户670人。' },
        { type: '公交充值', name: '公交IC卡充值服务，累计服务客户18745人，缴费金额342190元。' },
        { type: '有线电视', name: '湖南有线电视节目定制及购买服务，累计服务客户6380人，缴费金额1786.00万元。' }
      ],
      services2: [
        { id: 1, type: '社保医保', name: '城乡居民养老保险查询及缴费服务，累计服务客户9.8万人，缴费金额5600万元。' },
        { id: 1, type: '党费云', name: '城乡居民医疗保险查询及缴费服务，累计服务客户18.6万人，缴费金额8490万元。' },
        { id: 1, type: '交通违章', name: '车辆违章查询及缴费服务，累计服务客户8534人，缴费金额135600元。' },
        { type: '基层政府服务', name: '单位和党员党费缴纳服务，累计服务客户18745人，缴费金额342190元。' },
        { type: '三资管理平台', name: '燃气IC卡充值服务，累计服务客户12405人，缴费金额856.00万元。' },
        { type: '产权交易平台', name: '居民生育证等证件在线办理和邮递服务，累计服务客户43人。' }
      ],
      services3: [
        { id: 1, type: '惠懂你', name: '扫码注册、贷款申请等线上服务，累计惠懂你下载1.6万户。' },
        { id: 1, type: '特色产业', name: '信贷资源向农业产业化龙头企业和新型农业生产经营主体倾斜，累计在贫困地区普惠金融贷款余额45.84亿元，累计扶持小微企业客户1000多户。' },
        { id: 1, type: '预约开户', name: '对公账户预约开户服务。' },
        { id: 6, type: '农业产业信息服务平台', name: '单位结算卡小额存取现服务。' },
        { }
      ],
      services4: [
        { type: '金智惠民', name: '村民民金融服务，培训内容包括讲授党课、农业政策、金融知识、养殖种植等，举办惠民培训80期，覆盖10623人次，定期举办“金融知识万里行”活动，金融服务下乡活动1521场。' },
        { type: '定点扶贫', name: '建行扶贫村94个全覆盖，举办水稻种植、黑斑蛙养殖、土鸡养殖、特色水果种植等培训班3次，参训村民90余人次。' },
        { type: '扶贫贷款', name: '乡镇客户提供贷款融资现服务，直接帮扶带动贫困人口2.38万人，服务贫困人口183人，金融精准扶贫贷款余额115.09亿元。' },
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
    // this.monitorTask()
    this.pieBotton()
    this.monitoringTimer()
    // this.timer = setInterval(() => {
    //     this.MonitorDeal(e)
    //   }, 10 * 1000)
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
      // if (index === 4) {
      //   // this.monitoring()
      // }
    },
    monitoring () {
      api.getCheckInfoPage({ 'pageIndex': this.monitoringIndex }).then(res => {
        this.monitorIndexList = res.data
        this.monitoringIndex += 1
      })
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
      this.popupVisible = false
      this.chartType = type
    },
    handlePopup (popup) {
      this.popupVisible = true
      this.popup = popup
    },
    // 百度地图返回按钮
    closeBdMap () {
      this.isShowBdMap = false
    },
    handleDeployEvent (data, code) {
      this.internalNetwork = true
      // let arr = [81072069, 86617567, 90231567, 93538191, 97778229, 98662928, 99593687, 99901760, 68729821, 68758978, 68988123, 69366959, 69830902, 72018175, 72317666, 71303370, 79658960, 80915399, 79976903, 83026812, 92665315, 93008812, 91368263, 97702962]
      console.warn('--点击部署选项触发--', data.rank)
      if (this.numberId === '') {
        this.numberId = data.id
        // this.home_url = require('../../assets/jingli/' + arr[Math.floor(Math.random() * arr.length)] + '.png')
      }
      this.currJmpInfo.essential = data // 基础信息
      this.home_url1 = 'http://54.0.94.84/jxt_image/' + data.jpmDoorHeadImagePath + ''
      switch (code) {
        case 1:
          this.basicInfo = true // 基本信息
          this.client = false
          this.patrol = false
          this.record = false
          this.deal = false
          let allName = {
            cityName: data.jpmCity,
            areaName: data.jpmArea,
            streetName: data.jpmStreet
          }
          this.lat = Number(data.jpmLon)
          this.lng = Number(data.jpmLat)
          this.isShowBdMap = true
          api.getMchInfoListLog(allName).then(res => {
            if (!data.jpmDoorHeadImagePath) {
              // this.currJmpInfo.essential = res.data[0] // 基础信息
              this.currJmpInfo = Object.assign({}, this.currJmpInfo, { essential: res.data[0] })
              this.home_url1 = 'http://54.0.94.84/jxt_image/' + res.data[0].jpmDoorHeadImagePath + ''
            }
          })
          break
        case 2:
          this.basicInfo = false
          this.patrol = false
          this.record = false
          this.deal = false
          api.getManagerInfo({ 'mchId': data.jpmMchId }).then(res => {
            // this.currJmpInfo.client = res.data[0]
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { client: res.data[0] })
            this.home_url = 'http://54.0.94.84/kehujingli/' + res.data[0].managerCode + '.png'
            this.client = true // 基本信息 home_url
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
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { deal: res.data })
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
            this.currJmpInfo = Object.assign({}, this.currJmpInfo, { record: res.data })
            this.record = true
          })
          break
      }
    },
    handleGoDown (e) {
      console.warn('--部署地图下钻触发--')
      console.info(JSON.stringify(e))
      if (e.level !== 1) {
        this.tier.push(e)
      } else {
        this.tier = []
      }
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
        pageIndex: 1
      }
      if (e && e.level === 2) {
        pieBotton.areaType = 1
        pieBotton.pageIndex = 1
        this.pieApi(pieBotton)
      }
      if (e && e.level === 3) {
        pieBotton.cityName = e.allName.split('_')[0]
        pieBotton.areaName = e.allName.split('_')[1]
        pieBotton.pageIndex = 1
        pieBotton.areaType = 2
        this.pieApi(pieBotton)
      }
      if (e && e.level === 1) {
        let pieBotton = {
          areaType: 0,
          cityName: e ? e.name : '',
          areaName: '',
          pageIndex: 1
        }
        this.pieApi(pieBotton)
      }
      if (!e) {
        this.pieApi(pieBotton)
      }
    },
    pieApi (pieBotton) {
      // 饼图下数据
      api.getDataSum(pieBotton).then(res => {
        this.sum.cardAllSum = res.data[0].cardAllSum
        this.sum.netSum = res.data[0].netSum
        this.sum.serverCount = res.data[0].serverCount
        this.sum.transAllSum = String(parseInt(res.data[0].transAllSum / 10000))
        this.sum.phoneCustomerCount = res.data[0].phoneCustomerCount
        this.sum.areaCount = res.data[0].areaCount
        this.sum.yearCardCount = res.data[0].yearCardCount
        this.sum.yearAddCardMoney = Math.round(res.data[0].yearAddCardMoney / 10000)
        this.sum.rate = String(res.data[0].rate).substring(0, 3)
      })
    },
    // MonitorDeal (e) {
    //   let page = {
    //     cityName: e ? e.name : '',
    //     areaName: '',
    //     pageIndex: this.monitorPageNo
    //   }
    //   if (e && e.allName.split('_').length > 1) {
    //     page.cityName = e.allName.split('_')[0]
    //     page.areaName = e.allName.split('_')[1]
    //     page.pageIndex = this.monitorPageNo
    //   }
    //   // 实施监控
    //   api.getTransLog(page).then(res => {
    //     let list = []
    //     // list.push(res.data[0])
    //     res.data.forEach((item, index) => {
    //       if (index > 1 && (item.mchName !== res.data[index - 1].mchName) && (item.mchName !== res.data[index - 2].mchName)) {
    //         item.txnDtTm = new Date().getHours() + ':' + new Date().getMinutes()
    //         item.genproffinTxnamt = item.genproffinTxnamt / 100
    //         item.tradeName = this.transactionTypes[item.tradeName] ? this.transactionTypes[item.tradeName] : item.tradeName.split('（')[0]
    //         list.push(item)
    //       }
    //     })
    //     this.monitorDealList = list
    //     // this.monitorDealList = list.map(item => Object.assign(item, {
    //     //   txnDtTm: new Date().getHours() + ':' + new Date().getMinutes(), // + ':' + new Date().getSeconds(), // item.txnDtTm ? item.txnDtTm.split('T')[1] : '',
    //     //   genproffinTxnamt: item.genproffinTxnamt / 100,
    //     //   tradeName: this.transactionTypes[item.tradeName] ? this.transactionTypes[item.tradeName] : item.tradeName.split('（')[0]
    //     // }))
    //     this.monitorPageNo += 1
    //   })
    // },
    monitorTask (e) {
      this.MonitorDeal(e)
      // this.monitorPageNo = 1
      // this.timer && clearInterval(this.timer)
      // this.timer = setInterval(() => {
      //   this.MonitorDeal(e)
      // }, 10 * 1000)
    },
    monitoringTimer () {
      this.timer1 && clearInterval(this.timer1)
      this.timer1 = setInterval(() => {
        this.monitoring()
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
      this.tier = []
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
