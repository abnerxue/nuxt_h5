<template>
  <div class="confirmOrder">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>确认订单</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 选择地址 -->
    <div class="clickAdd">
      <div class="emtryAdd" v-if="address==''" @click="$router.push({name:'my-add_address'})">
        <p>没有地址信息，请点击后添加地址</p>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="defaultAdd" v-else @click="$router.push({name:'my-address',query:{id:1}})">
        <div>
          <p>
            <span>{{address.name}}</span>
            <span>{{address.phone}}</span>
          </p>
          <p>{{address.province}}{{address.city}}{{address.county}}{{address.address}}</p>
        </div>
        <i class="iconfont icon-right"></i>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="goodsInfo">
      <div v-for="(good,i) in order_news.goods" :key="i">
        <img :src="good.thumb" alt />
        <div>
          <p>{{good.title}}</p>
          <p>
            <span>
              <i>¥</i>{{good.price}}
            </span>
            <span>x{{good.number}}</span>
          </p>
        </div>
      </div>
      <p>
        <span>配送运费</span>
        <span>
          <i>¥</i>{{order_news.postage}}
        </span>
      </p>
      <div class="mark">
        <p @click="remarkTag=!remarkTag">
          <span>订单备注：</span>
          <span>
            <i class="iconfont icon-right"></i>
          </span>
        </p>
        <textarea v-if="remarkTag" placeholder="填写订单备注（100字以内）" v-model="remark"></textarea>
      </div>
    </div>
    <!-- 金额信息 -->
    <div class="moneyInfo">
      <p>
        <span>商品金额</span>
        <span>
          <i>¥</i>{{order_news.goodsTotal}}
        </span>
      </p>
      <p @click="toPaper()">
        <span>红包</span>
        <span v-if="redPaper==null||redPaper==''">无可用红包</span>
        <span v-else>
          <i>¥</i>{{redPaper.redPaper}}
          <i class="iconfont icon-right"></i>
        </span>
      </p>
      <p>
        <span>合计</span>
        <span>
          <i>¥</i>
          {{total}}
        </span>
      </p>
    </div>
    <!-- 支付 -->
    <div class="goPay">
      <p>还需支付:</p>
      <span>
        <i>¥</i>{{total}}
      </span>
      <p class="Paybtn" @click="buy()">去支付</p>
    </div>
  </div>
</template>

