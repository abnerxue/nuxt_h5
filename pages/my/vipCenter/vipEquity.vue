<template>
  <div class="vipEquity">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>会员权益</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="content">
      <div v-swiper:mySwiper="swiperOption" class="index-swiper-box" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../../../static/img/vip_ordinary.png" class="index-carousel-image" />
            <p>普通会员</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip_gold.png" class="index-carousel-image" />
            <p>黄金会员</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip_platinum.png" class="index-carousel-image" />
            <p>铂金会员</p>
          </div>
          <div class="swiper-slide">
            <img src="../../../static/img/vip_diamonds.png" class="index-carousel-image" />
            <p>钻石会员</p>
          </div>
        </div>
      </div>
      <div class="vipIntroduce">
        <p>此会员可享受以下权益</p>
        <img class="triangle" src="../../../static/img/triangle.png" alt />
        <div>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 1}})">
            <img v-if="active!=1" src="../../../static/img/vip3_1.png" alt />
            <img v-else src="../../../static/img/vip2_1.png" alt />
            <span>景区门票</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 2}})">
            <img v-if="active!=1" src="../../../static/img/vip3_2.png" alt />
            <img v-else src="../../../static/img/vip2_2.png" alt />
            <span>生日礼物</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 3}})">
            <img v-if="active!=1" src="../../../static/img/vip3_3.png" alt />
            <img v-else src="../../../static/img/vip2_3.png" alt />
            <span>开光祈福法会</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 4}})">
            <img v-if="active!=1" src="../../../static/img/vip3_4.png" alt />
            <img v-else src="../../../static/img/vip2_4.png" alt />
            <span>专属客服</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 5}})">
            <img v-if="active!=1" src="../../../static/img/vip3_5.png" alt />
            <img v-else src="../../../static/img/vip2_5.png" alt />
            <span>邀请返利</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 6}})">
            <img v-if="active!=1" src="../../../static/img/vip3_6.png" alt />
            <img v-else src="../../../static/img/vip2_6.png" alt />
            <span>拍卖免保证金</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 7}})">
            <img v-if="active==3||active==4" src="../../../static/img/vip3_7.png" alt />
            <img v-else src="../../../static/img/vip2_7.png" alt />
            <span>红包</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 8}})">
            <img v-if="active==3||active==4" src="../../../static/img/vip3_8.png" alt />
            <img v-else src="../../../static/img/vip2_8.png" alt />
            <span>购物打折</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 9}})">
            <img v-if="active==4" src="../../../static/img/vip3_9.png" alt />
            <img v-else src="../../../static/img/vip2_9.png" alt />
            <span>积分加成</span>
          </p>
          <p @click="$router.push({name : 'my-vipCenter-equityDetail',params : {name : 10}})">
            <img v-if="active==4" src="../../../static/img/vip3_10.png" alt />
            <img v-else src="../../../static/img/vip2_10.png" alt />
            <span>节假日活动加成</span>
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
    this.active = this.$route.params.active ? this.$route.params.active : 1;
    this.mySwiper.slideTo(this.active - 1, 0, false);
  }
};
</script>

<style scoped>
.vipEquity {
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
.vipEquity .tab {
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
.vipEquity .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.vipEquity .tab > p {
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
  padding: 0.399rem 0;
  position: relative;
}
.vipIntroduce > p {
  font-size: 0.3458rem;
  color: #808080;
  text-align: center;
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
.vipIntroduce > div {
  overflow: hidden;
  /* justify-content:flex-start; */
}
.vipIntroduce > div p {
  float: left;
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.399rem;
}
.vipIntroduce > div p img {
  width: 1.1704rem;
  height: 1.1704rem;
  display: block;
  margin-bottom: 0.1596rem;
}
.vipIntroduce > div p span {
  font-size: 0.3192rem;
  color: #463821;
}
</style>