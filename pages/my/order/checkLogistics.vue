<template>
  <div class="checkLogistics">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>查看物流</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 快递信息 -->
    <div class="logInfo">
      <img :src="goods" />
      <div>
        <p>{{traces.ShipperCode}}</p>
        <p>
          <span>快递单号：{{traces.LogisticCode}}</span>
          <span class="copy" :data-clipboard-text="traces.LogisticCode" @click="copy()">复制</span>
        </p>
      </div>
    </div>
    <div class="logistics">
      <van-steps direction="vertical" active-color="#74181b" class="step" :active="0">
        <van-step
          class="box"
          v-for="(traces,i) in traces.Traces"
          :key="i"
          :style="i>=5&&more?'display:none;':''"
        >
          <h3>{{traces.AcceptStation}}</h3>
          <p>
            <span>{{time(traces.AcceptTime,1)}}</span>
            <span>{{time(traces.AcceptTime,2)}}</span>
          </p>
        </van-step>
      </van-steps>
      <div class="more">
        <p v-if="more" @click="more=!more">
          点击查看更多物流详情
          <i class="iconfont icon-down"></i>
        </p>
        <p v-else @click="more=!more">
          收起
          <i class="iconfont icon-up"></i>
        </p>
      </div>
    </div>
    <!-- 推荐商品 -->
    <div class="recommendGoods">
      <h1>推荐商品</h1>
      <div class="recommend">
        <div v-for="(item,index) in recommendList" :key="index">
          <img :src="item.thumb" alt />
          <p>{{item.title}}</p>
          <span>
            <i>¥</i>
            {{item.price}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, Steps, Toast } from "vant";
import axios from "axios";
import Clipboard from "clipboard";
export default {
  data() {
    return {
      order_id: 0, //订单id
      traces: [], //快递信息
      more: true, //显示更多开关
      goods: '', // 订单信息
      recommendList: [],  //推荐商品列表
    };
  },
  methods: {
    time(val, num) {
      let arr = val.split(" ");
      let a = arr[0].split("-");
      let b = arr[1].split(":");
      if (num == 1) {
        return a[1] + "-" + a[2];
      } else {
        return b[0] + ":" + b[1];
      }
    },
    copy() {
      console.log(1);
      var clipboard = new Clipboard(".copy");
      console.log(clipboard)
      clipboard.on("success", e => {
        Toast({
          message: "复制成功！",
          position: "bottom"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast({
          message: "复制失败，该浏览器不支持自动复制",
          position: "bottom"
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    recommendGoods() {
      //随机推荐商品
      axios.get("/ppi/index.php/api/goods/recommend/345").then(res => {
        this.recommendList = res.data;
      });
    },
  },
  mounted() {
    this.order_id = this.$route.query.id;
    let data = new FormData();
    data.append("token", sessionStorage.getItem("token"));
    data.append("orderId", this.order_id);
    axios.post("/ppi/index.php/api/order/detail", data).then(res => {
      this.traces = res.data.logisticsInf;
      res.data.goods.map((item, i) => {
        if(i==0){
          this.goods = item.thumb;
        }
      });
    });
    this.recommendGoods();
  },
  components: {
    Step,
    Steps,
    Toast,
    Clipboard
  }
};
</script>

<style scoped>
.checkLogistics {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  color: #1c0000;
}

/* 标签栏 */
.checkLogistics .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
}

.checkLogistics .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.checkLogistics .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 物流单号 */
.logInfo {
  padding: 8px 12px;
  background: #fff;
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}

.logInfo img {
  width: 44px;
  height: 44px;
  border-radius: 2px;
  display: block;
  background: #9a9a9a;
  margin-right: 12px;
}

.logInfo div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.logInfo div p:nth-child(1) {
  color: #2e2e2e;
  font-size: 13px;
}

.logInfo div p:nth-child(2) {
  color: #4a4a4a;
  font-size: 13px;
  display: flex;
  flex-direction: row;
}

.logInfo div p:nth-child(2) span:nth-child(2) {
  width: 34px;
  height: 17px;
  background: #fff;
  border: 1px solid #b2b2b2;
  border-radius: 8px;
  font-size: 10px;
  color: #808080;
  text-align: center;
  margin-left: 15px;
  display: block;
}

/* 物流信息 */
.logistics {
  background: #fff;
}

.step {
  padding: 25px 19px 20px 90px;
  box-sizing: border-box;
  width: 100%;
}

.step h3 {
  font-size: 13px;
}

.more {
  padding: 13px 0;
  background: #fff;
  border-top: 1px solid #f5f5f5;
  color: #2e2e2e;
  text-align: center;
  font-size: 13px;
}

.more p i {
  font-size: 12px;
  color: #1c0000;
  margin-left: 4px;
}

.box {
  position: relative;
}

.box p {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  font-size: 10px;
  position: absolute;
  top: 8px;
  left: -75px;
}
/* 推荐商品 */
.recommendGoods {
  background: #f5f5f5;
}
.recommendGoods h1 {
  color: #1c0000;
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  font-weight: normal;
  padding: 15px 0;
}
.recommend {
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recommend > div {
  padding-bottom: 12px;
  width: 175px;
  overflow: hidden;
  margin-bottom: 8px;
  background: #fff;
  border-radius: 4px;
}
.recommend > div img {
  width: 175px;
  display: block;
  height: 175px;
  background: #444;
  border-radius: 4px;
  border: none;
}
.recommend > div p {
  font-size: 13px;
  color: #1c0000;
  margin: 6px 8px 0;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommend > div span {
  font-size: 14px;
  display: block;
  margin: 6px 8px 0;
  color: #dd0812;
}
.recommend > div span i {
  font-style: normal;
  font-size: 10px;
}
</style>
<style>
.van-icon {
  font-size: 19px;
}

.van-step--vertical:not(:last-child)::after {
  border: 0;
}

.van-step {
  min-height: 56px;
}
</style>
