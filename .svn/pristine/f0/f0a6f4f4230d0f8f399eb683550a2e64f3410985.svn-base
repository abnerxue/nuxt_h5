<template>
  <div class="cashAward">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>我的现金奖励</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="convertible">
      <p>可兑换金额(元)</p>
      <span>0</span>
    </div>
    <div class="invite">
      <p>成功邀请</p>
      <div class="invite"></div>
      <div class="EmptyInvite" v-if="false">
        <img src alt />
        <p>暂时还没有数据明细哦~</p>
      </div>
      <div class="inviteList" v-else>
          <div>
              <img src="" alt="">
              <p>
                  <span>183****4545</span>
                  <span>18352454545</span>
              </p>
              <p>
                  <span>x1</span>
                  <span>+<i>¥</i>448.00</span>
              </p>
          </div>
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
.cashAward {
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
.cashAward .tab {
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
.cashAward .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.cashAward .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 可兑换金额 */
.convertible {
  width: 100%;
  background: #fff;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 8px solid #f5f5f5;
}
.convertible p{
  color: #4A4A4A;
  font-size: 13px;
}
.convertible span{
  height: 48px;
  line-height: 48px;
  color: #1c0000;
  font-size: 34px
}
/* 邀请成功 */
.invite{
  background: #fff;
}
.invite>p{
  height: 44px;
  border-bottom: 1px #f5f5f5 solid;
  padding: 0 12px;
  font-size: 14px;
  line-height: 44px;
  color: #1c0000;
}
.EmptyInvite{
    padding: 72px 0 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.EmptyInvite img{
    width: 125px;
    height: 80px;
    display: block;
    background: #b2b2b2;
}
.EmptyInvite p{
    font-size: 13px;
    color: #b2b2b2;
    margin-top: 15px;
}
.inviteList{
  overflow: hidden;
}
.inviteList>div{
  display: flex;
  flex-direction: row;
  padding: 15px 12px 0;
}
.inviteList>div img{
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  background: #1c0000;
}
.inviteList>div p:nth-of-type(1){
  display: flex;
  flex-direction: column;
  font-size: 13px;
  height: 18px;
  margin-left: 4px;
  line-height: 18px;
}
.inviteList>div p:nth-of-type(1) span:nth-of-type(1){
  margin-bottom: 4px;
  color: #1C0000;
}
.inviteList>div p:nth-of-type(1) span:nth-of-type(2){
  color: #4A4A4A;
}
.inviteList>div p:nth-of-type(2){
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 18px;
  margin-left: 4px;
  line-height: 18px;
  margin-left: auto;
}
.inviteList>div p:nth-of-type(2) span:nth-of-type(1){
  margin-bottom: 4px;
  color: #4A4A4A;
}
.inviteList>div p:nth-of-type(2) span:nth-of-type(2){
  color: #1C0000;
}
.inviteList>div p:nth-of-type(2) span:nth-of-type(2) i{
  font-size: 10px;
  margin-left: 4px;
  margin-right: 2px;
  font-style: normal;
}
</style>