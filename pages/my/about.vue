<template>
  <div class="about">
    <div class="tab">
      <i class="iconfont icon-left" @click="$router.go(-1)"></i>
      <p>关于</p>
      <i class="iconfont icon-left" style="visibility:hidden;"></i>
    </div>
    <div class="alogo">
      <img src="../../static/img/logo.png" alt />
      <p>怀南会</p>
      <span>1.0.1</span>
    </div>
    <div class="arules">
      <div>
        <p>用户协议</p>
        <p>隐私协议</p>
      </div>
      <p>版权所有@2016-2020怀南会保留一切权利</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 1.2144rem;
  overflow-y: auto;
  overflow-x: hidden;
}
/* 标签栏 */
.about .tab {
  height: 1.2144rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
  box-sizing: border-box;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 0.0399rem 0.0798rem rgba(216, 216, 216, 0.1);
  position: fixed;
  top: 0;
  left: 0;
}
.about .tab > i {
  font-size: 0.399rem;
  color: #9a9a9a;
}
.about .tab > p {
  color: #1c0000;
  font-size: 0.4256rem;
  font-weight: 500;
}
.alogo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.333rem;
}
.alogo img {
  display: block;
  width: 1.596rem;
  height: 1.596rem;
  border-radius: 50%;
  background: #000;
  margin-bottom: 0.3192rem;
}
.alogo p {
  font-size: 0.3458rem;
  font-weight: 400;
  font-family: PingFang SC;
  color: #1c0000;
}
.alogo span {
  font-size: 0.3192rem;
  font-weight: 400;
  color: #9a9a9a;
  margin-top: 0.133rem;
}
.arules {
  position: absolute;
  width: 100%;
  bottom: 0.798rem;
}
.arules > div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2128rem;
}
.arules > div p {
  font-size: 0.3rem;
  font-weight: 400;
  color: #74181b;
  font-family: PingFang SC;
  margin: 0 0.133rem;
}
.arules > p {
  color: #9a9a9a;
  font-size: 0.266rem;
  font-weight: 400;
  font-family: PingFang SC;
  text-align: center;
}
</style>