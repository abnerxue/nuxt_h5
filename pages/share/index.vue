<template>
  <div class="share">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>分享中心</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="box">
      <img src="../../static/img/share.png" alt />
      <p @click="inviteFriend()">立即邀请好友</p>
      <div class="ranking">
        <!-- <p>188****5454 赚了100.00元</p> -->
        <van-swipe class="verticalSwipe" :show-indicators="false" :autoplay="3000" :vertical="true">
          <van-swipe-item
            class="item"
            v-for="(item,i) in rankList"
            :key="i"
          >{{item.mobile}} 赚了{{item.profit}}元</van-swipe-item>
        </van-swipe>
        <p @click="show=true;ranking=true;">
          排行榜
          <i class="iconfont icon-right"></i>
        </p>
      </div>
      <div class="rules">
        <div>
          <p>
            <span>1</span>
            <span>
              邀请新人
              <br />好友
            </span>
          </p>
          <img src alt />
          <p>
            <span>2</span>
            <span>
              扫描二维
              <br />码下载并注册
            </span>
          </p>
          <img src alt />
          <p>
            <span>3</span>
            <span>
              好友消费
              <br />终身返现
            </span>
          </p>
        </div>
        <p @click="$router.push({name:'share-activityRules'})">
          详细规则
          <i class="iconfont icon-right"></i>
        </p>
      </div>
      <div class="reward" v-if="token">
        <p>我的现金奖励</p>
        <div>
          <p>
            <span>可兑换金额(元)</span>
            <span>0</span>
          </p>
          <p @click="$router.push({name:'share-cashAward'})">立即兑换</p>
        </div>
      </div>
    </div>
    <div class="rankingPopup" v-if="ranking">
      <p>排行榜</p>
      <div class="popupList">
        <div v-for="(item,i) in rankList" :key="i">
          <img :src="item.avatar" alt />
          <p>
            <span>{{item.userName}}</span>
            <span>邀请{{item.number}}名好友共获得了{{item.profit}}元现金</span>
          </p>
        </div>
      </div>
      <img src alt @click="ranking=false;show=false;" />
    </div>
    <div class="invitePopup" v-if="invite">
      <img src="../../static/img/share1.png" alt />
      <div class="infoBox">
        <div class="info">
          <div>
            <p>源头厂家直供&nbsp;&nbsp;&nbsp;自营更放心</p>
            <span>来怀南会,开启你的购物之旅吧!</span>
            <p>
              <img src alt />
              <span>188****4564</span>
            </p>
          </div>
          <img :src="code" alt />
        </div>
        <p class="inviteBtn">保存图片并分享</p>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false;ranking = false;invite=false;" />
  </div>
</template>

<script>
import axios from "axios";
import { Swipe, SwipeItem, Overlay, Toast } from "vant";
export default {
  data() {
    return {
      show: false, // 遮罩层开关
      ranking: false, // 排行榜弹窗开关
      invite: false, // 邀请好友弹窗开关
      rankList: [], //排行榜数组
      code: "", // 二维码信息
      token: "", // 用户token值
    };
  },
  mounted() {
    // this.getData();
    this.rankingList();
    this.qrcode();
    this.token = sessionStorage.getItem("token");
  },
  methods: {
    inviteFriend() {
      if (this.token) {
        this.show=true;
        this.invite=true;
      } else {
        Toast({
          message: "您未登录，请先登录！",
          position: "bottom"
        });
        this.$router.push({ name: "login" });
      }
    },
    getData() {
      // 获取数据
    },
    rankingList() {
      // 推广排行版 /index.php/api/popularize/ranking_list
      let data = new FormData();
      axios
        .post("/ppi/index.php/api/popularize/ranking_list", data)
        .then(res => {
          console.log(res);
          this.rankList = res.data;
        });
    },
    qrcode() {
      // 二维码
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      axios.post("/ppi/index.php/api/user/recommend_qrcode", data).then(res => {
        console.log(res);
        this.code = res.data.qrcode;
      });
    }
  },
  components: {
    Overlay,
    Swipe,
    SwipeItem,
    Toast
  }
};
</script>

