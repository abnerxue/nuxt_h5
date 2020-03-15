<template>
  <div class="payBond">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>支付保证金</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 保证金 -->
    <div class="bond" v-if="!success">
      <p>本期竞拍需要支付保证金</p>
      <span>
        <i>¥</i>{{$route.query.pay}}
      </span>
      <p>竞拍不成功,保证金将原路返回</p>
    </div>
    <!-- 支付方式 -->
    <div class="payWay" v-if="!success">
      <h1>支付方式</h1>
      <div @click="payway='zfb'">
        <p>
          <img src="../../static/img/zfb.png" alt />
          <span>支付宝支付</span>
        </p>
        <input type="radio" name="1" value="zfb" v-model="payway" />
      </div>
      <div @click="payway='wechat'">
        <p>
          <img src="../../static/img/wx.png" alt />
          <span>微信支付</span>
        </p>
        <input type="radio" name="1" value="wechat" v-model="payway" />
      </div>
    </div>
    <!-- 支付成功 -->
    <div class="paySuccess" v-if="success">
      <img src="../../static/img/success.jpg" />
      <p>保证金支付成功</p>
      <span>请返回参与竞拍出价</span>
    </div>
    <!-- 支付 -->
    <div class="payBtn" @click="buy()">{{success?'返回':'支付保证金'}}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      payway: "zfb", // 支付方式
      success: false // 支付成功开关
    };
  },
  mounted() {},
  methods: {
    buy(){
      if(this.success){
        // 返回
        this.$router.go(-1);
      } else {
        // 支付保证金
          this.success = !this.success;  //  支付成功
      }
    },
    getData() {
    //   let data = new FormData();
    //   let that = this;
    //   data.append("token", sessionStorage.getItem("token"));
    //   axios
    //     .post("/api/index.php/user/red_paper/get_list?ajax=true", data)
    //     .then(res => {
    //       var rl = res.data.list;
    //       for (let i in rl) {
    //         if (this.id_in_array(rl[i].id, this.payBonds)) {
    //           that.payBond_list.push(res.data.list[i]);
    //         }
    //       }
    //       that.payBond = that.payBond_list[0].id;
    //     });
    }
  },
  components: {}
};
</script>

<style scoped>
.payBond {
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
.payBond .tab {
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

.payBond .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.payBond .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 保证金 */
.bond {
  margin: 12px;
  background: #fff;
  border-radius: 4px;
  text-align: center;
  padding: 15px 0;
}
.bond p:nth-of-type(1) {
  font-size: 14px;
  color: #1c0000;
  line-height: 19px;
  height: 19px;
}
.bond span {
  font-size: 18px;
  font-weight: 600;
  color: #74181b;
  margin: 8px 0 15px;
  display: block;
}
.bond span i {
  font-style: normal;
  font-size: 14px;
  height: 23px;
  line-height: 23px;
}
.bond p:nth-of-type(2) {
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #4a4a4a;
  opacity: 1;
}
/* 支付方式 */
.payWay {
  overflow: hidden;
  padding: 15px 12px 0;
}
.payWay h1 {
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 12px;
  color: #1c0000;
}
.payWay div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 0 20px;
  background: #fff;
  height: 55px;
  border-radius: 4px;
  margin-bottom: 1px;
}
.payWay div p {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.payWay div p img {
  width: 30px;
  height: 30px;
  display: block;
  margin-right: 22px;
}
.payWay div p span {
  font-size: 13px;
  color: #1c0000;
}
/* 单选框样式 */
.payWay input {
  -webkit-appearance: none;
  width: 17px;
  height: 17px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}
.payWay input:checked {
  border: 0;
  background: url("../../static/img/inputCheck.png") no-repeat center;
  background-size: 100% 100%;
}

/* 支付成功 */
.paySuccess {
  padding: 60px 0 70px;
  text-align: center;
}
.paySuccess img {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
}
.paySuccess p {
  height: 16px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #1c0000;
  margin-top: 15px;
}
.paySuccess span {
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  display: block;
  margin-top: 6px;
  color: #9a9a9a;
}
/* 支付按钮 */
.payBtn {
  margin: 0 12px;
  height: 44px;
  border-radius: 4px;
  color: #fff;
  background: #dd0812;
  font-size: 16px;
  text-align: center;
  line-height: 44px;
  box-sizing: border-box;
  margin-top: 30px;
}
</style>
