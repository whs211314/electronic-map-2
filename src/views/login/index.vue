<template>
  <div class="css-container">
    <!-- 初始页 -->
    <div v-if="isShade" class="shadow position-space">
      <div class="center"></div>
      <div class="lock" @click="clcikLock"></div>
    </div>
    <!-- 登录页 -->
    <div v-else class="position-space">
      <div class="css-title"></div>
      <div class="css-accountNumber">
        <input v-model="account" type="text" @blur="clickAccount">
        <img v-if="isPlaceholder01" src="../../assets/images/please-input01.png" alt="">
      </div>
      <div class="css-password">
        <input v-model="password" type="password" @blur="clickPassword">
        <img v-if="isPlaceholder02" src="../../assets/images/please-input02.png" alt="">
        <div class="enter" @click="clickEnter"></div>
      </div>
      <div class="css-gif"></div>
      <!-- 账号、密码校验弹窗 -->
      <div v-if="loginPrompt" class="position-space">
        <div class="prompt">
          <div v-if="!isSuccess" class="css-prompt01"></div>
          <div v-if="isSuccess" class="css-prompt02"></div>
          <div class="css-dl01"></div>
          <div class="css-dl02"></div>
          <div class="css-dl03"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      isShade: true,
      loginPrompt: false,
      isSuccess: false,
      isPlaceholder01: true,
      isPlaceholder02: true,
      account: '111',
      password: '111'
    }
  },
  methods: {
    // 初始化解锁
    clcikLock () {
      this.isShade = false
    },
    // change
    clickAccount () {
      if (this.password !== '') {
        this.isPlaceholder01 = false
      } else {
        this.isPlaceholder01 = true
      }
    },
    clickPassword () {
      if (this.account !== '') {
        this.isPlaceholder02 = false
      } else {
        this.isPlaceholder02 = true
      }
    },
    // 确认登录
    clickEnter () {
      if (this.password === '111') {
        this.loginPrompt = true
        this.isSuccess = true
        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 3000)
      } else {
        this.loginPrompt = true
        setTimeout(() => {
          this.loginPrompt = false
          console.log(this.loginPrompt)
        }, 3000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/index.scss';

.css-container {
  @include bgImage('../../assets/images/background.png');
  .shadow {
    .center {
      @include position(70, 1339, 169, 1332);
      @include bgImage('../../assets/images/name.png');
    }
    .lock {
      @include position(738, 1456, 284, 2217);
      @include bgImage('../../assets/images/lock.png');
    }
  }
  .css-title {
    @include position(78, 1756, 790, 1188);
    @include bgImage('../../assets/images/title.png');
  }
  .css-accountNumber{
    input {
      width: 20%;
      height: 8%;
      @include position(328, 1530, 776, 1517);
      background-image: url(/img/input.7b439ff0.png);
      background-position: center center;
      opacity: 0.7;
      z-index: 1;
      color: #9FFAFF;
      font-size: var(--fontSize-18);
      border: #35a5e5 1px dotted;
      border-radius: 5px;
    }
    img {
      width: 6%;
      height: 2.6%;
      @include position(368, 1530, 776, 1517);
      margin: 0 auto
    }
  }
  .css-password{
    input {
      width: 20%;
      height: 8%;
      @include position(480, 1530, 644, 1517);
      background-image: url(/img/input.7b439ff0.png);
      background-position: center center;
      opacity: 0.7;
      z-index: 1;
      color: #9FFAFF;
      font-size: var(--fontSize-18);
      border: #35a5e5 1px dotted;
      border-radius: 5px;
    }
    img {
      width: 6%;
      height: 2.6%;
      @include position(520, 1530, 776, 1517);
      margin: 0 auto
    }
    .enter {
      @include position(456, 1398, 600, 2341);
      @include bgImage('../../assets/images/enter.png');
    }
  }
  .css-gif {
    @include position(625, 1193, 124, 1188);
    @include bgImage('../../assets/images/jp.gif');
  }
  .prompt{
    @include position(354, 1537, 389, 1559);
    @include bgImage('../../assets/images/prompt.png');
    z-index: 5;
    .css-prompt01 {
      @include position(100, 800, 280, 800);
      @include bgImage('../../assets/images/prompt_01.png');
    }
    .css-prompt02 {
      @include position(100, 800, 280, 800);
      @include bgImage('../../assets/images/prompt_02.png');
    }
    .css-dl01 {
      @include position(600, 2200, 320, 1400);
      @include bgImage('../../assets/images/dl_01.png');
    }
    .css-dl02 {
      @include position(600, 1700, 320, 1900);
      @include bgImage('../../assets/images/dl_02.png');
    }
    .css-dl03 {
      @include position(600, 1200, 320, 2400);
      @include bgImage('../../assets/images/dl_03.png');
    }
  }
}
</style>
