<template>
  <div class="buyVip">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>购买会员</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="top_one">
      <div class="uInfo">
        <img src alt />
        <div>
          <span>1*********4</span>
          <p>
            <img src="../../../static/img/vip_ordinary.png" alt />
            <span>普通会员</span>
          </p>
        </div>
      </div>
    </div>
    <div class="center_two">
      <div class="two_box">
        <div :class="active==1?'active':''" @click="active=1">
          <p>
            ¥
            <span>268</span>/年
          </p>
          <p>黄金会员</p>
        </div>
        <div :class="active==2?'active':''" @click="active=2">
          <p>
            ¥
            <span>568</span>/年
          </p>
          <p>铂金会员</p>
        </div>
        <div :class="active==3?'active':''" @click="active=3">
          <p>
            ¥
            <span>1680</span>/年
          </p>
          <p>钻石会员</p>
        </div>
      </div>
      <p>
        开通会员即代表接受
        <span @click="$router.push({name:'my-vipCenter-vipAgreement'})">《怀南会会员服务协议》</span>
      </p>
    </div>
    <div class="center_three">
      <div>支付方式</div>
      <div @click="radio = 1">
        <div>
          <img src="../../../static/img/zfb.png" alt />
          <p>支付宝支付</p>
        </div>
        <input type="radio" name="payWay" :checked="radio == 1" />
      </div>
      <div @click="radio = 2">
        <div>
          <img src="../../../static/img/wx.png" alt />
          <p>微信支付</p>
        </div>
        <input type="radio" name="payWay" :checked="radio == 2" />
      </div>
    </div>
    <div class="bottom_four">
      <p>
        合计：
        <span>
          <i>¥</i>
          {{active==1?'268.00':active==2?'568.00':'1680.00'}}
        </span>
      </p>
      <div>确认支付</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      radio: 1
    };
  }
};
</script>

<style scoped>
.buyVip {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2rem;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 标签栏 */
.buyVip .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #1c0000;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  z-index: 11;
}
.buyVip .tab > i {
  font-size: 0.399rem;
  color: #fff;
}
.buyVip .tab > p {
  color: #fff;
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.top_one {
  /* overflow: hidden; */
  padding: 0.532rem 0.3192rem;
  background: #1c0000;
}
.uInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.8088rem;
  background: linear-gradient(
    90deg,
    rgba(242, 223, 180, 1) 0%,
    rgba(242, 215, 162, 1) 100%
  );
  border-radius: 0.2128rem;
  padding: 0.399rem 0.399rem 0.25rem;
}
.uInfo > img {
  width: 1.0108rem;
  height: 1.0108rem;
  border-radius: 50%;
  background: #fff;
  display: block;
  margin-right: 0.3192rem;
  border: 0.0266rem solid #463821;
}
.uInfo div span {
  font-size: 0.3458rem;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 0.4921rem;
  height: 0.4921rem;
  display: block;
  color: #1c0000;
}
.uInfo div p:nth-child(2) img {
  float: left;
  width: 0.399rem;
  height: 0.399rem;
}
.uInfo div p:nth-child(2) span {
  font-size: 0.2128rem;
  color: #fbe7c4;
  background: #1c0000;
  display: block;
  text-align: right;
  padding-right: 0.2128rem;
  box-sizing: border-box;
  height: 0.399rem;
  line-height: 0.399rem;
  width: 1.4896rem;
  border-radius: 0.2261rem;
}
.uInfo div:nth-of-type(2) {
  width: 2.2344rem;
  height: 0.798rem;
  line-height: 0.798rem;
  text-align: center;
  background: radial-gradient(
    circle,
    rgba(70, 56, 33, 1) 1%,
    rgba(29, 1, 1, 1) 100%
  );
  box-shadow: 0 0.0399rem 0.0798rem rgba(0, 0, 0, 0.16);
  border-radius: 0.399rem;
  font-size: 0.3192rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(243, 208, 135, 1);
  margin-left: auto;
}

/* 价钱介绍 */
.center_two {
  padding: 0.399rem 0.5054rem;
  background: #fff;
  color: #b2b2b2;
  margin-bottom: 0.2128rem;
}
.two_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.two_box .active {
  background: #1c0000;
  color: #f3d087;
  border-color: #1c0000;
}
.two_box div {
  width: 2.9rem;
  height: 3.325rem;
  background: #f8eed8;
  color: #463821;
  border: 0.0266rem solid #f3d087;
  border-radius: 0.1064rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.3724rem;
  align-items: center;
}
.two_box div > p:nth-of-type(1) span {
  font-size: 0.798rem;
}
.center_two > p {
  font-size: 0.3192rem;
  margin-top: 0.3192rem;
}
.center_two > p span {
  color: #1c0000;
}
/* 支付方式 */
.center_three {
  background: #fff;
}
.center_three > div:nth-of-type(1) {
  padding: 0 0.3192rem;
  height: 1.2103rem;
  line-height: 1.2103rem;
  font-size: 0.3458rem;
  color: #1c0000;
  border: 0;
}
.center_three > div {
  height: 1.463rem;
  line-height: 1.463rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5054rem;
  padding-right: 0.3192rem;
  border-bottom: 0.0133rem solid #f5f5f5;
}
.center_three > div > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.center_three > div > div img {
  height: 0.8246rem;
  display: block;
  margin-right: 0.3325rem;
}
.center_three > div > div p {
  height: 0.8246rem;
  line-height: 0.8246rem;
  font-size: 0.3458rem;
}
.center_three input {
  -webkit-appearance: none;
  width: 0.4522rem;
  height: 0.4522rem;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  outline: none;
  margin-right: 0.1064rem;
  cursor: pointer;
}
.center_three input:checked {
  border: 0;
  background: url("../../../static/img/inputCheck.png") no-repeat center;
  background-size: 100% 100%;
}
/* 合计价钱、支付 */
.bottom_four {
  height: 1.2144rem;
  line-height: 1.2144rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 -0.05rem 0.5rem rgba(201, 201, 201, 0.16);
  font-size: 0.3458rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
.bottom_four > p span {
  color: #dd0812;
  font-size: 0.3724rem;
}
.bottom_four > p span i {
  font-size: 0.3rem;
  font-style: normal;
  margin-right: 0.0399rem;
}
.bottom_four > div {
  background: #f2daa9;
  width: 3.192rem;
  height: 100%;
  text-align: center;
  color: #1c0000;
  font-weight: 600;
  margin-left: 0.2128rem;
}
</style>