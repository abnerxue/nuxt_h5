<template>
  <div class="myAssemble">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>我的拼团</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <van-pull-refresh
      v-if="group_order_list!=null"
      @refresh="onRefresh"
      v-model="isDownLoading"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad()">
        <div class="assembleList">
          <div v-for="(group,i) in group_order_list" :key="i">
            <div class="listTop">
              <p>
                <span>{{group.orderTime}}</span>
                <!-- <span>拼团中,差1人</span> -->
                <span v-if="group.groupStatus==1">拼团中,差{{group.goodsNum-group.joinNum}}人</span>
              </p>
              <div v-for="(item,k) in group.goods" :key="k" @click="$router.push({name:'my-myAssemble-assembleStatus',query:{id:group.activityLaunchId,type:2}})">
                <img :src="item.thumb" alt />
                <p>{{item.title}}</p>
                <p>
                  <span>
                    <i>¥</i>
                    {{item.price}}
                  </span>
                  <span>x1</span>
                </p>
              </div>
            </div>
            <div class="listBtn">
              <div class="listTime">
                <p v-if="group.groupStatus==1">倒计时</p>
                <van-count-down
                  v-if="group.groupStatus==1"
                  :time="Number(group.groupRemainingTime)*1000"
                  format="DD 天 HH : mm : ss"
                />
                <!-- group.timeRemaining倒计时 -->
              </div>
              <div class="btn">
                <p
                  @click="$router.push({name:'my-myAssemble-assembleStatus',query:{id:group.activityLaunchId,type:2}})"
                >拼团详情</p>
              </div>
            </div>
            <p class="succInfo" v-if="group.groupStatus==3">拼团成功</p>
            <p class="failInfo" v-if="group.groupStatus==2">拼团失败</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="emtryAss" v-else>
      <p>您还没有参与任何拼团,快去发起拼团吧~</p>
      <p class="btn" @click="goGroup()">
        查看更多团购商品
        <i>></i>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, PullRefresh, Overlay, Toast, CountDown } from "vant";
export default {
  data() {
    return {
      group_order_list: [], //团购订单列表
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
    Toast,
    CountDown
  },
  mounted() {},
  methods: {
    goGroup() {
      this.$router.push({ name: "list-groupList" });
      let selectCategory = { categoryId: null, allId: null };
      sessionStorage.setItem("selectCategory", JSON.stringify(selectCategory));
    },
    getData() {
      this.totalpage = 2;
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("activity", 1);
      data.append("group", 0);
      data.append("page", this.page);
      data.append("span", 10);
      axios.post("/ppi/index.php/api/order/get_list", data).then(res => {
        this.tag = true;
        if (res.data.code == 0) {
          Toast(res.data.message);
        } else {
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.group_order_list = res.data.list;
          } else {
            res.data.list.map(item => {
              this.group_order_list.push(item);
            });
          }
        }
      });
    },
    onRefresh() {
      // 刷新
      this.finished = false;
      this.group_order_list = [];
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
.myAssemble {
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

.title i {
  font-size: 15px;
  color: #9a9a9a;
}

/* 拼团列表 */
.assembleList {
  overflow: hidden;
}

.assembleList > div {
  background: #fff;
  margin-bottom: 8px;
  position: relative;
}

.succInfo {
  position: absolute;
  top: 0;
  right: 0;
  width: 96px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #dd0812;
  padding-left: 9px;
  font-size: 12px;
  background: url("../../../static/img/assembleS.png") no-repeat;
  background-size: 100% 100%;
}

.failInfo {
  position: absolute;
  top: 0;
  right: 0;
  width: 96px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #9a9a9a;
  font-size: 12px;
  padding-left: 9px;
  background: url("../../../static/img/assembleF.png") no-repeat;
  background-size: 100% 100%;
}

.listTop {
  padding: 15px 19px;
}

.listTop > p {
  height: 18px;
  font-size: 13px;
  line-height: 18px;
  color: #9a9a9a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.listTop > div {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.listTop > div img {
  width: 70px;
  height: 70px;
  border-radius: 2px;
  background: #9a9a9a;
}

.listTop > div p:nth-of-type(1) {
  width: 170px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0 38px 0 8px;
}

.listTop > div p:nth-of-type(2) {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 13px;
  color: #1c0000;
}

.listTop > div p:nth-of-type(2) span i {
  font-style: normal;
  font-size: 10px;
}

.listTop > div p:nth-of-type(2) span:nth-of-type(2) {
  color: #808080;
}

.listBtn {
  height: 44px;
  padding: 0 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.listBtn .listTime {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}

.listTime .van-count-down{
  margin-left: 4px;
  color: #DD0812;
}
.btn {
  display: flex;
  flex-direction: row;
  font-size: 13px;
}

.btn p {
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #74181b;
  border-radius: 30px;
  text-align: center;
  color: #74181b;
  margin-left: 8px;
}

.btn .invite {
  background: #dd0812;
  color: #fff;
  border-color: #dd0812;
}

/* 拼团空状态 */
.emtryAss {
  padding: 125px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.emtryAss p {
  height: 17px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #808080;
  margin-bottom: 15px;
}

.emtryAss .btn {
  width: 150px;
  height: 30px;
  background: #dd0812;
  border-radius: 15px;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.emtryAss .btn i {
  border: 1px solid #fff;
  border-radius: 50%;
  text-align: center;
  display: block;
  font-style: normal;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
