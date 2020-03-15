<template>
  <div class="classifyList">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p @click="mask=true;allCategory=2;">
        {{title}}
        <i class="iconfont icon-sanjiao"></i>
      </p>
      <i class="iconfont icon-wenhao" style="visibility:hidden;"></i>
    </div>
    <!-- 竞价、直购选择 -->
    <div class="tabber">
      <p :class="status==1?'redStatus':''" @click="list=[];getData1()">竞价</p>
      <p :class="status==2?'redStatus':''" @click="list=[];status = 2;status1=1;getData()">直购</p>
    </div>
    <div class="tabber1" v-if="status==2">
      <p :class="status1==1?'screen':''" @click="selSynthesize()">综合</p>
      <p :class="status1==2?'screen':''" @click="selPrice()">
        {{status==1?'即将截拍':'价格'}}
        <i v-if="price&&status==2" class="iconfont icon-up"></i>
        <i v-if="!price&&status==2" class="iconfont icon-down"></i>
      </p>
      <p :class="status1==3?'screen':''" @click="screen()">
        {{status==1?'最新上拍':'筛选'}}
        <i v-if="status==2" class="iconfont icon-shaixuanxuanzhong"></i>
      </p>
    </div>
    <van-pull-refresh
      v-model="isDownLoading"
      @refresh="onDownRefresh"
      v-if="list&&list.length!=0"
      :class="status==2?'top':'top1'"
    >
      <div class="filterBar" v-if="category.click && status==2">
        <p v-if="category.cScreenName">{{category.cScreenName}}</p>
        <p v-if="category.minimum && category.highest">{{category.minimum+'-'+category.highest}}</p>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list">
          <div
            class="list_one"
            v-for="(item,i) in list"
            :key="i"
            @click="$router.push({name:'detail',query:{gid:item.gid}})"
          >
            <img :src="item.thumb" alt />
            <div>
              <p>{{item.title}}</p>
              <p class="red" v-if="status==1 && item.currentPrice!=0">
                <i>当前¥</i>
                {{item.currentPrice}}
              </p>
              <p class="red" v-if="status==1 && item.currentPrice==0">
                <i>¥</i>
                {{item.startingPrice}}
                <i>元起拍</i>
              </p>
              <p class="red" v-if="status==2">
                <i>¥</i>
                {{item.price}}
              </p>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="noGoods" v-else>
      <img src="../../static/img/searchEmpty.png" alt />
      <p>没有找到相关的商品</p>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="mask" @click="mask = false;allCategory=0;" />
    <!-- 筛选 -->
    <div v-if="allCategory==1" class="allCategory">
      <div>
        <p>全部类目</p>
        <span
          :class="category.cScreen == item.id?'redbg':''"
          @click="category.cScreen = item.id;name = item.name"
          v-for="(item,i) in clist"
          :key="i"
        >{{item.name}}</span>
      </div>
      <div>
        <p>价格区间</p>
        <p>
          <input type="number" placeholder="最低价" v-model="category.minimum" />
          <span></span>
          <input type="number" placeholder="最高价" v-model="category.highest" />
        </p>
      </div>
      <div class="submit">
        <div @click="reset()">重置</div>
        <div @click="submit()">确定</div>
      </div>
    </div>
    <!-- 大分类标题 -->
    <div v-if="allCategory==2" class="allCategory1">
      <p
        v-for="(item,i) in goodsCategory.first"
        :key="i"
        :class="select.allId==item.id?'redAll':''"
        @click="reset();genreHide(item.name,item.id);"
      >{{item.name}}</p>
      <img src="../../static/img/triangle.png" alt />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { List, PullRefresh, Overlay, Toast } from "vant";
