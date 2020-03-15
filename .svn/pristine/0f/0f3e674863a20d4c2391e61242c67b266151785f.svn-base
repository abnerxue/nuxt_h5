<template>
  <div class="cart">
    <div class="tab">
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
      <p>{{goods.length != 0?'购物车('+goods.length+')':'购物车'}}</p>
      <i @click="edit = !edit" :style="goods.length != 0?'':'visibility: hidden'">{{edit?'编辑':'完成'}}</i>
    </div>
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-checkbox-group
          class="goodsList"
          v-model="result"
          ref="checkboxGroup"
          :change="resultMoney()"
          v-if="goods.length != 0"
        >
          <div class="goods" v-for="(item,i) in goods" :key="i">
            <van-checkbox :name="item.id" checked-color="#DD0812"></van-checkbox>
            <img :src="item.thumb" alt />
            <div class="goodsRight">
              <p>{{item.title}}</p>
              <div>
                <p>
                  <i>¥</i>
                  {{item.price}}
                </p>
                <div class="amount">
                  <i @click="count(item.gid,'reduce',item.number)">-</i>
                  <input type="number" v-model="item.number" disabled />
                  <i @click="count(item.gid,'plus',item.number)">+</i>
                </div>
              </div>
            </div>
          </div>
        </van-checkbox-group>
        <div v-else class="emptyCart">
          <img src="../../static/img/emptyCart.png" alt />
          <p>
            购物车还是空的，您可以
            <span @click="$router.push({name: 'index'})">再逛逛</span>
          </p>
        </div>
        <div class="recommendGoods">
          <h1>推荐商品</h1>
          <div class="recommend">
            <div v-for="(item,index) in recommendList" :key="index" @click="goodsChange(item.gid)">
              <img :src="item.thumb" alt />
              <p>{{item.title}}</p>
              <span>
                <i>¥</i>
                {{item.price}}
              </span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="standBottom" v-if="edit && goods.length!=0">
      <van-checkbox
        v-model="checked"
        @click="checked=!checked;checkAll()"
        checked-color="#DD0812"
        class="selectAll"
      >全选</van-checkbox>
      <div class="paying">
        <p>
          合计：
          <span>
            <i>¥</i>
            {{(resPrice).toFixed(2)}}
          </span>
        </p>
        <span>不含运费</span>
      </div>
      <div class="resBtn" @click="buy()">结算({{selectLen}})</div>
    </div>
    <div class="delBottom" v-if="!edit && goods.length!=0">
      <van-checkbox
        v-model="checked"
        @click="checkAll()"
        checked-color="#DD0812"
        class="selectAll"
      >全选</van-checkbox>
      <div
        class="delBtn"
        :style="selectLen!=0?'':'opacity:0.5'"
        @click="show = true;"
      >删除({{result.length}})</div>
    </div>
    <div class="delPopup" v-if="show">
      <p>确认删除该商品吗？</p>
      <div>
        <p @click="show = false;">取消</p>
        <p @click="delGoods()">删除</p>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false" />
    <Tabbar :active="3"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/tabber.vue";
