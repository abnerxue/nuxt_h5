<template>
  <div class="classification">
    <div class="tab">
      <p @click="$router.push({name:'search'})">
        <i class="iconfont icon-sousuo"></i>
        <span>请输入搜索关键词</span>
      </p>
    </div>
    <div class="content">
      <div class="leftTab">
        <a :class="tag==item.id?'active':''" v-for="(item,i) in list" :key="i" @click="tag = item.id" :href="'#tagRight'+item.id">{{item.name}}</a>
      </div>
      <div class="rightTab" id='rightTab'>
        <div  v-for="(item,i) in list" :key="i" :id="'tagRight'+item.id"  :class="tag==item.id?'active':''">
          <div class="title">{{item.name}}</div>
          <div class="titleList">
            <p v-for="(val,k) in listTag[item.id]" @click="toList(val.id,item.id)" :key="k">
              <img :src="val.thumb">
              <span>{{val.name}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Tabbar :active=1></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../../components/tabber.vue'
import { Toast } from "vant";
import axios from "axios";
export default {
  data(){
    return {
      data: null,
      list: [],
      listTag: [],
      tag: 0,
    }
  },
  mounted(){
    this.getData();
    document.getElementById('rightTab').addEventListener('scroll', this.handleScroll);
  },
  methods:{
    changeId(id){
    },
    getData(){
      // 分类列表
      axios.get("/ppi/index.php/api/goods/category").then(res => {
        console.log(res);
        this.list = res.data.first;
				this.tag = res.data.first[0].id;
        this.data = res.data;
        this.listTag = res.data.second;
        let goodsCategory = { 'first': res.data.first,'second': res.data.second};
        sessionStorage.setItem('goodsCategory', JSON.stringify(goodsCategory));
      });
    },
    // 获取滚动条高度
    handleScroll() {
      let b = document.getElementById('rightTab').scrollTop;
      for(var i in this.list){
        let a=document.getElementById('tagRight'+this.list[i].id)
        if(b+50 >= a.offsetTop){
          this.tag = this.list[i].id;
        }
      }
    },
    toList(categoryId,allId){
      let selectCategory = { categoryId,allId };
      sessionStorage.setItem('selectCategory', JSON.stringify(selectCategory));
      this.$router.push({name:'list-classifyList'});
    }
  },
  components:{
    Tabbar,Toast
  }
};
</script>

<style scoped>
.classification {
  background: #fff;
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
.classification .tab {
  height: 1.2144rem;
  width: 100%;
  padding: 0.266rem 0.3192rem;
  box-sizing: border-box;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
}
.tab>p{
  background: #F5F5F5;
  height: 0.6384rem;
  line-height: 0.6384rem;
  border-radius: 0.3192rem;
  text-align: center;
  font-size: 0.3192rem;
  color: #9A9A9A;
}
.tab>p i{
  font-size: 0.3591rem;
}
/* 选项卡 */
/* 左边 */
.content{
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.content .leftTab{
  width: 2.0748rem;
  height: 100%;
  background: #F5F5F5;
  text-align: center;
  font-size: 0.39rem;
}
.content .leftTab a{
  width: 2.0748rem;
  height: 1.064rem;
  display: block;
  color: #1C0000;
  line-height: 1.064rem;
}
.content .leftTab .active,.rightTab>div .rightTab{
  background: #fff;
  color: #74181B;
}

.rightTab{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 12.5rem;
}
.rightTab>div{
  padding: 0.3192rem;
  padding-bottom: 0;
}
.rightTab>div .title{
  padding: 0 0.2128rem;
  color: #1C0000;
  font-size: 0.39rem;
  line-height: 0.4921rem;
  height: 0.4921rem;
  border-left: 0.0798rem solid #74181b;
}
.rightTab>div .titleList{
  overflow: hidden;
  padding-top: 0.399rem;
}
.rightTab>div .titleList p{
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;
  margin-bottom: 0.7315rem;
}
.rightTab>div .titleList p img{
  width: 1.4098rem;
  height: 1.4098rem;
  display: block;
  margin-bottom: 0.266rem;
}
.rightTab>div .titleList p span{
  color: #2E2E2E;
  font-size: 0.35rem;
}
</style>