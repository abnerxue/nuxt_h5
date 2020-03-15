<template>
  <div class="goodsDetial" id="goodsDetial">
    <van-swipe class="goodsBanner" :show-indicators="false">
      <van-swipe-item v-for="(item,i) in goods.video" :key="100+i">
        <video controls :src="item" :poster="goods.thumb"></video>
      </van-swipe-item>
      <van-swipe-item v-for="(item,i) in imgs" :key="i">
        <div>
          <img :src="item" alt />
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="back" @click="$router.go(-1)">
      <i class="iconfont icon-left"></i>
    </div>
    <div class="goodsInfo">
      <p>
        <span>¥</span>
        {{goods.price}}
      </p>
      <p>{{goods.title}}</p>
    </div>
    <div class="checked">
      <p>
        <i class="iconfont icon-dunpai"></i>国家权威检测
      </p>
      <p>
        <i class="iconfont icon-dunpai"></i>假一赔百万
      </p>
      <p>
        <i class="iconfont icon-dunpai"></i>7天退换
      </p>
      <p>
        <i class="iconfont icon-dunpai"></i>满100包邮
      </p>
    </div>
    <!-- 评价 -->
    <div class="appraise" v-if="commentlist">
      <p>
        <span>评价</span>
        <span @click="$router.push({name:'detail-comment',query:{gid:gid}})">
          更多
          <i class="iconfont icon-right"></i>
        </span>
      </p>
      <div class="appraiseList">
        <div class="app" v-for="(commentlist,i) in commentlist" :key="i">
          <div>
            <img :src="commentlist.avatar" alt />
            <p>{{ commentlist.userName }}</p>
            <p>
              <!-- <i class="iconfont icon-zan"></i> -->
            </p>
          </div>
          <p>{{ commentlist.postTime }}</p>
          <p>{{ commentlist.content }}</p>
        </div>
      </div>
    </div>
    <div class="tab" id="tab">
      <p :class="tab==1?'tabActive':''" @click="tabChange(1)">图文详情</p>
      <p :class="tab==2?'tabActive':''" @click="tabChange(2)">识玉轩</p>
      <p :class="tab==3?'tabActive':''" @click="tabChange(3)">我们的保障</p>
    </div>
    <div class="tab tabb" v-if="tabb">
      <p :class="tab==1?'tabActive':''" @click="tabChange(1)">图文详情</p>
      <p :class="tab==2?'tabActive':''" @click="tabChange(2)">识玉轩</p>
      <p :class="tab==3?'tabActive':''" @click="tabChange(3)">我们的保障</p>
    </div>
    <!-- 图文详情 -->
    <div v-if="tab==1" class="detail">
      <div class="text" v-if="norms.length!=0">
        <p>
          <span>商品规格</span>
          <span @click="show = true; normsbox = true;">
            更多
            <i class="iconfont icon-right"></i>
          </span>
        </p>
        <div class="norms">
          <p v-for="(item,i) in norms" :key="i" :style="i>4?'display:none':''">
            <span>{{item.name}}</span>
            <span>{{item.datail}}</span>
          </p>
        </div>
      </div>
      <div class="img">
        <img v-for="(item,i) in imgs" :key="i" :src="item" alt />
      </div>
    </div>
    <!-- 识玉轩 -->
    <div v-if="tab==2" class="know">
      <div>
        <p>翡翠透明度</p>
        <div>
          <img src="../../static/img/b1.png" alt />
          <div>
            <p>玻璃种</p>
            <span>特征：透明</span>
            <span>肉眼观测：反光观察 / 内部汇聚光较强</span>
            <span>透光观察：多数光线可透过，内部特征清晰可见</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b2.png" alt />
          <div>
            <p>冰玻种</p>
            <span>特征：半透明</span>
            <span>反射观察：内部汇聚光强</span>
            <span>透光观察：大部分光线可透过，内部特征可见</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b3.png" alt />
          <div>
            <p>冰种</p>
            <span>特征：尚透明</span>
            <span>肉眼观测：内部汇聚光弱</span>
            <span>透光观察：部分光线可透过，内部特征尚可见</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b4.png" alt />
          <div>
            <p>糯冰种</p>
            <span>特征：微透明</span>
            <span>肉眼观测：反射观察 / 内部有微量汇聚光</span>
            <span>透光观察：部分光线可透过，内部特征模糊可见</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b5.png" alt />
          <div>
            <p>细糯种</p>
            <span>特征：不透明</span>
            <span>肉眼观测：内部无汇聚光</span>
            <span>透光观察：基本无光线透过， 内部特征不可见</span>
          </div>
        </div>
      </div>
      <div>
        <p>翡翠的质地</p>
        <div>
          <img src="../../static/img/b6.png" alt />
          <div>
            <p>极细/极纯净</p>
            <span>内部构造：矿物颗粒小于0.01mm</span>
            <span>肉眼观测： 内部构造非常紧密细腻，粒度均匀，高倍放大镜下不见颗粒及次生矿物填充痕隙。 外部仅有极不显眼的几处絮状物，不影响整体美观。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b7.png" alt />
          <div>
            <p>细/纯净</p>
            <span>特征：透明</span>
            <span>肉眼观测：反光观察 / 内部汇聚光较强</span>
            <span>透光观察：多数光线可透过，内部特征清晰可见</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b8.png" alt />
          <div>
            <p>较细/较纯净</p>
            <span>内部构造：矿物颗粒小于0.05～0.1.mm</span>
            <span>肉眼观测： 结构致密，粒度尚均匀，高倍放大镜下见少量颗粒及次生矿物填充痕隙。明显的内、外特征，肉眼可见，对整体美观有轻微影响。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b9.png" alt />
          <div>
            <p>粗/尚纯净</p>
            <span>内部构造：矿物颗粒小于0.1～0.5mm</span>
            <span>肉眼观测： 结构不够致密，粒度不均匀。高倍放大镜下见细小矿物填充痕隙， 细微的内、外特征，肉眼可见，对整体美观有些影响。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b10.png" alt />
          <div>
            <p>较粗/不纯净</p>
            <span>内部构造：矿物颗粒大于0.5mm</span>
            <span>肉眼观测： 结构疏松，粒度大小不均。肉眼可见颗粒及次生矿物填充痕隙等， 内、外特征很明显，肉眼可辨，对整体美观有较明显影响。</span>
          </div>
        </div>
      </div>
      <div>
        <p>和田玉分类</p>
        <div>
          <img src="../../static/img/b11.png" alt />
          <div>
            <p>白玉</p>
            <span>颜色洁白，细腻，滋润，微透明，宛如羊脂者称羊脂白玉；不透明，光泽较差者为白玉。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b12.png" alt />
          <div>
            <p>青玉和青白玉</p>
            <span>色呈深灰绿至蓝绿色，不透明；青白玉是青玉与白玉之间的过渡类型，呈灰绿色。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b13.png" alt />
          <div>
            <p>碧玉</p>
            <span>深绿色(菠菜绿色)，质地较粗。碧玉除新疆所产外，我国玉器工艺界把和国外所产的软玉也统称为碧玉。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b14.png" alt />
          <div>
            <p>黑玉</p>
            <span>主要含分散的碳质或石墨而呈灰黑色或灰黑与白色相间的条带。如果完全是黑色的，称墨玉。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b15.png" alt />
          <div>
            <p>黄玉</p>
            <span>是地表水中褐铁矿渗入白玉中造成的，米黄至黄色。</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 我们的保障 -->
    <div v-if="tab==3" class="ensure">
      <div class="ensure1">
        <div>
          <div>
            <p>
              <img src="../../static/img/headstream.png" alt />
              <span>源头直供</span>
            </p>
            <p>01</p>
          </div>
          <p>怀南会致力于打造一家值得信赖的知名企业，我们愿把天然玉石的祥瑞带给每一位消费者。怀南会所有出售的宝贝均来自产业源头一手货源。</p>
        </div>
        <div>
          <div>
            <p>
              <img src="../../static/img/handcarved.png" alt />
              <span>手工雕琢</span>
            </p>
            <p>02</p>
          </div>
          <p>怀南会致力于发掘玉石之大美为目标，以弘扬中华玉石文化为己任，融合古典和现代风，每一件玉石都传递着幸福美满的祝福，是佩戴和收藏的上佳之选。</p>
        </div>
        <div>
          <div>
            <p>
              <img src="../../static/img/saving.png" alt />
              <span>省心省钱</span>
            </p>
            <p>03</p>
          </div>
          <p>怀南会立足玉石源头，恪守“怀七分仁义，存三分名利”的古训，追求长久共赢。通过互联网+珠宝的新零售模式，省去中间环节直接为终端消费者提供优质玉石，大大降低了销售成本，用以回馈消费者，怀南会怀南会将秉承“专业省心超值”一贯经营理念，虔诚为广大玉石爱好者用心服务。</p>
        </div>
        <div>
          <div>
            <p>
              <img src="../../static/img/recheck.png" alt />
              <span>接受正规复检</span>
            </p>
            <p>04</p>
          </div>
          <p>怀南会的玉石100%通过国家权威珠宝检测部门检测。毛料检测-雕刻抛光后的产品把关-摄影中心单品拍照时检测-国家权威珠宝部门检测-物流中心发货前的检查，五大关口层层把守，保证消费者买到心仪的天然玉石，做值得消费者信赖的玉石供应商。</p>
        </div>
        <div>
          <div>
            <p>
              <img src="../../static/img/purchase.png" alt />
              <span>七天无理由退换</span>
            </p>
            <p>05</p>
          </div>
          <p>怀南会致力于打造一家值得 信赖的知名企业，我们愿把天然玉石的祥瑞带给每一位消费者。怀南会所有出售的宝贝均来自产业源头一手货源。</p>
        </div>
      </div>
      <div class="ensure2">
        <div>
          <img src="../../static/img/b17.png" alt />
          <div>
            <p>关于图片</p>
            <span>怀南会的每一张图片都是实物多角度拍摄而成，我们努力将这个差异降到最低,力求还原真实。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b18.png" alt />
          <div>
            <p>关于图片</p>
            <span>怀南会的每一张图片都是实物多角度拍摄而成，我们努力将这个差异降到最低,力求还原真实。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b19.png" alt />
          <div>
            <p>关于图片</p>
            <span>怀南会的每一张图片都是实物多角度拍摄而成，我们努力将这个差异降到最低,力求还原真实。</span>
          </div>
        </div>
        <div>
          <img src="../../static/img/b20.png" alt />
          <div>
            <p>关于图片</p>
            <span>怀南会的每一张图片都是实物多角度拍摄而成，我们努力将这个差异降到最低,力求还原真实。</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 千年古刹 高僧加持 -->
    <div
      class="news"
      v-if="tab==1"
      @click="$router.push({name:'wikipedia-article', query: { id: '2206'}})"
    >
      <p>千年古刹 高僧加持</p>
      <img src="../../static/img/b21.png" alt />
    </div>
    <!-- 怀南会携手中国人保财险 -->
    <div
      class="news"
      v-if="tab==1"
      @click="$router.push({name:'wikipedia-article', query: { id: '2249'}})"
    >
      <p>怀南会携手中国人保财险</p>
      <img src="../../static/img/b22.png" alt />
    </div>
    <!-- 推荐商品 -->
    <div class="goodsbox">
      <p>推荐商品</p>
      <div class="goodslist">
        <div v-for="(item,i) in recommendList" :key="i" @click="goodsChange(item.gid)">
          <img :src="item.thumb" alt />
          <p>{{item.title}}</p>
          <p>
            <span>¥</span>
            {{item.price}}
          </p>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="show" @click="show = false;normsbox = false; buybox = false;" />
    <!-- 商品规格弹窗 -->
    <div v-if="normsbox" class="normsBox">
      <div class="title">
        <i class="iconfont icon-guanbi" style="visibility:hidden;"></i>
        <p>商品规格</p>
        <i class="iconfont icon-guanbi" @click="show=false; normsbox = false;"></i>
      </div>
      <div class="norms">
        <p v-for="(item,i) in norms" :key="i">
          <span>{{item.name}}</span>
          <span>{{item.datail}}</span>
        </p>
      </div>
    </div>
    <!-- 购物弹窗 -->
    <div class="buyBox" v-if="buybox">
      <div class="buyInfo">
        <img :src="goods.thumb" alt />
        <p>
          <span>
            <i>¥</i>
            {{goods.price}}
          </span>
          <span>剩余{{goods.inventory}}个</span>
        </p>
        <i class="iconfont icon-guanbi" @click="show=false; buybox = false;"></i>
      </div>
      <div class="buyNum">
        <p>购买数量</p>
        <div>
          <span @click="num==1?'':--num">－</span>
          <input type="number" v-model="num" />
          <span @click="++num">＋</span>
        </div>
      </div>
      <p class="buy" @click="GoBuy()">立即购买</p>
    </div>
    <!-- 购物底部栏 -->
    <div class="buyTab">
      <a
        :href="'https://chat.sobot.com/chat/h5/v2/index.html?sysnum=e772a07377c14e239174ee712efa2647&params='+JSON.stringify({'商品信息网址':'https://www.huainanhui.com/goods/'+ gid +'.html'})"
      >
        <i class="iconfont icon-kefu"></i>客服
      </a>
      <p>
        <i class="iconfont icon-gouwuche2" @click="$router.push({name:'cart'})"></i>购物车
      </p>
      <div>
        <div class="addCart" @click="addCart()">加入购物车</div>
        <div class="gobuy" @click="buybox=true;show=true;">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swipe, SwipeItem, Overlay, Toast } from "vant";

