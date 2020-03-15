<template>
  <div class="integral">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>我的积分</p>
      <i class="iconfont icon-wenhao" @click="$router.push({name:'my-integral-integralRules'})"></i>
    </div>
    <div class="inDetail">
      <h1>{{score}}</h1>
      <p>我的可用积分</p>
    </div>
    <div class="tabber">
      <p>积分明细</p>
      <div>
        <p :class="status==1?'redStatus':''" @click="status = 1;getData()">收入</p>
        <p :class="status==2?'redStatus':''" @click="status = 2;getData()">支出</p>
      </div>
    </div>
    <van-list
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad()"
      v-if="scoreList.length!=0"
      class="content"
    >
      <div v-for="(score,i) in scoreList" :key="i">
        <!-- v-if="score.score>=1&&status==1||score.score<1&&status==2" -->
        <div>
          <p>{{score.explain.split('，')[0]}}</p>
          <span>{{score.postTime}}</span>
        </div>
        <p>{{status==1?'+'+score.score:'-'+score.score}}</p>
      </div>
    </van-list>
    <div v-else class="emptyPaper">
      <img src="../../../static/img/emptyIntegral.png" alt />
      <p>暂无积分明细</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, Toast } from "vant";
export default {
  data() {
    return {
      status: 1,
      paper: true,
      userinfo: {}, //总积分
      scoreList: [], //收入列表
      score: "", // 积分
      finished: false, // 没有更多开关
      loading: false, // 上拉加载开关
      page: 1, // 当前页
      totalpage: 2, // 总页数
      tag: true // 加载开关
    };
  },
  mounted() {
    this.score = this.$route.query.integral;
    this.getData();
  },
  methods: {
    getData() {
      this.totalpage = 2;
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("type", this.status);
      data.append("page", this.page);
      data.append("span", 10);
      axios.post("/ppi/index.php/api/user/score_list", data).then(res => {
        console.log(res.data);
        this.loading = false;
        this.tag = true;
        if (this.page == 1) {
          this.scoreList = res.data.list;
        } else {
          res.data.list.map(item => {
            this.scoreList.push(item);
          });
        }
        this.totalpage = res.data.totalPage;
      });
    },
    onLoad() {
      this.loading = true;
      this.finished = false;
      if (this.page < this.totalpage && this.tag) {
        this.tag = false;
        this.page++;
        this.getData();
      } else if (!this.tag) {
        return;
      } else {
        this.finished = true;
      }
    }
  },
  components: {
    List,
    Toast
  }
};
</script>

<style scoped>
.integral {
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
.integral .tab {
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

.integral .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.integral .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 可用积分 */
.inDetail {
  text-align: center;
  padding: 0.5054rem 0;
  background-color: #fff;
  margin-bottom: 0.1064rem;
}

.inDetail h1 {
  color: #dd0812;
  font-size: 0.5985rem;
  font-weight: 600;
  margin: 0.133rem;
}

.inDetail p {
  color: #9a9a9a;
  font-size: 0.35rem;
}

/* 选项卡 */
.tabber {
  background: #fff;
}

.tabber > p {
  font-size: 0.3458rem;
  padding: 0.3192rem;
  padding-bottom: 0.399rem;
}

.tabber > div {
  background: #fff;
  height: 0.931rem;
  line-height: 0.931rem;
  font-size: 0.3724rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #9a9a9a;
}

.tabber > div > p {
  height: 100%;
}

.redStatus {
  border-bottom: 0.0266rem solid #74181b;
  color: #74181b;
}

/* 内容 */
.content {
  background: #fff;
}

.content > div {
  padding: 0.399rem 0.3192rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.1064rem;
  display: flex;
  flex-direction: row;
}

.content > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* width: 4.8545rem; */
  margin-left: 0.2128rem;
}

.content > div > div p {
  font-size: 13px;
  color: #1c0000;
  line-height: 18px;
}

.content > div > div span {
  line-height: 16px;
  font-size: 12px;
  color: #9a9a9a;
  margin-top: 6px;
}

.content > div > p {
  color: #dd0812;
  font-size: 22px;
  margin-left: auto;
}

/* 空红包 */
.emptyPaper {
  padding-top: 2.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.emptyPaper img {
  display: block;
  width: 2.793rem;
}

.emptyPaper p {
  font-size: 0.3192rem;
  color: #c3c3c3;
  margin-top: 0.2128rem;
}
</style>
