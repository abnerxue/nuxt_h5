<template>
  <div class="my">
    <div class="tab">
      <i
        @click="$router.push({name:'my-setting',query:{user:JSON.stringify({'avatar':user.avatar,'userName':user.userName})}})"
        class="iconfont icon-shezhi"
      ></i>
    </div>
    <div class="top_one">
      <div class="userInfo">
        <img :src="user.avatar?user.avatar:''" />
        <div>
          <p>{{ user.userName }}</p>
          <p>
            <img src="../../static/img/vip_ordinary.png" alt />
            <span>普通会员</span>
          </p>
        </div>
      </div>
      <div class="moneyInfo">
        <p @click="$router.push({name:'my-redPaper'})">
          <span>{{ redPaper.number }}</span>
          <span>红包</span>
        </p>
        <span></span>
        <p @click="$router.push({name:'my-integral',query:{'integral':user.score}})">
          <span>{{ user.score }}</span>
          <span>积分</span>
        </p>
        <span></span>
        <p @click="$router.push({name:'my-balance'})">
          <span>{{ user.money }}</span>
          <span>余额</span>
        </p>
      </div>
      <div class="vip_center" @click="message()">
        <p>
          <img src="../../static/img/vip_h.png" alt />
          <span>会员中心</span>
        </p>
        <div>
          <p>
            <span>享会员立返最高2478元</span>
            <span>更有10重特权至多省8万6！</span>
          </p>
          <p></p>
        </div>
      </div>
      <div class="order">
        <p @click="$router.push({name:'my-order-orderList',query:{id:1}})">
          <img src="../../static/img/pay.png" alt />
          <i class="marker" v-if="order.un_pay!=0">{{ order.un_pay }}</i>
          <span>待付款</span>
        </p>
        <p @click="$router.push({name:'my-order-orderList',query:{id:2}})">
          <img src="../../static/img/car.png" alt />
          <i class="marker" v-if="order.logistics!=0">{{ order.logistics }}</i>
          <span>待收货</span>
        </p>
        <p @click="$router.push({name:'my-order-orderList',query:{id:3}})">
          <img src="../../static/img/evaluate.png" alt />
          <i class="marker" v-if="order.unevaluate!=0">{{ order.unevaluate }}</i>
          <span>待评价</span>
        </p>
        <p @click="$router.push({name:'my-afterSale'})">
          <img src="../../static/img/refund.png" alt />
          <span>退款/售后</span>
        </p>
        <p @click="$router.push({name:'my-order-orderList',query:{id:0}})">
          <img src="../../static/img/allOrder.png" alt />
          <span>全部订单</span>
        </p>
      </div>
      <div class="group">
        <p>
          <span>我的拼团</span>
          <i class="iconfont icon-right" @click="$router.push({name:'my-myAssemble'})"></i>
        </p>
        <div v-if="nogroup" class="group_empty">
          <p>您还没有参与任何拼团，快去发起拼团吧~</p>
        </div>
        <van-swipe
            class="verticalSwipe"
            :show-indicators="false"
            :autoplay="3000"
            :vertical="true"
          >
            <van-swipe-item
              class="item"
              v-for="(item,i) in groupList"
              :key="i"
            >{{item.title}}</van-swipe-item>
          </van-swipe>
        <div v-if="!nogroup" class="group_order">
          <img src alt />
          <div>
            <p>
              <i class="iconfont icon-pintuan"></i>我参与的拼团
            </p>
            <p>还差2人拼团成功，邀请好友参加拼团更快哦~</p>
          </div>
        </div>
      </div>
    </div>
    <div class="center_two">
      <div @click="$router.push({name:'my-address'})">
        <p>地址管理</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div @click="$router.push({name:'share'})">
        <p>分享中心</p>
        <i class="iconfont icon-right"></i>
      </div>
      <a href="https://chat.sobot.com/chat/h5/v2/index.html?sysnum=e772a07377c14e239174ee712efa2647">
        <p>帮助中心</p>
        <i class="iconfont icon-right"></i>
      </a>
      <div @click="$router.push({name:'my-about'})">
        <p>关于</p>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <Tabbar :active="4"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/tabber.vue";
