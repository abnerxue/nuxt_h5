<template>
  <div class="assembleStatus">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>{{type==1?'去参团':'拼团详情'}}</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="status">
      <img :src="goods.thumb" alt />
      <div>
        <p>{{goods.title}}</p>
        <span>
          <i>¥</i>
          {{group_del.price}}
        </span>
        <del>¥{{goods.price}}</del>
      </div>
      <img v-if="group_initiate.status==3" src="../../../static/img/groupS.png" class="statusImg" />
      <img v-if="group_initiate.status==2" src="../../../static/img/groupF.png" class="statusImg" />
    </div>
    <div class="many">
      <div>
        <p v-if="group_initiate.status==3">
          <img src="../../../static/img/groupSt.png" alt />
          恭喜你拼团成功
        </p>
        <p v-if="group_initiate.status==2">
          <img src="../../../static/img/groupFt.png" alt />
          拼团时间到
        </p>
        <p
          v-if="group_initiate.status==1"
        >还差{{group_initiate.goodsNum - group_initiate.joinNum}}人拼团成功，还剩 </p>
        <!-- <div v-if="group_initiate.status==1">还剩 29天07:07:07</div> -->
        <van-count-down v-if="group_initiate.status==1" :time="group_initiate.timeRemaining*1000">
          <template v-slot="timeData">
            <span class="day"> {{ timeData.days | dataFormat }}天</span>
            <span class="item">{{ timeData.hours | dataFormat }}</span>:
            <span class="item">{{ timeData.minutes | dataFormat }}</span>:
            <span class="item">{{ timeData.seconds | dataFormat }}</span>
          </template>
        </van-count-down>
      </div>
      <div>
        <img :src="group_image.avatar" v-for="(group_image,i) in group_join" :key="i" />
        <img src="../../../static/img/peopleEmtry.png" v-for="i in img" :key="i" />
      </div>
      <p
        v-if="type==1"
        @click="$router.push({name:'confirmOrder',query:{types:'join',gid:$route.query.id}})"
      >我要参团</p>
      <p v-if="type==2&&group_initiate.status==1">邀请好友</p>
      <p
        v-if="type==2&&group_initiate.status!=1"
        @click="$router.push({name:'list-groupList'})"
      >查看更多团购商品</p>
    </div>
    <!-- 推荐商品 -->
    <div class="recommendGoods">
      <h1>推荐商品</h1>
      <div class="recommend">
        <div v-for="(item,index) in recommendList" :key="index">
          <img :src="item.thumb" />
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
  data() {
    return {
      active: 1,
      recommendList: [],
      group_del: {},
      goods: {}, // 商品信息
      group_initiate: {},
      group_join: {}, // 参与人信息
      type: null, //类型
      img: null // 相片个数
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
  mounted() {
    this.type = this.$route.query.type;
    this.getData();
    this.recommendGoods();
  },
  methods: {
    getData() {
      axios
        .get(
          "/ppi/index.php/api/group/initiate_details?initiateId=" +
            this.$route.query.id
        )
        .then(res => {
          this.group_del = res.data.groupGoods;
          this.goods = res.data.goods;
          this.group_initiate = res.data.groupPurchase;
          this.group_join = res.data.joinList;
          this.img = this.group_initiate.goodsNum - this.group_initiate.joinNum;
        });
    },
    recommendGoods() {
      //随机推荐商品
      axios.get("/ppi/index.php/api/goods/recommend").then(res => {
        this.recommendList = res.data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assembleStatus {
  background: #fff;
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

/* 拼团状态 */
.status {
  padding: 9px 12px 18px;
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0px 3px 6px rgba(216, 216, 216, 0.22);
  margin: 12px 12px 0;
  position: relative;
}

.status img:nth-child(1) {
  width: 113px;
  height: 113px;
  border-radius: 2px;
  display: block;
}

.status > div {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

.status > div p {
  width: 205px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.status > div span {
  color: #dd0812;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 2px;
}

.status > div span i {
  font-style: normal;
  font-size: 12px;
}

.status > div del {
  font-size: 12px;
  height: 17px;
  line-height: 17px;
  color: #808080;
}

.statusImg {
  width: 75px;
  position: absolute;
  bottom: 13px;
  right: 22px;
}

.many {
  padding: 30px 12px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.many > div:nth-child(1) {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.many > div:nth-child(1) p {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.many > div:nth-child(1) p img {
  width: 25px;
  display: block;
  height: 21px;
  margin-right: 4px;
}
.van-count-down{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.many .day{
  color: #DD0812;
  margin-left: 4px;
}
.many .item{
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background: #c2060c;
  font-size: 13px;
  color: #fff;
  border-radius: 4px;
  display: block;
  margin: 0 2px;
}
.many > div:nth-child(2) {
  display: flex;
  flex-direction: row;
  margin: 32px 0;
}

.many > div:nth-child(2) img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 4px;
}

.many > div:nth-child(2) img:last-of-type {
  margin-right: 0;
}

.many > p {
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  background: #dd0812;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 44px;
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