export default {
  data() {
    return {
      tab: 1, // 选项卡
      imgs: [], // 图片详情
      goods: {}, // 商品详情
      norms: [], // 商品规格
      show: false,
      recommendList: [], // 推荐商品列表
      num: 1, // 购买数量
      buybox: false, //立即购买弹窗开关
      normsbox: false, //商品规格弹窗开关
      gid: null, // 商品gid
      tabb: false, // tab选项卡固定在顶部
      token: "", //  用户token
      cartNum: null, //购物车数量
      commentlist: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    document
      .getElementById("goodsDetial")
      .addEventListener("scroll", this.handleScroll);
    this.gid = this.$route.query.gid;
    this.getData();
    this.recommendGoods();
    this.appraise();
  },
  methods: {
    GoBuy() {
      if (this.token) {
        this.$router.push({
          name: "confirmOrder",
          query: {
            gid: this.gid,
            number: this.num,
            types: "single",
            activity: 0
          }
        });
      } else {
        Toast({
          message: "您未登录，请先登录！",
          position: "bottom"
        });
        this.$router.push({ name: "login" });
      }
    },
    goodsChange(gid) {
      this.$router.push({
        name: "detail",
        query: {
          gid
        }
      });
      setTimeout(() => {
        this.$router.go(0);
      });
    },
    tabChange(i) {
      this.tab = i;
      document.getElementById(
        "goodsDetial"
      ).scrollTop = document.getElementById("tab").offsetTop;
    },
    getData() {
      //  评论接口、商品详情接口
      axios.get("/ppi/index.php/api/goods/detail?gid=" + this.gid).then(res => {
        this.imgs = res.data.goods.imgs;
        this.goods = res.data.goods;
        let norm = res.data.goods.norms;
        if (norm) {
          Object.keys(norm).forEach(key => {
            this.norms.push({
              name: key,
              datail: norm[key]
            });
          });
        }
      });
    },
    appraise() {
      //  商品评价
      axios
        .get(
          "/ppi/index.php/api/goods/comment_list?ajax=true&gid=" +
            this.gid +
            "&page=1&span=3"
        )
        .then(res => {
          this.commentlist = res.data.list;
          console.log(res.data);
        });
    },
    addCart() {
      if (this.token) {
        let data = new FormData();
        data.append("token", this.token);
        data.append("gid", this.goods.gid);
        data.append("number", +1);
        axios.post("/ppi/index.php/api/cart/alter", data).then(res => {
          Toast({
            message: res.data.message,
            position: "bottom"
          });
        });
      } else {
        Toast({
          message: "您未登录，请先登录！",
          position: "bottom"
        });
        this.$router.push({ name: "login" });
      }
    },
    // 获取滚动条高度
    handleScroll() {
      let b = document.getElementById("goodsDetial").scrollTop;
      let a = document.getElementById("tab").offsetTop;
      if (b > a) {
        this.tabb = true;
      } else {
        this.tabb = false;
      }
      // let a=document.getElementById('tagRight'+this.list[i].id)
      // if(b+50 >= a.offsetTop){
      //   this.tag = this.list[i].id;
      // }
    },
    recommendGoods() {
      //随机推荐商品
      let data = new FormData();
      data.append("gid", this.gid); // 填写参数
      axios.post("/ppi/index.php/api/goods/recommend", data).then(res => {
        this.recommendList = res.data;
      });
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Overlay,
    Toast
  }
};
</script>

<style scoped>
.goodsDetial {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.goodsBanner {
  height: 9.975rem;
  background: #666;
}

.van-swipe-item {
  position: relative;
}

.van-swipe-item video {
  width: 100%;
  height: 9.975rem;
}

.back {
  position: absolute;
  top: 0.6916rem;
  left: 12px;
  width: 0.8512rem;
  height: 0.8512rem;
  z-index: 12;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.back i {
  color: #fff;
  font-size: 17px;
  font-weight: 600;
}

/* 轮播 */
.goodsBanner img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 商品信息 */
.goodsInfo {
  margin-bottom: 0.1064rem;
  padding: 13px 12px 15px;
  background: #fff;
}

.goodsInfo p:nth-of-type(1) {
  color: #dd0812;
  font-size: 0.6384rem;
  height: 0.6384rem;
  line-height: 0.6384rem;
  margin-bottom: 0.2394rem;
}

.goodsInfo p:nth-of-type(1) span {
  font-size: 0.4rem;
}

.goodsInfo p:nth-of-type(2) {
  font-size: 13px;
}

/* 检测机构 */
.checked {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  background: #fff;
  align-items: center;
  margin-bottom: 4px;
}

.checked p {
  color: #74181b;
  font-size: 13px;
  height: 13px;
  line-height: 13px;
  padding: 0 8px;
  border-right: 1px solid #808080;
}

.checked p:last-child {
  border-right: 0;
}

.checked p i {
  font-size: 13px;
}

/* 评论 */
.appraise {
  background: #fff;
}

.appraise > p {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 0.9709rem;
  border: 0.0133rem solid #f5f5f5;
}

.appraise > p span:nth-of-type(1) {
  font-size: 13px;
}

.appraise > p span:nth-of-type(2) {
  font-size: 0.3rem;
  color: #808080;
}

.appraise > p span:nth-of-type(2) i {
  font-size: 0.3rem;
}

.appraiseList {
  overflow: hidden;
}

.app {
  padding: 0.1197rem 0.5054rem 12px;
}

.app img {
  width: 0.798rem;
  height: 0.798rem;
  display: block;
  background: #666;
  border-radius: 50%;
}

.app div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.app div p:nth-of-type(1) {
  color: #1c0000;
  font-size: 12px;
  margin-left: 8px;
}

.app div p:nth-of-type(2) {
  font-size: 12px;
  margin-left: auto;
  color: #808080;
}

.app div p:nth-of-type(2) i {
  font-size: 12px;
}

.app > p:nth-of-type(1) {
  color: #9a9a9a;
  font-size: 12px;
  height: 12px;
  line-height: 12px;
  margin-top: 0.2394rem;
}

.app > p:nth-of-type(2) {
  font-size: 12px;
  color: #808080;
  margin-top: 12px;
}

/* 选项卡 */
.tab {
  height: 1.1704rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  margin-top: 0.1064rem;
  box-shadow: 0 0.0399rem 0.0798rem rgba(216, 216, 216, 0.22);
  position: relative;
  z-index: 1;
}

.tabb {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 0;
}

.tab p {
  color: #2e2e2e;
  font-size: 14px;
}

.tab .tabActive {
  color: #74181b;
}

/* 图文详情 */
.detail > div:nth-of-type(1) {
  background: #fff;
  padding: 8px 0 0.2rem;
  margin-bottom: 8px;
}

.detail > div > p {
  padding: 0 0.5187rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.detail > div > p > span:nth-of-type(1) {
  color: #2e2e2e;
  font-size: 0.4rem;
  font-weight: 600;
}

.detail > div > p > span:nth-of-type(2) {
  color: #808080;
  font-size: 0.266rem;
}

.detail > div > p > span:nth-of-type(2) i {
  font-size: 0.266rem;
}

.normsBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7.98rem;
  z-index: 13;
  background: #fff;
  border-radius: 8px 8px 0 0;
  padding: 15px 0;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 15px;
}

.title p {
  font-size: 0.4256rem;
  color: #2e2e2e;
  font-weight: 500;
  line-height: 0.5985rem;
}

.title i {
  font-size: 0.3rem;
  color: #808080;
}

.norms {
  padding: 0 0.532rem;
}

.norms p {
  overflow: hidden;
  line-height: 0.4rem;
  margin-bottom: 0.1596rem;
  display: flex;
  flex-direction: row;
}

.norms p > span:nth-of-type(1) {
  color: #585757;
  font-size: 0.3rem;
  margin-right: 0.4389rem;
  width: 1.463rem;
  display: inline-block;
}

.norms p > span:nth-of-type(2) {
  color: #1c0000;
  font-size: 0.3rem;
  flex: 1;
}

.img > img {
  display: block;
  width: 100%;
}

/* 识玉轩 */
.know {
}

.know > div {
  padding: 8px 0.5054rem 12px;
  background: #fff;
}

.know > div > p {
  color: #1c0000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 0.2rem;
}

.know > div > div {
  display: flex;
  flex-direction: row;
  background: #f5f5f5;
  margin-bottom: 0.1064rem;
}

.know > div > div img {
  display: block;
  background: #fff;
  width: 2.926rem;
  height: 2.7265rem;
}

.know > div:nth-child(2) > div img {
  width: 2.926rem;
  height: 3.059rem;
}

.know > div:nth-child(3) > div img {
  display: block;
  background: #fff;
  width: 2.926rem;
  height: 2.1679rem;
}

.know > div > div > div {
  padding: 0 0.1064rem 0.1rem;
}

.know > div > div > div p {
  color: #130000;
  font-size: 14px;
  line-height: 0.532rem;
  height: 0.532rem;
}

.know > div > div > div span {
  font-size: 12px;
  color: #585757;
  width: 5.7456rem;
  display: block;
}

/* 我们的保障 */
.ensure {
  background: #fff;
}

.ensure1 {
  padding: 8px 0.5054rem 0.2rem;
}

.ensure1 > div {
  background: #f5f5f5;
  padding: 12px;
  margin-bottom: 8px;
}

.ensure1 > div > p {
  color: #585757;
  font-size: 12px;
  margin-top: 0.1596rem;
}

.ensure1 > div > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.ensure1 > div > div p img {
  width: 0.4256rem;
  height: 0.4256rem;
  display: block;
  margin-right: 0.15rem;
}

.ensure1 > div > div p:nth-child(1) {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ensure1 > div > div p:nth-child(1) span {
  font-size: 14px;
  font-weight: 500;
  line-height: 0.4256rem;
  height: 0.4256rem;
}

.ensure1 > div > div p:nth-child(2) {
  color: #74181b;
  opacity: 0.2;
  font-weight: 600;
  font-family: PingFang SC;
  font-size: 0.5054rem;
}

.ensure2 {
  padding: 0.0798rem 0.5054rem 1.4098rem;
}

.ensure2 > div {
  padding: 8px 12px;
  background: #f5f5f5;
  margin-bottom: 0.1064rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ensure2 > div img {
  width: 2.66rem;
  display: block;
  height: 1.9019rem;
  margin-right: 8px;
}

.ensure2 > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ensure2 > div > div p {
  height: 0.532rem;
  line-height: 0.532rem;
  font-size: 14px;
  color: #130000;
}

.ensure2 > div > div span {
  color: #585757;
  font-size: 12px;
  display: block;
  line-height: 0.4389rem;
  width: 5.453rem;
}

/* 新闻 */
.news {
  padding: 12px 8px 15px;
  background: #fff;
  margin-top: 8px;
}

.news p {
  color: #74181b;
  font-size: 13px;
  text-align: center;
  margin-bottom: 0.3325rem;
}

.news img {
  width: 100%;
  height: 3.2585rem;
  background: #655;
  display: block;
}

/* 推荐商品 */
.goodsbox {
  margin-top: 15px;
  background: #f5f5f5;
}

.goodsbox > p {
  font-size: 14px;
  font-weight: 400;
  color: #1c0000;
  text-align: center;
  margin-bottom: 15px;
}

.goodslist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 8px;
  padding-bottom: 1.4rem;
}

.goodslist div {
  background: #fff;
  width: 4.655rem;
  border-radius: 0.1064rem;
  padding-bottom: 0.3325rem;
  margin-bottom: 8px;
}

.goodslist div img {
  width: 4.655rem;
  height: 4.655rem;
  display: block;
  background: #666;
  border-radius: 0.1064rem 0.1064rem 0 0;
}

.goodslist div p {
  padding: 0 8px;
}

.goodslist div p:nth-of-type(1) {
  width: 4.2294rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
  padding: 0.1596rem 8px 0.1064rem;
}

.goodslist div p:nth-of-type(2) {
  color: #dd0812;
  font-size: 13px;
}

.goodslist div p:nth-of-type(2) span {
  font-size: 0.27rem;
}

/* 购物底部栏 */
.buyTab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  z-index: 12;
  box-sizing: border-box;
  box-shadow: 0px -2px 2px rgba(201, 201, 201, 0.16);
}

.buyTab p,
.buyTab a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  color: #4a4a4a;
  font-size: 13px;
  margin-right: 13px;
}

.buyTab p i,
.buyTab a i {
  font-size: 20px;
  color: #4a4a4a;
}

.buyTab > div {
  display: flex;
  flex-direction: row;
}

.buyTab > div > div {
  width: 128px;
  height: 100%;
  text-align: center;
  line-height: 44px;
}

.addCart {
  color: #ffffff;
  background: #74181b;
  font-size: 13px;
}

.gobuy {
  font-size: 13px;
  color: #ffffff;
  background: #dd0812;
}

/* 立即购买弹窗 */
.buyBox {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 270px;
  border-radius: 8px 8px 0 0;
  background: #fff;
  padding: 15px 12px;
  z-index: 13;
}

.buyBox > div {
  display: flex;
  flex-direction: row;
}

.buyBox > div img {
  width: 2.7664rem;
  height: 2.7664rem;
  display: block;
  margin-right: 12px;
}

.buyBox .buyInfo {
  padding-bottom: 15px;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
}

.buyBox .buyInfo p {
  display: flex;
  flex-direction: column;
}

.buyBox .buyInfo > p span:nth-child(1) {
  margin-top: 10px;
  color: #dd0812;
  font-size: 18px;
  line-height: 25px;
}

.buyBox .buyInfo > p span:nth-child(1) i {
  font-style: normal;
  font-size: 13px;
}

.buyBox .buyInfo > p span:nth-child(2) {
  color: #585757;
  margin-top: 12px;
  font-size: 13px;
}

.buyBox .buyInfo > i {
  margin-left: auto;
  color: #9a9a9a;
  height: 12px;
}

.buyBox .buyNum {
  padding: 14px 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.buyBox .buyNum > p {
  color: #585757;
  font-size: 13px;
}

.buyBox .buyNum > div {
  display: flex;
  flex-direction: row;
}

.buyBox .buyNum > div span {
  width: 38px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 22px;
  background: #f5f5f5;
  color: #9a9a9a;
  display: block;
}

.buyBox .buyNum > div input {
  width: 58px;
  height: 33px;
  border: 0;
  outline: none;
  background: #f5f5f5;
  font-size: 17px;
  text-align: center;
  margin: 0 2px;
}

.buyBox .buy {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #dd0812;
  color: #fff;
  border-radius: 4px;
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
}
</style>
