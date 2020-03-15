<template>
  <div class="vipCenter">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>会员中心</p>
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
        <div @click="$router.push({name: 'my-vipCenter-buyVip'})">立即开通</div>
      </div>
    </div>
    <div class="center_two">
      <div class="title">
        <span></span>
        <p>会员权益</p>
        <span></span>
      </div>
      <div class="vip_type">
        <div :class="vipType == 1?'enlarge':''" @click="vipType = 1">
          <img src="../../../static/img/vip_ordinary.png" />
          <p>
            <span>¥</span>0
          </p>
          <p>普通会员</p>
        </div>
        <div :class="vipType == 2?'enlarge':''" @click="vipType = 2">
          <img src="../../../static/img/vip_gold.png" />
          <p>
            <span>¥</span>268
          </p>
          <p>黄金会员</p>
        </div>
        <div :class="vipType == 3?'enlarge':''" @click="vipType = 3">
          <img src="../../../static/img/vip_platinum.png" />
          <p>
            <span>¥</span>568
          </p>
          <p>铂金会员</p>
        </div>
        <div :class="vipType == 4?'enlarge':''" @click="vipType = 4">
          <img src="../../../static/img/vip_diamonds.png" />
          <p>
            <span>¥</span>1680
          </p>
          <p>钻石会员</p>
        </div>
      </div>
      <div class="box">
        <div class="ordinary">
          <img
            class="triangle"
            src="../../../static/img/triangle.png"
            :style="vipType==1?'left:1.05rem':vipType==2?'left: 3.34rem;':vipType==3?'left: 5.65rem;':'left: 8rem;'"
          />
          <div class="vipExclusive">
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_1.png" />
              <img v-else src="../../../static/img/vip2_1.png" alt />
              <span>景区门票</span>
            </p>
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_2.png" />
              <img v-else src="../../../static/img/vip2_2.png" />
              <span>生日礼物</span>
            </p>
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_3.png" alt />
              <img v-else src="../../../static/img/vip2_3.png" alt />
              <span>开关祈福法会</span>
            </p>
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_4.png" alt />
              <img v-else src="../../../static/img/vip2_4.png" alt />
              <span>专属客服</span>
            </p>
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_5.png" alt />
              <img v-else src="../../../static/img/vip2_5.png" alt />
              <span>邀请返利</span>
            </p>
            <p>
              <img v-if="vipType!=1" src="../../../static/img/vip1_6.png" alt />
              <img v-else src="../../../static/img/vip2_6.png" alt />
              <span>拍卖免保证金</span>
            </p>
            <p>
              <img v-if="vipType==3||vipType==4" src="../../../static/img/vip1_7.png" alt />
              <img v-else src="../../../static/img/vip2_7.png" alt />
              <span>红包</span>
            </p>
            <p>
              <img v-if="vipType==3||vipType==4" src="../../../static/img/vip1_8.png" alt />
              <img v-else src="../../../static/img/vip2_8.png" alt />
              <span>购物打折</span>
            </p>
          </div>
          <div
            class="seeAll"
            @click="$router.push({name:'my-vipCenter-vipEquity',params: { active: vipType}})"
          >查看全部</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vipType: 1
    };
  }
};
</script>

