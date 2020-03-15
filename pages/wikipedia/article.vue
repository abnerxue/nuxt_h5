<template>
  <div class="article">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>{{data.title}}</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="info1">
      <p>{{time}}</p>
      <p>作者：{{data.author}}</p>
    </div>
    <div class="artcontent" v-html="data.content">{{data.content}}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {},
      time: ""
    };
  },
  mounted() {
    this.getActicle();
  },
  methods: {
    getActicle() {
      // 文章详情
      let data = new FormData();
      data.append("id", this.$route.query.id);
      axios.post("/ppi/index.php/api/article/detail", data).then(res => {
        this.data = res.data;
        this.time = res.data.putTime;
      });
    }
  }
};
</script>

<style>
.article {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.article .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 0.0399rem 0.0798rem rgba(216, 216, 216, 0.1);
  position: fixed;
  top: 0;
  left: 0;
}
.article .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.article .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}
.article .info1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.article .info1 p {
  font-size: 0.2394rem;
  color: #9a9a9a;
  padding: 0.1064rem 0.5054rem;
}
.article .artcontent {
  margin-top: 0.399rem;
  padding: 0 0.5054rem;
  font-size: 0.3724rem;
  font-weight: 400;
  color: #1c0000;
}
.article .artcontent p {
  font-size: 0.3724rem !important;
  line-height: 0.665rem !important;
}
.article .artcontent span {
  font-size: 0.3724rem !important;
  line-height: 0.665rem !important;
}
.article .artcontent img {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
</style>