<style scoped>
.share {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  overflow-x: hidden;
  font-family: PingFang SC;
  overflow-y: auto;
  background: #a9080e;
}
.share .tab {
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
  z-index: 2;
}
.share .tab > i {
  font-size: 15px;
  color: #9a9a9a;
}
.share .tab > p {
  color: #1c0000;
  font-size: 16px;
  font-weight: 500;
}
.box {
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.box > img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.box > p {
  width: 275px;
  height: 50px;
  margin: 335px auto 30px;
  background: linear-gradient(
    180deg,
    rgba(254, 245, 212, 1) 0%,
    rgba(250, 210, 133, 1) 50%,
    rgba(245, 172, 45, 1) 100%
  );
  box-shadow: 0px 2px 3px rgba(168, 1, 11, 1);
  border-radius: 25px;
  text-align: center;
  font-size: 23px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 50px;
  color: rgba(116, 24, 27, 1);
}
/* 排行榜 */
.ranking {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 39px;
}
.ranking p {
  color: #f8c466;
  font-size: 13px;
}
.ranking p i {
  font-size: 10px;
}
.verticalSwipe {
  width: 160px;
  color: #fbe7c4;
  font-size: 13px;
  height: 18px;
  line-height: 18px;
  margin-right: 12px;
}
.van-swipe-item {
  width: 100% !important;
}
/* 规则 */
.rules {
  width: 345px;
  border-radius: 4px;
  background: #fff;
  margin: 0 auto;
  padding: 36px 32px 15px;
  margin-bottom: 15px;
}
.rules > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.rules > div p {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}
.rules > div p span:nth-child(1) {
  width: 24px;
  height: 24px;
  background: #fad68f;
  border-radius: 50%;
  opacity: 0.9;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
}
.rules > div p span:nth-child(2) {
  font-size: 13px;
  text-align: center;
  margin-top: 8px;
  color: #1c0000;
}
.rules > p {
  color: #f5c35a;
  font-size: 13px;
  margin-right: 4px;
  text-align: center;
}
.rules > p i {
  font-size: 10px;
}
/* 奖励 */
.reward {
  width: 345px;
  margin: 0 auto 50px;
  border-radius: 4px;
  padding: 12px 15px 15px;
  background: #fff;
}
.reward > p {
  color: #1c0000;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 16px;
}
.reward > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.reward > div p:nth-child(1) {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.reward > div p span {
  display: block;
}
.reward > div p span:nth-child(1) {
  font-size: 13px;
  color: #4a4a4a;
  margin-right: 4px;
}
.reward > div p span:nth-child(2) {
  color: #dd0812;
  font-size: 23px;
}
.reward > div p:nth-child(2) {
  height: 29px;
  width: 86px;
  text-align: center;
  font-size: 13px;
  color: #4a4a4a;
  line-height: 29px;
  background: #fbdd9f;
  border-radius: 4px;
}
/* 排行榜弹窗 */
.rankingPopup {
  width: 315px;
  height: 334px;
  background: #fff;
  border-radius: 8px;
  position: fixed;
  top: 144px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
}
.rankingPopup > p {
  height: 44px;
  text-align: center;
  line-height: 44px;
  font-size: 16px;
  color: #463821;
  background: linear-gradient(
    91deg,
    rgba(255, 244, 226, 1) 0%,
    rgba(242, 215, 162, 1) 100%
  );
  border-radius: 8px 8px 0px 0px;
}
.popupList {
  padding: 0 12px;
  height: 290px;
  overflow-x: hidden;
  overflow-y: auto;
}
.popupList > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e9e9e9;
}
.popupList > div img {
  width: 40px;
  height: 40px;
  background: #1c0000;
  display: block;
  border-radius: 50%;
  margin-right: 4px;
}
.popupList > div p {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.popupList > div p span:nth-of-type(1) {
  color: #1c0000;
}
.popupList > div p span:nth-of-type(2) {
  color: #4a4a4a;
}
.rankingPopup > img {
  width: 44px;
  height: 44px;
  display: block;
  background: #fff;
  position: absolute;
  bottom: -60px;
  z-index: 1;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 50%;
}
/* 邀请好友弹窗 */
.invitePopup {
  width: 295px;
  /* background: #fff; */
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 8px;
  z-index: 2;
}
.invitePopup > img {
  width: 100%;
  display: block;
  border-radius: 8px 8px 0 0;
}
.infoBox {
  background: #fff;
  padding-bottom: 12px;
  border-radius: 0 0 8px 8px;
}
.info {
  background: #fff;
  padding: 12px 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.info > img {
  width: 75px;
  height: 75px;
  display: block;
  background: #1c0000;
}
.info > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info > div > p:nth-of-type(1) {
  font-size: 15px;
  color: #74181b;
  font-weight: 900;
}
.info > div > span {
  font-size: 12px;
  color: #1c0000;
  margin-top: 2px;
}
.info > div > p:nth-of-type(2) {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
}
.info > div > p:nth-of-type(2) img {
  width: 24px;
  height: 24px;
  display: block;
  border-radius: 50%;
  background: #1c0000;
}
.info > div > p:nth-of-type(2) span {
  margin-left: 8px;
  color: #1c0000;
  font-size: 13px;
}
.inviteBtn {
  color: #74181b;
  font-size: 14px;
  width: 265px;
  height: 34px;
  background: linear-gradient(
    180deg,
    rgba(251, 231, 196, 1) 0%,
    rgba(250, 216, 147, 1) 100%
  );
  border-radius: 21px;
  margin: 0 auto;
  text-align: center;
  line-height: 34px;
  box-shadow: 0px 2px 3px rgba(245, 199, 102, 0.71);
  margin-top: 16px;
}
</style>