<style scoped>
.vipCenter {
  background: #1c0000;
  position: absolute;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 标签栏 */
.vipCenter .tab {
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
  z-index: 11;
}
.vipCenter .tab > i {
  font-size: 0.399rem;
  color: #fff;
}
.vipCenter .tab > p {
  color: #fff;
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 内容 */
.top_one {
  margin-top: 0.532rem;
  /* overflow: hidden; */
  padding: 0 0.3192rem;
}
.uInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.6rem;
  background: linear-gradient(
    90deg,
    rgba(242, 223, 180, 1) 0%,
    rgba(242, 215, 162, 1) 100%
  );
  border-radius: 0.2128rem 0.2128rem 0 0;
  padding: 0.399rem 0.399rem 0.25rem;
  position: relative;
  margin-bottom: 0.4rem;
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
.uInfo:after {
  position: absolute;
  left: 0;
  bottom: -0.4rem;
  z-index: 1;
  content: " ";
  height: 0.5rem;
  width: 100%;
  border-radius: 0 0 50% 50%;
  background: linear-gradient(
    90deg,
    rgba(242, 223, 180, 1) 0%,
    rgba(242, 215, 162, 1) 100%
  );
}
/* 会员权益 */

.center_two .title {
  padding: 0.399rem 1.1172rem 0.9842rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center_two .title span {
  width: 2.5rem;
  height: 0.0133rem;
  background-color: rgba(243, 208, 135, 1);
  opacity: 0.5;
}
.center_two .title p {
  font-size: 0.3458rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(243, 208, 135, 1);
}
.vip_type {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4256rem;
  height: 1.6891rem;
  position: relative;
  margin-bottom: 0.8rem;
}
.vip_type div {
  width: 2.2078rem;
  height: 1.6891rem;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  transition: all 0.5s;
  -webkit-transition: all 0.5s; /* Safari */
}
.vip_type .enlarge {
  transform: scale(1.3);
}
.vip_type .enlarge p {
  opacity: 1;
}
.vip_type div:nth-of-type(1) {
  background: linear-gradient(
    180deg,
    rgba(228, 217, 200, 1) 0%,
    rgba(146, 137, 112, 1) 100%
  );
  box-shadow: 0 0.05rem 0.2rem rgba(148, 138, 114, 0.45);
}
.vip_type div:nth-of-type(2) {
  background: linear-gradient(
    180deg,
    rgba(242, 231, 219, 1) 0%,
    rgba(216, 197, 151, 1) 100%
  );
  box-shadow: 0 0.05rem 0.2rem rgba(217, 199, 155, 0.5);
}
.vip_type div:nth-of-type(3) {
  background: linear-gradient(
    180deg,
    rgba(250, 250, 252, 1) 0%,
    rgba(197, 197, 197, 1) 100%
  );
  box-shadow: 0 0.05rem 0.2rem rgba(199, 199, 199, 0.47);
}
.vip_type div:nth-of-type(4) {
  background: linear-gradient(
    180deg,
    rgba(223, 226, 230, 1) 0%,
    rgba(167, 176, 193, 1) 100%
  );
  box-shadow: 0 0.05rem 0.2rem rgba(168, 177, 194, 0.67);
}
.vip_type div p {
  font-family: PingFang SC;
  font-weight: 400;
  color: #463821;
  opacity: 0.6;
  font-size: 0.3458rem;
}
.vip_type div p span {
  font-size: 0.2394rem;
}
.vip_type div img {
  width: 0.8778rem;
  height: 0.8778rem;
  position: absolute;
  top: -0.4389rem;
  border-radius: 50%;
}
/* .box{
    background: #f5f5f5;
    width: 100%;
    overflow: hidden;
} */
.ordinary {
  width: 9.3765rem;
  height: 6.0648rem;
  background: #fff;
  opacity: 1;
  border-radius: 0.1064rem;
  margin: 0 auto;
  position: relative;
}
.ordinary .triangle {
  width: 0.3591rem;
  display: block;
  position: absolute;
  top: -0.13rem;
}
.vipExclusive {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.665rem 0.4rem 0;
}
.vipExclusive p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 25%;
}
.vipExclusive img {
  width: 1.1305rem;
  height: 1.1305rem;
  display: block;
}
.vipExclusive span {
  font-size: 0.3192rem;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1c0000;
  margin-top: 0.1596rem;
  margin-bottom: 0.399rem;
}
.seeAll {
  background-color: #f2dcaf;
  height: 1.1704rem;
  line-height: 1.1704rem;
  text-align: center;
  color: #463821;
  font-size: 0.3458rem;
  border-radius: 0 0 0.1064rem 0.1064rem;
}
</style>