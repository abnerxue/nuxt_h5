<template>
  <div class="directBuy">
    <!-- 分类栏 -->
    <div class="filterBar filterBar1">
      <p :class="p==0?'cc':''" @click="all(1);list=[]">全部</p>
      <p
        v-for="(item,i) in goodsCategory.first"
        :key="i"
        :class="p==item.id?'cc':''"
        @click="p=item.id;all(2);list=[]"
      >{{item.name}}</p>
    </div>
    <!-- 筛选栏 -->
    <div class="tabber1">
      <p :class="status1==1?'screen':''" @click="selSynthesize()">综合</p>
      <p :class="status1==2?'screen':''" @click="selPrice()">
        价格
        <i v-if="price" class="iconfont icon-up"></i>
        <i v-if="!price" class="iconfont icon-down"></i>
      </p>
      <p :class="status1==3?'screen':''" @click="screen()">
        筛选
        <i class="iconfont icon-shaixuanxuanzhong"></i>
      </p>
    </div>
    <!-- 筛选具体栏 -->
    <div class="filterBar filterBar2" v-if="category.click">
      <p v-if="category.cScreenName">{{category.cScreenName}}</p>
      <p v-if="category.minimum && category.highest">{{category.minimum+'-'+category.highest}}</p>
    </div>
    <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-if="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div :class="category.click?'mt1 list':'mt2 list'">
          <div
            v-for="(goods,index) in list"
            :key="index"
            @click="$router.push({name:'detail',query:{gid:goods.gid}})"
          >
            <img :src="goods.thumb" alt />
            <p>{{goods.title}}</p>
            <span>
              <i>¥</i>
              {{goods.price}}
            </span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="noGoods" v-else>
      <img src="../static/img/searchEmpty.png" alt />
      <p>没有找到相关的商品</p>
    </div>
    <van-overlay :show="mask" @click="mask = false;allCategory=0;" />
    <div v-if="allCategory==1" class="allCategory">
      <div v-for="(item,i) in clist" :key="i" :style="p==item.id?'':p==0?'':'display:none;'">
        <div class="categoryTitle">{{item.name}}</div>
        <div class="titleList">
          <p
            v-for="(val,k) in listTag[item.id]"
            @click="category.cScreen = val.id;name = val.name"
            :key="k"
            :class="category.cScreen == val.id?'redbg':''"
          >{{val.name}}</p>
        </div>
      </div>
      <div class="price_section">
        <p>价格区间</p>
        <p>
          <input type="number" placeholder="最低价" v-model="category.minimum" />
          <span></span>
          <input type="number" placeholder="最高价" v-model="category.highest" />
        </p>
      </div>
      <div class="submit">
        <div @click="reset();list=[]">重置</div>
        <div @click="submit();list=[]">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, PullRefresh, Overlay, Toast } from "vant";
