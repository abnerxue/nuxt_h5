<template>
  <div class="redPaper">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>我的红包</p>
      <i class="iconfont icon-wenhao" @click="$router.push({name:'my-redPaper-paperRules'})"></i>
    </div>
    <div class="tabber">
      <p :class="status==1?'redStatus':''" @click="redpaper(1)">可使用</p>
      <p :class="status==2?'redStatus':''" @click="redpaper(2)">已使用</p>
      <p :class="status==3?'redStatus':''" @click="redpaper(3)">已失效</p>
    </div>
    <div
      v-if="redpaper_list"
      :class="status==1?'content':status==2?'content1 content':'content2 content'"
    >
      <div v-for="(redPa,i) in redpaper_list" :key="i">
        <div class="paperInfo">
          <p>
            <span>
              <i>¥</i>{{redPa.redPaper}}
            </span>
            <span>满{{redPa.minPrice}}元可用</span>
          </p>
          <p>
            <span>新人专享红包</span>
            <span>全场通用</span>
          </p>
        </div>
        <div class="paperTime">
          <span>{{ redPa.postTime | time }}-{{ redPa.endTime | time }}</span>
          <p>{{status==1?'去使用':status==2?'已使用':'已失效'}}</p>
        </div>
      </div>
    </div>
    <div v-else class="emptyPaper">
      <img src="../../../static/img/emptyPaper.png" alt />
      <p>暂无红包</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      status: 1,
      paper: false,
      redpaper_list: [] //红包列表
    };
  },
  filters: {
    time(value) {
      let date = value.split(" ")[0]; //获取日期
      let arr = date.split("-");
      console.log(arr);
      return arr[0] + "." + arr[1] + "." + arr[2];
    }
  },
  mounted() {
    this.redpaper(1);
  },
  methods: {
    redpaper(id) {
      let data = new FormData();
      this.redpaper_list = "";
      this.status = id;
      data.append("token", sessionStorage.getItem("token"));
      data.append("page", 1);
      data.append("status", id);
      data.append("span", 20);
      axios.post("/ppi/index.php/api/user/redpaper_list", data).then(res => {
        this.redpaper_list = res.data.list;
      });
    }
  }
};
</script>

<style scoped>
.redPaper {
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
.redPaper .tab {
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

.redPaper .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}

.redPaper .tab > p {
  font-size: 0.4256rem;
  font-weight: 500;
}

/* 选项卡 */
.tabber {
  background: #fff;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: #9a9a9a;
  z-index: 2;
}

.tabber > p {
  height: 100%;
}

.redStatus {
  border-bottom: 0.0266rem solid #74181b;
  color: #74181b;
}

/* 内容 */
.content {
  padding: 8px 12px;
  margin-top: 34px;
}

.content > div {
  padding-top: 0.3192rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.1064rem;
  margin-bottom: 10px;
}

.content .paperInfo {
  padding-left: 0.3192rem;
  padding-right: 0.399rem;
  padding-bottom: 0.3325rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content .paperInfo p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content .paperInfo p:nth-of-type(1) span:nth-of-type(1) {
  color: #dd0812;
  font-size: 0.6384rem;
  margin-bottom: 0.133rem;
}

.content1 .paperInfo p:nth-of-type(1) span:nth-of-type(1) {
  opacity: 0.5;
}

.content2 .paperInfo p:nth-of-type(1) span:nth-of-type(1) {
  color: #9a9a9a;
}

.content .paperInfo p:nth-of-type(1) span:nth-of-type(1) i {
  font-style: normal;
  font-size: 0.5rem;
  margin-right: 0.0532rem;
}

.content .paperInfo p:nth-of-type(2) span:nth-of-type(1) {
  font-size: 0.3458rem;
  color: #1c0000;
  margin-bottom: 0.1862rem;
}

.content .paperInfo p span {
  font-size: 0.3192rem;
  color: #9a9a9a;
  display: block;
}

.content .paperTime {
  border-top: 0.0133rem solid #f5f5f5;
  margin: 0 0.1995rem;
  padding: 0.1596rem 0.3192rem 0.1596rem 0.133rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.content .paperTime span {
  color: #9a9a9a;
  font-size: 0.3192rem;
}

.content .paperTime p {
  width: 1.7024rem;
  height: 0.5586rem;
  line-height: 0.5586rem;
  font-size: 0.3192rem;
  color: #fff;
  background: #dd0812;
  text-align: center;
  border-radius: 0.1064rem;
}

.content1 .paperTime p {
  opacity: 0.5;
}

.content2 .paperTime p {
  color: #9a9a9a;
  background-color: #f5f5f5;
}

/* 空红包 */
.emptyPaper {
  padding-top: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.emptyPaper img {
  display: block;
  width: 2.793rem;
}

.emptyPaper p {
  font-size: 0.3192rem;
  color: #c3c3c3;
  margin-top: 0.2128rem;
}
</style>
