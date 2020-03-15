<template>
  <div class="auctionDetail" id="auctionDetail">
    <!-- 商品轮播 -->
    <div class="bannerBox">
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
      <!-- 倒计时条 -->
      <div class="slip">
        <div class="slipPrice" v-if="auction.currentPrice!=0">
          <p>当前价</p>
          <i>¥</i>
          <span>{{auction.currentPrice}}</span>
        </div>
        <div class="slipPrice" v-else>
          <i>¥</i>
          <span>{{auction.startingPrice}}</span>
          <p>元起拍</p>
        </div>
        <div class>
          <p>距结束：</p>
          <van-count-down :time="auction.timeRemaining*1000">
            <template v-slot="timeData">
              <span class="day">{{ timeData.days | dataFormat }}天</span>
              <span class="item">{{ timeData.hours | dataFormat }}</span>:
              <span class="item">{{ timeData.minutes | dataFormat }}</span>:
              <span class="item">{{ timeData.seconds | dataFormat }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
    </div>
    <!-- 返回 -->
    <div class="back" @click="$router.go(-1)">
      <i class="iconfont icon-left"></i>
    </div>
    <!-- 商品信息 -->
    <div class="goodsInfo">
      <p>{{goods.title}}</p>
      <div>
        <p>
          <span>起</span>
          <span>
            <i>¥</i>0
          </span>
        </p>
        <p>
          <span>加</span>
          <span>
            <i>¥</i>1
          </span>
        </p>
        <p>
          <span>保</span>
          <span>
            <i>¥</i>30
          </span>
        </p>
        <p>
          <span>延</span>
          <span>5分钟</span>
        </p>
      </div>
    </div>
    <!-- 保证条 -->
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
    <!-- 出价记录 -->
    <div class="priceRecord">
      <div class="title">
        <p>出价记录({{talNum}})</p>
        <p @click="getBidding(true)">
          <i class="iconfont icon-shuaxin"></i>刷新出价
        </p>
      </div>
      <div class="recordList">
        <div v-for="(item,i) in biddingList" :key="i">
          <img :src="item.avatar" alt />
          <div>
            <p>
              <span>{{item.userName}}</span>
              <span :class="i==0?'recordRed':''">{{i==0?'领先':'出局'}}</span>
            </p>
            <span>{{item.postTime}}</span>
          </div>
          <p>
            <i>¥</i>
            {{item.price}}
          </p>
        </div>
      </div>
      <!-- <div class="more">查看更多</div> -->
    </div>
    <!-- 拍卖说明 -->
    <div class="explain">
      <div class="title">
        <p>拍卖说明</p>
        <p @click="explain=true;show=true">
          更多
          <i class="iconfont icon-right"></i>
        </p>
      </div>
      <div class="explain_left">
        <p>
          <img src="../../static/img/bidding1.png" alt />
          <span>参与出价</span>
        </p>
        <img src="../../static/img/redR.png" alt />
        <p>
          <img src="../../static/img/bidding2.png" alt />
          <span>价高者得</span>
        </p>
        <img src="../../static/img/redR.png" alt />
        <p>
          <img src="../../static/img/bidding3.png" alt />
          <span>支付货款</span>
        </p>
        <img src="../../static/img/redR.png" alt />
        <p>
          <img src="../../static/img/bidding4.png" alt />
          <span>获得宝贝</span>
        </p>
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
    <div class="news" v-if="tab==1">
      <p>千年古刹 高僧加持</p>
      <img src="../../static/img/b21.png" alt />
    </div>
    <!-- 怀南会携手中国人保财险 -->
    <div class="news" v-if="tab==1">
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
    <van-overlay
      :show="show"
      @click="show = false;normsbox = false; buybox = false;explain = false;"
    />
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
    <!-- 拍卖说明弹窗 -->
    <div class="explainbox" v-if="explain">
      <!-- 标题 -->
      <div class="boxT">
        <i class="iconfont icon-guanbi" style="visibility:hidden;"></i>
        <p>拍卖说明</p>
        <i class="iconfont icon-guanbi" @click="show=false; explain = false;"></i>
      </div>
      <!-- 竞价流程 -->
      <div class="procedure">
        <p>竞拍流程</p>
        <div>
          <p>
            <img src="../../static/img/bidding5.png" alt />
            <span>参与出价</span>
          </p>
          <img src="../../static/img/grayR.png" alt />
          <p>
            <img src="../../static/img/bidding6.png" alt />
            <span>价高者得</span>
          </p>
          <img src="../../static/img/grayR.png" alt />
          <p>
            <img src="../../static/img/bidding7.png" alt />
            <span>支付货款</span>
          </p>
          <img src="../../static/img/grayR.png" alt />
          <p>
            <img src="../../static/img/bidding8.png" alt />
            <span>获得宝贝</span>
          </p>
        </div>
      </div>
      <!-- 保证金说明 -->
      <div class="bond">
        <p>保证金说明</p>
        <span>竞买人需支付30元保证金方可参与拍卖，在竞拍倒计时结束前均可缴纳保证金参与竞拍，竞拍结束后，除买受人外，其他竞买人缴纳保证金将即刻解冻，资金将在三个工作日内由原渠道退回。买受人若未在48小时内支付所有款项，本平台将扣除之前所缴纳保证金，不予退还。若同时竞拍多个商品，则须缴纳多份保证金（30元/份），以保证顺利竞拍所有您想要竞拍的商品。</span>
      </div>
      <!-- 竞价规则 -->
      <div class="rule">
        <p>竞拍规则</p>
        <span>拍卖开始后，已缴纳保证金的竞买人可以进行出价操作，竞买人须按一定要求竞价（如：固定初始竞价、固定加价幅度），不得在出价已领先情况下连续出价，扰乱竞拍秩序。</span>
        <span>竞拍结束后，以结束时最高出价为成交价，系统会自动为买受人提供一个待支付的订单，买受人须在限定时间内支付货款，否则流拍，保证金不予退还。为保证竞拍的公平性，若有竞买人在距离拍卖结束5分钟内出价，则拍卖结束时间自动延时5分钟，直到商品拍出.</span>
      </div>
    </div>
    <!-- 购物弹窗 -->
    <div class="biddingbox" v-if="buybox">
      <div>
        <i class="iconfont icon-guanbi" style="visibility:hidden;"></i>
        <h1>
          领先价:
          <i>¥</i>
          {{auction.currentPrice}}
        </h1>
        <i class="iconfont icon-guanbi" @click="show=false; buybox = false;"></i>
      </div>
      <div>
        <p>
          <i class="iconfont icon-bianji"></i>
          ¥
          <input type="text" v-model="currentPrice" />
        </p>
        <div>
          <p @click="currentPrice==0?'0.00':currentPrice--">-1</p>
          <p @click="currentPrice++">+1</p>
        </div>
      </div>
      <p @click="bid()">确认出价</p>
    </div>
    <!-- 购物底部栏 -->
    <div class="buyTab">
      <a
        :href="'https://chat.sobot.com/chat/h5/v2/index.html?sysnum=e772a07377c14e239174ee712efa2647&params='+JSON.stringify({'商品信息网址':'https://www.huainanhui.com/auction/detail/'+ id +'.html'})"
      >
        <i class="iconfont icon-kefu"></i>客服
      </a>
      <div @click="bidding()">出个价</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Swipe, SwipeItem, Overlay, Toast, CountDown } from "vant";

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
      id: null, // 商品gid
      tabb: false, // tab选项卡固定在顶部
      token: "", //  用户token
      cartNum: null, //购物车数量
      explain: false, //拍卖弹窗开关
      auction: {}, // 竞价信息
      currentPrice: 0, // 当前价格
      biddingList: [], // 出价列表
      page1: 1, // 出价列表当前页
      total: 2, //出价列表总页数
      talNum: 0 // 出价列表总条数
    };
  },
  filters: {
    dataFormat(time) {
      if (Number(time) < 10) {
        return "0" + time;
      } else {
        return time;
      }
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    document
      .getElementById("auctionDetail")
      .addEventListener("scroll", this.handleScroll);
    this.id = this.$route.query.id;
    this.getData();
    this.recommendGoods();
    this.getBidding();
  },
  methods: {
    // 出价结算
    bid() {
      // /index.php/api/auction/bidding_price
      if (this.currentPrice > Number(this.auction.currentPrice)) {
        let data = new FormData();
        data.append("token", sessionStorage.getItem("token"));
        data.append("aid", this.id);
        data.append("price", this.currentPrice);
        axios
          .post("/ppi/index.php/api/auction/bidding_price", data)
          .then(res => {
            Toast({
              message: res.data.message,
              position: "bottom"
            });
            this.getBidding(); //刷新出价列表
            this.getData();
          });
      } else {
        Toast({
          message: "出价失败，出价金额不能低于领先价格",
          position: "bottom"
        });
      }
    },
    // 出价
    bidding() {
      if (this.token) {
        if (Number(this.auction.deposit) == 0) {
          //未交保证金
          this.$router.push({ name: "confirmOrder-payBond",query:{pay: this.auction.bond} });
        } else {
          //交了保证金
          this.buybox = true;
          this.show = true;
        }
      } else {
        Toast({
          message: "您未登录，请先登录！",
          position: "bottom"
        });
        this.$router.push({ name: "login" });
      }
    },
    goodsChange(gid) {
      this.$router.push({ name: "detail", query: { gid } });
    },
    tabChange(i) {
      this.tab = i;
      document.getElementById(
        "auctionDetail"
      ).scrollTop = document.getElementById("tab").offsetTop;
    },
    getData() {
      //  竞价详情接口  /index.php/api/goods/detail
      let data = new FormData();
      data.append("token", sessionStorage.getItem("token"));
      data.append("auctionId", this.id);
      axios.post("/ppi/index.php/api/auction/detail", data).then(res => {
        this.imgs = res.data.goods.imgs;
        this.goods = res.data.goods;
        let norm = res.data.goods.norms;
        this.auction = res.data.auctionGoods;
        this.currentPrice = this.auction.currentPrice;
        Object.keys(norm).forEach(key => {
          this.norms.push({ name: key, datail: norm[key] });
        });
      });
    },
    // 获取滚动条高度
    handleScroll() {
      let b = document.getElementById("auctionDetail").scrollTop;
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
    },
    // 竞价记录列表
    getBidding(refresh) {
      //  /index.php/api/auction/bidding_list
      let data = new FormData();
      data.append("aid", this.id); // 填写参数
      data.append("page", this.page1);
      data.append("span", 5);
      axios.post("/ppi/index.php/api/auction/bidding_list", data).then(res => {
        this.biddingList = res.data.list;
        if (refresh) {
          Toast({
            message: "刷新成功",
            position: "bottom"
          });
        }
        this.talNum = res.data.totalNum;
        this.total = res.data.totalPage;
      });
    }
  },
  components: {
    Swipe,
    SwipeItem,
    Overlay,
    Toast,
    CountDown
  }
};
</script>

