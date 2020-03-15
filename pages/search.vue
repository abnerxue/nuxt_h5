<template>
  <div class="searchBox">
    <div class="search">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <div>
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="请输入搜索关键词" v-model="searchTxt" @click="onfocus()" />
        <i
          class="iconfont icon-quxiao"
          :style="iconDel?'visibility:visible':'visibility:hidden'"
          @click="searchTxt = '';iconDel=false"
        ></i>
      </div>
      <span @click="page=1;search()">搜索</span>
    </div>
    <div class="result">
      <!-- <div class="screen">
        <p :class="changeRed == 0?'red':''" @click="changeRed = 0">综合</p>
        <p @click="changeRed = 1;tag=!tag;" :class="changeRed==1?'red':''">
          价格
          <i v-if="!tag" :class="changeRed==1&&!tag?'iconfont icon-up red':'iconfont icon-up'"></i>
          <i v-if="tag" :class="changeRed==1&&tag?'iconfont icon-down red':'iconfont icon-down'"></i>
        </p>
        <p @click="changeRed = 2" :class="changeRed==2?'red':''">
          筛选
          <i
            :class="changeRed==2?'iconfont icon-shaixuanxuanzhong red':'iconfont icon-shaixuanxuanzhong'"
          ></i>
        </p>
      </div>-->
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goodsList">
          <div
            class="goods"
            v-for="(goodsList,i) in goods"
            :key="i"
            @click="toDetail(goodsList.activity,goodsList.gid,goodsList.activityId)"
          >
            <div v-if="goodsList.activity==3||goodsList.activity==2">
              <img :src="goodsList.thumb" alt />
              <p>限时秒杀</p>
              <van-count-down :time="goodsList.seckill.timeRemaining*1000">
                <template v-slot="timeData">
                  <span class="day">{{ timeData.days | dataFormat }}天</span>
                  <span class="item">{{ timeData.hours | dataFormat }}</span>:
                  <span class="item">{{ timeData.minutes | dataFormat }}</span>:
                  <span class="item">{{ timeData.seconds | dataFormat }}</span>
                </template>
              </van-count-down>
            </div>
            <img :src="goodsList.thumb" alt v-else />
            <div>
              <p>{{ goodsList.title }}</p>
              <span v-if="goodsList.activity==4">{{goodsList.score.score}}积分</span>
              <span v-else-if="goodsList.activity==1">
                <i>¥</i>{{goodsList.group.price}}
              </span>
              <span v-else-if="goodsList.activity==2||goodsList.activity==3">
                <i>¥</i>{{goodsList.seckill.price}}
              </span>
              <span v-else-if="goodsList.activity==5">
                <i>¥</i>{{goodsList.auction.price}}元起拍
              </span>
              <span v-else>
                <i>¥</i>{{goodsList.price}}
              </span>
              <span
                class="del"
                v-if="goodsList.activity==1||goodsList.activity==2||goodsList.activity==3"
              >
                <i>¥</i>{{goodsList.price}}
              </span>
              <div class="exchange" v-if="goodsList.activity==4">去兑换</div>
              <div class="group" v-else-if="goodsList.activity==1">去拼团</div>
              <div class="rushBuy" v-else-if="goodsList.activity==2||goodsList.activity==3">去抢购</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="empty" v-show="!goods">
      <img src="../static/img/searchEmpty.png" alt />
      <p>没有找到相关的商品</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Search, List, PullRefresh, ImagePreview, CountDown } from "vant";
export default {
  data() {
    return {
      searchTxt: "", // 搜索关键词
      iconDel: false, // 删除图标
      changeRed: 0,
      tag: true,
      goods: [], // 商品列表
      loading: false, //上拉加载开关
      finished: false, //显示加载中还是没有更多
      page: 1, //当前页面
      totalPage: 2, //总页面数
      btntag: true // 加载开关
    };
  },
  filters: {
    dataFormat(time) {
      if (Number(time) < 10) {
        return "0" + time;
      } else {
        return time;
      }
    }
  },
  methods: {
    onfocus() {
      // this.iconDel = true;
    },
    toDetail(activity,gid,activityId){
      // 进入商品详情
      if(activity==0){
        this.$router.push({name:'detail',query:{gid}})
      } else if(activity==1){
        this.$router.push({name:'detail-groupDetail',query:{id:activityId}})
      } else if(activity==2||activity==3){
        this.$router.push({name:'detail-seckillDetail',query:{id:activityId,type:2}})
      } else if(activity==4) {
        this.$router.push({name:'detail-integralDetail',query:{id:activityId}})
      } else {
        this.$router.push({name:'detail-auctionDetail',query:{id:activityId}})
      }
    },
    // 搜索
    search() {
      this.totalPage = 2;
      this.btntag = false;
      let data = new FormData();
      data.append("keyword", this.searchTxt);
      data.append("ajax", true);
      axios
        .get(
          "/ppi/index.php/api/goods/search?keyword=" +
            this.searchTxt +
            "&span=10&page=" +
            this.page
        )
        .then(res => {
          this.btntag = true;
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.goods = res.data.list;
          } else {
            res.data.list.map(item => {
              this.goods.push(item);
            });
          }
        });
    },
    onLoad() {
      //加载
      if (this.totalpage > this.page && this.btntag) {
        this.loading = false;
        ++this.page;
        this.search();
      } else if (!this.btntag) {
        this.loading = false;
        return;
      } else {
        this.finished = true;
      }
    }
  },
  watch: {
    searchTxt() {
      if (this.searchTxt == "") {
        this.iconDel = false;
        this.text = "取消";
      } else {
        this.iconDel = true;
        this.text = "搜索";
      }
    }
  },
  components: {
    Search,
    List,
    PullRefresh,
    ImagePreview,
    CountDown
  }
};
</script>