export default {
  data() {
    return {
      status1: 1, // 筛选条件
      price: true, // 价格开关
      goodsCategory: {}, // 总类
      isDownLoading: false, //下拉刷新的开关
      loading: false, //上拉加载开关
      finished: false, // 没有更多开关
      allCategory: 0, //弹窗开关，2为总类目，1为总类目下的小分类
      select: {
        categoryId: null,
        allId: null
      }, //  用户选择的类目
      p: 0,
      mask: false, //遮罩层开关
      category: {
        //筛选弹窗
        cScreen: null, // 类目id
        cScreenName: null, //类目名字
        highest: "", // 最高值
        minimum: "", //最低值
        click: false //筛选弹窗开关
      },
      titlelist: [], //  大标题
      listTag: [], //  小标题
      list: [], //商品列表
      price_id: 2, //价格排序
      totalPage: 3 // 总页面
    };
  },
  mounted() {
    this.goodsCategory = JSON.parse(sessionStorage.getItem("goodsCategory"));
    sessionStorage.setItem(
      "selectCategory",
      JSON.stringify({ categoryId: null, allId: null })
    );
    this.clist = this.goodsCategory.first;
    this.listTag = this.goodsCategory.second;
    this.getData(1, 0);
  },
  methods: {
    // 综合
    selSynthesize() {
      this.status1 = 1;
      this.good = ""; //清空之前的数据
      this.price_id = 2; //清空价格筛选
      this.list = [];  //清空列表
      this.getData(1, this.p, 0, 0);
    },
    selPrice() {
      this.finished = false;
      // 筛选价格
      if (this.status1 != 2) {
        this.status1 = 2;
      } else {
        this.price = !this.price;
      }
      this.list = [];//清空列表
      if (this.price) {
        this.getData(1, this.select.categoryId?this.select.categoryId:this.p, 1, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
      } else {
        this.getData(1, this.select.categoryId?this.select.categoryId:this.p, 2, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
      }
    },
    screen() {
      // 筛选
      this.status1 = 3;
      this.mask = true;
      this.allCategory = 1;
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      //刷新
      this.list = [];
      if (this.status1 == 2) {
        if (this.price) {
          this.getData(1, this.select.categoryId?this.select.categoryId:this.p, 1, null);
        } else {
          this.getData(1, this.select.categoryId?this.select.categoryId:this.p, 2, null);
        }
      } else {
        this.getData(1, this.select.categoryId?this.select.categoryId:this.p);
      }
      this.isDownLoading = false; //关闭刷新
    },
    getData(page, gid, sort, price) {
      this.totalPage = 2;
      this.select = JSON.parse(sessionStorage.getItem("selectCategory")); //获得保存的数据
      this.finished = false;
      let id = gid ? gid : this.select.categoryId; //判断类目id
      let s = sort ? sort : "0";
      //   判断是否有价格区间，如果有最高价和最低价则就合成价格区间
      let priceRange = price
        ? price
        : this.category.minimum && this.category.highest
        ? this.category.minimum + "_" + this.category.highest
        : "";
      this.clist = this.goodsCategory.first;
      this.listTag = this.goodsCategory.second;
      this.page = page ? page : 1; //判断分页
      axios
        .get(
          "/ppi/index.php/api/goods/get_list?categoryId=" +
            id +
            "&span=10&page=" +
            this.page +
            "&sort=" +
            s +
            "&priceRange=" +
            priceRange
        )
        .then(res => {
          //如果页数为1就覆盖商品列表，否则就在商品列表后面添加
          if (this.page == 1) {
            this.list = res.data.list;
          } else {
            res.data.list.map((item, i) => {
              this.list.push(item);
            });
          }
          this.loading = false; //关闭加载
          //取出页数
          this.totalPage = res.data.totalPage;
        });
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = false;
      this.finished = false;
      // 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
      if (this.status1 == 2 && this.totalPage > this.page) {
        this.loading = true;
        if (this.price) {
          this.getData(++this.page, this.select.categoryId?this.select.categoryId:this.p, 1, null);
        } else {
          this.getData(++this.page, this.select.categoryId?this.select.categoryId:this.p, 2, null);
        }
      } else if (this.totalPage > this.page) {
        this.loading = true;
        this.getData(++this.page, this.select.categoryId?this.select.categoryId:this.p);
      } else if (this.totalPage <= this.page) {
        this.finished = true;
      }
    },
    submit() {
      //筛选按钮的确定
      if (
        this.category.cScreen != null &&
        !(this.category.highest || this.category.minimum)
      ) {
        // 判断只有分类，没有最高值、最低值
        this.category.cScreenName = this.name;
        this.category.click = true;
        let selectCategory = {
          categoryId: this.category.cScreen,
          allId: null
        };
        sessionStorage.setItem(
          "selectCategory",
          JSON.stringify(selectCategory)
        );
        //判断筛选是否为空
        this.getData(1, this.category.cScreen);
        this.mask = false;
        this.allCategory = 0;
      } else if (
        this.category.cScreen &&
        this.category.highest &&
        this.category.minimum
      ) {
        // 判断存在分类、最高值、最低值
        if (Number(this.category.minimum) >= Number(this.category.highest)) {
          Toast({
            message: "最高价不能小于等于最低值",
            position: "bottom"
          });
        } else {
          this.category.cScreenName = this.name;
          this.category.click = true;
          let selectCategory = {
            categoryId: this.category.cScreen,
            allId: this.select.allId
          };
          sessionStorage.setItem(
            "selectCategory",
            JSON.stringify(selectCategory)
          );
          let price = this.category.minimum + "_" + this.category.highest;
          this.getData(1, this.category.cScreen, null, price);
          this.mask = false;
          this.allCategory = 0;
        }
      } else if (
        this.category.highest &&
        this.category.minimum &&
        !this.category.cScreen
      ) {
        // 判断有最高值、最低值，没有分类
        if (Number(this.category.minimum) >= Number(this.category.highest)) {
          Toast({
            message: "最高价不能小于等于最低值",
            position: "bottom"
          });
        } else {
          this.category.click = true;
          let price = this.category.minimum + "_" + this.category.highest;
          //   this.getData(1, null, null, price);
          this.mask = false;
          this.allCategory = 0;
        }
      }
      if (!this.category.minimum && this.category.highest) {
        // 判断有最高值，没有最低值
        Toast({
          message: "请输入最低价",
          position: "bottom"
        });
      } else if (this.category.minimum && !this.category.highest) {
        // 判断有最低值，没有最高值
        Toast({
          message: "请输入最高价",
          position: "bottom"
        });
      }
    },
    reset() {
      this.allCategory = 0;
      this.mask = false;
      this.category = {
        cScreen: null,
        cScreenName: null,
        highest: null,
        minimum: null,
        click: false
      };
      sessionStorage.setItem(
        "selectCategory",
        JSON.stringify({ categoryId: null, allId: null })
      );
      this.getData(1, this.p);
    },
    // 全部
    all(a) {
      this.status1 = 1;
      if (a == 1) {
        this.p = 0;
      }
      sessionStorage.setItem(
        "selectCategory",
        JSON.stringify({ categoryId: null, allId: null })
      );
      this.getData(1, this.p);
      this.category = {
        cScreen: null,
        cScreenName: null,
        highest: null,
        minimum: null,
        click: false
      };
    }
  },
  components: {
    List,
    PullRefresh,
    Overlay,
    Toast
  }
};
</script>

<style scoped>
.directBuy {
  overflow: hidden;
}

/* 筛选条 */
.filterBar {
  height: 44px;
  background: #fff;
  padding: 0 14px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
  width: 100%;
}

.filterBar1 {
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 11;
  box-shadow: 0 2px 2px rgba(217, 217, 217, 0.13);
}

.filterBar2 {
  position: fixed;
  top: 118px;
  left: 0;
  z-index: 10;
}

.filterBar p {
  padding: 5px 16px;
  background: #f5f5f5;
  color: #1c0000;
  font-size: 13px;
  border-radius: 15px;
  margin-right: 12px;
  display: inline-block;
}

.filterBar p:last-child {
  margin-right: 0;
}

.filterBar .cc {
  background: #e4d1d2;
  color: #74181b;
}

/* 选项卡 */
.tabber1 {
  background: #fff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #9a9a9a;
  position: fixed;
  top: 88px;
  left: 0;
  z-index: 10;
}

.tabber1 > p {
  flex: 1;
  text-align: center;
}

.tabber1 .screen {
  color: #74181b;
}

.tabber1 .screen i {
  color: #74181b;
}

.tabber1 p > i {
  font-size: 9px;
  margin-left: 2px;
  color: #b2b2b2;
}

.tabber1 > p {
  height: 100%;
}

/* 商品列表 */
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px;
}

.list > div {
  width: 175px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
}

.list > div img {
  width: 175px;
  height: 175px;
  display: block;
  border-radius: 4px 4px 0 0;
}

.list > div > p {
  font-size: 13px;
  color: #1c0000;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 6px;
  padding: 0 8px;
}

.list > div > span {
  font-size: 16px;
  padding: 0 8px;
  color: #dd0812;
  display: block;
  margin-bottom: 12px;
}

.list > div > span i {
  font-style: normal;
  font-size: 13px;
}

.mt1 {
  padding-top: 124px;
}
.mt2 {
  padding-top: 80px;
}
/* 筛选为空 */
.noGoods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
  background: #f5f5f5;
  margin-top: 162px;
}

