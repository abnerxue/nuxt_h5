<template>
  <div class="login">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.push({name:'index'})"></i>
      <p>登录</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="entry">
      <img src="../../static/img/logo.png" alt />
      <div v-if="!phoneLogin" class="accNum">
        <input type="text" placeholder="请输入账号" v-model="num" />
        <i v-if="num" class="iconfont icon-quxiao" @click="num=''"></i>
      </div>
      <div v-if="!phoneLogin" class="accPwd">
        <input :type="showPwd?'text':'password'" placeholder="请输入密码" v-model="pwd" />
        <i v-if="showPwd" class="iconfont icon-chakanmima" @click="showPwd=false"></i>
        <i v-else class="iconfont icon-chakanmima1" @click="showPwd=true"></i>
      </div>
      <div v-if="phoneLogin" class="accNum">
        <input type="tel" placeholder="请输入手机号" v-model="num" />
        <i v-if="num" class="iconfont icon-quxiao" @click="num=''"></i>
      </div>
      <div v-if="phoneLogin" class="accPwd">
        <input type="number" placeholder="请输入短信验证码" v-model="pwd" />
        <button class="countdown" @click="getCode()" :disabled="disabled">
          <template v-if="sending">获取验证码</template>
          <template v-else>{{second}}秒</template>
        </button>
      </div>
      <p @click="phoneLogin = !phoneLogin; num='';pwd=''">{{phoneLogin?'使用账号密码登录':'使用手机号登录'}}</p>
      <div class="loginBtn" @click="login()">登录</div>
      <p class="agreement">
        登录即代表已阅读并同意
        <span @click="$router.push({name:'login-loginAgreement'})">《怀南会用户协议》</span>和
        <span @click="$router.push({name:'login-privacyAgreement'})">《怀南会用户隐私政策》</span>
      </p>
    </div>
  </div>
</template>

<script>
import MD5 from "../../static/js/md5.js";
import { Toast, Col } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      pwd: "",
      num: "",
      showPwd: false,
      phoneLogin: false,
      disabled: false,
      second: 60,
      sending: true
    };
  },
  watch: {
    pwd() {
      this.pwd = this.pwd.replace(/[\u4e00-\u9fa5]/gi, "");
      //"^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$"
    }
  },
  mounted() {},
  methods: {
    login() {
      let data = new FormData();
      if (this.phoneLogin) { // 验证码登录
        data.append("phone", this.num);
        data.append("captcha", this.pwd);
        axios.post("/ppi/index.php/api/login/login_captcha", data).then(res => {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
          if (res.data.code == 1) {
            this.$store.state.token = res.data.token;
            sessionStorage.setItem('token', res.data.token);
            this.$router.go(-1);
          }
        });
      } else {  //  账号密码登录
        data.append("name", this.num);
        data.append("password", MD5.hex_md5(this.pwd));
        axios.post("/ppi/index.php/api/login/login", data).then(res => {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
          if (res.data.code == 1) {
            this.$store.state.token = res.data.token;
            sessionStorage.setItem('token', res.data.token);
            this.$router.go(-1);
          }
        });
      }
    },
    getCode() {
      if (!this.sending) return;
      let data = new FormData();
      data.append("phone", this.num);
      axios.post("/ppi/index.php/api/login/login_captcha_sms", data).then(res => {
        this.$store.state.token = res.data.token;
        Toast({
          message: res.data.message,
          position: "bottom"
        });
        if (res.data.code == 1) {
          this.sending = false;
          this.disabled = true;
          this.timeDown();
        }
      });
    },
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        if (this.second < 0) {
          clearInterval(result);
          this.sending = true;
          this.disabled = false;
          this.second = 60;
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.login {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  color: #1c0000;
}
/* 标签栏 */
.login .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
}
.login .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.login .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.entry {
  padding-top: 0.798rem;
}
.entry > img {
  width: 1.596rem;
  height: 1.596rem;
  margin: auto;
  display: block;
  margin-bottom: 0.266rem;
}
.entry .accNum,
.entry .accPwd {
  height: 1.5561rem;
  margin: 0 0.3192rem;
  padding: 0 0.2rem;
  /* padding: 0.7rem 0.2rem 0.3325rem; */
  border-bottom: 0.0266rem solid #e9e9e9;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.entry .accNum input,
.entry .accPwd input {
  flex: 1;
  font-size: 0.35rem;
  margin: 0.7rem 0 0.3325rem;
  border: none;
  outline: none;
}
.entry > p:nth-of-type(1) {
  color: #1c0000;
  font-size: 0.3192rem;
  margin: 0.3192rem 0.3192rem 0;
  text-align: right;
}
.icon-quxiao {
  color: #b2b2b2;
  font-size: 0.3724rem;
}
.icon-chakanmima,
.icon-chakanmima1 {
  color: #000;
  font-size: 0.3724rem;
  margin: 0.7rem 0 0.3325rem;
}
.loginBtn {
  margin: 0 0.3192rem;
  height: 1.1704rem;
  line-height: 1.1704rem;
  text-align: center;
  color: #fff;
  background-color: #74181b;
  box-sizing: border-box;
  border-radius: 0.1064rem;
  font-size: 0.3458rem;
  margin-top: 0.798rem;
}
.agreement {
  font-size: 0.28rem;
  margin: 0.399rem 0.3192rem 0;
  color: #9a9a9a;
}
.agreement span {
  color: #74181b;
}
.countdown {
  width: 2.0748rem;
  height: 0.6384rem;
  background: #fff;
  font-size: 0.266rem;
  border: 0.0266rem solid #74181b;
  color: #74181b;
  border-radius: 0.1064rem;
  text-align: center;
  margin: 0.35rem 0 0;
}
</style>