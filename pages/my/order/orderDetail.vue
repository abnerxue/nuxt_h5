<template>
  <div class="orderDetail">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>订单详情</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 状态栏 -->
    <div class="status">
      <p>
        <img
          v-if="order_del.payStatus==1&&order_del.logisticsStatus==1"
          src="../../../static/img/pay.png"
          alt
        />
        <img
          v-if="order_del.logisticsStatus==1&&order_del.payStatus==3"
          src="../../../static/img/buy.png"
          alt
        />
        <img
          v-if="order_del.logisticsStatus==2&&order_del.payStatus==3"
          src="../../../static/img/car.png"
          alt
        />
        <img
          v-if="order_del.logisticsStatus==3&&order_del.appraise==0"
          src="../../../static/img/paySuc.png"
          alt
        />
        <span class="state" v-if="order_del.payStatus==1&&order_del.logisticsStatus==1">等待买家付款</span>
        <span class="state" v-if="order_del.payStatus==2&&order_del.logisticsStatus==1">支付未成功</span>
        <span class="state" v-if="order_del.logisticsStatus==1&&order_del.payStatus==3">买家已付款</span>
        <span class="state" v-if="order_del.logisticsStatus==2&&order_del.payStatus==3">商家已发货</span>
        <span class="state" v-if="order_del.logisticsStatus==3&&order_del.appraise==0">交易成功</span>
      </p>
      <van-count-down
        v-if="order_del.payStatus==1&&order_del.logisticsStatus==1"
        :time="order_del.timeRemaining*1000"
        format="mm分ss秒后自动关闭"
      />
      <van-count-down
        v-if="order_del.logisticsStatus==2&&order_del.payStatus==3"
        :time="order_del.takeTimeRemaining*1000"
        format="DD天mm分ss秒后自动确认"
      />
    </div>
    <!-- 用户信息 -->
    <div class="userInfo">
      <p>
        <span>{{address.name}}</span>
        <span>{{address.phone}}</span>
      </p>
      <p>{{address.province+address.city+address.county+address.address}}</p>
    </div>
    <!-- 商品信息 -->
    <div class="goodsInfo" v-for="(goods,i) in order_del.goods" :key="i" @click="$router.push({name: 'detail'})">
      <img :src="goods.thumb" alt />
      <p>{{goods.title}}</p>
      <p>
        <span>
          <i>¥</i>
          {{goods.price}}
        </span>
        <span>x{{goods.number}}</span>
      </p>
      <div class="btndiv">
        <span
          class="afterSale"
          v-if="order_del.logisticsStatus==3&&order_del.payStatus==3&&order_del.appraise==0"
          @click.stop="toAppraise(order_del.id,goods)"
        >评价</span>
        <!-- 申请售后 -->
        <span
          class="afterSale"
          v-if="order_del.logisticsStatus>=1&&order_del.payStatus==3"
          @click.stop="goods.returned_purchase!=null&&goods.returned_purchase!=''&&goods.returned_purchase!=undefined?$router.push({name:'my-afterSale-applyRefund',query:{id:goods.returned_purchase.id,img:goods.thumb,title:goods.title}}):$router.push({name:'my-afterSale-applyAfterSale',query:{gid:goods.gid,orderId:order_del.id}})"
        >申请售后</span>
      </div>
      <!-- 待评价 -->
    </div>
    <!-- 商品金额信息 -->
    <div class="goodsMoney">
      <p>
        <span>商品金额</span>
        <span>
          <i>¥</i>
          {{order_del.totalPrice}}
        </span>
      </p>
      <p>
        <span>红包</span>
        <span v-if="order_del.redPaper!=null">{{order_del.redPaper.redPaper}}</span>
        <span v-if="order_del.redPaper==null">无可用红包</span>
      </p>
      <p>
        <span>配送运费</span>
        <span>
          <i>¥</i>
          {{order_del.logisticsExpenses}}
        </span>
      </p>
      <p>
        <span>订单备注</span>
        <span>{{order_del.message}}</span>
      </p>
      <p>
        <span>实付金额</span>
        <span class="redMoney">
          <i>¥</i>
          {{order_del.totalPrice}}
        </span>
      </p>
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo">
      <h6>订单信息</h6>
      <p>
        <span>创建时间</span>
        <span>{{order_del.orderTime}}</span>
      </p>
      <p>
        <span>订单编号</span>
        <span>{{order_del.serialNumber}}</span>
      </p>
      <p>
        <span>付款时间</span>
        <span>{{order_del.payTime}}</span>
      </p>
    </div>
    <!-- 订单按钮栏 -->
    <div class="orderBottom">
      <!-- 待付款状态 -->
      <p v-if="order_del.payStatus<=2 " @click="pay()">去支付</p>
      <p v-if="order_del.payStatus<=2" @click="cancel()">取消订单</p>
      <!-- 待发货状态 -->
      <p v-if="order_del.logisticsStatus<3&&order_del.payStatus==3" @click="queren()">确认收货</p>
      <p v-if="order_del.logisticsStatus<=3&&order_del.payStatus==3" @click="tans()">查看物流</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 1,
      order_del: {},
      address: {},
      redPaper: {}
    };
  },
  components: {
    Toast
  },
  mounted() {
    let data = new FormData();
    data.append("orderId", this.$route.query.id);
    data.append("token", sessionStorage.getItem("token"));
    axios.post("/ppi/index.php/api/order/detail", data).then(res => {
      this.order_del = res.data;
      this.redPaper = res.data.redPaper;
      this.address = res.data.address;
    });
  },
  methods: {
    toAppraise(id, goods) {
      //去评论
      let good = JSON.stringify(goods);
      this.$router.push({
        name: "my-order-appraise",
        query: { order_id: id, good: good }
      });
    },
    pay(){
      // 去支付
      this.$router.push({name: "confirmOrder-orderPay",query:{serialNumber:this.order_del.serialNumber}});
    },
    cancel() {
      // 取消订单
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", this.order_del.id);
      axios.post("/ppi/index.php/api/order/trash", data).then(res => {
        Toast({
          message: res.data.message,
          position: "bottom"
        });
        this.$router.push({name:'order-orderList'})
      });
    },
    queren() {
      // 确认订单
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", this.order_del.id);
      axios.post("/ppi/index.php/api/order/confirm_receipt", data).then(res => {
        Toast({
          message: res.data.message,
          position: "bottom"
        });
      });
    },
    tans() {
      if (this.order_del.logisticsStatus == 1) {
        Toast({
          message: "商品还未发货",
          position: "bottom"
        });
      } else {
        this.$router.push({
          name: "my-order-checkLogistics",
          query: { id: this.order_del.id }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderDetail {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 44px;
}

/* 标题 */
.title {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 2px 3px rgba(190, 190, 190, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

.title > i {
  font-size: 15px;
  color: #9a9a9a;
}

.title p {
  color: #1c0000;
  font-size: 16px;
  font-weight: 500;
}

/* 状态栏 */
.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 44px;
  background: #fff;
  box-shadow: 0px 3px 6px rgba(190, 190, 190, 0.1);
  margin-bottom: 8px;
}

.status p {
  font-size: 14px;
  color: #1c0000;
  display: flex;
  flex-direction: row;
}
.status p img {
  width: 20px;
  display: block;
  height: 20px;
  margin-right: 6px;
}
.status > span {
  font-size: 13px;
  color: #808080;
}

.van-count-down {
  color: #808080;
}

/* 用户信息 */
.userInfo {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 12px 19px 16px;
  margin-bottom: 8px;
}

.userInfo p {
  font-size: 13px;
  color: #808080;
}

.userInfo p:nth-child(1) {
  margin-bottom: 15px;
}

.userInfo p span {
  margin-right: 30px;
  color: #1c0000;
}

/* 商品信息 */
.goodsInfo {
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  background: #fff;
  margin-bottom: 8px;
  position: relative;
}

.goodsInfo img {
  width: 78px;
  height: 78px;
  display: block;
  background: #1c0000;
  border-radius: 2px;
}

.goodsInfo p:nth-of-type(1) {
  width: 170px;
  height: 40px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #1c0000;
  font-size: 14px;
  margin: 0 35px 0 4px;
}

.goodsInfo p:nth-of-type(2) {
  font-size: 13px;
  text-align: right;
  color: #1c0000;
  display: flex;
  flex-direction: column;
}

.goodsInfo p:nth-of-type(2) span:nth-of-type(2) {
  color: #808080;
}

.goodsInfo p:nth-of-type(2) span i {
  font-style: normal;
  font-size: 10px;
}
.btndiv{
  position: absolute;
  bottom: 12px;
  right: 16px;
  display: flex;
  flex-direction: row;
}
.goodsInfo .afterSale {
  width: 74px;
  height: 26px;
  border: 1px solid #74181b;
  border-radius: 15px;
  text-align: center;
  line-height: 26px;
  color: #74181b;
  font-size: 13px;
  margin-left: 8px;
  background: #fff;
  display: block;
}

/* 商品金额信息 */
.goodsMoney {
  padding: 12px 16px;
  background: #fff;
  margin-bottom: 8px;
}

.goodsMoney p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 18px;
  line-height: 18px;
  margin-bottom: 8px;
}

.goodsMoney p:last-child {
  margin-bottom: 0;
}

.goodsMoney p span:nth-child(1) {
  color: #9a9a9a;
  font-size: 13px;
}

.goodsMoney p span:nth-child(2) {
  font-size: 13px;
  color: #1c0000;
}

.goodsMoney p span:nth-child(2) i {
  font-style: normal;
  font-size: 10px;
}

.goodsMoney p span.redMoney {
  color: #74181b;
}

/* 订单信息 */
.orderInfo {
  padding: 12px 16px;
  background: #fff;
}

.orderInfo h6 {
  margin: 0;
  font-weight: normal;
  color: #1c0000;
  font-size: 13px;
  margin-bottom: 8px;
}

.orderInfo p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 16px;
  line-height: 16px;
  margin-bottom: 8px;
}

.orderInfo p:last-child {
  margin-bottom: 0;
}

.orderInfo p span:nth-child(1) {
  color: #9a9a9a;
  font-size: 13px;
}

.orderInfo p span:nth-child(2) {
  color: #808080;
  font-size: 13px;
}

/* 订单按钮栏 */
.orderBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 0 16px;
  box-sizing: border-box;
}

.orderBottom p {
  width: 80px;
  height: 30px;
  border: 1px solid #74181b;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #74181b;
  font-size: 13px;
  margin-left: 8px;
}
</style>