import {
  List,
  Overlay,
  PullRefresh,
  Toast,
  Checkbox,
  CheckboxGroup
} from "vant";
import axios from "axios";
export default {
  data() {
    return {
      loading: false, //上拉加载开关
      finished: false, //显示加载中还是没有更多
      isDownLoading: false, //下拉刷新的开关
      result: [], // 选择商品
      goods: [], // 商品列表
      checked: false, //绑定全选按钮
      recommendList: [], //推荐商品列表
      token: "", // user Token
      page: 1, // 当前页数
      totalPage: 2, // 总页数
      resPrice: 0, // 总价
      edit: true, // 编辑开关
      show: false //遮罩层开关
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    if (this.token) {
      this.getList();
    } else {
      Toast({
        message: "您未登录，请先登录！",
        position: "bottom"
      });
      this.$router.push({ name: "login" });
    }
    this.recommendGoods();
  },
  methods: {
    goodsChange(gid) {
      this.$router.push({ name: "detail", query: { gid } });
    },
    resultMoney() {
      //合计价钱
      let price = 0;
      if (this.result.length == 0) {
        price = 0;
        this.resPrice = price;
        return;
      } else {
        this.goods.map(item => {
          this.result.map(key => {
            if (item.id == key) {
              price += item.price * item.number;
            }
          });
        });
      }
      this.resPrice = price;
    },
    getList() {
      // 获得购物车商品列表
      //  /index.php/api/cart/get_list?ajax=true
      let data = new FormData();
      data.append("token", this.token); // 填写参数
      axios.post("/ppi/index.php/api/cart/goods_list", data).then(res => {
        this.goods = res.data.goods ? res.data.goods : [];
      });
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      // 清空选择
      this.result = [];
      this.resPrice = 0;
      this.getList(); // 刷新列表
      this.recommendGoods(); // 刷新推荐
      this.isDownLoading = false; //关闭刷新
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = false;
      this.finished = false;
      //   this.finished = true;
    },
    checkAll() {
      // 全选
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }
    },
    recommendGoods() {
      //随机推荐商品
      axios.get("/ppi/index.php/api/goods/recommend/345").then(res => {
        this.recommendList = res.data;
      });
    },
    count(gid, str, num) {
      if (str == "plus") {
        // 数量增加
        let data = new FormData();
        data.append("token", this.token);
        data.append("gid", gid);
        data.append("number", +1);
        axios.post("/ppi/index.php/api/cart/alter", data).then(res => {
          if (res.data.code == 1) {
            this.getList();
          } else {
            Toast({
              message: res.data.message,
              position: "bottom"
            });
          }
        });
      } else {
        //  数量减少
        if (num <= 1) {
          return;
        } else {
          let data = new FormData();
          data.append("token", this.token);
          data.append("gid", gid);
          data.append("number", -1);
          axios.post("/ppi/index.php/api/cart/alter", data).then(res => {
            this.getList();
          });
        }
      }
    },
    // 结算
    buy() {
      console.log(this.goods);
      this.$router.push({
        name: "confirmOrder",
        query: {
          types: "cart",
          result: this.result
        }
      });
    },
    delGoods() {
      // 删除商品
      //  /index.php/user/cart/del     POST
      if (this.selectLen == 0) {
      } else {
        this.result.map(item => {
          let data = new FormData();
          data.append("gid", item); // 填写参数
          data.append("token", this.token); // 填写参数
          axios.post("/ppi/index.php/api/cart/del", data).then(res => {
            if (res.data.code == 1) {
              this.result = [];
              this.getList(); // 刷新列表
              Toast({
                message: "成功删除该商品",
                position: "bottom"
              });
            }
          });
        });
      }
      this.show = false;
    }
  },
  watch: {
    result() {
      //  判断是否全选
      if (this.goods.length == this.result.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  },
  computed: {
    selectLen() {
      //动态计算点击个数
      let len = 0;
      this.goods.map(item => {
        this.result.map(key => {
          if (item.id == key) {
            len++;
          }
        });
      });
      return len;
    }
  },
  components: {
    Tabbar,
    Toast,
    List,
    PullRefresh,
    Checkbox,
    CheckboxGroup,
    Overlay
  }
};
</script>

<style scoped>
.cart {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  overflow-y: auto;
  overflow-x: hidden;
  color: #1c0000;
  padding-bottom: 88px;
}

/* 标签栏 */
.cart .tab {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0 2px 3px rgba(190, 190, 190, 0.1);
}

.cart .tab > i {
  color: #9a9a9a;
  font-style: normal;
  font-size: 15px;
}

.cart .tab > i:nth-child(1) {
  font-size: 15px;
  color: #9a9a9a;
}

.cart .tab > p {
  font-size: 16px;
  font-weight: 500;
}

/* 购物车列表 */
.goods {
  height: 100px;
  display: flex;
  flex-direction: row;
  padding: 15px 8px;
  background: #fff;
  margin-bottom: 2px;
}

.goods img {
  width: 70px;
  height: 70px;
  background: #222;
  display: block;
  margin: 0 8px;
  border-radius: 4px;
}

.goods .goodsRight {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods .goodsRight > p {
  font-size: 13px;
  color: #1c0000;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

input:disabled {
  background: #fff;
}

.goodsRight > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8px;
}

.goodsRight > div > p {
  font-size: 14px;
  color: #dd0812;
}

.goodsRight > div > p i {
  font-size: 15px;
  font-style: normal;
}

.amount {
  width: 93px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #c9c9c9;
}

.amount i {
  font-style: normal;
  width: 28px;
  height: 25px;
  line-height: 25px;
  font-size: 18px;
  text-align: center;
  color: #c9c9c9;
}

.amount i:nth-of-type(1) {
  border-right: 1px solid #c9c9c9;
}

.amount i:nth-of-type(2) {
  border-left: 1px solid #c9c9c9;
}

.amount input {
  width: 37px;
  height: 15px;
  border: none;
  outline: none;
  font-size: 13px;
  color: #130000;
  text-align: center;
}

/* 购物车为空时 */
.emptyCart {
  padding-top: 50px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.emptyCart img {
  width: 94px;
}

.emptyCart p {
  color: #c3c3c3;
  font-size: 13px;
  margin-top: 15px;
}

.emptyCart span {
  color: #74181b;
}

/* 推荐商品 */
.recommendGoods {
  background: #fff;
  margin-top: 15px;
}

.recommendGoods h1 {
  color: #1c0000;
  font-size: 14px;
  text-align: center;
  font-weight: normal;
  padding: 15px 0;
}

.recommend {
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recommend > div {
  padding-bottom: 13px;
  width: 175px;
  overflow: hidden;
  margin-bottom: 10px;
}

.recommend > div img {
  width: 175px;
  display: block;
  height: 175px;
  background: #444;
  border-radius: 4px;
  border: none;
}

.recommend > div p {
  font-size: 13px;
  color: #1c0000;
  margin: 6px 8px 0;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend > div span {
  font-size: 13px;
  display: block;
  margin: 5px 8px 0;
  color: #dd0812;
}

.recommend > div span i {
  font-style: normal;
  font-size: 12px;
}

/* 全选框、合计框、结算框 */
.standBottom,
.delBottom {
  height: 49px;
  width: 100%;
  position: fixed;
  bottom: 49px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
}

.selectAll {
  font-size: 13px;
  color: #1c0000;
  margin-left: 8px;
}

.paying {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: 8px;
}

.paying p {
  font-size: 13px;
  color: #1c0000;
  display: inline-block;
  text-align: right;
}

.paying p span {
  font-size: 14px;
  color: #dd0812;
}

.paying p span i {
  font-size: 13px;
  color: #dd0812;
  font-style: normal;
}

.paying > span {
  color: #808080;
  font-size: 13px;
  text-align: right;
}

.resBtn,
.delBtn {
  width: 90px;
  background: #dd0812;
  font-size: 13px;
  color: #fff;
  text-align: center;
  height: 100%;
  line-height: 49px;
}

.delBtn {
  margin-left: auto;
}

/* 删除弹窗 */
.delPopup {
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  margin: auto;
  background: #fff;
  z-index: 11;
  margin: 0 0.6913rem;
  border-radius: 4px;
}

.delPopup > p {
  font-size: 13px;
  color: #1c0000;
  margin: 0.532rem 0;
  text-align: center;
}

.delPopup > div {
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e9e9e9;
}

.delPopup > div > p {
  flex: 1;
  height: 100%;
  line-height: 46px;
  text-align: center;
  font-size: 13px;

  /* item-align:center; */
}

.delPopup > div > p:nth-of-type(2) {
  color: #74181b;
  border-left: 1px solid #e9e9e9;
}
</style>