export default {
  data() {
    return {
      status: 2, //竞价、直购区分
      status1: 1, //竞价、直购底下筛选
      loading: false, //上拉加载开关
      finished: false, //显示加载中还是没有更多
      isDownLoading: false, //下拉刷新的开关
      page: 1, //当前页数
      price: true, //价格筛选
      list: [], //商品列表
      totalPage: 2, //总页数
      mask: false, //遮罩层开关
      category: {
        //筛选弹窗
        cScreen: null, // 类目id
        cScreenName: null, //类目名字
        highest: "", // 最高值
        minimum: "", //最低值
        click: false //筛选弹窗开关
      },
      clist: null, //全部类目
      allCategory: 0, //弹窗开关，2为总类目，1为总类目下的小分类
      goodsCategory: {}, //储存的分类信息
      title: null, // 标题名
      select: {}, //用户选择的类目
      name: "" //暂存
    };
  },
  mounted() {
    //session中取出存储的数据
    this.goodsCategory = JSON.parse(sessionStorage.getItem("goodsCategory"));
    //请求接口，加载数据
    this.getData();
  },
  methods: {
    selSynthesize() {
      this.status1 = 1;
      if (this.status == 1) {
      } else {
        this.getData(1, null, 0, 0);
      }
    },
    genreHide(name, id) {
      this.finished = false;
      this.totalPage = 2;
      this.list = [];
      //点击某个总分类的方法
      //清空状态，关闭弹窗
      let selectCategory = { categoryId: id, allId: id };
      sessionStorage.setItem("selectCategory", JSON.stringify(selectCategory));
      this.mask = false;
      this.allCategory = 0;
      this.title = name;
      this.select.allId = id;
      this.status1 = 1;
      this.status = 2;
      //请求接口，加载数据
      this.getData(1, id);
    },
    getData1(gid) {
      // 竞价列表接口
      this.status = 1;
      this.status1 = 1;
      let id = gid
        ? gid
        : this.select.categoryId
        ? this.select.categoryId
        : this.select.allId; //判断类目id
      axios
        .get(
          "/ppi/index.php/api/auction/goods_list?span=10&categoryId=" +
            id +
            "&page=" +
            this.page
        )
        .then(res => {
          //如果页数为1就覆盖商品列表，否则就在商品列表后面添加
          if (this.page == 1) {
            this.list = res.data.list;
          } else {
            if (res.data.list) {
              res.data.list.map((item, i) => {
                this.list.push(item);
              });
            }
            this.loading = false; //关闭加载
          }
          //取出页数
          this.totalPage = res.data.totalPage;
        });
    },
    getData(page, gid, sort, price) {
      this.finished = false;
      //请求接口
      this.select = JSON.parse(sessionStorage.getItem("selectCategory")); //获得保存的数据
      let id = gid
        ? gid
        : this.select.categoryId
        ? this.select.categoryId
        : this.select.allId; //判断类目id
      let s = sort ? sort : "0";
      let priceRange;
      if(this.category.minimum&&this.category.highest){
        priceRange = this.category.minimum + "_" + this.category.highest;
      } else {
        priceRange = price ? price : "";
      }
      for (var i in this.goodsCategory.first) {
        //筛选出总类目
        if (this.select.allId == this.goodsCategory.first[i].id) {
          this.title = this.goodsCategory.first[i].name;
          Object.keys(this.goodsCategory.second).forEach(key => {
            if (key == this.goodsCategory.first[i].id) {
              this.clist = this.goodsCategory.second[key];
            }
          });
        }
      }
      Object.keys(this.clist).map(key => {
        //筛选出总类目下的小分类
        if (id == this.clist[key].id) {
          this.category.cScreenName = this.clist[key].name;
          this.category.cScreen = this.clist[key].id;
          this.status = 2;
          this.category.click = true;
        }
      });
      this.page = page ? page : 1; //判断分页
      // 直购列表接口
      axios
        .get(
          "/api/index.php/api/goods/get?categoryId=" +
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
            if (res.data.list) {
              res.data.list.map((item, i) => {
                this.list.push(item);
              });
            }
            this.loading = false; //关闭加载
          }
          //取出页数
          this.totalPage = res.data.totalPage;
        });
    },
    onDownRefresh() {
      //刷新
      this.finished = false;
      this.order_list = [];
      //刷新
      if (this.status == 2 && this.status1 == 2) {
        if (this.price) {
          this.getData(1, null, 1, null);
        } else {
          this.getData(1, null, 2, null);
        }
      } else {
        this.getData(1);
      }
      this.isDownLoading = false; //关闭刷新
    },
    onLoad() {
      //加载
      // 加载状态结束
      this.loading = false;
      // 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
      if (this.status == 2 && this.status1 == 2 && this.totalPage > this.page) {
        this.loading = true;
        if (this.price) {
          this.getData(++this.page, null, 1, null);
        } else {
          this.getData(++this.page, null, 2, null);
        }
      } else if (this.totalPage > this.page) {
        this.loading = true;
        this.getData(++this.page, this.select.categoryId);
      } else {
        this.finished = true;
      }
    },
    selPrice() {
      //价格筛选
      this.finished = false;
      if (this.status1 != 2) {
        this.status1 = 2;
      } else {
        this.price = !this.price;
      }
      if (this.price && this.status == 2) {
        this.getData(null, null, 1, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
      } else if (!this.price && this.status == 2) {
        this.getData(null, null, 2, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
      }
    },
    submit() {
      //筛选按钮的确定
      if (
        this.category.cScreen != null &&
        !(this.category.highest || this.category.minimum)
      ) {
        this.category.cScreenName = this.name;
        this.category.click = true;
        //判断筛选是否为空
        let selectCategory = {
          categoryId: this.category.cScreen,
          allId: this.select.allId
        };
        sessionStorage.setItem(
          "selectCategory",
          JSON.stringify(selectCategory)
        );
        this.getData(1, this.category.cScreen);
        this.mask = false;
        this.allCategory = 0;
      } else if (
        this.category.cScreen &&
        this.category.highest &&
        this.category.minimum
      ) {
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
        if (Number(this.category.minimum) >= Number(this.category.highest)) {
          Toast({
            message: "最高价不能小于等于最低值",
            position: "bottom"
          });
        } else {
          this.category.click = true;
          let price = this.category.minimum + "_" + this.category.highest;
          this.getData(1, null, null, price);
          this.mask = false;
          this.allCategory = 0;
        }
      }
      if (!this.category.minimum && this.category.highest) {
        Toast({
          message: "请输入最低价",
          position: "bottom"
        });
      } else if (this.category.minimum && !this.category.highest) {
        Toast({
          message: "请输入最高价",
          position: "bottom"
        });
      }
    },
    reset() {  // 重置
      this.category = {
        cScreen: null,
        cScreenName: null,
        highest: null,
        minimum: null,
        click: false
      };
    },
    screen() {
      this.status1 = 3;
      if (this.status != 1) {
        this.mask = true;
        this.allCategory = 1;
      }
    }
  },
  watch: {},
  components: {
    List,
    PullRefresh,
    Overlay,
    Toast
  }
};
</script>

