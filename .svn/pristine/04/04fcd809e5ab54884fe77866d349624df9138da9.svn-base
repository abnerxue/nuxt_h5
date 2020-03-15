<template>
  <van-tabbar v-model="act" active-color="#74181b" inactive-color="#9A9A9A" :change="goRouter(act)">
    <van-tabbar-item>
      <span>首页</span>
      <i class="iconfont icon-shouye"  slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>分类</span>
      <i class="iconfont icon-leimupinleifenleileibie"  slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>百科</span>
      <i class="iconfont icon-baike"  slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>购物车</span>
      <i class="iconfont icon-gouwuche2"  slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>我的</span>
      <i class="iconfont icon-wode"  slot="icon"></i>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import axios from 'axios';
import { Tabbar, TabbarItem } from 'vant';
export default {
  data() {
    return {
      act: this.active,
    };
  },
  mounted() {
  },
  methods: {
    goRouter(act){
      if(act == 0){
        this.$router.push({name: 'index'});
      } else if(act == 1){
        this.$router.push({name: 'classification'});
      } else if(act == 2){
        this.$router.push({name: 'wikipedia'});
      } else if(act == 3){
        this.$router.push({name: 'cart'})
      } else if(act == 4){
        this.$router.push({name: 'my'});
      }
      
    }
  },
  components:{
    Tabbar,
    TabbarItem
  },
  props: ['active']
};
</script>

<style>
/* 标签栏 */
.van-tabbar{
  box-shadow:0px -1px 2px rgba(206,206,206,0.11);
}
.van-tabbar-item .iconfont{
  font-size: 15px;
}
.van-tabbar-item--active .iconfont{
  font-size: 18px;
}
</style>