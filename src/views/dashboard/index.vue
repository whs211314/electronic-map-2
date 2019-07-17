<template>
  <div class="dashboard">
    <div class="logo"></div>
    <!-- 便民服务 -->
    <div class="show-top">
      <div class="title-show flex-center">
        <div class="txt">便民服务展示</div>
      </div>
      <!-- <div class="empty"></div> -->
      <div class="items-show">
        <div class="item" v-for="(item, index) in services1" :key="index" @click="showClick(index)">
          <MButton type="1" :txt="item.type" />
          <div v-show="activeIndex===index" class="prompt-dialog">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 政务服务能力 -->
    <div class="show-middle">
      <div class="title-show flex-center">
        <div class="txt">政务服务能力</div>
      </div>
      <div class="empty"></div>
      <div class="items-show" style="height:70%">
        <div class="item" v-for="(item, index) in services2" :key="index" @click="middleClick(index)">
          <MButton type="2" :txt="item.type" />
          <div v-show="middleIndex===index" class="prompt-dialog">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 实体经济服务 -->
    <div class="show-bottom">
      <div class="title-show flex-center">
        <div class="txt">实体经济服务</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services3" :key="index" @click="bottomClick(index)">
          <MButton type="1" :txt="item.type" />
          <div v-show="bottomIndex===index" class="prompt-dialog">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 扶贫能力展示 -->
    <div class="show-right">
      <div class="title-show flex-center">
        <div class="txt">扶贫能力展示</div>
      </div>
      <div class="empty"></div>
      <div class="items-show">
        <div class="item" v-for="(item, index) in services4" :key="index"  @click="rightClick(index)">
          <MButton type="2" :txt="item.type" />
          <div v-show="rightIndex===index" class="prompt-dialog">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 饼图部分 -->
    <div class="pie">
      <Pie />
    </div>
    <!-- 交易信息区 -->
    <div class="summary">
      <DealInfo v-if="!internalNetwork"/>
      <!-- 商户画像 -->
      <merchantsPortrait :data="currJmpInfo" v-if="internalNetwork" />
    </div>
    <!-- 地图 -->
    <div class="map-bk"></div>
    <div class="map-transform"></div>
    <div class="map">
      <ChartDeploy @popup="handlePopup" @goDown="handleGoDown" v-if="!isdeal"/>
      <ChartDeal v-if="isdeal"/>
      <MPopup v-show="popupVisible"
        :popup="popup"
        :visible.sync="popupVisible"
        @deployEvent="handleDeployEvent" />
    </div>
    <!-- 地图操作 -->
    <div class="map-operation">
      <div class="deal fl flex-center" :class="isdeal?'active':''" @click="dealClick"><div class="txt">交易地图</div></div>
      <div class="deploy fr flex-center"  :class="isdeal?'':'active'" @click="deployClick"><div class="txt">分布地图</div></div>
    </div>
    <!-- 合作视图 -->
    <div class="teamview">
      <TeamView :items="teamviews" />
    </div>
    <!-- 交易监控 -->
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
      internalNetwork: false, // 是否内部网点弹窗
      activeIndex: -1, // 便民服务初始化索引
      middleIndex: -1, // 政务服务能力
      bottomIndex: -1, // 实体经济服务
      rightIndex: -1, // 扶贫能力展示
      monitorIndex: 0, // 监控按钮初始化索引
      isdeal: true,
      popupVisible: false,
      popup: {},
      currJmpInfo: {}, // 当前服务点数据
      services1: [
        { type: '现金业务', name: '为银行卡持卡用户提供小额取现和小额存现服务，累计交易笔数为5632，交易金额3.2亿，占总交易量3%' },
        { type: '贷款业务', name: '为乡镇客户提供贷款融资服务，直接帮扶带动贫困人口2.38万人，服务贫困人口138人，金融精准扶贫贷款余额115.09亿元' },
        { type: '转账业务', name: '为银行卡持卡用户提供实时到帐转账服务，累计交易笔数为3232，交易金额3.4亿，占总交易量 3.6%' },
        { type: '缴费业务', name: '为城乡居民提供水、电、气、话费等查询缴费服务，累计交易笔数为3267，交易金额7亿，占总交易量 6.6%' },
        { type: '投资理财', name: '为乡镇客户提供建信人寿意外险、财产险、车险等保险购买服务，黄金等投资产品购买服务，累计交易2.38万人，服务贫困人口138人，金融精准扶贫贷款余额115.09亿元' },
        { type: '快递业务', name: '为客户提供顺丰、圆通快递服务，累计服务1473人' },
        { type: '电商业务', name: '为客户提供电商线上产品线下服务，累计服务6539人，消费金额876412.00元' },
        { type: '家电维修', name: '为客户提供家电维修预约服务，累计服务1075人' },
        { type: '通讯运营商', name: '为客户提供联通、移动号卡发放服务，累计服务1075人' }
      ],
      services2: [
        { type: '社保业务', name: '为客户提供养老保险查询和缴费服务，累计服务客户9.8万人，缴费金额5600万元' },
        { type: '社保业务', name: '为客户提供医疗保险查询和缴费服务，累计服务客户18.6万人' },
        { type: '交通违章', name: '为客户提供车辆的违章查询及缴费服务，累计服务客户8534人' },
        { type: '医院挂号', name: '为客户提供电子健康卡的注册和医院远程预约挂号服务，累计服务客户670人' },
        { type: '党费云', name: '为单位和党员提供党费缴纳服务，累计服务客户18745人，缴费金额342190元' },
        { type: '公交充值', name: '为客户提供公交IC卡充值服务，累计服务客户18745人，缴费金额342190元' },
        { type: '燃气充值', name: '为客户提供燃气IC卡充值服务，累计服务客户12405人，缴费金额856.00万元' },
        { type: '有线电视', name: '为客户提供有线电视节目的定制购买服务，累计服务客户6380人，缴费金额1786.00万元' },
        { type: '生育证办理', name: '为居民生育证等证件的在线办理和邮递服务服务，累计服务客户43人' }
      ],
      services3: [
        { type: '惠懂你', name: '为小企业扫码注册、申请贷款等在线服务，累计惠懂你下载1.6万户' },
        { type: '特色产业', name: '信贷资源向农业产业化龙头企业和新型农业生产经营主体倾斜，累计在贫困地区普惠金融贷款余额45.84亿元，累计扶持小微企业客户1000多户' },
        { type: '预约开户', name: '为企业客户提供预约开户服务' },
        { type: '对公客户存现', name: '为企业客户基于单位结算卡提供小额存现服务' },
        { type: '对公客户取现', name: '为企业基于单位结算卡提供小额取现业务服务' },
        { type: '对公客户转账', name: '为企业客户基于单位结算卡提供转账服务' }
      ],
      services4: [
        { type: '扶贫贷款', name: '为乡镇客户提供贷款融资现服务，直接帮扶带动贫困人口2.38万人，服务贫困人口183人，金融精准扶贫贷款余额115.09亿元' },
        { type: '定点扶贫', name: '建行扶贫村94个全覆盖，举办水稻种植、黑斑蛙养殖、土鸡养殖、特色水果种植等培训班3次，参训村民90余人次' },
        { type: '金智惠民', name: '为村民提供惠民金融服务，培训内容包括讲授党课、农业政策、金融知识、养殖种植等，举办惠民培训80期，覆盖10623人次，定期举办“金融知识万里行”活动，金融服务下乡活动1521场' },
        { type: '电商扶贫', name: '组织善融扶贫 爱心助力线上专题活动116场，销售扶贫商品7920件，扶贫销售额6.08亿元' },
        { },
        { }
      ],
      teamviews: Array.from({ length: 10 }, () => '农产品进城'),
      monitors: [{ type: '服务点视图' }, { type: '异常终端视图' }, { type: '交易视图' }, { type: '风险预警' }, { type: '巡检' }],
      monitorDealList: [
        { type: '长治市', money: '长沙市某某服务网点', riskStatus: '异常', isChange: '异常', Change: '2131', isStatus: '启用' },
        { type: '长沙市', money: '长沙市某某服务网点', riskStatus: '正常', isChange: '正常', Change: '331313', isStatus: '启用' },
        { type: '永州市', money: '长沙市某某服务网点', riskStatus: '异常', isChange: '异常', Change: '313131', isStatus: '启用' },
        { type: '怀化市', money: '长沙市某某服务网点', riskStatus: '正常', isChange: '正常', Change: '313131', isStatus: '启用' },
        { type: '衡阳市', money: '长沙市某某服务网点', riskStatus: '异常', isChange: '异常', Change: '3113', isStatus: '启用' },
        { type: '邵阳市', money: '长沙市某某服务网点', riskStatus: '正常', isChange: '正常', Change: '313131', isStatus: '启用' }
      ]
    }
  },
  created () {
    api.getPieData()
  },
  watch: {
    popupVisible (val) {
      if (!val) {
        this.internalNetwork = false
      }
    }
  },
  methods: {
    // 便民服务弹窗
    showClick (index) {
      this.activeIndex = index
      setTimeout(() => {
        this.activeIndex = -1
      }, 3000)
    },
    // 政务服务能力
    middleClick (index) {
      this.middleIndex = index
      setTimeout(() => {
        this.middleIndex = -1
      }, 3000)
    },
    // 实体经济服务
    bottomClick (index) {
      this.bottomIndex = index
      setTimeout(() => {
        this.bottomIndex = -1
      }, 3000)
    },
    // 扶贫能力展示
    rightClick (index) {
      this.rightIndex = index
      // setTimeout(() => {
      //   this.rightIndex = -1
      // }, 3000)
    },
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
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/dashboard.scss';
</style>