<style scoped>
.classifyList {
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
.classifyList .tab {
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
.classifyList .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.classifyList .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}
.classifyList .tab > p i {
  font-size: 0.266rem;
  margin-left: 0.1rem;
  color: #4a4a4a;
}
/* 选项卡 */
.tabber,
.tabber1 {
  background: #fff;
  height: 35px;
  line-height: 35px;
  font-size: 0.3724rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #9a9a9a;
  z-index: 3;
}
.tabber {
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
}
.tabber1 {
  height: 0.798rem;
  line-height: 0.798rem;
  position: fixed;
  top: 79px;
  left: 0;
  width: 100%;
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
  font-size: 0.2394rem;
  margin-left: 0.06rem;
  color: #b2b2b2;
}
.tabber > p,
.tabber1 > p {
  height: 100%;
}
.redStatus {
  border-bottom: 0.0266rem solid #74181b;
  color: #74181b;
}

.top{
  margin-top: 64px;
}
.top1{
  margin-top: 45px;
}
/* 筛选条 */
.filterBar {
  height: 44px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0.3724rem;
  width: 100%;
}
.filterBar p {
  padding: 0.133rem 0.4256rem;
  background: #f5f5f5;
  color: #1c0000;
  font-size: 0.3458rem;
  border-radius: 0.399rem;
  margin-right: 0.3192rem;
}
/* 加载更多 */

.list {
  min-height: 4rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 0.2128rem;
}
.list_one {
  background: #fff;
  border-radius: 0.1064rem;
  margin-top: 0.2128rem;
}
.list_one img {
  width: 4.6816rem;
  height: 4.6816rem;
  display: block;
  background: #fff;
  border-radius: 0.1064rem 0.1064rem 0 0;
}
.list_one div {
  padding: 0.1596rem 0.2128rem 0.399rem;
  font-size: 0.3458rem;
}
.list_one div p:nth-of-type(1) {
  width: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_one div .red {
  color: #dd0812;
  margin-top: 0.2rem;
}
.list_one div .red i {
  font-style: normal;
}
/* 遮罩层 */
.van-overlay {
  z-index: 11 !important;
}
.allCategory {
  position: fixed;
  top: 0;
  right: -86%;
  width: 86%;
  height: 100%;
  background: #fff;
  z-index: 12;
  padding: 0.798rem 0.3192rem 0;
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

.allCategory div {
  overflow: hidden;
}
.allCategory div p {
  color: #1c0000;
  font-size: 0.3724rem;
  margin-bottom: 0.399rem;
}
.allCategory div > span {
  float: left;
  width: 2.5004rem;
  height: 0.798rem;
  line-height: 0.798rem;
  margin-bottom: 0.3458rem;
  text-align: center;
  border-radius: 0.399rem;
  color: #1c0000;
  background: #f5f5f5;
  font-size: 0.3458rem;
  margin-right: 0.2128rem;
}

.allCategory div span:nth-of-type(3n) {
  margin-right: 0;
}

.allCategory div:nth-of-type(2) input {
  width: 3.6708rem;
  height: 0.798rem;
  line-height: 0.798rem;
  float: left;
  background: #f5f5f5;
  border: 1px solid #c3c3c3;
  color: #9a9a9a;
  opacity: 1;
  box-sizing: border-box;
  font-size: 0.3458rem;
  text-align: center;
  border-radius: 30px;
}
.allCategory div:nth-of-type(2) > p:nth-of-type(2) {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.allCategory div:nth-of-type(2) > p:nth-of-type(2) span {
  width: 0.3192rem;
  height: 0.032rem;
  background: #9a9a9a;
  display: block;
}
.allCategory div > .redbg {
  background: #e4d1d2;
}

.submit {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1.1704rem;
  line-height: 1.1704rem;
}
.submit > div {
  width: 50%;
  float: left;
  text-align: center;
  font-size: 0.4256rem;
}
.submit > div:nth-of-type(1) {
  color: #808080;
  background: #e9e9e9;
}
.submit > div:nth-of-type(2) {
  background: #74181b;
  color: #ffffff;
}
.allCategory1 {
  width: 90%;
  position: fixed;
  top: 1.064rem;
  left: 5%;
  background: #fff;
  z-index: 11;
  border-radius: 0.1064rem;
  padding: 0.399rem 0.399rem 0.0798rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.allCategory1 p {
  display: block;
  width: 2.0615rem;
  height: 0.6916rem;
  line-height: 0.6916rem;
  border: 0.032rem solid #e9e9e9;
  color: #4a4a4a;
  font-size: 0.3458rem;
  text-align: center;
  border-radius: 0.0532rem;
  margin-right: 1rem;
  margin-bottom: 0.3192rem;
}
.allCategory1 p:nth-of-type(3n) {
  margin-right: 0;
}
.allCategory1 img {
  display: block;
  position: absolute;
  top: -0.1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0.266rem;
  left: 0;
  z-index: 11;
}
.allCategory1 .redAll {
  border: 0.032rem solid #74181b;
  color: #74181b;
}
/* 筛选为空 */
.noGoods {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background: #f5f5f5;
}
.noGoods img {
  width: 3.99rem;
}
.noGoods p {
  font-size: 0.3192rem;
  color: #c3c3c3;
  margin-top: 0.2128rem;
}
</style>