<script>
import { Area, Popup, Toast } from "vant";
import axios from "axios";
import areaList from "../../assets/js/area.js";
export default {
  data() {
    return {
      buy_good_data: {},//单个商品参数
      order_news: {}, //订单信息
      address: {}, //地址信息
      redPaper: {}, //红包信息
      total: 0, //合计
      types: "", //用来判断 single单个商品结算  cart购物车结算
      carts: [], //购物车
      remark: "", //备注
      url: "",
      remarkTag: false // 订单备注
    };
  },
  mounted() {
    sessionStorage.removeItem("redPapers");
    this.types = this.$route.query.types;
    let data = new FormData();
    data.append("token", sessionStorage.getItem("token"));
    if (this.types == "single") {
      this.buy_good_data.activity = this.$route.query.activity;
      this.buy_good_data.gid = this.$route.query.gid;
      if (this.$route.query.activity == 2) {
        data.append("seckillId", this.$route.query.gid);
        this.url = "/api/seckill/settlement";
      } else if (this.$route.query.activity == 4) {
        data.append("scoreId", this.$route.query.gid);
        this.url = "/api/score/settlement";
      } else if (this.$route.query.activity == 0) {
        data.append("gid", this.$route.query.gid);
        this.buy_good_data.number = this.$route.query.number;
        data.append("number", this.$route.query.number);
        this.url = "/api/goods/settlement";
      }
      this.settlement(data); //结算单个商品
    } else if (this.types == "cart") {
      this.carts = this.$route.query.result;
      this.cart(); // 结算购物车
    } else if (this.types == 'join') {
      // 参与团购
      data.append("groupInitiateId", this.$route.query.gid);
      this.url = "/api/group/enroll_settlement";
      this.settlement(data); //结算单个商品
    } else if (this.types == 'start') {
      // 发起团购groupGoodsId
      data.append("groupGoodsId", this.$route.query.gid);
      this.url = "api/group/initiate_settlement";
      this.settlement(data); //结算单个商品
    }
  },
  methods: {
    toPaper() {
      if (this.redPaper == null || this.redPaper == "") {
        return;
      } else {
        this.$router.push({ name: "confirmOrder-redPaper" });
      }
    },
    // 结算单个商品
    settlement(data) {
      axios.post("/ppi/index.php" + this.url, data).then(res => {
        this.order_news = res.data;
        sessionStorage.setItem("redPaper", JSON.stringify(res.data.redPaper));
        if (res.data.address != "" && res.data.address != null) {
          if (
            sessionStorage.getItem("address") != null &&
            sessionStorage.getItem("address") != ""
          ) {
            this.address = eval("(" + sessionStorage.getItem("address") + ")");
          } else {
            this.address = res.data.address[0]; //获取默认地址
          }
        } else {
          this.address = "";
        }
        if (res.data.redPaper != "" && res.data.redPaper != null) {
          if (
            sessionStorage.getItem("redPapers") != null &&
            sessionStorage.getItem("redPapers") != ""
          ) {
            this.redPaper = eval(
              "(" + sessionStorage.getItem("redPapers") + ")"
            );
          } else {
            this.redPaper.id = res.data.redPaper[0].id; //获取默认红包
            this.redPaper.redPaper = res.data.redPaper[0].redPaper; //获取默认红包
          }
          this.total = res.data.totalMoney - this.redPaper.redPaper; //合计
        } else {
          this.redPaper = "";
          this.total = res.data.totalMoney; //合计
        }
      });
    },
    // 结算购物车
    cart() {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("cartIds", this.carts);
      axios.post("/ppi/index.php/api/cart/settlement", data).then(res => {
        this.order_news = res.data;
        sessionStorage.setItem("redPaper", JSON.stringify(res.data.redPaper));
        if (res.data.address != "" && res.data.address != null) {
          if (
            sessionStorage.getItem("address") != null &&
            sessionStorage.getItem("address") != ""
          ) {
            this.address = eval("(" + sessionStorage.getItem("address") + ")");
          } else {
            this.address = res.data.address[0]; //获取默认地址
          }
        } else {
          this.address = "";
        }
        if (res.data.redPaper != "" && res.data.redPaper != null) {
          if (
            sessionStorage.getItem("redPapers") != null &&
            sessionStorage.getItem("redPapers") != ""
          ) {
            this.redPaper = eval(
              "(" + sessionStorage.getItem("redPapers") + ")"
            );
          } else {
            this.redPaper.id = res.data.redPaper[0].id; //获取默认红包
            this.redPaper.redPaper = res.data.redPaper[0].redPaper / 100; //获取默认红包
          }
          this.total = res.data.totalMoney - this.redPaper.redPaper; //合计
        } else {
          this.redPaper = "";
          this.total = res.data.totalMoney; //合计
        }
      });
    },
    buy() {
      sessionStorage.removeItem("redPapers");
      let data = new FormData();
      let url = "";
      if (this.types == "single") {
        if (this.buy_good_data.activity == 2) {
          data.append("seckillId", this.$route.query.gid);
          url = "/ppi/index.php/api/seckill/buy";
        } else if (this.buy_good_data.activity == 4) {
          data.append("scoreId", this.$route.query.gid);
          url = "/ppi/index.php/api/score/buy";
        } else if (this.buy_good_data.activity == 0) {
          data.append("gid", this.$route.query.gid);
          data.append("number", this.$route.query.number);
          url = "/ppi/index.php/api/goods/buy";
        }
      } else if (this.types == "cart") {
        url = "/ppi/index.php/api/cart/buy";
        data.append("cartIds", this.carts);
      } else if (this.types == "join") {
        url = "/ppi/index.php/api/group/enroll";
        data.append("groupInitiateId", this.$route.query.gid);
      } else if (this.types == 'start') {
        url = '/ppi//index.php/api/group/initiate';
        data.append("groupGoodsId", this.$route.query.gid);
      }
      data.append("token", sessionStorage.getItem("token"));
      data.append("redPaperId", this.redPaper.id);
      data.append("memo", this.remark);
      data.append("addressId", this.address.id);
      axios.post(url, data).then(res => {
        if (res.data.code == 1) {
          this.$router.push({name: "confirmOrder-orderPay",query:{serialNumber:res.data.serialNumber}});
        } else {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
        }
      });
    }
  },
  components: {
    Area,
    Popup,
    Toast
  }
};
</script>

