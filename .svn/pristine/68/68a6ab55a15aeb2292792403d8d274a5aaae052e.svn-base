<template>
  <div class="applyAfterSale">
    <div class="title">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>申请售后</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="refundWay">
      <p>请选择退款方式</p>
      <van-radio-group v-model="way" checked-color="#74181B">
        <van-cell-group>
          <van-cell title="退货退款" clickable @click="way = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="换货" clickable @click="way = '2'">
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="退款" clickable @click="way = '3'">
            <van-radio slot="right-icon" name="3" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="refundReason">
      <p>请选择退款理由</p>
      <van-radio-group v-model="reason" checked-color="#74181B">
        <van-cell-group>
          <van-cell title="七天无理由退换货" clickable @click="reason = '7天无理由退换货'">
            <van-radio slot="right-icon" name="7天无理由退换货" />
          </van-cell>
          <van-cell title="商品描述不符" clickable @click="reason = '商品描述不符'">
            <van-radio slot="right-icon" name="商品描述不符" />
          </van-cell>
          <van-cell title="质量问题" clickable @click="reason = '质量问题'">
            <van-radio slot="right-icon" name="质量问题" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="uploadPic">
      <p>上传图片(最多上传5张)</p>
      <div>
        <van-uploader v-model="fileList" :after-read="afterRead" :max-count="5" :before-read="beforeRead" />
      </div>
    </div>
    <p class="submit" @click="submint">提交</p>
  </div>
</template>

<script>
import axios from "axios";
import { RadioGroup, Radio, Uploader, Toast } from "vant";
export default {
  data() {
    return {
      active: 1,
      order_list: [],
      fileList: [], //上传图片数组
      loading: false,
      way: 1, // 退款方式，1：退货退款，2：换货，3：退款
      reason: 1, // 退款理由，1：七天无理由退换货，2：商品描述不符，3：质量问题
      orderId: 0, //订单id
      gid: 0, //商品id
      image: [] // 图片
    };
  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    this.gid = this.$route.query.gid;
  },
  methods: {
    // 返回布尔值
    afterRead(file) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("image", file.content);
      data.append("type", "returned");
      axios
        .post("/ppi/index.php/api/upload/base64img", data)
        .then(res => {
          this.image.push(res.data.images_url);
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
    },
    // 提交
    submint() {
      let that = this;
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("orderId", this.orderId);
      data.append("gid", this.gid);
      data.append("cause", this.reason);
      data.append("type", this.way);
      data.append("image", this.image); //图片
      axios.post("/ppi/index.php/api/post_sale/returned", data).then(res => {
        Toast({
          message: res.data.message,
          position: "bottom"
        });
      });
    }
  },
  components: {
    RadioGroup,
    Radio,
    Uploader,
    Toast
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.applyAfterSale {
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

/* 退款方式 */
.refundWay,
.refundReason,
.uploadPic {
  background: #fff;
  margin-bottom: 8px;
}

.uploadPic {
  margin-bottom: 0;
}

.refundWay p,
.refundReason p,
.uploadPic p {
  color: #1c0000;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
}

.uploadPic > div {
  padding: 4px 19px 15px;
}

.van-cell:not(:last-child)::after {
  left: 0;
}

.van-hairline--top-bottom::after {
  border-width: 0;
}

.submit {
  margin: 0 12px;
  height: 44px;
  font-size: 14px;
  font-weight: 500;
  line-height: 44px;
  color: #fff;
  background: #74181b;
  border-radius: 4px;
  text-align: center;
  margin-top: 30px;
}
</style>
