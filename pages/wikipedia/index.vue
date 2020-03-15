<template>
  <div class="wikipedia">
    <div class="tab">
      <p :class="redAct==0?'red':''" @click="redAct = 0;">买家互动</p>
      <p :class="redAct==1?'red':''" @click="redAct = 1;">关于我们</p>
      <p :class="redAct==2?'red':''" @click="redAct = 2;">珠宝知识</p>
      <p :class="redAct==3?'red':''" @click="redAct = 3;">通证资讯</p>
    </div>
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 买家互动 -->
        <div class="buy" v-if="redAct==0">
          <div v-for="(item,i) in commentlist" :key="i">
            <div class="userInfo">
              <img :src="item.avatar" alt />
              <p>{{item.userName}}</p>
              <!-- <span @click="forGood()">
                <i class="iconfont icon-zan"></i>点赞
              </span> -->
            </div>
            <span>{{item.postTime}}</span>
            <p>{{item.content}}</p>
            <div class="imgList" v-if="item.images.length!=0">
              <img v-for="(val,k) in item.images" :key="k" :src="val" @click="img(item.images)" />
            </div>
          </div>
        </div>
        <!-- 关于我们 -->
        <div class="about" v-else-if="redAct==1">
          <div
            v-for="(item,i) in artlist"
            :key="i"
            @click="$router.push({name:'wikipedia-article', params: { id: item.id}})"
          >
            <p>{{item.title}}</p>
            <i class="iconfont icon-right"></i>
          </div>
        </div>
        <!-- 珠宝知识 -->
        <div class="gem" v-else-if="redAct==2">
          <div
            class="gemCon"
            v-for="(item,i) in gemlist"
            :key="i"
            @click="$router.push({name:'wikipedia-article', query: { id: item.id}})"
          >
            <div>
              <p>{{item.title}}</p>
              <span>{{item.putTime}}</span>
            </div>
            <img :src="item.a" alt :class="item.a?'':'show'" />
          </div>
        </div>
        <!-- 通证资讯 -->
        <div class="info" v-else>
          <div
            v-for="(item,i) in infolist"
            :key="i"
            @click="$router.push({name:'wikipedia-article', query: { id: item.id}})"
          >
            <p>{{item.title}}</p>
            <i class="iconfont icon-right"></i>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <Tabbar :active="2"></Tabbar>
    <!-- 图片预览 -->
    <van-image-preview v-model="show" :images="images" :showIndex="true"></van-image-preview>
  </div>
</template>

<script>
import Tabbar from "../../components/tabber.vue";
import axios from "axios";
import { List, PullRefresh, ImagePreview } from "vant";
export default {
  data() {
    return {
      redAct: 0,
      artlist: [],
      commentlist: [],
      page: 1, //评论当前页数
      gemlist: [],
      infolist: [],
      show: false,
      images: [],
      loading: false, //上拉加载开关
      finished: false, //显示加载中还是没有更多
      isDownLoading: false, //下拉刷新的开关
      totalpage: 3,
      Gempage: 1, //珠宝知识当前页数
      Artpage: 1, //关于我们当前页数
      Infopage: 1, //通证资讯当前页数
      totalInfo: 3, //通证资讯总页数
      totalGem: 3, //珠宝知识总页数
      totalArt: 3, //关于我们总页数
      tag: true // 加载开关
    };
  },
  mounted() {
    this.getArticle();
    this.getComment();
    this.getGem();
    this.getInfo();
  },
  methods: {
    onDownRefresh() {
      //刷新
      this.finished = false;
      if (this.redAct == 0) {
        //0买家互动
        this.page = 1;
        this.getComment();
      } else if (this.redAct == 1) {
        //1关于我们
        this.Artpage = 1;
        this.getArticle();
      } else if (this.redAct == 2) {
        //2珠宝知识
        this.Gempage = 1;
        this.getGem();
      } else {
        //  3通证资讯
        this.Infopage = 1;
        this.getInfo();
      }
      this.isDownLoading = false; //关闭刷新
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = true;
      this.finished = false;
      if (this.redAct == 0) {
        //0买家互动
        console.log(this.totalpage, this.page, this.tag);
        if (this.totalpage > this.page && this.tag) {
          this.tag = false;
          ++this.page;
          this.getComment();
        } else if (!this.tag) {
          return;
        } else {
          this.finished = true;
        }
      } else if (this.redAct == 1) {
        //1关于我们
        if (this.totalArt > this.Artpage && this.tag) {
          this.tag = false;
          ++this.Artpage;
          this.getArticle();
          this.loading = false;
        } else if (!this.tag) {
          return;
        } else {
          this.finished = true;
        }
      } else if (this.redAct == 2) {
        //2珠宝知识
        if (this.totalGem > this.Gempage && this.tag) {
          this.tag = false;
          ++this.Gempage;
          this.getGem();
          this.loading = false;
        } else if (!this.tag) {
          return;
        } else {
          this.finished = true;
        }
      } else {
        this.finished = false;
        if (this.totalInfo > this.Infopage && this.tag) {
          this.tag = false;
          ++this.Infopage;
          this.getInfo();
          this.loading = false;
        } else if (!this.tag) {
          return;
        } else {
          this.finished = true;
        }
      }
    },
    img(img) {
      //图片预览
      this.show = true;
      this.images = img;
    },
    forGood() {
      //点赞
    },
    getComment() {
      //获取评论接口数据
      this.totalpage = 2;
      axios
        .get(
          "/ppi/index.php/api/index/buyer_interaction?page=" +
            this.page +
            "&span=10"
        )
        .then(res => {
          this.tag = true;
          this.loading = false;
          if (this.page == 1) {
            this.commentlist = res.data.list;
          } else {
            res.data.list.map(item => {
              this.commentlist.push(item);
            });
          }
          this.totalpage = res.data.totalPage; // 总页数
        });
    },
    getGem() {
      //获取珠宝知识接口数据
      this.totalpage = 2;
      let data = new FormData();
      data.append("categoryId", 72);
      data.append("span", 15);
      data.append("page", this.Gempage);
      axios.post("/api/index.php/api/article/get_list", data).then(res => {
        this.loading = false;
        this.tag = true;
        if (this.Gempage == 1) {
          this.gemlist = res.data.list;
        } else {
          res.data.list.map(item => {
            this.gemlist.push(item);
          });
        }
        this.totalGem = res.data.totalPage; // 总页数
      });
    },
    getArticle() {
      //获取关于我们接口数据
      this.totalpage = 2;
      let data = new FormData();
      data.append("categoryId", 80);
      data.append("span", 15);
      data.append("page", this.Artpage);
      axios.post("/ppi/index.php/api/article/get_list", data).then(res => {
        this.loading = false;
        this.tag = true;
        if (this.Artpage == 1) {
          this.artlist = res.data.list;
        } else {
          res.data.list.map(item => {
            this.artlist.push(item);
          });
        }
        this.totalArt = res.data.totalPage; // 总页数
      });
    },
    getInfo() {
      //获取通证资讯接口数据
      this.totalpage = 2;
      let data = new FormData();
      data.append("categoryId", 78);
      data.append("span", 15);
      data.append("page", this.Infopage);
      axios.post("/ppi/index.php/api/article/get_list", data).then(res => {
        this.loading = false;
        this.tag = true;
        if (this.Infopage == 1) {
          this.infolist = res.data.list;
        } else {
          res.data.list.map(item => {
            this.infolist.push(item);
          });
        }
        this.totalInfo = res.data.totalPage; // 总页数
      });
    }
  },
  components: {
    Tabbar,
    ImagePreview,
    List,
    PullRefresh
  }
};
</script>

