<template>
  <div class="equityDetail">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>会员权益</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <div v-swiper:mySwiper="swiperOption" class="index-swiper-box" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_1.png" />
            <p>景区门票</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_2.png" />
            <p>生日礼物</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_3.png" />
            <p>开光祈福法会</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_4.png" />
            <p>专属客服</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_5.png" />
            <p>邀请返利</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_6.png" />
            <p>拍卖免保证金</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_7.png" />
            <p>红包</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_8.png" />
            <p>购物打折</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_9.png" />
            <p>积分加成</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip3_10.png" />
            <p>节假日活动加成</p>
          </div>
        </div>
      </div>
      <div class="vipIntroduce">
        <img class="triangle" src="../../../static/img/triangle.png" alt />
        <div class="detail" v-if="active==1">
          <p>权益说明</p>
          <span>
            中华孝道园是国家AAAA级景区，位于全国十大旅游名片之一的常州市武进太湖湾旅游度假区。园区以始建于东晋蓼莪禅寺为依托，以弘扬孝道精神为主旨，是融寻根祭祖、朝山礼佛、旅游观光和觉悟教 育于一体的综合景区。其主要景点和服务设施为蓼莪禅寺、正法明大殿、石窟观音、妙音宝塔、先祖庙堂、中华孝道博物馆、思恩广场、净心池、普光山庄等，风景秀丽，基础设施完善。
            门票价值 120元（儿童身高1.2米以下免票，1.2-1.5米购儿童票，60-69周岁老人半价，本地70岁以上老人持老年证或身份证免票）
            开放时间 08:45-17:00（全年无休）
          </span>
          <p>
            <span>普通会员：</span>无
          </p>
          <p>
            <span>黄金会员：</span>1张
          </p>
          <p>
            <span>铂金会员：</span>2张
          </p>
          <p>
            <span>钻石会员：</span>5张
          </p>
        </div>
        <div class="detail" v-else-if="active==2">
          <p>权益说明</p>
          <span>尊贵的会员可在生日当天获得由“怀南会”平台送出精美生日礼物一份（平台商品）或会员可自行在平台选择相应价格的商品，如自行选择，则价格超过标准的部分由会员自行支付。</span>
          <p>
            <span>普通会员：</span>0元
          </p>
          <p>
            <span>黄金会员：</span>58元
          </p>
          <p>
            <span>铂金会员：</span>148元
          </p>
          <p>
            <span>钻石会员：</span>588元
          </p>
        </div>
        <div class="detail" v-else-if="active==3">
          <p>权益说明</p>
          <span>尊贵的会员有1次机会提交开光祈福法会名单，提交的名单将在法会上受佛光注照，祈得荫蔽护佑，消灾免难，顺遂平安。</span>
          <p>
            <span>普通会员：</span>无
          </p>
          <p>
            <span>黄金会员：</span>一次（1人）
          </p>
          <p>
            <span>铂金会员：</span>一次（3人）
          </p>
          <p>
            <span>钻石会员：</span>一次（7人）
          </p>
        </div>
        <div class="detail" v-else-if="active==4">
          <p>权益说明</p>
          <span>“怀南会”将为所有尊贵的会员提供专属客服的一对一，优先为您处理您的需求，最大程度上保障您的权益。</span>
        </div>
        <div class="detail" v-else-if="active==5">
          <p>权益说明</p>
          <span>尊贵的会员邀请新用户到“怀南会”平台消费时可按比例享受返利，返利上不封顶。</span>
          <p>
            <span>普通会员：</span>0%
          </p>
          <p>
            <span>黄金会员：</span>2%
          </p>
          <p>
            <span>铂金会员：</span>5%
          </p>
          <p>
            <span>钻石会员：</span>10%
          </p>
        </div>
        <div class="detail" v-else-if="active==6">
          <p>权益说明</p>
          <span>尊贵的会员在参与拍卖时无需缴纳保证金。</span>
          <p>
            <span>普通会员：</span>需缴纳
          </p>
          <p>
            <span>黄金会员：</span>无需缴纳
          </p>
          <p>
            <span>铂金会员：</span>无需缴纳
          </p>
          <p>
            <span>钻石会员：</span>无需缴纳
          </p>
        </div>
        <div class="detail" v-else-if="active==7">
          <p>权益说明</p>
          <span>铂金和钻石会员消费时可使用红包，消费每百元抵免10元，不满百元不参与抵免，不折现，不找零。</span>
          <p>
            <span>普通会员：</span>0元
          </p>
          <p>
            <span>黄金会员：</span>0元
          </p>
          <p>
            <span>铂金会员：</span>150元
          </p>
          <p>
            <span>钻石会员：</span>600元
          </p>
        </div>
        <div class="detail" v-else-if="active==8">
          <p>权益说明</p>
          <span>铂金和钻石会员在消费时可以获得额外的折扣。</span>
          <p>
            <span>普通会员：</span>无
          </p>
          <p>
            <span>黄金会员：</span>无
          </p>
          <p>
            <span>铂金会员：</span>9.8折
          </p>
          <p>
            <span>钻石会员：</span>9.5折
          </p>
        </div>
        <div class="detail" v-else-if="active==9">
          <p>权益说明</p>
          <span>钻石会员在消费时额外享受10%的积分返利加成。</span>
          <p>
            <span>普通会员：</span>0%
          </p>
          <p>
            <span>黄金会员：</span>0%
          </p>
          <p>
            <span>铂金会员：</span>0%
          </p>
          <p>
            <span>钻石会员：</span>10%
          </p>
        </div>
        <div class="detail" v-else>
          <p>权益说明</p>
          <span>钻石会员在节假日活动期间消费，额外享受10%的活动奖励加成。</span>
          <p>
            <span>普通会员：</span>0%
          </p>
          <p>
            <span>黄金会员：</span>0%
          </p>
          <p>
            <span>铂金会员：</span>0%
          </p>
          <p>
            <span>钻石会员：</span>10%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: null,
      swiperOption: {
        loop: false, //环路，是否可以从最后一张切到第一张
        setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        roundLengths: true, //设定为true将slide的宽和高取整(四舍五入)以防止某些分辨率的屏幕上文字或边界(border)模糊。
        // centeredSlides: true,    设定为true时，active slide会居中，而不是默认状态下的居左。
        preloadImages: false, //默认为true，Swiper会强制加载所有图片。
        centeredSlides: true,
        slidesPerView: 3.3, // slider容器能够同时显示的slides数量
        on: {
          slideChange: () => {
            this.active = this.mySwiper.activeIndex + 1; // 滑动的回调事件
            // console.log(this.active);
          },
          tap() {
            // console.log('onTap', this);    回调函数，当你轻触(tap)Swiper后执行。在移动端，click会有 200~300 ms延迟，所以请用tap代替click作为点击事件。接受touchend事件作为参数
          }
        }
      }
    };
  },
  mounted() {
    this.active = this.$route.params.name;
    this.mySwiper.slideTo(this.$route.params.name - 1, 0, false);
  }
};
</script>

