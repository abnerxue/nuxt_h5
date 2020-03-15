<template>
	<div class="modifyName">
		<div class="tab">
			<i class="iconfont icon-left" @click="$router.go(-1)"></i>
			<p>修改昵称</p>
			<span @click="sava">保存</span>
		</div>
		<textarea rows="10" v-model="name"></textarea>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				name:''
			};
		},
		mounted() {
			this.name = this.$route.query.userName;

		},
		methods:{
			sava(){
				let data = new FormData();
				data.append('token',sessionStorage.getItem('token'))
				data.append('nickName',this.name)
				axios.post('/ppi/index.php/api/user/nick_name',data).then(res=>{
					sessionStorage.setItem('name',this.name)
				})
			},

		}
	};
</script>

<style scoped>
	.modifyName {
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
	.modifyName .tab {
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

	.modifyName .tab>i {
		font-size: 0.399rem;
		color: #9a9a9a;
	}

	.modifyName .tab>p {
		font-size: 0.4256rem;
		font-weight: 500;
	}

	.modifyName .tab>span {
		font-size: 12px;
		color: #808080;
	}

	textarea {
		height: 150px;
		background: #fff;
		resize: none;
		width: 100%;
		display: block;
		font-size: 13px;
		color: #1c0000;
		border: none;
		outline: none;
		padding: 15px 12px;
	}
</style>
