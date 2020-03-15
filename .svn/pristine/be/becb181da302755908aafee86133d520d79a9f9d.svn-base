<template>
  <div class="integralList">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>积分商城</p>
      <i class="iconfont icon-wenhao" style="visibility:hidden;"></i>
    </div>
    <van-pull-refresh
      v-model="isDownLoading"
      @refresh="onDownRefresh"
      v-if="list&&list.length != 0"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad()">
        <div class="goodslist">
          <div v-for="(item,i) in list" :key="i" @click="$router.push({name:'detail-integralDetail',query:{id:item.id}})">
            <img :src="item.thumb" alt />
            <p>{{item.name}}</p>
            <div>
              <p>{{item.score}}积分</p>
              <p>去兑换</p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="noGoods" v-else>
      <img src="../../static/img/searchEmpty.png" alt />
      <p>没有找到相关的商品</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, PullRefresh, Toast } from "vant";
export default {
  data() {
    return {
      page: 1, // 当前页数
      totalPage: 2, // 总页数
      list: [], // 秒杀列表
      finished: false, // 没有更多开关
      isDownLoading: false, //下拉刷新的开关
      loading: false, //上拉加载开关
      type: 2 // 1即将开始  2抢购中
    };
  },
  mounted() {
    //session中取出存储的数据
    this.goodsCategory = JSON.parse(sessionStorage.getItem("goodsCategory"));
    //请求接口，加载数据
    this.getData();
  },
  methods: {
    changeStatus(i) {
      this.finished = false;
      this.type = i;
      this.getData(1);
    },
    getData(page) {
      this.page = page ? page : 1;
      this.finished = false;
      axios
        .get("/ppi/index.php/api/score/goods_list?span=10&page=" + page)
        .then(res => {
          //如果页数为1就覆盖商品列表，否则就在商品列表后面添加
          if (this.page == 1) {
            this.list = res.data.list;
          } else {
            res.data.list.map((item, i) => {
              this.list.push(item);
            });
            this.loading = false; //关闭加载
          }
          //取出页数
          this.totalPage = res.data.totalPage;
        });
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      //刷新
      if (this.status1 == 2) {
        if (this.price) {
          this.getData(1, null, 1, null);
        } else {
          this.getData(1, null, 2, null);
        }
      } else {
        this.getData(1);
      }
      this.isDownLoading = false; //关闭刷新
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = false;
      // 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
      if (this.totalPage > this.page) {
        this.loading = true;
        this.getData(++this.page);
      } else {
        this.finished = true;
      }
    }
  },
  components: {
    List,
    PullRefresh,
    Toast
  }
};
</script>

<style scoped>
.integralList {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  color: #1c0000;
  padding-top: 1.2rem;
}
/* 标签栏 */
.integralList .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
  background: #fff;
}
.integralList .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.integralList .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
  color: #1c0000;
}

/* 商品列表 */
.goodslist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.2128rem;
}
.goodslist > div {
  width: 4.655rem;
  background: #fff;
  border-radius: 0.1064rem;
  margin-bottom: 0.2128rem;
}
.goodslist > div img {
  width: 4.655rem;
  height: 4.655rem;
  display: block;
  background: #9a9a9a;
  border-radius: 0.1064rem 0.1064rem 0 0;
}
.goodslist > div > p {
  font-size: 0.3458rem;
  color: #1c0000;
  width: 4.256rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.1596rem;
  padding: 0 0.2128rem;
}
.goodslist > div > div {
  display: flex;
  padding: 0 0.2128rem;
  flex-direction: row;
  margin-top: 0.35rem;
  padding-bottom: 0.3192rem;
  justify-content: space-between;
}
.goodslist > div > div p:nth-child(1) {
  color: #dd0812;
  font-size: 0.3724rem;
  display: block;
  line-height: 0.6118rem;
}
.goodslist > div > div p:nth-child(2) {
  color: #dd0812;
  font-size: 0.3192rem;
  border: 0.0266rem solid #dd0812;
  border-radius: 0.2926rem;
  width: 1.5428rem;
  height: 0.6118rem;
  line-height: 0.55rem;
  text-align: center;
}
/* 筛选为空 */
.noGoods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background: #f5f5f5;
}
.noGoods img {
  width: 3.99rem;
}
.noGoods p {
  font-size: 0.3192rem;
  color: #c3c3c3;
  margin-top: 0.2128rem;
}
</style>