<style scoped>
.wikipedia {
  background: #fff;
  padding-bottom: 1.3333rem;
}
/* 标签栏 */
.tab {
  width: 100%;
  height: 1.3333rem;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 0.1rem 0.16rem rgba(216, 216, 216, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 111;
}
.tab p.red {
  font-size: 0.4256rem;
  font-weight: 600;
  color: #74181b;
  border-bottom: 0.0532rem solid #74181b;
}
.tab p {
  font-size: 0.3458rem;
  color: #9a9a9a;
  float: left;
  font-size: 500;
  margin-right: 0.532rem;
  padding: 0.1862rem 0.0665rem;
}
/* 买家互动 */
.buy {
  overflow: hidden;
  margin-top: 1.3333rem;
  padding-top: 0.5586rem;
}
.buy > div {
  width: 100%;
  margin-bottom: 0.399rem;
}
.userInfo {
  display: flex;
  align-items: center;
  padding: 0 0.5054rem;
}
.userInfo img {
  width: 0.798rem;
  height: 0.798rem;
  border-radius: 50%;
  margin-right: 0.2128rem;
}
.userInfo p {
  font-size: 0.3192rem;
  color: #1c0000;
}
.userInfo span {
  text-align: right;
  font-size: 0.3192rem;
  flex: 1;
  color: #808080;
}
.userInfo span i {
  font-size: #808080;
  font-size: 0.3192rem;
  margin-right: 0.0665rem;
}
.buy > div > span {
  font-size: 0.3192rem;
  font-weight: 400;
  color: #9a9a9a;
  display: block;
  margin-top: 0.1064rem;
  padding: 0 0.5054rem;
}
.buy > div > p {
  font-size: 0.3192rem;
  font-weight: 400;
  color: #808080;
  padding: 0 0.5054rem;
  margin-top: 0.3192rem;
}
.imgList {
  width: 100%;
  height: 2.8994rem;
  white-space: nowrap;
  overflow-x: auto;
  padding: 0 0.5054rem;
  overflow-y: hidden;
  margin-top: 0.3192rem;
}
.imgList > img {
  height: 2.8994rem;
  width: 2.8994rem;
  display: inline-block;
  border-radius: 0.1064rem;
  background: #74181b;
  margin-right: 0.2rem;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none !important;
  width: 0px;
  height: 0px;
}
/* 关于我们 */
.about,
.info {
  overflow: hidden;
  margin-top: 1.3333rem;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.about > div,
.info > div {
  height: 1.197rem;
  line-height: 1.197rem;
  padding: 0 0.5054rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0.1064rem;
  border-bottom: 0.0133rem solid #f5f5f5;
}
.about > div > p,
.info > div > p {
  font-size: 0.3724rem;
  font-family: PingFang SC;
  color: #1c0000;
  width: 8.3125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.about > div > i,
.info > div > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
/* 珠宝知识 */
.gem {
  margin: 0 0.1064rem;
  margin-top: 1.3333rem;
}
.gemCon {
  padding: 0.3192rem 0.5054rem 0.399rem;
  border-bottom: 0.0133rem solid #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gemCon > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gemCon > div p {
  font-size: 0.3724rem;
  width: 6.118rem;
  font-weight: 400;
  color: #1c0000;
}
.gemCon > div span {
  font-size: 0.3192rem;
  font-weight: 400;
  color: #808080;
}
.gemCon img {
  width: 2.128rem;
  height: 2.128rem;
  /* background: #9a9a9a; */
  border-radius: 0.0532rem;
  border-radius: 0.0532rem;
  border: none;
  display: block;
}
.show {
  visibility: hidden;
}
</style>