<template>
  <div class="appraiseSuccess">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-2)"></i>
    </div>
    <div class="success">
      <img src="../../../static/img/success.jpg" alt />
      <p>评价成功</p>
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
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 1,
      arr: [],
      recommendList: []
    };
  },
  mounted() {
    this.recommendGoods();
  },
  methods: {
    recommendGoods() {
      //随机推荐商品
      axios.get("/ppi/index.php/api/goods/recommend/345").then(res => {
        this.recommendList = res.data;
      });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appraiseSuccess {
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 0 20px;
  background: #fff;
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
.success img {
  width: 50px;
  height: 50px;
  background: #74181b;
  border-radius: 50%;
  margin-bottom: 12px;
}
.success p {
  color: #74181b;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
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
