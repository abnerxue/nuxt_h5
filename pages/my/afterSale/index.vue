<template>
  <div class="afterSale">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>售后</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <van-pull-refresh
      v-if="order_list!=null"
      @refresh="onRefresh"
      v-model="isDownLoading"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad()">
        <div class="saleList">
          <div v-for="(order_list,i) in order_list" :key="i">
            <div v-for="(good,a) in order_list.goods" :key="a">
              <p class="listTop">
                <span>{{order_list.orderTime}}</span>
                <!-- <span v-if="good.returned_purchase.type==1">
                  <i></i>退货退款
                </span>
                <span v-if="good.returned_purchase.type==2">
                  <i></i>换货
                </span>
                <span v-if="good.returned_purchase.type==3">
                  <i></i>退款
                </span> -->
              </p>
              <div class="listCenter">
                <img :src="good.thumb" alt />
                <p>{{good.title}}</p>
                <p>
                  <span>
                    <i>¥</i>
                    {{good.price}}
                  </span>
                  <span>x{{good.number}}</span>
                </p>
              </div>
              <div
                class="checkDetail"
                @click="$router.push({name:'my-order-orderDetail',query:{id:order_list.id}});del(good)"
              >
                <p>查看详情</p>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="emtrySale" v-else>
      <img src="../../../static/img/emtryOrder.png" />
      <p>暂无要售后的订单</p>
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
      order_list: [],
      loading: false, //上拉加载开关
      finished: false, // 没有更多开关
      isDownLoading: false, //下拉刷新的开关
      page: 0, // 当前页面
      totalpage: 2, // 总页面
      tag: true
    };
  },
  components: {
    List,
    PullRefresh,
    Overlay,
    Toast
  },
  mounted() {},
  methods: {
    del(good) {
      sessionStorage.setItem("good_title", good.title);
      sessionStorage.setItem("good_thumb", good.thumb);
    },
    getData() {
      this.isLoading = true;
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("page", this.page);
      data.append("span", 10);
      data.append("status", "service");
      axios.post("/ppi/index.php/api/order/get_list", data).then(res => {
        this.tag = true;
        if (res.data.code == 0) {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
        } else {
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.order_list = res.data.list;
          } else {
            res.data.list.map(item => {
              this.order_list.push(item);
            });
          }
        }
      });
    },
    onRefresh() {
      // 刷新
      this.finished = false;
      this.order_list = [];
      this.page = 1;
      this.getData();
      this.isDownLoading = false; //关闭刷新
    },
    onLoad() {
      // 加载
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
.afterSale {
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

.title p {
  color: #1c0000;
  font-size: 16px;
  font-weight: 500;
}

/* 售后列表 */
.saleList {
  overflow: hidden;
}

.saleList > div {
  padding: 12px 19px;
  background: #fff;
  margin-bottom: 8px;
}

.listTop {
  height: 16px;
  font-size: 13px;
  line-height: 16px;
  color: #9a9a9a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.listTop span:nth-child(2) {
  color: #1c0000;
}

.listCenter {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 12px;
}

.listCenter img {
  width: 70px;
  height: 70px;
  border-radius: 2px;
  background: #1c0000;
}

.listCenter p:nth-of-type(1) {
  width: 170px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 0 40px 0 8px;
  overflow: hidden;
}

.listCenter p:last-of-type {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
}

.listCenter p:last-of-type span i {
  font-size: 10px;
  font-style: normal;
}

.listCenter p:last-of-type span:nth-child(2) {
  color: #808080;
}

.checkDetail {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.checkDetail p {
  width: 79px;
  height: 30px;
  border: 1px solid #74181b;
  border-radius: 15px;
  line-height: 30px;
  font-size: 13px;
  text-align: center;
  margin-top: 12px;
  box-sizing: border-box;
  color: #74181b;
}

.emtrySale {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 200px 0;
}

.emtrySale img {
  width: 150px;
  border-radius: 2px;
  display: block;
  margin: auto;
  margin-bottom: 10px;
}

.emtrySale p {
  height: 17px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #c3c3c3;
}
</style>
