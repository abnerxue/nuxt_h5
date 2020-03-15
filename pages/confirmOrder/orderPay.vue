<template>
  <div class="orderPay">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>订单支付</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <!-- 订单号 -->
    <p class="orderNum">
      <span>订单号</span>
      <span>{{serialNumber}}</span>
    </p>
    <!-- 支付方式 -->
    <div class="payWay">
      <h1>支付方式</h1>
      <div @click="payway='zfb'">
        <p>
          <img src="../../static/img/zfb.png" alt="">
          <span>支付宝支付</span>
        </p>
        <input type="radio" name="1" value="zfb" v-model="payway">
      </div>
      <div @click="payway='wechat'">
        <p>
          <img src="../../static/img/wx.png" alt="">
          <span>微信支付</span>
        </p>
        <input type="radio" name="1" value="wechat" v-model="payway">
      </div>
    </div>
    <!-- 支付 -->
    <div class="payBtn" @click="buy()">确认支付</div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        payway: 'zfb',
        serialNumber: ''
      };
    },
    mounted() {
      this.serialNumber = this.$route.query.serialNumber;
    },
    methods: {
      buy() {
        let data = new FormData();
        data.append('token', sessionStorage.getItem('token'));
        data.append('serialNumber', this.serialNumber)
        data.append('payment', 1)
        axios.post('/ppi/index.php/order_pay/index', data).then(res => {
          const div = document.createElement('div')
          /* 此处form就是后台返回接收到的数据 */
          div.innerHTML = res.data
          document.body.appendChild(div)
          document.forms[0].submit()
          console.log(res)
        })
      }
    },
    components: {

    }
  };
</script>

<style scoped>
  .orderPay {
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
  .orderPay .tab {
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

  .orderPay .tab>i {
    font-size: 0.399rem;
    color: #9a9a9a;
  }

  .orderPay .tab>p {
    font-size: 0.4256rem;
    font-weight: 500;
  }

  /* 订单号 */
  .orderNum {
    height: 44px;
    padding: 0 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin-bottom: 15px;
  }

  .orderNum span:nth-child(1) {
    font-size: 13px;
    color: #1c0000;
  }

  .orderNum span:nth-child(2) {
    font-size: 13px;
    color: #808080;
  }

  /* 支付方式 */
  .payWay {
    overflow: hidden;
  }

  .payWay h1 {
    font-size: 13px;
    font-weight: 400;
    color: #808080;
    margin-bottom: 8px;
    margin-left: 12px;
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

  /* 支付按钮 */
  .payBtn {
    margin: 0 12px;
    height: 44px;
    border-radius: 4px;
    color: #fff;
    background: #DD0812;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    box-sizing: border-box;
    margin-top: 30px;
  }
</style>
