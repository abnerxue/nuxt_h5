<template>
  <div class="appraise">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>发表评价</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="appraiseList">
      <div class="box">
        <div>
          <img :src="good.thumb" alt />
          <p>{{good.title}}</p>
        </div>
        <div>
          <span>评分</span>
          <van-rate v-model="value" :count="5" size="20px" color="#74181b" />
        </div>
        <textarea
          name
          id
          cols="30"
          rows="10"
          placeholder="亲,您对这个商品满意吗? 说说它的优点和美中不足的地方吧"
          v-model="content"
        ></textarea>
        <div class="uploadPic">
          <div>
            <van-uploader
              v-model="fileList"
              :max-count="5"
              :after-read="afterRead"
              :before-read="beforeRead"
            />
          </div>
        </div>
      </div>
    </div>
    <p class="subBtn" @click="subitem">提交评价</p>
  </div>
</template>

<script>
import { Rate, Toast } from "vant";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      active: 1,
      arr: [],
      value: 1, // 评分
      good: [], //商品信息
      order_id: 0,
      fileList: [], // 图片数组
      content: "", // 评价内容
      image: []
    };
  },
  components: {
    Rate,
    Toast
  },
  mounted() {
    this.good = JSON.parse(this.$route.query.good);
    this.order_id = this.$route.query.order_id;
  },
  methods: {
    subitem() {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", this.order_id);
      data.append("gid", this.good.gid);
      data.append("content", this.content); //内容
      data.append("grade", this.value); //评分 1 2 3 4 5
      data.append("image", this.image); //图片
      axios.post("/ppi/index.php/api/order/comment", data).then(res => {
        if (res.data.code == 1) {
          this.$router.push({ name: "my-order-appraiseSuccess" });
        }
        Toast({
          message: res.data.message,
          position: "bottom"
        });
      });
    },
    // 返回布尔值
    afterRead(file) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("image", file.content);
      data.append("type", "comment");
      axios.post("/ppi/index.php/api/upload/base64img", data).then(res => {
        if (res.data.code == 1) {
          this.image.push(res.data.img_url);
        } else {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
        }
      });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast({
          message: "请上传 jpg 格式图片",
          position: "bottom"
        });
        return false;
      }
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appraise {
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

/* 评论列表 */
.appraiseList {
  overflow: hidden;
}

.appraiseList > div {
  margin-bottom: 8px;
  background: #fff;
}

.appraiseList .box {
  padding: 12px 12px 15px;
}

.box > div:nth-child(1) {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.box > div:nth-child(1) img {
  width: 50px;
  height: 50px;
  border-radius: 2px;
  margin-right: 12px;
  background: #444;
}

.box > div:nth-child(1) p {
  width: 282px;
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.box > div:nth-child(2) {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  margin: 15px 0;
  color: #1c0000;
}

.box > div:nth-child(2) span {
  font-size: 15px;
  color: #1c0000;
  margin-right: 15px;
}

.box textarea {
  width: 100%;
  height: 80px;
  border: none;
  outline: none;
  padding: 10px 0;
  font-size: 14px;
  line-height: 20px;
  color: #1c0000;
}

/* 上传图片 */
.uploadPic {
  background: #fff;
  margin-bottom: 8px;
}

.uploadPic {
  margin-bottom: 0;
}

.uploadPic p {
  color: #1c0000;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
}

.subBtn {
  margin: 0 12px;
  height: 44px;
  background: #74181b;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  line-height: 44px;
  margin-top: 25px;
  font-size: 14px;
}
</style>