.noGoods img {
  width: 150px;
}

.noGoods p {
  font-size: 12px;
  color: #c3c3c3;
  margin-top: 8px;
}

/* 筛选框 */
.allCategory {
  position: fixed;
  top: 0;
  right: -86%;
  width: 86%;
  height: 100%;
  background: #fff;
  z-index: 12;
  padding: 30px 12px 0;
  -webkit-animation: slide 0.5s forwards;
  animation: slide 0.5s forwards;
  overflow-y: auto;
}

.categoryTitle {
  color: #1c0000;
  font-size: 14px;
  margin-bottom: 15px;
}

.allCategory > div {
  overflow: hidden;
  margin-bottom: 15px;
}

.allCategory div p:nth-of-type(3n) {
  margin-right: 0;
}

.titleList {
  overflow: hidden;
}

.titleList p {
  float: left;
  width: 94px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 13px;
  text-align: center;
  border-radius: 15px;
  color: #1c0000;
  background: #f5f5f5;
  font-size: 13px;
  margin-right: 8px;
}

.allCategory div:nth-of-type(2) input {
  width: 138px;
  height: 30px;
  line-height: 30px;
  float: left;
  background: #f5f5f5;
  border: 1px solid #c3c3c3;
  color: #9a9a9a;
  opacity: 1;
  box-sizing: border-box;
  font-size: 13px;
  text-align: center;
  border-radius: 30px;
}