<style scoped>
.auctionDetail {
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.bannerBox {
  position: relative;
}
.goodsBanner {
  height: 375px;
  background: #666;
}
.van-swipe-item {
  position: relative;
}
.van-swipe-item video {
  width: 100%;
  height: 375px;
}
.back {
  position: absolute;
  top: 26px;
  left: 12px;
  width: 32px;
  height: 32px;
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
  font-size: 18px;
  font-weight: 600;
}
/* 轮播 */
.goodsBanner img {
  width: 100%;
  height: 100%;
  display: block;
}
.slip {
  position: absolute;
  bottom: -44px;
  left: 0;
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  background: #8e161a;
  padding: 0 12px;
  justify-content: space-between;
}
.van-count-down {
  height: 26px !important;
  color: #fff;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.slipPrice {
  display: flex;
  color: #fff;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.slipPrice > p {
  font-size: 13px;
  font-weight: 400;
  margin-right: 4px;
}
.slipPrice > i {
  font-style: normal;
  font-size: 10px;
}
.slip span {
  font-size: 16px;
  margin-left: 2px;
}
.slip div:nth-of-type(2) {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
}
.slip div:nth-of-type(2) p {
  font-size: 13px;
  color: #fff;
}
.slip .day {
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  margin-right: 4px;
}
.slip .item {
  background: #74181b;
  border-radius: 4px;
  width: 23px;
  height: 23px !important;
  text-align: center;
  line-height: 23px;
  font-size: 13px;
  color: #fff;
  display: inline-block;
  margin: 0 2px;
}
/* 商品信息 */
.goodsInfo {
  margin-bottom: 4px;
  padding: 12px;
  background: #fff;
  font-weight: 500;
  margin-top: 44px;
}
.goodsInfo > p:nth-of-type(1) {
  font-size: 16px;
  font-weight: 600;
}
.goodsInfo > div {
  display: flex;
  flex-direction: row;
  color: #808080;
  font-weight: 400;
  line-height: 18px;
  height: 18px;
  align-items: flex-end;
  margin-top: 0.31rem;
}
.goodsInfo > div p {
  display: flex;
  flex-direction: row;
  line-height: 18px;
  align-items: center;
  padding-right: 8px;
}
.goodsInfo > div p span:nth-child(1) {
  display: block;
  width: 18px;
  height: 18px;
  text-align: center;
  font-size: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e161a;
  border: 1px solid #8e161a;
  margin-right: 5px;
  border-radius: 2px;
}
.goodsInfo > div p span:nth-child(2) {
  font-style: normal;
  height: 18px;
  line-height: 18px;
  font-size: 16px;
}
.goodsInfo > div p span:nth-child(2) i {
  font-style: normal;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  margin-right: 1px;
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
/* 出价记录 */
.priceRecord {
  margin-bottom: 8px;
  background: #fff;
}
.priceRecord .title {
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
}
.priceRecord .title p:nth-child(1) {
  line-height: 20px;
  font-size: 14px;
  color: #130000;
}
.priceRecord .title p:nth-child(2) {
  color: #808080;
  font-size: 10px;
}
.priceRecord .title p:nth-child(2) i {
  font-size: 10px;
  font-weight: 900;
  color: #74181b;
  margin-right: 4px;
}
.recordList {
  padding: 8px 12px 15px;
}
.recordList > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}
.recordList > div:last-child {
  margin-bottom: 0;
}
.recordList > div > p {
  color: #74181b;
  margin-left: auto;
  text-align: right;
  font-size: 14px;
}
.recordList > div > p i {
  font-size: 10px;
  font-style: normal;
}
.recordList > div img {
  width: 40px;
  height: 40px;
  display: block;
  background: #000;
  margin-right: 8px;
  border-radius: 50%;
}
.recordList > div div:nth-of-type(1) {
  display: flex;
  flex-direction: column;
}
.recordList > div div:nth-of-type(1) > p {
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
}
.recordList > div div:nth-of-type(1) > p span:nth-child(1) {
  font-size: 13px;
  color: #130000;
}
.recordList > div div:nth-of-type(1) > p span:nth-child(2) {
  width: 33px;
  height: 18px;
  background: #c3c3c3;
  font-size: 11px;
  color: #fff;
  border-radius: 2px;
  margin-left: 15px;
  line-height: 18px;
  text-align: center;
  display: block;
}
.recordList > div div:nth-of-type(1) > span {
  color: #9a9a9a;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
}
.recordList > div div:nth-of-type(1) > p span.recordRed {
  color: #fff;
  background: #74181b;
}
.more {
  height: 36px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: #74181b;
  text-align: center;
  border-top: 1px solid #f5f5f5;
}
/* 拍卖说明 */
.explain {
  padding: 8px 12px 15px;
  background: #fff;
}
.explain .title {
  padding: 0;
  height: 20px;
  margin-bottom: 15px;
}
.explain .title p:nth-child(1) {
  font-size: 14px;
  color: #1c0000;
  line-height: 20px;
}
.explain .title p:nth-child(2) {
  font-size: 10px;
  color: #808080;
}
.explain .title p:nth-child(2) i {
  font-size: 10px;
}
.explain_left {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0 25px;
}
.explain_left > img {
  width: 18px;
  margin: 0 6px;
  margin-top: 17px;
}
.explain_left p {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.explain_left p img {
  width: 43px;
  height: 43px;
  display: block;
  display: block;
  border-radius: 50%;
  margin-bottom: 8px;
}
.explain_left p span {
  font-size: 13px;
  height: 18px;
  line-height: 18px;
  display: block;
}
/* 选项卡 */
.tab {
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  margin-top: 4px;
  box-shadow: 0 2px 3px rgba(216, 216, 216, 0.22);
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
  padding: 8px 0 10px;
  margin-bottom: 8px;
}
.detail > div > p {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.detail > div > p > span:nth-of-type(1) {
  color: #2e2e2e;
  font-size: 13px;
  font-weight: 600;
}
.detail > div > p > span:nth-of-type(2) {
  color: #808080;
  font-size: 10px;
}
.detail > div > p > span:nth-of-type(2) i {
  font-size: 10px;
}
.normsBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  z-index: 13;
  background: #fff;
  border-radius: 8px 8px 0 0;
  padding: 12px 0;
  padding: 15px 0;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}
.title p {
  font-size: 16px;
  color: #2e2e2e;
  font-weight: 500;
  line-height: 22px;
}
.title i {
  font-size: 13px;
  color: #808080;
}
.norms {
  padding: 0 20px;
}
.norms p {
  overflow: hidden;
  line-height: 15px;
  margin-bottom: 6px;
  display: flex;
  flex-direction: row;
}
.norms p > span:nth-of-type(1) {
  color: #585757;
  font-size: 13px;
  margin-right: 16px;
  width: 55px;
  display: inline-block;
}
.norms p > span:nth-of-type(2) {
  color: #1c0000;
  font-size: 13px;
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
  padding: 8px 19px 12px;
  background: #fff;
  margin-bottom: 8px;
}
.know > div > p {
  color: #1c0000;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}
.know > div > div {
  display: flex;
  flex-direction: row;
  background: #f5f5f5;
  margin-bottom: 4px;
}
.know > div > div img {
  display: block;
  background: #fff;
  width: 110px;
  height: 102px;
}
.know > div:nth-child(2) > div img {
  width: 110px;
  height: 115px;
}
.know > div:nth-child(3) > div img {
  display: block;
  background: #fff;
  width: 110px;
  height: 82px;
}
.know > div > div > div {
  padding: 0 4px 4px;
}
.know > div > div > div p {
  color: #130000;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  margin-top: 4px;
  font-weight: 600;
  margin-bottom: 4px;
}
.know > div > div > div span {
  font-size: 12px;
  color: #585757;
  width: 216px;
  display: block;
}
/* 我们的保障 */
.ensure {
  background: #fff;
}
.ensure1 {
  padding: 8px 19px 8px;
}
.ensure1 > div {
  background: #f5f5f5;
  padding: 12px;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.ensure1 > div > p {
  color: #585757;
  font-size: 12px;
  margin-top: 6px;
}
.ensure1 > div > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.ensure1 > div > div p img {
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 1px;
}
.ensure1 > div > div p:nth-child(1) {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ensure1 > div > div p:nth-child(1) span {
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  height: 16px;
}
.ensure1 > div > div p:nth-child(2) {
  color: #74181b;
  opacity: 0.2;
  font-weight: 600;
  font-family: PingFang SC;
  font-size: 19px;
}
.ensure2 {
  padding: 3px 19px 53px;
}
.ensure2 > div {
  padding: 8px 12px;
  background: #f5f5f5;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.ensure2 > div img {
  width: 100px;
  display: block;
  height: 70px;
  margin-right: 8px;
}
.ensure2 > div > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ensure2 > div > div p {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #130000;
}
.ensure2 > div > div span {
  color: #585757;
  font-size: 12px;
  display: block;
  line-height: 16px;
  width: 205px;
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
  margin-bottom: 12px;
}
.news img {
  width: 100%;
  height: 122px;
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
  padding-bottom: 52px;
}
.goodslist div {
  background: #fff;
  width: 175px;
  border-radius: 4px;
  padding-bottom: 12px;
  margin-bottom: 8px;
}
.goodslist div img {
  width: 175px;
  height: 175px;
  display: block;
  background: #666;
  border-radius: 4px 4px 0 0;
}
.goodslist div p {
  padding: 0 8px;
}
.goodslist div p:nth-of-type(1) {
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  padding: 6px 8px 4px;
}
.goodslist div p:nth-of-type(2) {
  color: #dd0812;
  font-size: 18px;
}
.goodslist div p:nth-of-type(2) span {
  font-size: 10px;
}
/* 购物底部栏 */
.buyTab {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  z-index: 9;
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
  font-size: 12px;
}
.buyTab p i,
.buyTab a i {
  font-size: 20px;
  color: #4a4a4a;
}
.buyTab > div {
  display: flex;
  flex-direction: row;
  width: 288px;
  background: #dd0812;
  color: #fff;
  height: 33px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 24px;
}
/* 立即购买弹窗 */
.biddingbox {
  width: 350px;
  height: 252px;
  background: #fff;
  border-radius: 4px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding: 15px 0;
  z-index: 10;
}
.biddingbox > div:nth-child(1) {
  padding: 0 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.biddingbox > div:nth-child(1) h1 {
  color: #1c0000;
  font-size: 16px;
  font-weight: normal;
}
.biddingbox > div:nth-child(1) h1 > i {
  font-size: 10px;
  font-style: normal;
  margin-left: 2px;
}
.biddingbox > div:nth-child(1) > i {
  color: #808080;
  font-size: 10px;
  height: 10px;
  display: block;
}
.biddingbox > div:nth-child(2) {
  margin: 30px 30px 40px;
  width: 290px;
  height: 64px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(116, 24, 27, 1);
  display: flex;
  flex-direction: right;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
}
.biddingbox > div:nth-child(2) > p {
  display: flex;
  flex-direction: row;
  color: #74181b;
  font-size: 14px;
  height: 25px;
  align-items: center;
  justify-content: center;
}
.biddingbox > div:nth-child(2) > p > i {
  font-size: 15px;
  margin-right: 10px;
  color: #74181b;
}
.biddingbox > div:nth-child(2) > p > input {
  width: 140px;
  height: 20px;
  line-height: 20px;
  color: #74181b;
  border: none;
  outline: none;
  font-size: 15px;
  padding: 0 4px;
}
.biddingbox > div:nth-child(2) div {
  display: flex;
  flex-direction: row;
}
.biddingbox > div:nth-child(2) div p {
  width: 40px;
  font-size: 12px;
  color: #808080;
  text-align: center;
  line-height: 40px;
  margin-right: 15px;
  border-radius: 50%;
  background: #f5f5f5;
  height: 40px;
}
.biddingbox > div:nth-child(2) div p:last-child {
  margin-right: 0;
  color: #8e161a;
  background: rgba(142, 22, 26, 0.2);
}
.biddingbox > p {
  width: 290px;
  height: 44px;
  line-height: 44px;
  background: #dd0812;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin: 0 30px;
}
/* 拍卖说明弹窗 */
.explainbox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 500px;
  z-index: 13;
  background: #fff;
  border-radius: 8px 8px 0 0;
  padding: 15px 0;
}
.boxT {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #1c0000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 19px;
}
.boxT p {
  font-weight: 600;
}
.boxT i {
  font-size: 13px;
  color: #808080;
}
.procedure {
  margin-bottom: 17px;
  padding: 0 19px;
}
.procedure div {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 20px;
}
.procedure div > img {
  width: 15px;
  margin: 10px 6px 0;
}
.procedure div p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.procedure div p img {
  height: 27px;
  display: block;
  margin-bottom: 12px;
}
.procedure div p span {
  height: 16px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 16px;
  color: #808080;
}
.procedure > p,
.bond > p,
.rule > p {
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: #1c0000;
  margin-bottom: 12px;
}
.bond {
  padding: 0 19px;
  margin-bottom: 15px;
}
.bond span {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1c0000;
  display: block;
  line-height: 15px;
}
.rule {
  padding: 0 19px;
}
.rule span {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 15px;
  color: #1c0000;
  display: block;
  margin-bottom: 6px;
}
.van-overlay {
  z-index: 10 !important;
}
</style>
