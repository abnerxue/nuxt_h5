<template>
  <div class="vipAgreement">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>会员服务协议</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <h1>怀南会会员服务协议</h1>
      <h2>生效日期：2019年11月21日</h2>
      <div>
        <p>提示条款</p>
        <p>各服务条款前所列索引关键词仅为帮助您理解该条款表达的主旨之用，不影响或限制本协议条款的含义或解释。为维护您自身权益，建议您仔细阅读各条款具体表述。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.vipAgreement {
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
.vipAgreement .tab {
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
.vipAgreement .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.vipAgreement .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.content {
  padding: 0.399rem 0.5054rem 0;
}
.content h1 {
  text-align: center;
  margin-bottom: 0.2128rem;
  font-size: 0.3458rem;
  font-weight: 500;
}
.content h2 {
  font-size: 0.2128rem;
  margin-bottom: 0.399rem;
  text-align: center;
  font-weight: 400;
}
.content > div {
  font-size: 0.3192rem;
  color: #1c0000;
}
.content > div p:nth-of-type(1) {
  margin-bottom: 0.4788rem;
}
</style>