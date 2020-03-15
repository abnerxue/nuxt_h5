<template>
  <div class="applyRefund">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p v-if="after_details.type==1">退货退款</p>
      <p v-if="after_details.type==2">申请换货</p>
      <p v-if="after_details.type==3">申请退货</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 状态栏 -->
    <div class="status">
      <p>
        <img
          v-if="after_details.step!=7&&after_details.step!=5"
          src="../../../static/img/applyRefund.png"
        />
        <img v-if="after_details.step==7" src="../../../static/img/refundClose.png" />
        <img class="suceess" v-if="after_details.step==5" src="../../../static/img/refundSuc.png" />
        <span class="state" v-if="after_details.step!=7&&after_details.step!=5">请等待商家处理</span>
        <span class="state" v-if="after_details.step==7">退款关闭</span>
        <span class="state" v-if="after_details.step==5">退款成功</span>
      </p>
      <van-count-down
        v-if="after_details.step!=7&&after_details.step!=5"
        :time="Number(retime)*1000"
        format="还剩DD天HH时mm分"
      />
      <span
        class="time"
        v-if="after_details.step==7||after_details.step==5"
      >{{after_details.auditTime | time}}</span>
    </div>
    <!-- 售后操作 -->
    <div class="saleInfo" v-if="after_details.step!=7&&after_details.step!=5">
      <p v-if="after_details.type==1">您已经进入退货退款流程，请耐心等待客服为您处理~</p>
      <p v-if="after_details.type==2">您已经进入换货流程，请耐心等待客服为您处理~</p>
      <p v-if="after_details.type==3">您已经进入退货流程，请耐心等待客服为您处理~</p>
      <div @click="chexiao()">
        <p>撤销申请</p>
      </div>
    </div>
    <!-- 售后操作 -->
    <div class="saleInfo close" v-if="after_details.step==7">
      <p>因您主动撤销,退款申请关闭,如问题仍未解决,售后保障期间,您可以重新发起售后申请</p>
    </div>
    <div class="refund_moey" v-if="after_details.step==5">
      <div class="all_moey">
        <div>退款总金额</div>
        <div class="allmoeys">
          <i class="fuhao">￥</i>
          {{after_details.money}}
        </div>
      </div>
      <div class="zfb_moey">
        <div>退回支付宝</div>
        <div class="zhifubao">
          <i class="fuhao">￥</i>
          {{after_details.money}}
        </div>
      </div>
    </div>
    <!-- 退款信息 -->
    <div class="refundInfo">
      <h6>退款信息</h6>
      <div>
        <img :src="img" alt />
        <p>{{title}}</p>
      </div>
      <p>
        <span>退款原因</span>
        <span>{{after_details.cause}}</span>
      </p>
      <p>
        <span>退款金额</span>
        <span>
          <i>¥</i>
          {{after_details.money}}
        </span>
      </p>
      <p>
        <span>申请时间</span>
        <span>{{after_details.postTime}}</span>
      </p>
      <p>
        <span>退款编号</span>
        <span>{{after_details.serialNumber}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 1,
      after_details: {}, //售后信息
      id: 0,
      img: "", // 商品照片
      title: "", // 商品标题
      retime: null,
    };
  },
  filters: {
    time: value => {
      console.log(value);
      let arr = value.split(" ");
      let y = arr[0].split("-");
      console.log(y);
      return y[0] + "年" + y[1] + "月" + y[2] + "日  " + arr[1];
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.img = this.$route.query.img;
    this.title = this.$route.query.title;
    this.getData();
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("id", this.id);
      axios.post("/ppi/index.php/api/post_sale/detail", data).then(res => {
        this.after_details = res.data;
        this.retime = res.data.receivingTime;
      });
    },
    // 撤销售后申请
    chexiao() {
      Dialog.confirm({
        message: "是否要撤销此申请?"
      })
        .then(() => {
          // on confirm 确认
          let data = new FormData();
          data.append("token", sessionStorage.getItem("token"));
          data.append("id", this.id);
          axios.post("/ppi/index.php/api/post_sale/cancel", data).then(res => {
            Toast({
              message: res.data.message,
              position: "bottom"
            });
            this.getData();
          });
        })
        .catch(() => {
          // on cancel 取消
        });
    }
  },
  components: {
    Dialog,
    Toast
  }
};
</script>

<!-- ADD "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applyRefund {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  overflow-y: auto;
  overflow-x: hidden;
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

.title > p {
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
  align-items: center;
}
.status p img {
  width: 22px;
  height: 20px;
  display: block;
  margin-right: 6px;
}
.status > span {
  font-size: 13px;
  color: #808080;
}
.status .suceess {
  width: 10px;
  height: 6px;
}
/* 售后操作 */
.saleInfo {
  background: #fff;
  padding: 12px 19px 15px;
  margin-bottom: 8px;
}

.saleInfo > p {
  font-size: 13px;
  margin-bottom: 30px;
}
.close > p {
  margin-bottom: 0;
}
.saleInfo > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.saleInfo > div p {
  width: 80px;
  height: 30px;
  border: 1px solid rgba(128, 128, 128, 1);
  border-radius: 15px;
  line-height: 30px;
  text-align: center;
  font-size: 13px;
  margin-left: 8px;
}

.saleInfo > div p:nth-child(1) {
  color: #808080;
  border-color: #808080;
}

.saleInfo > div p:nth-child(2) {
  color: #74181b;
  border-color: #74181b;
}

/* 退款信息 */
.refundInfo {
  background: #fff;
  padding: 8px 16px 12px;
}

.refundInfo h6 {
  height: 18px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 18px;
  color: #1c0000;
  margin: 0;
}

.refundInfo > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 24px;
}

.refundInfo > div img {
  width: 78px;
  height: 78px;
  margin-right: 4px;
  border-radius: 4px;
  background: #1c0000;
}

.refundInfo > div p {
  width: 255px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.refundInfo > p {
  height: 16px;
  font-size: 13px;
  color: #9a9a9a;
  line-height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
}

.refundInfo > p span i {
  font-size: 10px;
  font-style: normal;
}

.refund_moey {
  width: 100%;
  height: 69px;
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px 0;
}
.zfb_moey {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 13px;
}
.fuhao {
  font-size: 11px;
  font-style: normal;
}
.allmoeys {
  color: #74181b;
}
.zhifubao {
  color: #808080;
}
.all_moey {
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  border-bottom: 0.5px solid #f5f5f5;
  font-size: 13px;
}
</style>
