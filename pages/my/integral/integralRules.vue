<template>
  <div class="integralRules">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>积分使用规则</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <p>1.积分获得：<br>在怀南会平台任意区域消费即可获得积分，每消费4元获得1个积分（即消费100元可得25个积分）</p>
      <p>2.积分兑礼：<br>怀南会积分商城为您精心挑选诸多好礼，宜兴名家手工紫砂壶、私人订制翡翠手镯、开光观音圣像、最新款苹果手机等礼品等你来换，还有泰国旅游曼谷芭提雅6天5晚跟团纯游玩五星级酒店哦！</p>
      <p>3.积分返利：<br>积分每10分可以在消费时抵扣1元，仅供在怀南会平台消费时使用，不可提现。若需提现，则须收取两成手续费，即每10积分可提现0.8元，具体提现操作请垂询怀南会客服人员。</p>
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
.integralRules {
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
.integralRules .tab {
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
.integralRules .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.integralRules .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.content{
    padding: 0.3325rem 0.5054rem 0;
    font-size: 0.4rem;
    line-height: 0.6rem;
}
.content p{
  margin-bottom: 0.133rem;
}
</style>