import { Toast,Swipe, SwipeItem, } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      nogroup: true,
      user: {}, //用户信息
      token: "", // 用户token
      redPaper: {}, // 红包信息
      order: {}, // 订单信息
      groupList: []
    };
  },
  components: {
    Tabbar,
    Toast,Swipe, SwipeItem,
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    if (this.token) {
      this.getData();
    } else {
      Toast({
        message: "您未登录，请先登录！",
        position: "bottom"
      });
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    message(){  // 会员中心
      Toast("即将上线！");
      // 跳转到会员中心
      //this.$router.push({name:'my-vipCenter'})
    },
    getData() {
      //用户中心首页
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      axios.post("/ppi/index.php/api/user/index", data).then(res => {
        this.user = res.data;
        this.order = res.data.order;
        this.redPaper = res.data.redPaper;
      });
    },
    // 拼团列表
    getAssemble(){
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("activity", 1);
      data.append("group", 0);
      data.append("page", this.page);
      data.append("span", 10);
      axios.post("/ppi/index.php/api/order/get_list", data).then(res => {
        this.tag = true;
        if (res.data.code == 0) {
          Toast(res.data.message);
        } else {
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.group_order_list = res.data.list;
          } else {
            res.data.list.map(item => {
              this.group_order_list.push(item);
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.my {
  background: #f5f5f5;
  padding-bottom: 1.3333rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

/* 标签栏 */
.my .tab {
  width: 100%;
  height: 1.3333rem;
  line-height: 1.3333rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  text-align: right;
}

.my .tab i {
  font-size: 0.4655rem;
}

.top_one {
  width: 100%;
  padding: 0 0.3192rem;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
}

/* 用户信息 */
.userInfo {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.userInfo > img {
  width: 1.5694rem;
  height: 1.5694rem;
  border-radius: 50%;
  background: burlywood;
}

.userInfo div {
  margin-left: 0.2128rem;
  overflow: hidden;
}

.userInfo div p:nth-child(1) {
  font-size: 0.3458rem;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 0.4921rem;
  height: 0.4921rem;
  color: #1c0000;
}

.userInfo div p:nth-child(2) img {
  float: left;
  width: 0.399rem;
  height: 0.399rem;
}

.userInfo div p:nth-child(2) span {
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

/* 红包、积分、余额信息 */
.moneyInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5054rem;
  margin-bottom: 0.399rem;
}

.moneyInfo > span {
  width: 0.0266rem;
  height: 0.4788rem;
  background: #e9e9e9;
}

.moneyInfo > p {
  width: 3.1255rem;
}

.moneyInfo > p span:nth-child(1) {
  margin-top: 0;
}

.moneyInfo > p span {
  display: block;
  font-size: 0.35rem;
  color: #1c0000;
  margin-top: 0.1596rem;
  text-align: center;
}

/* 会员中心 */
.vip_center {
  padding: 0.3192rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fbe7c4;
  border-radius: 0.2128rem 0.2128rem 0 0;
}

.vip_center > p {
  padding: 0 0.399rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 0.0133rem solid #d7c5a4;
}

.vip_center > p img {
  width: 0.399rem;
  height: 0.399rem;
  display: block;
  margin-bottom: 0.1064rem;
}

.vip_center > p > span {
  display: block;
  color: #463821;
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: 500;
}

.vip_center > div {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.399rem;
  align-items: center;
}

.vip_center > div p:nth-child(1) {
  font-size: 0.32rem;
  font-family: PingFang SC;
  font-weight: 500;
  color: #463821;
}

.vip_center > div p:nth-child(1) span:nth-child(1) {
  margin-bottom: 0.1064rem;
}

.vip_center > div p:nth-child(1) span {
  display: block;
}

.vip_center > div p:nth-child(2) {
  width: 0.532rem;
  height: 0.532rem;
  background: url(../../static/img/vip_right.png) no-repeat;
  background-size: 100% 100%;
}

/* 订单 */
.order {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0.4522rem 0 0.4788rem;
}

.order p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.order p i {
  font-size: 0.6118rem;
}

.order p img {
  display: block;
  height: 0.6118rem;
  margin-bottom: 0.2128rem;
}

.order .marker {
  position: absolute;
  top: -9px;
  right: -1px;
  width: 18px;
  height: 17px;
  display: block;
  border-radius: 50%;
  border: 1px solid #8e161a;
  color: #8e161a;
  font-size: 11px;
  font-style: normal;
  text-align: center;
  line-height: 16px;
  background: #fff;
  z-index: 1;
}

.order p span {
  color: #4a4a4a;
  font-size: 0.35rem;
  font-weight: 400;
  font-family: PingFang SC;
}

/* 拼团 */
.group {
  padding: 0.2128rem 0.2926rem;
  background: #f5f5f5;
  margin-bottom: 0.399rem;
  border-radius: 0.1064rem;
}

.group > p {
  font-size: 0.4rem;
  font-family: PingFang SC;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #463821;
}

.group > p > i {
  font-size: 0.35rem;
  color: #808080;
  text-align: right;
}

.group_order {
  overflow: hidden;
  display: flex;
  margin-top: 0.2128rem;
  flex-direction: row;
}

.group_order img {
  width: 0.8778rem;
  height: 0.8778rem;
  display: block;
  background: #808080;
  margin-right: 0.2128rem;
}

.group_order div p:nth-child(1) {
  color: #dd0812;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 0.2926rem;
  line-height: 0.399rem;
}

.group_order div p:nth-child(1) i {
  font-size: 0.35rem;
  margin-right: 0.0532rem;
}

.group_order div p:nth-child(2) {
  font-size: 0.266rem;
  font-weight: 400;
  color: #808080;
}

.group_empty {
  font-size: 0.35rem;
  font-family: PingFang SC;
  margin: 0.3724rem 0;
  text-align: center;
  color: #808080;
}

/* 列表页 */
.center_two {
  overflow: hidden;
  margin-top: 0.1862rem;
  margin-bottom: 0.665rem;
}

.center_two > div,.center_two > a {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.4256rem 0.5054rem;
  background: #fff;
  font-size: 0.35rem;
  border-bottom: 0.0133rem solid #f5f5f5;
}

.center_two > div p,.center_two > a p{
  color: #1c0000;
}

.center_two > div i,.center_two > a i{
  color: #9a9a9a;
  font-size: 0.3rem;
}
</style>
