<template>
  <div class="redPaper">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>新人专享大礼包</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <img src="../static/img/exclusivePaper.png" alt />
    <div class="paperPrice">
      <div>
        <p>
          <span>¥</span>8
        </p>
        <p>满100可用</p>
        <p>全场通用</p>
      </div>
      <div>
        <p>
          <span>¥</span>18
        </p>
        <p>满200可用</p>
        <p>全场通用</p>
      </div>
      <div>
        <p>
          <span>¥</span>58
        </p>
        <p>满500可用</p>
        <p>全场通用</p>
      </div>
      <div>
        <p>
          <span>¥</span>118
        </p>
        <p>满1000可用</p>
        <p>全场通用</p>
      </div>
      <div>
        <p>
          <span>¥</span>236
        </p>
        <p>满2000可用</p>
        <p>全场通用</p>
      </div>
      <div>
        <p>
          <span>¥</span>366
        </p>
        <p>满3000可用</p>
        <p>全场通用</p>
      </div>
    </div>
    <div class="button">
        <p @click="toLogin()">{{token?'已领取':'立即领取'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      token: null,
    }
  },
  mounted(){
    this.token = sessionStorage.getItem("token");
  },
  methods:{
    toLogin(){
      if(this.token){
        return ;
      } else {
        this.$router.push({name:'login'})
      }
    }
  }
};
</script>

<style scoped>
.redPaper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  overflow-x: hidden;
  font-family: PingFang SC;
  overflow-y: auto;
  background: linear-gradient(270deg, #c50704 0%, #ef1b28 49%, #c50704 100%);
}
.redPaper .tab {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 2px 3px rgba(216, 216, 216, 0.1);
  position: fixed;
  top: 0;
  left: 0;
}
.redPaper .tab > i {
  font-size: 15px;
  color: #9a9a9a;
}
.redPaper .tab > p {
  color: #1c0000;
  font-size: 16px;
  font-weight: 500;
}
.redPaper > img {
  width: 100%;
  display: block;
  margin-bottom: 10px;
}
.paperPrice {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 32px;
}
.paperPrice > div {
  width: 141px;
  height: 142px;
  background: url(../static/img/paper.png) no-repeat;
  background-size: 100% 100%;
  margin-bottom: 15px;
}
.paperPrice > div p:nth-child(1) {
  width: 100%;
  text-align: center;
  font-size: 47px;
  color: #dd0812;
  height: 66px;
  line-height: 66px;
  margin-bottom: 15px;
  margin-top: 10px;
}
.paperPrice > div p:nth-child(1) span {
  font-size: 24px;
  font-weight: 500;
}
.paperPrice > div p:nth-child(2) {
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 17px;
  font-weight: 500;
  color: #f2d7a2;
  text-align: center;
  font-family: PingFang SC;
}
.paperPrice > div p:nth-child(3) {
  width: 100%;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #f2d7a2;
  text-align: center;
}
.button{
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    margin-top: 35px;
    margin-bottom: 75px;
}
.button p{
    height: 55px;
    line-height: 44px;
    width: 203px;
    text-align: center;
    font-size: 22px;
    font-weight: 500;
    font-family: PingFang SC;
    background: url(../static/img/paperButton.png) no-repeat;
    background-size: 100% 100%;
    color: #463821;
}
</style>