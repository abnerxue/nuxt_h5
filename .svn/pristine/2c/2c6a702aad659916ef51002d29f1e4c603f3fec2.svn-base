<template>
  <div class="comment">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>评论</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="buy">
          <div v-for="(item,i) in commentlist" :key="i">
            <div class="userInfo">
              <img :src="item.avatar" alt />
              <p>{{item.userName}}</p>
              <!-- <span @click="forGood()">
                <i class="iconfont icon-zan"></i>点赞
              </span>-->
            </div>
            <span>{{item.postTime}}</span>
            <p>{{item.content}}</p>
            <div class="imgList" v-if="item.images.length!=0">
              <img v-for="(val,k) in item.images" :key="k" :src="val" @click="img(item.images)" />
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import axios from "axios";
import { Toast, List, PullRefresh, ImagePreview } from "vant";

export default {
  data() {
    return {
      loading: false, //上拉加载开关
      finished: false, //显示加载中还是没有更多
      isDownLoading: false, //下拉刷新的开关
      page: 1, // 当前页数
      totalpage: 2, //总页数
      gid: null, //商品gid
      tag: true, //加载开关
      commentlist: [], //评论列表
    };
  },
  mounted() {
    this.gid = this.$route.query.gid;
    this.getData();
  },
  methods: {
    getData() {
      this.totalpage = 2;
      axios
        .get(
          "/ppi/index.php/api/goods/comment_list?ajax=true&span=15&gid=" +
            this.gid +
            "&page=" +
            this.page
        )
        .then(res => {
          this.tag = true;
          this.loading = false;
          this.totalpage = res.data.totalPage;
          if (this.page == 1) {
            this.commentlist = res.data.list;
          } else {
            res.data.list.map(item => {
              this.commentlist.push(item);
            });
          }
        });
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      this.page = 1;
      this.getData();
      this.isDownLoading = false;
    },
    onLoad() {
      //加载
      this.loading = true;
      this.finished = false;
      if (this.totalpage > this.page && this.tag) {
        this.tag = false;
        ++this.page;
        this.getComment();
      } else if (!this.tag) {
        return;
      } else {
        this.finished = true;
      }
    }
  },
  components: {
    Toast,
    List,
    PullRefresh,
    ImagePreview
  }
};
</script>

<style scoped>
.comment {
  background: #fff;
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
.comment .tab {
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
.comment .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.comment .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 买家互动 */
.buy {
  overflow: hidden;
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
</style>