<style scoped>
.confirmOrder {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 1.3034rem;
}

/* 标签栏 */
.confirmOrder .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
  position: fixed;
  top: 0;
  left: 0;
}

.confirmOrder .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.confirmOrder .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 选择地址 */
.clickAdd {
  height: 80px;
  background: #fff;
  margin-bottom: 12px;
}

.emtryAdd {
  display: flex;
  flex-direction: row;
  padding: 0 19px;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #74181b;
  height: 100%;
}

.emtryAdd i {
  color: #74181b;
  font-size: 13px;
}

.defaultAdd {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 16px 19px;
  background: #fff;
  height: 100%;
}

.defaultAdd > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 13px;
  height: 100%;
}

.defaultAdd > div p:nth-child(1) {
  color: #1c0000;
}

.defaultAdd > div p:nth-child(1) span:nth-child(1) {
  margin-right: 30px;
}

.defaultAdd > div p:nth-child(2) {
  color: #808080;
}

.defaultAdd > i {
  font-size: 15px;
  color: #808080;
}

/* 商品信息 */
.goodsInfo {
  overflow: hidden;
}

.goodsInfo > div {
  background: #fff;
  display: flex;
  flex-direction: row;
  padding: 15px 19px;
  margin-bottom: 1px;
}

.goodsInfo div img {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 2px;
  margin-right: 8px;
}

.goodsInfo > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
}

.goodsInfo > div > div p {
  font-size: 13px;
  line-height: 16px;
}

.goodsInfo > div > div p:nth-child(1) {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  color: #1c0000;
}

.goodsInfo > div > div p:nth-child(2) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #808080;
  line-height: 20px;
  height: 20px;
}

.goodsInfo > div > div p:nth-child(2) span:nth-child(1) {
  color: #dd0812;
  font-size: 14px;
}

.goodsInfo > div > div p:nth-child(2) span i,
.goodsInfo > p span i {
  font-size: 10px;
  font-style: normal;
}

.goodsInfo > p,
.moneyInfo p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  font-size: 13px;
  height: 44px;
  align-items: center;
  margin-bottom: 1px;
  padding: 0 19px;
  color: #1c0000;
}

.goodsInfo > p span:nth-child(2),
.moneyInfo > p span:nth-child(2) {
  color: #808080;
  font-size: 13px;
}

.goodsInfo > p > i {
  font-size: 12px;
  color: #808080;
  font-style: normal;
}

.goodsInfo > p:last-child {
  margin-bottom: 4px;
}

.goodsInfo .mark {
  display: flex;
  flex-direction: column;
  padding: 12px 19px;
}
.goodsInfo .mark p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  font-size: 13px;
  align-items: center;
  margin-bottom: 1px;
  color: #1c0000;
}

.mark > p span:nth-child(2) i {
  font-style: normal;
  font-size: 0.26667rem;
  color: #808080;
}
/* .goodsInfo .mark p span {
    display: block;
    width: 100%;
  } */

.goodsInfo .mark textarea {
  display: block;
  width: 100%;
  border-radius: 4px;
  height: 65px;
  outline: none;
  border-color: rgba(245, 245, 245, 1);
  resize: none;
  padding: 8px;
  font-size: 12px;
  margin-top: 6px;
}

/* 金额信息 */
.moneyInfo {
  overflow: hidden;
}

.moneyInfo > p i {
  font-style: normal;
  font-size: 10px;
  color: #808080;
}

.moneyInfo > p:nth-child(3) span:nth-child(2),
.moneyInfo > p:nth-child(3) i {
  color: #dd0812;
}

/* 支付 */
.goPay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.goPay p:nth-child(1) {
  color: #1c0000;
  font-size: 13px;
  margin-right: 8px;
}

.goPay span {
  color: #dd0812;
  font-size: 14px;
  margin-right: 8px;
}

.goPay span i {
  font-size: 12px;
  font-style: normal;
}

.Paybtn {
  width: 90px;
  height: 49px;
  font-size: 13px;
  text-align: center;
  line-height: 49px;
  background: #dd0812;
  color: #fff;
}
</style>
