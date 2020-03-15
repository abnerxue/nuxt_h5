<template>
  <div class="balance">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>余额</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 账户余额 -->
    <div class="account">
      <p>账户余额（元）</p>
      <span>0.00</span>
      <p class="btn" @click="online()">提现</p>
    </div>
    <!-- 资金明细 -->
    <div class="moneyDetail">
      <div @click="online()">
        <p>
          <img src alt />
          <span>资金明细</span>
        </p>
        <i class="iconfont icon-right"></i>
      </div>
      <div @click="online()">
        <p>
          <img src alt />
          <span>我的银行卡</span>
        </p>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    online() {
      Toast({
        message: "即将上线",
        position: "bottom"
      });
    }
  },
  components: {
    Toast
  }
};
</script>

<style scoped>
.balance {
  background: #f5f5f5;
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
.balance .tab {
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
.balance .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.balance .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 账号余额 */
.account {
  padding: 15px 0 30px;
  background: #fff;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.account p:nth-child(1) {
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  color: #9a9a9a;
}
.account span {
  height: 48px;
  font-size: 34px;
  font-weight: 600;
  line-height: 48px;
  color: #1c0000;
  margin-bottom: 15px;
}
.account .btn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #fff;
  text-align: center;
  background: #74181b;
  border-radius: 4px;
}
.moneyDetail {
  overflow: hidden;
}
.moneyDetail div {
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background: #fff;
  margin-bottom: 1px;
}
.moneyDetail div p img {
  display: block;
  width: 24px;
  background: #1c0000;
  height: 26px;
  margin-right: 10px;
}
.moneyDetail div p {
  font-size: 12px;
  color: #1c0000;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.moneyDetail div i {
  font-size: 13px;
  color: #9a9a9a;
}
</style>