<style scoped>
.equityDetail {
  background: #fff;
  position: absolute;
  color: #1c0000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 标签栏 */
.equityDetail .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 0.399rem 0.665rem rgba(190, 190, 190, 0.1);
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
}
.equityDetail .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.equityDetail .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}
/* 轮播 */
.index-swiper-box {
  height: 3.5245rem;
  width: 100%;
  background: radial-gradient(
    circle,
    rgba(28, 0, 0, 1) 0%,
    rgba(28, 22, 12, 1) 100%
  );
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
  line-height: 100%;
}
.swiper-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  -webkit-transition: all 0.5s; /* Safari */
  opacity: 0.5;
}
.swiper-slide img {
  width: 1.1704rem;
  height: 1.1704rem;
  display: block;
}
.swiper-slide p {
  color: #fff;
  font-size: 0.3458rem;
  font-weight: 400;
}
.swiper-slide-active {
  opacity: 1;
}
.swiper-slide-active img {
  transform: scale(1.3);
}
.swiper-slide-active p {
  color: #d8d8d7;
  margin-top: 0.1596rem;
}
/* 会员权益介绍 */
.vipIntroduce {
  padding: 0.399rem 0.3458rem;
  position: relative;
}
.triangle {
  width: 0.3591rem;
  display: block;
  position: absolute;
  top: -0.13rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 11;
}
.detail {
}
.detail p {
  font-size: 0.3192rem;
  color: #808080;
}
.detail p:nth-of-type(1) {
  font-size: 0.3192rem;
  color: #1c0000;
  font-weight: 400;
  margin-bottom: 0.3325rem;
}
.detail > span:nth-of-type(1) {
  font-size: 0.3192rem;
  display: block;
  color: #808080;
  font-weight: 400;
  margin-bottom: 0.399rem;
  line-height: 0.4389rem;
}
.detail p > span {
  color: #1c0000;
  line-height: 0.4389rem;
}
</style>