.allCategory div > .redbg {
  background: #e4d1d2;
}

.allCategory .submit {
  position: fixed;
  bottom: -3px;
  right: 0;
  width: 86%;
  height: 44px;
  line-height: 44px;
  margin-bottom: 0;
  -webkit-animation: slide 0.5s forwards;
  animation: slide 0.5s forwards;
}

@-webkit-keyframes slide {
  100% {
    right: 0;
  }
}

@keyframes slide {
  100% {
    right: 0;
  }
}

.allCategory div:nth-of-type(2) input {
  width: 138px;
  height: 30px;
  line-height: 30px;
  float: left;
  background: #f5f5f5;
  border: 1px solid #c3c3c3;
  color: #9a9a9a;
  opacity: 1;
  box-sizing: border-box;
  font-size: 13px;
  text-align: center;
  border-radius: 30px;
}

.price_section {
  padding-bottom: 44px;
}

.price_section p {
  color: #1c0000;
  font-size: 14px;
  margin-bottom: 15px;
}

.price_section > p {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.price_section input {
  width: 138px;
  height: 30px;
  line-height: 30px;
  float: left;
  background: #f5f5f5;
  border: 1px solid #c3c3c3;
  color: #9a9a9a;
  opacity: 1;
  box-sizing: border-box;
  font-size: 13px;
  text-align: center;
  border-radius: 0.8rem;
}

.price_section > p:nth-of-type(2) span {
  width: 12px;
  height: 2px;
  background: #9a9a9a;
  display: block;
}

.submit > div {
  width: 50%;
  float: left;
  text-align: center;
  font-size: 16px;
}

.submit > div:nth-of-type(1) {
  color: #808080;
  background: #e9e9e9;
}

.submit > div:nth-of-type(2) {
  background: #74181b;
  color: #ffffff;
}

/* 遮罩层 */
.van-overlay {
  z-index: 11 !important;
}
</style>
