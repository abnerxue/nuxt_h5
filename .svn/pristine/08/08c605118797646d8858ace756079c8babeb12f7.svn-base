<template>
  <div class="container">
    <div class="search">
      <p @click="$router.push({path:'/search'})">
        <i class="iconfont icon-sousuo"></i>
      </p>
      <div>
        <p :class="Colact==1?'colact':''" @click="Colact = 1">竞价</p>
        <p :class="Colact==2?'colact':''" @click="Colact = 2">推荐</p>
        <p :class="Colact==3?'colact':''" @click="Colact = 3">直购</p>
      </div>
      <i class="iconfont icon-xiaoxi"></i>
    </div>
    <!-- 推荐 -->
    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="Colact==2"
    >
      <div v-if="Colact==2">
        <!-- 轮播 -->
        <van-swipe class="swiper-wrapper" indicator-color="#74181b">
          <van-swipe-item v-for="(item,i) in banners" :key="i">
            <img :src="item.img" />
          </van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <div class="classify">
          <div v-for="(item,i) in classify" @click="go(item.id)" :key="i">
            <img :src="item.thumb" />
            <p>{{item.name}}</p>
          </div>
          <div @click="toGroup()">
            <i class="iconfont icon-tuan" style="background:#6B9AFD"></i>
            <p>团购</p>
          </div>
          <div @click="$router.push({name:'list-seckillList'})">
            <i class="iconfont icon-miaosha" style="background:#FC4942"></i>
            <p>秒杀</p>
          </div>
          <div @click="$router.push({name:'list-integralList'})">
            <i class="iconfont icon-liwu" style="background:#EF932A"></i>
            <p>积分商城</p>
          </div>
          <div @click="$router.push({name:'share'})">
            <i class="iconfont icon-fenxiang" style="background:#4DC0FC"></i>
            <p>分享</p>
          </div>
        </div>
        <div class="ad" @click="$router.push({name: 'redPaper'})">
          <img src="../static/img/news.png" alt />
        </div>
        <!-- 怀南会动态 -->
        <div class="dynamic">
          <p>
            <i></i>怀南会动态
          </p>
          <van-swipe
            class="verticalSwipe"
            :show-indicators="false"
            :autoplay="3000"
            :vertical="true"
          >
            <van-swipe-item
              class="item"
              v-for="(item,i) in newList"
              :key="i"
              @click="$router.push({name:'wikipedia-article', query: { id: item.id}})"
            >{{item.title}}</van-swipe-item>
          </van-swipe>
          <i class="iconfont icon-right"></i>
        </div>
        <!-- 限时活动 -->
        <div class="limited">
          <div @click="toGroup()">
            <p>
              <i class="iconfont icon-tuan"></i>限时团购
            </p>
            <div>
              马上抢
              <i class="iconfont icon-right"></i>
            </div>
          </div>
          <div @click="$router.push({name:'list-seckillList'})">
            <p>
              <i class="iconfont icon-xianshimiaosha"></i>限时秒杀
            </p>
            <div>
              马上抢
              <i class="iconfont icon-right"></i>
            </div>
          </div>
        </div>
        <!-- 新人专享 -->
        <div class="newPeople">
          <p class="title">
            <span>新人专享</span>
          </p>
          <div>
            <div
              class="exclusive"
              v-for="(item,i) in newcomerDiscount"
              :key="i"
              @click="$router.push({name:'detail',query:{gid:item.gid}})"
            >
              <img :src="item.thumb" alt />
              <div>
                <p>{{item.title}}</p>
                <p>
                  <span>
                    <i>¥</i>
                    {{item.price}}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 每日上新 -->
        <div class="newDaily">
          <p class="title">
            <span>每日上新</span>
          </p>
          <div>
            <div class="daily" v-for="(item,i) in goods" :key="i" @click="toDetail(item.gid)">
              <img :src="item.thumb" alt=" " />
              <div>
                <p>{{item.title}}</p>
                <span>
                  <i>¥</i>
                  {{item.price}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <!-- </van-pull-refresh> -->
    <!-- 直购 -->
    <DirectBuy v-if="Colact==3" class="direct"></DirectBuy>
    <!-- 竞价 -->
    <BiddingPrice v-if="Colact==1" class="direct"></BiddingPrice>
    <Tabbar :active="0"></Tabbar>
  </div>
</template>

<script>
import { Swipe, SwipeItem, List } from "vant";
import Tabbar from "../components/tabber.vue";
import DirectBuy from "../components/directBuy.vue";
import BiddingPrice from "../components/biddingPrice.vue";
import axios from "axios";
export default {
  data() {
    return {
      banners: [], //  轮播图列表
      classify: null,
      Colact: 2,
      newList: [], //  怀南会动态新闻列表
      goods: [], // 每日上新列表
      newcomerDiscount: [], // 新人专享列表
      loading: false, // 下拉刷新开关
      finished: false, //  没有更多开关
      page: 1, // 当前页
      totalpage: 3, // 总页面
      tag: true //  加载数据开关
    };
  },
  created() {
    // this.uuid();
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 跳转到团购列表
    toGroup() {
      this.$router.push({ name: "list-groupList" });
      let selectCategory = { categoryId: null, allId: null };
      sessionStorage.setItem("selectCategory", JSON.stringify(selectCategory));
    },
    // 获取数据
    getData() {
      this.isDownLoading = false; //关闭刷新
      axios.get("/ppi/index.php/api/goods/category").then(res => {
        this.classify = res.data.first;
        sessionStorage.setItem("goodsCategory", JSON.stringify(res.data));
      });
      let data = new FormData();
      axios.post("/ppi/index.php/api/app/index", data).then(res => {
        this.newList = res.data.newsList; // 怀南会动态
        this.newcomerDiscount = res.data.newcomerDiscount; // 每日上新
        this.banners = res.data.slide; // 轮播图
        this.goods = res.data.newGoods; // 每日上新
      });
    },
    // 分类列表跳转详情
    go(id) {
      this.$router.push({ name: "list-classifyList" });
      let selectCategory = { categoryId: null, allId: id };
      sessionStorage.setItem("selectCategory", JSON.stringify(selectCategory));
    },
    // 跳转到商品详情
    toDetail(gid) {
      this.$router.push({ name: "detail", query: { gid } });
    },
    // 商品列表
    getList() {
      this.totalpage = 3;
      axios
        .get(
          "/ppi/index.php/api/goods/get_list?span=12&page=" +
            this.page
        )
        .then(res => {
          console.log(res);
          this.tag = true;
          //如果页数为1就覆盖商品列表，否则就在商品列表后面添加
          res.data.list.map((item, i) => {
            this.goods.push(item);
          });
          this.loading = false; //关闭加载
          //取出页数
          this.totalpage = res.data.totalPage;
        });
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = true;
      this.finished = false;
      // 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
      console.log(11);
      if (this.totalpage > this.page && this.tag) {
        this.loading = true;
        ++this.page;
        this.getList();
      } else if (!this.tag) {
        return;
      } else if (this.totalpage <= this.page) {
        this.finished = true;
      }
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Tabbar,
    List,
    DirectBuy,
    BiddingPrice
  }
};
</script>

<style>
img[src=""],
img:not([src]) {
  opacity: 0;
}
img {
  border: 0;
}
.body-class,
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: PingFang SC;
  box-sizing: border-box;
  position: absolute;
}
.container {
  padding-bottom: 44px;
  padding-top: 44px;
  background: #f5f5f5;
}
/* 搜索 */
.search {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.search > p {
  float: left;
  line-height: 13px;
  font-size: 0.12px;
  box-sizing: border-box;
  color: #9a9a9a;
}
.search > p > i {
  font-size: 12px;
  margin-right: 2px;
  color: #9a9a9a;
}
.search div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 13px;
  color: #9a9a9a;
  width: 164px;
  height: 33px;
}
.search div p {
  line-height: 33px;
  font-weight: 500;
  box-sizing: border-box;
}
.search div .colact {
  font-size: 16px;
  font-weight: 600;
  color: #74181b;
  border-bottom: 2px solid #74181b;
}
.search > i {
  font-size: 14px;
}
/* 轮播 */
.swiper-wrapper {
  width: 100%;
  height: 170px;
}
.swiper-wrapper .van-swipe__track {
  display: flex;
  flex-direction: row;
}
.swiper-wrapper img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 分类 */
.classify {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 14px;
  background: #fff;
}
.classify img {
  width: 30px;
  height: 30px;
  display: block;
  margin-bottom: 5px;
}
.classify i {
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 50%;
  display: block;
  margin-bottom: 5px;
  padding: 8px;
  color: #fff;
}
.classify div {
  width: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
}
.classify p {
  font-size: 9px;
}

/* 广告位 */
.ad {
  height: 75px;
  background: #000;
}
.ad img {
  width: 100%;
}
/* 怀南会动态 */
.dynamic {
  height: 30px;
  line-height: 30px;
  background: #fff;
  margin-top: 8px;
  padding: 0 20px;
}
.dynamic > p {
  color: #74181b;
  font-size: 13px;
  float: left;
  margin-right: 8px;
}
.dynamic > p > i {
  background: url(../static/img/dynamic.png) no-repeat;
  background-size: 100% 100%;
  float: left;
  width: 15px;
  height: 15px;
  margin-top: 8px;
  margin-right: 2px;
}
.dynamic > span {
  font-size: 10px;
  float: left;
}
.dynamic > i {
  float: right;
  font-size: 8px;
  color: #9a9a9a;
}
/* 限时栏 */
.limited {
  overflow: hidden;
  padding: 8px 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.limited > div {
  width: 177px;
  height: 100px;
  background: #dddddd;
  padding: 12px;
  box-sizing: border-box;
}
.limited > div:nth-child(1) {
  background: url(../static/img/tuangou.jpg) no-repeat;
  background-size: 100% 100%;
}
.limited > div:nth-child(2) {
  background: url(../static/img/miaosha.jpg) no-repeat;
  background-size: 100% 100%;
}
.limited > div p {
  font-size: 12px;
  color: #dd0812;
  margin-bottom: 6px;
}
.limited > div p i {
  font-size: 10px;
  margin-right: 2px;
}
.limited > div div {
  height: 15px;
  font-size: 12px;
  width: 48px;
  background: #dd0812;
  text-align: center;
  line-height: 15px;
  color: #fff;
  border-radius: 8px;
}
.limited > div div i {
  font-size: 6px;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none !important;
  width: 0px;
  height: 0px;
}
/* 公共标题 */
.title {
  height: 13px;
  overflow: hidden;
  margin-bottom: 12px;
}
.title span {
  font-size: 13px;
  height: 13px;
  line-height: 13px;
  float: left;
  color: #1c0000;
}
.title i {
  font-size: 12px;
  color: #808080;
  float: right;
}
/* 新人专享 */
.newPeople {
  width: 100%;
  overflow: hidden;
  padding: 12px 0 14px;
}
.newPeople .title {
  padding: 0 8px;
}
.newPeople > div {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 8px;
}
.exclusive {
  width: 126px;
  overflow: hidden;
  display: inline-block;
  margin-right: 2px;
  border-radius: 2px;
  background: #fff;
}
.exclusive:last-child {
  margin-right: 0;
}
.exclusive img {
  width: 126px;
  height: 126px;
  /* background: #444; */
  display: block;
}
.exclusive div {
  width: 100%;
  overflow: hidden;
  padding: 6px 8px 12px;
}
.exclusive div p:nth-child(1) {
  color: #1c0000;
  font-size: 9px;
  width: 104px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 9px;
}
.exclusive div p:nth-child(2) {
  font-size: 10px;
}
.exclusive div p:nth-child(2) span:nth-child(1) {
  color: #dd0812;
}
.exclusive div p:nth-child(2) span:nth-child(2) {
  color: #808080;
  font-size: 7px;
  text-decoration: line-through;
}
.exclusive div p:nth-child(2) i {
  font-size: 7px;
  font-style: normal;
}
/* 每日上新 */
.newDaily {
  width: 100%;
  overflow: hidden;
  padding: 10px 6px 0;
}
.newDaily > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.daily {
  width: 176px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 8px;
  border-radius: 4px;
}
.daily img {
  width: 176px;
  height: 176px;
  display: block;
  background: #000;
}
.daily > div {
  width: 100%;
  overflow: hidden;
  padding: 5px 8px 10px;
}
.daily p {
  color: #1c0000;
  font-size: 13px;
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 9px;
}
.daily span {
  color: #dd0812;
  font-size: 13px;
  display: block;
}
.daily span i {
  font-size: 12px;
  font-style: normal;
}
.van-swipe__indicator {
  color: #fff;
  background: #fff;
  opacity: 1;
}
.verticalSwipe {
  width: 225px;
  height: 30px !important;
  overflow: hidden;
  float: left;
}
.verticalSwipe .item {
  height: 30px !important;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 竞价 */
/* 直购 */
.direct {
  overflow: hidden;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>
