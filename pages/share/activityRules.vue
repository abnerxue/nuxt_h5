<template>
  <div class="activityRules">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>活动规则</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <h1>邀请好友</h1>
      <p>通过专属邀请二维码推荐好友注册账号并下载怀南会APP，即可完成邀请操作。邀请关系以被邀请者所扫描二维码为准，一经绑定不可更改，已注册账号不可绑定邀请者。</p>
      <h1>返现规则</h1>
      <p>邀请者享终身现金返利，返现金额是被邀请者消费金额3%。在被邀请者下单15天内，且已确认收货的情况下，此单被邀请者消费金额的3%将划入您的返现账户。</p>
      <h1>提现说明</h1>
      <p>&nbsp;&nbsp;&nbsp;1.目前本平台支持提现到支付宝/微信/银行卡，支付宝/微信按照其平台规则收取0.1%手续费，最低0.1元/笔，银行卡提现无手续费或以发卡方规则为准。<br>
      &nbsp;&nbsp;&nbsp;2.提现的微信/支付宝/银行卡账户须为注册时绑定的实名制账户，如注册账户不能使用，请联系怀南会客服为您重新绑定。<br>
      &nbsp;&nbsp;&nbsp;3.通常情况下提交提现后资金将在24小时内到账，请耐心等待。如逾期未到账，请联系怀南会客服为您确认进度，但由于合作方规则及通信网络原因，人工无法加急提现，敬请谅解。<br>
      &nbsp;&nbsp;&nbsp;4.如由于网络、信息错误导致提现失败，资金将返回到您的账户中，请您不必担心资金安全，核实信息无误后再次提交提现即可。<br>
      &nbsp;&nbsp;&nbsp;5.最高提现额度与用户选择的银行卡和提现方式有关，请以提现时页面提示为准。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.activityRules {
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
.activityRules .tab {
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
.activityRules .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.activityRules .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.content{
    padding: 0.3325rem 0.5054rem 0;
    font-size: 0.4rem;
    line-height: 0.6rem;
}
.content h1{
  color: #1C0000;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  height: 20px;
  line-height: 20px;
}
.content p{
  margin-bottom: 15px;
  font-size: 13px;
}
</style>