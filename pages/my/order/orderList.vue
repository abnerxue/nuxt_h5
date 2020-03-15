<template>
  <div class="order">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>我的订单</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="tab">
      <p :class="active==0?'redCC':''" @click="order(0)">全部</p>
      <p :class="active==1?'redCC':''" @click="order(1)">待付款</p>
      <p :class="active==2?'redCC':''" @click="order(2)">待收货</p>
      <p :class="active==3?'redCC':''" @click="order(3)">待评价</p>
    </div>
    <van-loading type="spinner" class="loading" v-show="loads==true" vertical>加载中</van-loading>
    <van-pull-refresh
      v-if="order_list && order_list.length!=0"
      @refresh="onRefresh"
      v-model="isDownLoading"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="orderList">
          <div v-for="(item,i) in order_list" :key="i">
            <div class="listTop">
              <span>{{item.orderTime}}</span>
              <span class="order-time-fonts" v-if="item.payStatus==1&&item.logisticsStatus==1">等待付款</span>
              <span class="order-time-fonts" v-if="item.payStatus==2&&item.logisticsStatus==1">支付未成功</span>
              <span class="order-time-fonts" v-if="item.logisticsStatus==1&&item.payStatus==3">待发货</span>
              <span class="order-time-fonts" v-if="item.logisticsStatus==2&&item.payStatus==3">已发货</span>
              <span class="order-time-fonts" v-if="item.logisticsStatus==3&&item.appraise==0">待评价</span>
            </div>
            <div
              class="listCenter"
              v-for="good in item.goods"
              :key="good.gid"
              @click="$router.push({name:'my-order-orderDetail',query:{id:item.id}})"
            >
              <img :src="good.thumb" alt />
              <p>{{good.title}}</p>
              <span>
                <i>¥{{good.price}}</i>
                <i>x{{good.number}}</i>
              </span>
              <p
                class="btn"
                v-if="item.logisticsStatus==3&&item.payStatus==3&&item.appraise==0"
                @click.stop="toAppraise(item.id,good)"
              >评价</p>
            </div>
            <div class="listBottom">
              <span>共{{item.goods.length}}件商品</span>
              <span>需付款:</span>
              <span>
                <i>¥</i>
                {{item.totalPrice}}
              </span>
            </div>
            <div class="listButton">
              <!-- 待付款状态 -->
              <p class="btn" v-if="item.payStatus<=2 " @click="pay(item.serialNumber)">去支付</p>
              <p class="btn" v-if="item.payStatus<=2" @click="cancel(item.id)">取消订单</p>
              <!-- 待发货状态 -->
              <!-- 			<view class="btn" v-if="orderlists.logisticsStatus>=1&&orderlists.payStatus==3" @click="shoho(orderlists.id,list.gid,orderlists.returned_purchase)">申请售后</view> -->
              <p
                class="btn"
                v-if="item.logisticsStatus<3&&item.payStatus==3"
                @click="shohuo(item.id)"
              >确认收货</p>
              <p
                class="btn"
                v-if="item.logisticsStatus<=3&&item.payStatus==3"
                @click="logistics(item.id,item.logisticsStatus)"
              >查看物流</p>
              <!-- 待评价状态 -->
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="emtryOrder" v-else>
      <img src="../../../static/img/emtryOrder.png" />
      <p>暂无订单</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, PullRefresh, Overlay, Toast } from "vant";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 0,
      order_list: [], //订单列表
      loads: false, //加载动画
      loading: false,
      finished: false, // 没有更多开关
      totalpage: 2, // 总页数
      page: 0, // 页数
      tag: true,
      isDownLoading: false //下拉刷新的开关
    };
  },
  components: {
    List,
    PullRefresh,
    Overlay,
    Toast
  },
  mounted() {
    this.loads = true;
    this.active = this.$route.query.id;
    this.order(this.active);
  },
  methods: {
    // 去评论
    toAppraise(id, goods) {
      let good = JSON.stringify(goods);
      this.$router.push({
        name: "my-order-appraise",
        query: { order_id: id, good: good }
      });
    },
    // 去支付
    pay(serialNumber){
      this.$router.push({name: "confirmOrder-orderPay",query:{serialNumber}});
    },
    order(id) {
      this.totalpage = 2;
      this.finished = false;
      this.order_list = [];
      this.active = id;
      this.page = 1;
      this.getData();
    },
    // 取消订单
    cancel(id) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", id);
      axios.post("/ppi/index.php/api/order/trash", data).then(res => {
        Toast(res.data.message);
      });
    },
    // 查看物流
    logistics(id, ids) {
      // 判断是否有物流信息
      if (ids == 1) {
        Toast("商品还未发货");
      } else {
        this.$router.push({
          name: "my-order-checkLogistics",
          query: { id: id }
        });
      }
    },
    // 确认收货
    shohuo(id) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", id);
      axios.post("/ppi/index.php/api/order/confirm_receipt", data).then(res => {
        Toast(res.data.message);
      });
    },
    // 刷新
    onRefresh() {
      this.finished = false;
      this.order_list = [];
      this.page = 1;
      this.getData();
      this.isDownLoading = false; //关闭刷新
    },
    // 获取数据
    getData() {
      let data = new FormData();
      this.loading = false; //关闭加载
      data.append("token", sessionStorage.getItem("token"));
      data.append("page", this.page);
      data.append("span", 10);
      if (this.active == 0) {
        data.append("status", "all");
      } else if (this.active == 1) {
        data.append("status", "un_payment");
      } else if (this.active == 2) {
        data.append("status", "un_received");
      } else if (this.active == 3) {
        data.append("status", "un_evaluated");
      }
      axios.post("/ppi/index.php/api/order/get_list", data).then(res => {
        this.loads = false;
        this.tag = true;
        if (res.data.code == 0) {
          Toast(res.data.message);
        } else {
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.order_list = res.data.list;
          } else if (this.page != 1 && res.data.list) {
            res.data.list.map(item => {
              this.order_list.push(item);
            });
          }
        }
      });
    },
    // 拉取新的数据
    onLoad() {
      this.loading = false;
      if (this.totalpage > this.page && this.tag) {
        this.tag = false;
        this.page++;
        this.getData();
      } else if (!this.tag) {
        return;
      } else {
        this.finished = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order {
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

/* 标签栏 */
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
.tab {
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  line-height: 35px;
  background: #fff;
  box-shadow: 0 2px 3px rgba(190, 190, 190, 0.1);
  position: relative;
  z-index: 1;
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
}

.tab p {
  color: #9a9a9a;
  font-size: 13px;
  padding: 0 8px;
}

.tab .redCC {
  color: #74181b;
  border-bottom: 1px solid #74181b;
}

/* 空订单状态 */
.emtryOrder {
  padding: 175px 0;
  text-align: center;
}

.emtryOrder img {
  width: 150px;
  display: block;
  margin: auto;
  margin-bottom: 8px;
  border-radius: 2px;
}

.emtryOrder p {
  color: #c3c3c3;
  font-size: 12px;
}

/* 订单列表 */
.orderList {
  overflow: hidden;
  padding-top: 35px;
}

.orderList > div {
  background: #fff;
  margin-bottom: 8px;
  padding: 8px 18px;
}

.orderList .listTop {
  height: 18px;
  line-height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
}

.listTop span:nth-child(1) {
  color: #9a9a9a;
  font-size: 13px;
}

.listTop span:nth-child(2) {
  color: rgb(66, 39, 40);
  font-size: 13px;
}

.listCenter {
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  position: relative;
}

.listCenter .btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 25px;
  border: 0.02667rem solid #74181b;
  border-radius: 0.4rem;
  text-align: center;
  line-height: 25px;
  color: #74181b;
  font-size: 12px;
  box-sizing: border-box;
}

.listCenter img {
  width: 70px;
  height: 70px;
  background: #000;
  border-radius: 2px;
}

.listCenter p:nth-of-type(1) {
  width: 170px;
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #1c0000;
  font-size: 14px;
  margin: 0 40px 0 8px;
}

.listCenter span {
  display: flex;
  flex-direction: column;
}

.listCenter span i:nth-child(1) {
  font-style: normal;
  font-size: 14px;
  color: #1c0000;
}

.listCenter span i:nth-child(2) {
  font-style: normal;
  font-size: 14px;
  color: #808080;
  text-align: right;
}

.listBottom {
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
.listBottom span {
  display: block;
}
.listBottom span:nth-child(1) {
  color: #9a9a9a;
  font-size: 13px;
}

.listBottom span:nth-child(2) {
  color: #1c0000;
  font-size: 13px;
}

.listBottom span:nth-child(3) {
  color: #dd0812;
  font-size: 13px;
}

.listBottom span:nth-child(3) i {
  font-style: normal;
  font-size: 10px;
}

.listButton {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.listButton p {
  width: 80px;
  height: 30px;
  border: 1px solid #74181b;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  color: #74181b;
  font-size: 13px;
  margin-left: 8px;
  box-sizing: border-box;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
