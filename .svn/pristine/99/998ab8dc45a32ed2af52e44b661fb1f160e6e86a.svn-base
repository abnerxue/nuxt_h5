<template>
  <div class="setting">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>设置</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="top_one">
      <div>
        <p>头像</p>
        <!-- <input type="file" name="file" style="margin-top:20px" > -->
        <!-- <input type="file" id='image' accept="image/*"  @change="a" capture='camera' name="file" > -->
        <van-uploader
          type="primary"
          :after-read="afterRead"
          :max-count="1"
          :before-read="beforeRead"
        >
          <img :src="user.avatar" v-if="images==''" />
          <img :src="images" v-else />
        </van-uploader>
      </div>
      <div @click="$router.push({name:'my-modifyName',query:{'userName':user.userName}})">
        <p>昵称</p>
        <p>
          {{user.userName}}
          <i class="iconfont icon-right"></i>
        </p>
      </div>
    </div>
    <!-- <div class="center_two">
			<div>
				<p>版本升级</p>
				<p>V1.0.1</p>
			</div>
			<div>
				<p>清除缓存</p>
				<p>0.0MB</p>
			</div>
    </div>-->
    <div class="checkout" @click="quit()">
      <p>退出登录</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      images: "",
      fileList: [],
      user: {}
    };
  },
  mounted() {
    this.user = JSON.parse(this.$route.query.user);
    sessionStorage.setItem("name", this.user.userName);
  },
  methods: {
    // afterRead(event) {
    //   let data = new FormData();
    //   data.append("token", sessionStorage.getItem("token"));
    //   axios.post("/api/index.php/user/user/upload_image", data).then(res => {
    //     console.log(res);
    //   });
    // },
    quit() {
      // 退出登录
      sessionStorage.removeItem("token");
      this.$router.push({name:'index'})
    },
    // 返回布尔值
    afterRead(file) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("image", file.content);
      data.append("type", "avatar");
      axios.post("/ppi/index.php/api/upload/base64img", data).then(res => {
        Toast(res.data.message);
        if (res.data.code == 1) {
          this.images = res.data.img_url;
        }
      });
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        Toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.setting {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 标签栏 */
.setting .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
  position: fixed;
  top: 0;
  left: 0;
}

.setting .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.setting .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 修改头像、昵称 */
.top_one {
  overflow: hidden;
  background: #fff;
  margin-bottom: 0.2128rem;
}

.top_one > div {
  display: flex;
  flex-direction: row;
  padding: 0 0.3192rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 0.0133rem solid #f5f5f5;
}

.top_one > div p {
  font-size: 0.3192rem;
}

.top_one > div:nth-child(1) {
  padding: 0.3192rem;
}

.top_one > div:nth-child(1) img {
  width: 0.9576rem;
  height: 0.9576rem;
  display: block;
  border-radius: 50%;
  background: #9a9a9a;
}

.top_one > div:nth-child(2) {
  padding: 0.4256rem 0.3192rem;
}

/* 版本升级、清除缓存 */
.center_two {
  overflow: hidden;
}

.center_two > div {
  padding: 0.4256rem 0.3192rem;
  display: flex;
  font-size: 0.3192rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 0.0133rem solid #f5f5f5;
}

.checkout {
  height: 1.1704rem;
  background: #74181b;
  text-align: center;
  color: #fff;
  line-height: 1.1704rem;
  border-radius: 0.1064rem;
  font-size: 0.3458rem;
  margin: 0.399rem 0.3192rem 0;
}
</style>