<style scoped>
/* 搜索 */
.searchBox {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 44px;
}

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
}

.search > i {
  font-size: 12px;
  color: #9a9a9a;
}

.search > div {
  width: 295px;
  height: 24px;
  padding: 0 12px;
  border-radius: 10px;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search > div i {
  font-size: 12px;
  color: #9a9a9a;
}

.search > div .icon-quxiao {
  color: #e9e9e9;
}

.search > div input {
  outline: none;
  border: none;
  font-size: 12px;
  line-height: 12px;
  background: #f5f5f5;
  width: 235px;
  color: #1c0000;
}

.search > span {
  font-size: 12px;
  color: #9a9a9a;
}

.search > .red,
.screen .red {
  color: #74181b;
}

/* 热门搜索 */
.popular {
  padding: 15px 12px;
  overflow: hidden;
}

.popular p {
  font-size: 12px;
  color: #9a9a9a;
  margin-bottom: 15px;
}

.popular ul {
  color: #9a9a9a;
}

.popular ul li {
  padding: 0.1463rem 0.2261rem;
  font-size: 0.2394rem;
  float: left;
  background: #e9e9e9;
  margin-right: 8px;
  border-radius: 0.0523rem;
  margin-bottom: 0.2261rem;
}

/* 搜索后的商品筛选 */
.result {
  overflow: hidden;
  background: #f5f5f5;
}

.screen {
  height: 0.798rem;
  line-height: 0.798rem;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 12px;
  color: #808080;
}

.screen > p:nth-child(2) {
  display: flex;
  flex-direction: row;
}

.screen > p > span:nth-child(2) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 0.0665rem;
}

.screen > p > span > i {
  font-size: 6px;
  height: 8px;
  color: #808080;
}

.screen > p > i {
  font-size: 8px;
  color: #442d2d;
  margin-left: 2px;
}

/* 商品列表 */
.goodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px;
}

.goods {
  border-radius: 6px;
  width: 176px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 8px;
}

.goods > div:nth-child(1) {
  position: relative;
  overflow: hidden;
  width: 176px;
  height: 176px;
}

.goods img {
  width: 176px;
  height: 176px;
  display: block;
  background: #555;
}

.goods > div:nth-child(1) p {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  font-size: 12px;
  width: 56px;
  height: 23px;
  line-height: 23px;
  text-align: center;
  background: #c2060c;
  border-radius: 4px 4px 0 0;
  z-index: 5;
}

.goods > div:nth-child(1) > div {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background: #dd0812;
  text-align: right;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* font-size: 14px; */
}
.day {
  font-size: 11px;
  font-weight: 400;
  color: #fff;
  margin-right: 0.1064rem;
}

.item {
  background: #c2060c;
  border-radius: 2px;
  width: 16px;
  height: 16px !important;
  text-align: center;
  line-height: 16px;
  color: #fff;
  display: inline-block;
  margin: 0 2px;
  font-size: 11px;
}

.goods > div:nth-child(2) {
  width: 100%;
  overflow: hidden;
  padding: 12px 9px 12px;
  position: relative;
}

.goods > div:nth-child(2) p {
  color: #1c0000;
  font-size: 12px;
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}

.goods > div:nth-child(2) span {
  color: #dd0812;
  font-size: 14px;
  display: block;
}

.goods > div:nth-child(2) span i {
  font-size: 11px;
  font-style: normal;
}

.goods > div:nth-child(2) .del {
  text-decoration: line-through;
  color: #808080;
  font-size: 11px;
}

.group,
.rushBuy {
  width: 48px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  background: #fff;
  border: 1px solid #dd0812;
  border-radius: 10px;
  color: #dd0812;
  position: absolute;
  bottom: 16px;
  right: 8px;
}

.exchange {
  width: 40px;
  text-align: center;
  height: 16px;
  background: #fff;
  border: 1px solid #dd0812;
  color: #dd0812;
  position: absolute;
  font-size: 9px;
  bottom: 12px;
  right: 8px;
  border-radius: 17px;
}

/* 搜索为空时 */
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  background: #f5f5f5;
}

.empty img {
  width: 150px;
}

.empty p {
  font-size: 12px;
  color: #c3c3c3;
  margin-top: 8px;
}
</style>
