<template>
	<div class="redPaper">
		<div class="tab">
			<i class="iconfont icon-left" @click="$router.go(-1)"></i>
			<p>选择红包</p>
			<i class="iconfont icon-left" style="visibility:hidden;"></i>
		</div>
		<!-- 红包列表 -->
		<div class="paperList">
			<div @click="redPapes(redPa)" v-for="(redPa,i) in redPaper_list" :key="i">
				<div>
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
				<span>{{redPa.postTime}}——{{redPa.endTime}}</span>
				<input type="radio" name="1" :value="redPa.id" v-model="redPaper">
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				redPaper:0,
				redPaper_list:[],
				redPapers:[]
			};
		},
		mounted() {
			let data = new FormData();
			let that = this;
			this.redPapers = eval('(' + sessionStorage.getItem('redPaper') + ')');
			data.append('token',sessionStorage.getItem('token'))
			axios.post('/ppi/index.php/api/user/redpaper_list',data).then(res=>{
				var rl = res.data.list;
				for (let i in rl) {
					if (this.id_in_array(rl[i].id, this.redPapers)) {
						that.redPaper_list.push(res.data.list[i]);
					}
				}
				that.redPaper = that.redPaper_list[0].id;
			})
		},
		methods: {
			id_in_array(id, arr) { //判断id,是否存在arr数组中的id键值
				id = parseInt(id);
				if (this.isEmpty(id)) {
					return false;
				}
				if (typeof(arr) != 'object') {
					return false;
				}
				for (let i in arr) {
					if (!this.isEmpty(arr[i].id) && arr[i].id == id) {
						return true;
					}
				}
				return false;
			},
			isEmpty: function(parameter) {
				if (typeof parameter == "undefined" || typeof parameter == undefined) {
					return true;
				} else if (typeof parameter == 'NaN' || typeof parameter == NaN) {
					return true;
				} else if (parameter == null) {
					return true;
				} else if (parameter.length == 0) {
					return true;
				} else if (parameter == "" || parameter == 0) {
					return true;
				}
				return false;
			},
			redPapes(redPaper){
				this.redPaper = redPaper.id;
				sessionStorage.setItem('redPapers',JSON.stringify(redPaper))
				this.$router.go(-1)
			}
		},
		components: {}
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
		padding-top: 1.2144rem;
		overflow-y: auto;
		overflow-x: hidden;
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
		box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
		position: fixed;
		top: 0;
		left: 0;
	}

	.redPaper .tab>i {
		font-size: 0.399rem;
		color: #9a9a9a;
	}

	.redPaper .tab>p {
		color: #1c0000;
		font-size: 0.4256rem;
		font-weight: 500;
	}

	/* 红包列表 */
	.paperList {
		padding: 8px 12px 0;
	}

	.paperList>div {
		background: #fff;
		height: 103px;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 8px;
	}

	.paperList>div>div {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #f5f5f5;
		padding: 12px;
	}

	.paperList>div>div p {
		display: flex;
		flex-direction: column;
	}

	.paperList>div>div p:nth-child(1) {
		align-items: center;
		margin-right: 30px;
	}

	.paperList>div>div p:nth-child(1) span:nth-child(1) {
		color: #dd0812;
		font-size: 24px;
		font-weight: 600;
	}

	.paperList>div>div p:nth-child(1) span:nth-child(1) i {
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
	}

	.paperList>div>div p:nth-child(1) span:nth-child(2) {
		color: #9a9a9a;
		font-size: 13px;
	}

	.paperList>div>div p:nth-child(2) span:nth-child(1) {
		color: #1c0000;
		font-size: 13px;
		margin-bottom: 6px;
	}

	.paperList>div>div p:nth-child(2) span:nth-child(2) {
		color: #9a9a9a;
		font-size: 13px;
	}

	.paperList>div>span {
		display: block;
		padding: 8px 12px;
		color: #9A9A9A;
		font-size: 12px;
	}

	/* 单选框样式 */
	.paperList>div input {
		-webkit-appearance: none;
		width: 17px;
		height: 17px;
		background-color: #fff;
		border: 1px solid #c9c9c9;
		border-radius: 50%;
		outline: none;
		position: absolute;
		bottom: 43px;
		right: 12px;
		cursor: pointer;
	}

	.paperList>div input:checked {
		border: 0;
		background: url("../../static/img/inputCheck.png") no-repeat center;
		background-size: 100% 100%;
	}
</style>
