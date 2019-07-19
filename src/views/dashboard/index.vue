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
          <MButton type="1" :txt="item.type" :hasDialog="true" position="bottom" :dialogTxt="item.name" />
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
          <MButton type="2" :txt="item.type" :hasDialog="true" position="bottom" :isLarge="true" :dialogTxt="item.name" />
        </div>
      </div>
    </div>
    <!-- 饼图部分 -->
    <div class="pie">
      <Pie :pieList= 'pieList'/>
    </div>
    <!-- 交易信息区 -->
    <div class="summary">
      <DealInfo v-if="!internalNetwork" :sum='sum'/>
      <!-- 商户画像 -->
      <merchantsPortrait :data="currJmpInfo" v-if="internalNetwork" />
    </div>
    <!-- 地图 -->
    <div class="map-bk"></div>
    <div class="map-transform"></div>
    <div class="map">
      <ChartDeploy @popup="handlePopup" @goDown="handleGoDown" v-if="isdeal"/>
      <ChartDeal v-else />
      <MPopup v-show="popupVisible"
        :popup="popup"
        :visible.sync="popupVisible"
        @deployEvent="handleDeployEvent" />
    </div>
    <!-- 地图操作 -->
    <div class="map-operation">
      <div class="deal fr flex-center" :class="isdeal?'':'active'" @click="deployClick"><div class="txt">交易地图</div></div>
      <div class="deploy fl flex-center"  :class="isdeal?'active':''" @click="dealClick"><div class="txt">分布地图</div></div>
    </div>
    <!-- 合作视图 -->
    <div class="teamview">
      <TeamView :items="teamviews" />
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
      <patrolMonitorChart />
    </div>
    <!-- 服务点交易排名 -->
    <div class="monitor-bottom">
      <RankService />
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
    MPopup
  },
  data () {
    return {
      internalNetwork: true, // 是否内部网点弹窗
      monitorIndex: 0, // 监控按钮初始化索引
      isdeal: true,
      popupVisible: false,
      popup: {},
      currJmpInfo: {}, // 当前服务点数据
      monitorPageNo: 1,
      pieList: {
        taCountryYearCount: '',
        taCountryCount: ''
      }, // 饼图数据
      sum: {
        number: 29000,
        number1: 89000,
        number2: 128,
        number3: 780,
        number4: 102,
        number5: 20000,
        number6: 20000,
        number7: 3,
        number8: 528
      },
      services1: [
        { type: '现金业务', name: '个人客户小额存取现服务，累计交易笔数为5632，交易金额3.2，占总交易量3%' },
        { type: '贷款业务', name: '个人商户农商贷金融产品服务9630客户，累计发放贷款金额1060万元' },
        { type: '转账业务', name: '银行卡实时转账服务，累计交易笔数为3232，交易金额3.6%' },
        { type: '缴费业务', name: '水、电、气、话费等查询缴费服务，累计交易笔数为3267，交易金额7亿，占总交易量 6.6%' },
        { type: '投资理财', name: '建信人寿意外险、财产险、车险等保险，贵金属、专属理财产品等投资理财产品购买服务，累计交易2.38万人，服务贫困人口138人，金融精准扶贫贷款余额115.09亿元' },
        { type: '快递代理', name: '顺丰、圆通等快递业务代理服务，累计服务1473人' },
        { type: '电商业务', name: '农产品进城电商线上产品服务，累计服务6539人，消费金额876412.00元' },
        { type: '家电维修', name: '与海尔合作提供家电维修预约服务，累计服务1075人' },
        { type: '通讯运营商', name: '电信运营商手机号卡发放、充值、套餐购买等服务，累计服务1075人' }
      ],
      services2: [
        { type: '社保业务', name: '城乡居民养老保险查询及缴费服务，累计服务客户9.8万人，缴费金额5600万元' },
        { type: '医保业务', name: '城乡居民医疗保险查询及缴费服务，累计服务客户18.6万人，缴费金额8490万元' },
        { type: '交通违章', name: '车辆违章查询及缴费服务，累计服务客户8534人，缴费金额135600元' },
        { type: '医院挂号', name: '电子健康卡注册及医院远程预约挂号服务，累计服务客户670人' },
        { type: '党费云', name: '单位和党员党费缴纳服务，累计服务客户18745人，缴费金额342190元' },
        { type: '公交充值', name: '公交IC卡充值服务，累计服务客户18745人，缴费金额342190元' },
        { type: '燃气充值', name: '燃气IC卡充值服务，累计服务客户12405人，缴费金额856.00万元' },
        { type: '有线电视', name: '湖南有线电视节目定制及购买服务，累计服务客户6380人，缴费金额1786.00万元' },
        { type: '生育证办理', name: '居民生育证等证件在线办理和邮递服务，累计服务客户43人' }
      ],
      services3: [
        { type: '惠懂你', name: '扫码注册、贷款申请等线上服务，累计惠懂你下载1.6万户' },
        { type: '特色产业', name: '信贷资源向农业产业化龙头企业和新型农业生产经营主体倾斜，累计在贫困地区普惠金融贷款余额45.84亿元，累计扶持小微企业客户1000多户' },
        { type: '预约开户', name: '银行账户预约开户服务' },
        { type: '对公客户存取现', name: '单位结算卡小额存取现及缴税服务' },
        { type: '对公客户缴费税', name: '单位结算卡缴税和缴费服务' },
        { type: '对公客户转账', name: '单位结算卡转账服务' }
      ],
      services4: [
        { type: '扶贫贷款', name: '乡镇客户提供贷款融资现服务，直接帮扶带动贫困人口2.38万人，服务贫困人口183人，金融精准扶贫贷款余额115.09亿元' },
        { type: '定点扶贫', name: '建行扶贫村94个全覆盖，举办水稻种植、黑斑蛙养殖、土鸡养殖、特色水果种植等培训班3次，参训村民90余人次' },
        { type: '金智惠民', name: '村民民金融服务，培训内容包括讲授党课、农业政策、金融知识、养殖种植等，举办惠民培训80期，覆盖10623人次，定期举办“金融知识万里行”活动，金融服务下乡活动1521场' },
        { type: '电商扶贫', name: '组织善融扶贫 爱心助力线上专题活动116场，销售扶贫商品7920件，扶贫销售额6.08亿元' },
        { },
        { }
      ],
      teamviews: [
        { name: '政务合作', rate: '50', num: 1200 },
        { name: '卫健', rate: '50', num: 1200 },
        { name: '退役军人', rate: '50', num: 1200 },
        { name: '通讯', rate: '50', num: 1200 },
        { name: '商超', rate: '50', num: 1200 },
        { name: '餐饮', rate: '50', num: 1200 },
        { name: '快递', rate: '50', num: 1200 },
        { name: '电商', rate: '50', num: 1200 },
        {},
        {}
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
  },
  watch: {
    popupVisible (val) {
      if (!val) {
        this.internalNetwork = false
      }
    }
  },
  methods: {
    // 监控按钮弹窗
    monitorClick (index) {
      this.monitorIndex = index
    },
    // 交易地图
    dealClick () {
      this.isdeal = true
    },
    // 部署地图
    deployClick () {
      this.isdeal = false
    },
    handlePopup (popup) {
      this.popupVisible = true
      this.popup = popup
    },
    handleDeployEvent (data) {
      console.warn('--点击部署选项触发--')
      this.currJmpInfo = data
      this.internalNetwork = true
    },
    handleGoDown (e) {
      console.warn('--部署地图下钻触发--')
      console.info(JSON.stringify(e))
      // 事实监控
      this.monitorTask(e)
    },
    MonitorDeal (e) {
      let page = {
        cityName: e ? e.name : '',
        areaName: '',
        pageIndex: this.monitorPageNo
      }
      if (e) {
        this.sum.number = Math.floor(Math.random() * (2500 - 3000) + 3000)
        this.sum.number1 = Math.floor(Math.random() * (6000 - 7000) + 7000)
        this.sum.number2 = Math.floor(Math.random() * (8 - 10) + 10)
        this.sum.number3 = Math.floor(Math.random() * (60 - 80) + 80)
        // this.sum.number4 = Math.floor(Math.random() * (6 - 8) + 8)
        this.sum.number5 = Math.floor(Math.random() * (1500 - 2000) + 2000)
        this.sum.number6 = Math.floor(Math.random() * (1500 - 2100) + 2100)
        this.sum.number7 = Math.floor(Math.random() * (1 - 7) + 7)
        this.sum.number8 = Math.floor(Math.random() * (30 - 50) + 50)
      }
      if (e && e.allName.split('_').length > 1) {
        page.cityName = e.allName.split('_')[0]
        page.areaName = e.allName.split('_')[1]
        page.pageIndex = this.monitorPageNo
        this.sum.number = Math.floor(Math.random() * (250 - 300) + 300)
        this.sum.number1 = Math.floor(Math.random() * (600 - 700) + 700)
        this.sum.number2 = Math.floor(Math.random() * (1 - 2) + 2)
        this.sum.number3 = Math.floor(Math.random() * (6 - 8) + 8)
        // this.sum.number4 = Math.floor(Math.random() * (1 - 3) + 3)
        this.sum.number5 = Math.floor(Math.random() * (150 - 200) + 200)
        this.sum.number6 = Math.floor(Math.random() * (150 - 210) + 210)
        this.sum.number7 = Math.floor(Math.random() * (1 - 7) + 7)
        this.sum.number8 = Math.floor(Math.random() * (3 - 5) + 5)
      }
      api.getTransLog(page).then(res => {
        this.monitorDealList = res.data.map(item => Object.assign(item, {
          txnDtTm: item.txnDtTm ? item.txnDtTm.split('T')[0] : ''
        }))
        this.monitorPageNo += 1
      })
    },
    monitorTask (e) {
      this.monitorPageNo = 1
      this.timer && clearInterval(this.timer)
      this.MonitorDeal(e)
      this.timer = setInterval(() => {
        this.MonitorDeal(e)
      }, 10 * 1000)
    },
    fromData (time) {
      var dateee = new Date(time).toJSON()
      console.log(dateee)
      var date = new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

      return date
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/dashboard.scss';
</style>
