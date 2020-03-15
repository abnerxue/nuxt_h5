<template>
  <div class="redPaper">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>红包使用规则</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <p>1.获得的红包将在实时发放至红包账户中，用户可在指定页面查看红包账户金额</p>
      <p>2.用户获得的红包为电子现金券，仅限在怀南会电子商务平台（huainanhui.com）使用。</p>
      <p>3.红包长期有效，一经使用后失效。</p>
      <p>4.平台用户消费满百元即可使用红包，消费每百元可折抵10%，上不封顶，不满百元部分不参与抵免。</p>
      <p>5.红包仅限用户本人使用，不得转赠其他用户、不得提现、不得为其他用户付款时使用。</p>
      <p>6.用户获得多个红包的，红包金额可累计使用，不兑现，不找零。</p>
      <p>7.红包可与其他优惠同享。</p>
      <p>8.若使用红包的订单未支付，则取消订单后将退还红包至红包账户中。</p>
      <p>9.若使用红包的订单发生退款，则退款订单中的红包将不予退还。</p>
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
.redPaper {
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
.redPaper .tab {
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
.redPaper .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.redPaper .tab > p {
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