<template>
  <div class="biddingPrice">
    <div class="filterBar">
      <p :class="p==null?'cc':''" @click="p=null;page=1;getData();">全部</p>
      <p
        v-for="(item,i) in goodsCategory.first"
        :key="i"
        :class="p==item.id?'cc':''"
        @click="p=item.id;page=1;getData();"
      >{{item.name}}</p>
    </div>
    <!-- <div class="tabber1">
      <p :class="status1==1?'screen':''" @click="selSynthesize()">综合</p>
      <p :class="status1==2?'screen':''" @click="status1=2">即将截拍</p>
      <p :class="status1==3?'screen':''" @click="status1=3">最新上拍</p>
    </div>-->
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-if="list.length!=0">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list">
          <div
            v-for="(item,i) in list"
            :key="i"
            @click="$router.push({name:'detail-auctionDetail',query:{id:item.id}})"
          >
            <img :src="item.thumb" alt />
            <p>{{item.title}}</p>
            <span v-if="item.currentPrice!=0">
              <i>当前¥</i>
              {{item.currentPrice}}
            </span>
            <span v-else>
              <i>¥</i>
              {{item.startingPrice}}
              <i>元起拍</i>
            </span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="noGoods" v-else>
      <img src="../static/img/searchEmpty.png" alt />
      <p>没有找到相关的商品</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Tabbar, TabbarItem, List, PullRefresh } from "vant";
export default {
  data() {
    return {
      goodsCategory: {}, // 总类
      status1: 1, // 筛选条件
      p: null,
      isDownLoading: false, //下拉刷新的开关
      loading: false, //上拉加载开关
      page: 1, // 当前页面
      totalPage: 3, // 总页数
      finished: false, // 没有更多开关
      list: [] // 列表
    };
  },
  mounted() {
    this.goodsCategory = JSON.parse(sessionStorage.getItem("goodsCategory"));
    console.log(this.goodsCategory);
    this.getData();
  },
  methods: {
    selSynthesize() {
      this.status1 = 1;
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      //刷新
      this.page = 1;
      this.getData();
      this.isDownLoading = false; //关闭刷新
    },
    getData() {
      //  获得数据
      // 竞价列表  /index.php/api/auction/get_list
      axios
        .get(
          "/ppi/index.php/api/auction/goods_list?span=10&page" +
            this.page +
            "&categoryId=" +
            this.p +
            "&span=10"
        )
        .then(res => {
          if (res.data.list) {
            // 如果接口中list的值不为空
            if (this.page == 1) {
              //  如果页数为1，直接赋值list
              this.list = res.data.list;
            } else {
              //  页数不为1，在数组后加入列
              res.data.list.map((item, i) => {
                this.list.push(item);
              });
            }
          } else {
            //接口中list的值为空，赋空数组
            this.list = [];
          }
          this.totalPage = res.data.totalPage;
        });
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = false;
      // 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
      if (this.totalPage > this.page) {
        this.loading = true;
      } else if (this.totalPage > this.page) {
        this.loading = true;
        ++this.page;
        this.getData();
      } else {
        this.finished = true;
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    List,
    PullRefresh
  }
};
</script>

<style scoped>
.biddingPrice {
  overflow: hidden;
  padding-top: 44px;
}
/* 筛选条 */
.filterBar {
  height: 44px;
  background: #fff;
  width: 100%;
  white-space: nowrap;
  display: flex;
  align-items: center;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 10;
  overflow-x: scroll;
  padding: 0 14px;
}
/* .filterBar div {
  padding: 0 14px;
  margin: 0;
  align-items: center;
  height: 44px;
  line-height: 44px;
  overflow-y: hidden;
} */
.filterBar p {
  padding: 0 16px;
  height: 27px;
  line-height: 27px;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  color: #1c0000;
  font-size: 14px;
  border-radius: 15px;
  margin-right: 12px;
  display: inline-block;
}

.filterBar .cc {
  background: #e4d1d2;
  color: #74181b;
}
/* 选项卡 */
.tabber1 {
  background: #fff;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #9a9a9a;
}
.tabber1 > p {
  flex: 1;
  text-align: center;
}
.tabber1 .screen {
  color: #74181b;
}
.tabber1 .screen i {
  color: #74181b;
}
.tabber1 p > i {
  font-size: 10px;
  margin-left: 2px;
  color: #b2b2b2;
}
.tabber1 > p {
  height: 100%;
}
/* 列表 */
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px;
}
.list > div {
  width: 175px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
}
.list > div img {
  width: 175px;
  height: 175px;
  display: block;
  background: #444;
  border-radius: 4px 4px 0 0;
}
.list > div > p {
  font-size: 14px;
  color: #1c0000;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 6px;
  padding: 0 8px;
}
.list > div > span {
  font-size: 16px;
  padding: 0 8px;
  color: #dd0812;
  display: block;
  margin-bottom: 12px;
}
.list > div > span i {
  font-style: normal;
  font-size: 13px;
}
/* 筛选为空 */
.noGoods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  background: #f5f5f5;
}
.noGoods img {
  width: 150px;
}
.noGoods p {
  font-size: 12px;
  color: #c3c3c3;
  margin-top: 8px;
}
</style>