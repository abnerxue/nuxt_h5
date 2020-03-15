<template>
  <div class="address">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>新增地址</p>
      <span @click="sava()">保存</span>
    </div>
    <div class="addInfo">
      <div>
        <p>姓名</p>
        <input type="text" v-model="name" placeholder="收货人姓名" />
      </div>
      <div>
        <p>电话</p>
        <input type="number" v-model="phone" placeholder="收货人手机号码" />
      </div>
      <div>
        <p>所在地区</p>
        <span @click="showPopup" :style="carmodel=='选择省/市/区'?'':'color:#1C0000'">{{carmodel}}</span>
        <van-popup v-model="show" position="bottom">
          <van-area
            :area-list="areaList"
            :columns-num="3"
            ref="myArea"
            @change="onChange"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
      </div>
      <div>
        <p>详细地址</p>
        <input type="text" v-model="detailAdd" placeholder="街道门牌 楼层房间号等信息" />
      </div>
      <p class="default">
        <input type="radio" name="1" />
        <span>设为默认地址</span>
      </p>
    </div>
  </div>
</template>

<script>
import { Area, Popup, Toast } from "vant";
import areaList from "../../assets/js/area.js";
import areaData from "../../assets/js/areaData.js";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      phone: "",
      detailAdd: "",
      areaList, // vant框架用的数据
      areaData, // 数据
      show: false,
      carmodel: "选择省/市/区",
      de: false,
      code: [],
      defaults: 0,
      countyId: 0,
      address: {}, //修改地址信息
      id: 0,
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == 1) {
      this.address = this.$route.query.addresss;
      this.name = this.$route.query.addresss.name;
      this.phone = this.$route.query.addresss.phone;
      this.countyId = this.$route.query.addresss.countyId;
      this.carmodel =
        this.$route.query.addresss.province +
        this.$route.query.addresss.city +
        this.$route.query.addresss.county;
      this.detailAdd = this.$route.query.addresss.address;
    }
  },
  methods: {
    // 新增地址
    sava() {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("name", this.name);
      data.append("countyId", this.countyId);
      data.append("address", this.detailAdd);
      data.append("default", this.defaults);
      data.append("phone", this.phone);
      if (this.id == 1) {
        data.append("addressid", this.address.id);
      }
      axios.post("/ppi/index.php/api/address/add", data).then(res => {
        Toast(res.data.message);
      });
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    //value=0改变省，1改变市，2改变区
    onChange(picker, index, value) {
      let val = picker.getValues();
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i == 0 ? "" : "/") + val[i].name;
      }
      // this.carmodel = areaName;
    },
    //确定选择城市
    onConfirm(val) {
      this.code = [];
      this.carmodel = val[0].name + "," + val[1].name + "," + val[2].name;
      Object.keys(this.areaData).forEach(key => {
        val.map(item => {
          if (item.name == this.areaData[key]) {
            console.log(item.name);
            console.log(this.areaData[key]);
            console.log(key);
            this.code.push(key);
            console.log(this.code);
          }
        });
      });
      this.countyId = this.code[2];
      this.show = false; //关闭弹框
    },
    //取消选中城市
    onCancel() {
      this.show = false;
      this.$refs.myArea.reset(); // 重置城市列表
    }
  },
  components: {
    Area,
    Popup
  }
};
</script>

<style scoped>
.address {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 1.3034rem;
}

/* 标签栏 */
.address .tab {
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

.address .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.address .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}

.address .tab > span {
  color: #808080;
  font-size: 0.3192rem;
}

/* 新增地址 */
.addInfo {
  overflow: hidden;
}

.addInfo > div {
  display: flex;
  height: 1.596rem;
  line-height: 1.596rem;
  flex-direction: row;
  padding: 0 0.3192rem;
  background-color: #fff;
  border-bottom: 0.0133rem solid #f5f5f5;
  font-size: 0.3458rem;
  align-items: center;
  color: #1c0000;
}

.addInfo > div p {
  width: 1.3965rem;
  margin-right: 0.798rem;
}

.addInfo > div input {
  outline: none;
  border: none;
  height: 0.399rem;
  flex: 1;
}

.addInfo > div span {
  color: #9a9a9a;
}

.default {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.399rem;
}

.default input {
  -webkit-appearance: none;
  width: 0.4522rem;
  height: 0.4522rem;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  outline: none;
  margin-right: 0.1064rem;
  cursor: pointer;
}

.default input:checked {
  border: 0;
  background: url("../../static/img/inputCheck.png") no-repeat center;
  background-size: 100% 100%;
}

.default span {
  color: #9a9a9a;
  display: block;
  font-size: 0.3192rem;
}
</style>
<style>
input::-webkit-input-placeholder {
  color: #9a9a9a;
}

input::-moz-input-placeholder {
  color: #9a9a9a;
}

input::-ms-input-placeholder {
  color: #9a9a9a;
}
</style>
