<template>
  <div class="address">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>地址管理</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div v-if="noEmpty" class="addEmpty">
      <img src="../../static/img/addressEmpty.png" alt />
      <p>暂无收货地址</p>
    </div>
    <div v-if="!noEmpty" class="addList">
      <div
        class="box"
        v-for="(addresss,index) in address_list"
        :key="index"
        @click="id==1?choose(addresss):''"
      >
        <div class="personInfo">
          <p>{{addresss.name}}</p>
          <p>{{addresss.phone}}</p>
        </div>
        <p class="detail_add">{{addresss.city}}{{addresss.county}}{{addresss.address}}</p>
        <div class="operation" v-if="id!=1">
          <div>
            <input
              type="radio"
              name="moren"
              :checked="addresss.default == 1"
              @click="defaults(addresss.id,addresss.default)"
            />
            <span @click="defaults(addresss.id,addresss.default)">设为默认</span>
          </div>
          <div>
            <p @click="bianji(addresss)">
              <i class="iconfont icon-bianji"></i>编辑
            </p>
            <p @click="deletes(addresss.id,addresss.default)">
              <i class="iconfont icon-shanchu"></i>删除
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="add_address" @click="$router.push({name: 'my-add_address',query:{id:0}})">
      <p>
        <i class="iconfont icon-tianjia"></i>
        新增地址
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      noEmpty: false,
      address_list: [], //地址列表
      id: 0 //为 1 就是选中地址
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      // 收货地址列表接口
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      axios.post("/ppi/index.php/api/address/get_list", data).then(res => {
        this.address_list = res.data.list;
      });
    },
    bianji(addresss) {
      this.$router.push({
        name: "my-add_address",
        query: {
          addresss: addresss,
          id: 1
        }
      });
    },
    // 设为默认
    defaults(id, defaults) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("id", id);
      if (defaults != 1) {
         axios.post("/ppi/index.php/api/address/set_default", data).then(res => {
          if (res.data.code == 1) {
            this.getData();
            Toast(res.data.message);
          }
        });
      } else {
        Toast("已为默认，请不要重复操作！");
      }
    },
    // 删除
    deletes(id, defaults) {
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("id", id);
      if (defaults != 1) {
        axios.post("/ppi/index.php/api/address/del", data).then(res => {
          if (res.data.code == 1) {
            this.getData();
            Toast(res.data.message);
          }
        });
      } else {
        Toast("不能删除默认地址，请重新操作！");
      }
    },
    // 选择地址
    choose(address) {
      sessionStorage.setItem("address", JSON.stringify(address));
      this.$router.go(-1);
    },
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

/* 地址为空显示 */
.addEmpty {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.addEmpty img {
  display: block;
  width: 3.6309rem;
  margin-bottom: 0.2128rem;
}

.addEmpty p {
  color: #e9e9e9;
  font-size: 0.3192rem;
}

/* 地址列表 */
.addList {
  overflow: hidden;
}

.addList .box {
  background: #fff;
  padding-top: 0.3192rem;
  margin-bottom: 0.0532rem;
}

.personInfo {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.399rem;
  padding: 0 0.2261rem;
}

.personInfo p {
  color: #1c0000;
  font-size: 0.3458rem;
}

.personInfo p:nth-child(1) {
  margin-right: 0.798rem;
}

.detail_add {
  font-size: 0.3458rem;
  padding: 0 0.2261rem;
  padding-bottom: 0.3192rem;
  color: #808080;
  border-bottom: 0.0133rem solid #f5f5f5;
}

.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.3192rem 0.399rem;
  padding-right: 0.2128rem;
  box-sizing: border-box;
}

.operation div:nth-child(1) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.operation div:nth-child(1) span {
  font-size: 0.3192rem;
  line-height: 0.3192rem;
  height: 0.3192rem;
  color: #9a9a9a;
  display: block;
}

.operation input {
  -webkit-appearance: none;
  width: 0.35rem;
  height: 0.35rem;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  outline: none;
  margin-right: 0.0665rem;
  cursor: pointer;
}

.operation input:checked {
  border: 0;
  background: url("../../static/img/inputCheck.png") no-repeat center;
  background-size: 100% 100%;
}

.operation > div {
  display: flex;
  flex-direction: row;
}

.operation > div:nth-child(2) p:nth-child(1) {
  margin-right: 0.3192rem;
}

.operation > div:nth-child(2) p {
  color: #9a9a9a;
  font-size: 0.3192rem;
}

.operation > div:nth-child(2) p .iconfont {
  font-size: 0.3rem;
  margin-right: 0.05rem;
}

/* 添加地址 */
.add_address {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.3034rem;
  line-height: 1.3034rem;
  background: #fff;
  background-color: #74181b;
  color: #fff;
  font-size: 0.3458rem;
  text-align: center;
}

.add_address i {
  font-size: 0.3458rem;
  font-weight: 600;
}
</style>
<style>
.van-radio__label {
  color: #9a9a9a;
  font-size: 0.3192rem;
  margin-left: 0.1064rem;
}
</style>
