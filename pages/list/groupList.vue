<template>
	<div class="groupList">
		<div class="tab">
			<i class="iconfont icon-left" @click="$router.go(-1)"></i>
			<p>团购活动</p>
			<i class="iconfont icon-wenhao" style="visibility:hidden;"></i>
		</div>
		<div class="tabber1">
			<p :class="status1==1?'screen':''" @click="selSynthesize()">综合</p>
			<p :class="status1==2?'screen':''" @click="selPrice()">
				价格
				<i v-if="price" class="iconfont icon-up"></i>
				<i v-if="!price" class="iconfont icon-down"></i>
			</p>
			<p :class="status1==3?'screen':''" @click="screen()">
				筛选
				<i class="iconfont icon-shaixuanxuanzhong"></i>
			</p>
		</div>
		<div class="filterBar" v-if="category.click">
			<p v-if="category.cScreenName">{{category.cScreenName}}</p>
			<p v-if="category.minimum && category.highest">{{category.minimum+'-'+category.highest}}</p>
		</div>
		<van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh" v-if="list&&list.length != 0">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<div class="goodslist">
					<div v-for="(item,i) in list" :key="i" @click="$router.push({name:'detail-groupDetail',query:{id:item.id}});">
						<img :src="item.thumb" alt />
						<p>{{item.title}}</p>
						<div>
							<p>
								<span>
									<i>¥</i>
									{{item.price}}
								</span>
								<del v-if="item.originalCost">
									<i>¥</i>
									{{item.originalCost}}
								</del>
							</p>
							<p>去拼团</p>
						</div>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
		<div class="noGoods" v-else>
			<img src="../../static/img/searchEmpty.png" alt />
			<p>没有找到相关的商品</p>
		</div>
		<van-overlay :show="mask" @click="mask = false;allCategory=0;" />
		<div v-if="allCategory==1" class="allCategory">
			<div v-for="(item,i) in clist" :key="i">
				<div class="categoryTitle">{{item.name}}</div>
				<div class="titleList">
					<p v-for="(val,k) in listTag[item.id]" @click="category.cScreen = val.id;name = val.name" :key="k" :class="category.cScreen == val.id?'redbg':''">{{val.name}}</p>
				</div>
			</div>
			<div class="price_section">
				<p>价格区间</p>
				<p>
					<input type="number" placeholder="最低价" v-model="category.minimum" />
					<span></span>
					<input type="number" placeholder="最高价" v-model="category.highest" />
				</p>
			</div>
			<div class="submit">
				<div @click="reset()">重置</div>
				<div @click="submit()">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import {
		List,
		PullRefresh,
		Overlay,
		Toast
	} from "vant";
	export default {
		data() {
			return {
				status1: 1,
				price: true, // 价格
				page: 1, // 当前页数
				totalPage: 2, // 总页数
				list: [], // 团购列表
				finished: false, // 没有更多开关
				isDownLoading: false, //下拉刷新的开关
				loading: false, //上拉加载开关
				mask: false, //遮罩层开关
				category: {
					//筛选弹窗
					cScreen: null, // 类目id
					cScreenName: null, //类目名字
					highest: "", // 最高值
					minimum: "", //最低值
					click: false //筛选弹窗开关
				},
				allCategory: 0, //弹窗开关，2为总类目，1为总类目下的小分类
				select: {
					categoryId: null,
					allId: null
				}, //  用户选择的类目
				titlelist: [],
				listTag: [],
			};
		},
		mounted() {
			//session中取出存储的数据
			this.goodsCategory = JSON.parse(sessionStorage.getItem("goodsCategory"));
			//请求接口，加载数据
			this.getData();
		},
		methods: {
			// 筛选综合
			selSynthesize() {
				this.status1 = 1;
				this.getData(1, null, 0, 0);
			},
			// 筛选价格
			selPrice() {
				this.finished = false;
				if (this.status1 != 2) {
					this.status1 = 2;
				} else {
					this.price = !this.price;
				}
				if (this.price && this.status1 == 2) {
					this.getData(null, null, 1, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
				} else if (!this.price && this.status1 == 2) {
					this.getData(null, null, 2, null); //page, gid, sort, price  sort---1价格升序 2--价格降序
				}
			},
			// 筛选框
			screen() {
				this.status1 = 3;
				if (this.status != 1) {
					this.mask = true;
					this.allCategory = 1;
				}
			},
			getData(page, gid, sort, price) {
				this.select = JSON.parse(sessionStorage.getItem("selectCategory")); //获得保存的数据
				let id = gid ? gid : this.select.categoryId; //判断类目id
				gid==0?id=0:'';
				console.log(this.select);
				let s = sort ? sort : "0";
				let priceRange = price ? price : (this.category.minimum && this.category.highest) ? this.category.minimum + "_" +
					this.category.highest : '';
				this.clist = this.goodsCategory.first;
				this.listTag = this.goodsCategory.second;
				this.page = page ? page : 1; //判断分页
				axios
					.get(
						"/ppi/index.php/api/group/goods_list?categoryId=" +
						id +
						"&span=10&page=" +
						this.page +
						"&sort=" +
						s +
						"&priceRange=" +
						priceRange
					)
					.then(res => {
						console.log(res);
						//如果页数为1就覆盖商品列表，否则就在商品列表后面添加
						if (this.page == 1) {
							this.list = res.data.list;
						} else {
							res.data.list.map((item, i) => {
								this.list.push(item);
							});
							this.loading = false; //关闭加载
						}
						//取出页数
						this.totalPage = res.data.totalPage;
					});
			},
			onDownRefresh() {
				//刷新
				this.finished = false;
				//刷新
				if (this.status1 == 2) {
					if (this.price) {
						this.getData(1, null, 1, null);
					} else {
						this.getData(1, null, 2, null);
					}
				} else {
					this.getData(1);
				}
				this.isDownLoading = false; //关闭刷新
			},
			onLoad() {
				//加载
				// 加载状态结束
				this.loading = false;
				// 判断当前页数是否大于总页数，若大于则关闭加载请求接口，否则请求接口
				if (this.status == 2 && this.status1 == 2 && this.totalPage > this.page) {
					this.loading = true;
					if (this.price) {
						this.getData(++this.page, null, 1, null);
					} else {
						this.getData(++this.page, null, 2, null);
					}
				} else if (this.totalPage > this.page) {
					this.loading = true;
					this.getData(++this.page, this.select.categoryId);
				} else {
					this.finished = true;
				}
			},
			submit() {
				//筛选按钮的确定
				if (
					this.category.cScreen != null &&
					!(this.category.highest || this.category.minimum)
				) {
					this.category.cScreenName = this.name;
					this.category.click = true;
					let selectCategory = {
						categoryId: this.category.cScreen,
						allId: null
					};
					sessionStorage.setItem(
						"selectCategory",
						JSON.stringify(selectCategory)
					);
					//判断筛选是否为空
					this.getData(1, this.category.cScreen);
					this.mask = false;
					this.allCategory = 0;
				} else if (
					this.category.cScreen &&
					this.category.highest &&
					this.category.minimum
				) {
					if (Number(this.category.minimum) >= Number(this.category.highest)) {
						Toast({
							message: "最高价不能小于等于最低值",
							position: "bottom"
						});
					} else {
						this.category.cScreenName = this.name;
						this.category.click = true;
						let selectCategory = {
							categoryId: this.category.cScreen,
							allId: this.select.allId
						};
						sessionStorage.setItem(
							"selectCategory",
							JSON.stringify(selectCategory)
						);
						let price = this.category.minimum + "_" + this.category.highest;
						this.getData(1, this.category.cScreen, null, price);
						this.mask = false;
						this.allCategory = 0;
					}
				} else if (
					this.category.highest &&
					this.category.minimum &&
					!this.category.cScreen
				) {
					if (Number(this.category.minimum) >= Number(this.category.highest)) {
						Toast({
							message: "最高价不能小于等于最低值",
							position: "bottom"
						});
					} else {
						this.category.click = true;
						let price = this.category.minimum + "_" + this.category.highest;
						this.getData(1, null, null, price);
						this.mask = false;
						this.allCategory = 0;
					}
				}
				if (!this.category.minimum && this.category.highest) {
					Toast({
						message: "请输入最低价",
						position: "bottom"
					});
				} else if (this.category.minimum && !this.category.highest) {
					Toast({
						message: "请输入最高价",
						position: "bottom"
					});
				}
			},
			reset(){
				this.category= {
					//筛选弹窗
					cScreen: null, // 类目id
					cScreenName: null, //类目名字
					highest: "", // 最高值
					minimum: "", //最低值
					click: false //筛选弹窗开关
				}
				this.getData(1,0);
			}
		},
		components: {
			List,
			PullRefresh,
			Overlay,
			Toast
		}
	};
</script>

<style scoped>
	.groupList {
		background: #f5f5f5;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		color: #1c0000;
		padding-top: 1.2rem;
	}

	/* 标签栏 */
	.groupList .tab {
		height: 1.2144rem;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 0.4rem;
		box-sizing: border-box;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 11;
		box-shadow: 0 0.0399rem 0.0798rem rgba(190, 190, 190, 0.1);
		background: linear-gradient(90deg,
			rgba(221, 8, 18, 1) 0%,
			rgba(194, 6, 12, 1) 100%);
	}

	.groupList .tab>i {
		font-size: 0.399rem;
		color: #fff;
	}

	.groupList .tab>p {
		font-size: 0.4256rem;
		font-weight: 500;
		color: #fff;
	}

	/* 选项卡 */
	.tabber1 {
		background: #fff;
		height: 1.1704rem;
		line-height: 1.1704rem;
		font-size: 0.3724rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		color: #9a9a9a;
	}

	.tabber1>p {
		flex: 1;
		text-align: center;
	}

	.tabber1 .screen {
		color: #74181b;
	}

	.tabber1 .screen i {
		color: #74181b;
	}

	.tabber1 p>i {
		font-size: 0.2394rem;
		margin-left: 0.06rem;
		color: #b2b2b2;
	}

	.tabber1>p {
		height: 100%;
	}

	.redStatus {
		border-bottom: 0.0266rem solid #74181b;
		color: #74181b;
	}

	/* 筛选条 */
	.filterBar {
		height: 1.1704rem;
		background: #fff;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 0.3724rem;
	}

	.filterBar p {
		padding: 0.133rem 0.4256rem;
		background: #f5f5f5;
		color: #1c0000;
		font-size: 0.3458rem;
		border-radius: 0.399rem;
		margin-right: 0.3192rem;
	}

	/* 商品列表 */
	.goodslist {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0.2128rem;
	}

	.goodslist>div {
		width: 4.655rem;
		background: #fff;
		border-radius: 0.1064rem;
		margin-bottom: 0.2128rem;
	}

	.goodslist>div img {
		width: 4.655rem;
		height: 4.655rem;
		display: block;
		background: #9a9a9a;
		border-radius: 0.1064rem 0.1064rem 0 0;
	}

	.goodslist>div>p {
		font-size: 0.3458rem;
		color: #1c0000;
		width: 4.256rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 0.1596rem;
		padding: 0 0.2128rem;
	}

	.goodslist>div>div {
		display: flex;
		padding: 0 0.2128rem;
		flex-direction: row;
		margin-top: 0.1596rem;
		padding-bottom: 0.3192rem;
		justify-content: space-between;
	}

	.goodslist>div>div p:nth-child(1) span:nth-child(1) {
		color: #dd0812;
		font-size: 0.4256rem;
		display: block;
	}

	.goodslist>div>div p:nth-child(1) span:nth-child(1) i {
		font-size: 0.3rem;
		font-style: normal;
	}

	.goodslist>div>div p:nth-child(1) del {
		font-size: 0.3192rem;
		color: #808080;
		display: block;
	}

	.goodslist>div>div p:nth-child(1) del i {
		font-style: normal;
		font-size: 0.3rem;
	}

	.goodslist>div>div p:nth-child(2) {
		color: #dd0812;
		font-size: 0.3192rem;
		border: 0.0266rem solid #dd0812;
		border-radius: 0.2926rem;
		width: 1.5428rem;
		height: 0.6118rem;
		line-height: 0.55rem;
		text-align: center;
		margin-top: 0.2128rem;
	}

	.allCategory {
		position: fixed;
		top: 0;
		right: -86%;
		width: 86%;
		height: 100%;
		background: #fff;
		z-index: 12;
		padding: 0.798rem 0.3192rem 0;
		-webkit-animation: slide 0.5s forwards;
		animation: slide 0.5s forwards;
		overflow-y: auto;
	}

	@-webkit-keyframes slide {
		100% {
			right: 0;
		}
	}

	@keyframes slide {
		100% {
			right: 0;
		}
	}

	.categoryTitle {
		color: #1c0000;
		font-size: 0.3724rem;
		margin-bottom: 0.399rem;
	}

	.allCategory>div {
		overflow: hidden;
		margin-bottom: 0.399rem;
	}

	.allCategory div p:nth-of-type(3n) {
		margin-right: 0;
	}

	.titleList p {
		float: left;
		width: 2.5004rem;
		height: 0.798rem;
		line-height: 0.798rem;
		margin-bottom: 0.3458rem;
		text-align: center;
		border-radius: 0.399rem;
		color: #1c0000;
		background: #f5f5f5;
		font-size: 0.3458rem;
		margin-right: 0.2128rem;
	}

	.allCategory div:nth-of-type(2) input {
		width: 3.6708rem;
		height: 0.798rem;
		line-height: 0.798rem;
		float: left;
		background: #f5f5f5;
		border: 1px solid #c3c3c3;
		color: #9a9a9a;
		opacity: 1;
		box-sizing: border-box;
		font-size: 0.3458rem;
		text-align: center;
		border-radius: 30px;
	}

	.allCategory div>.redbg {
		background: #e4d1d2;
	}

	.allCategory .submit {
		position: fixed;
		bottom: -0.1rem;
		right: 0;
		width: 86%;
		height: 1.1704rem;
		line-height: 1.1704rem;
		margin-bottom: 0;
	}

	.allCategory div:nth-of-type(2) input {
		width: 3.6708rem;
		height: 0.798rem;
		line-height: 0.798rem;
		float: left;
		background: #f5f5f5;
		border: 1px solid #c3c3c3;
		color: #9a9a9a;
		opacity: 1;
		box-sizing: border-box;
		font-size: 0.3458rem;
		text-align: center;
		border-radius: 30px;
	}

	.price_section {
		padding-bottom: 1.1704rem;
	}

	.price_section p {
		color: #1c0000;
		font-size: 0.3724rem;
		margin-bottom: 0.399rem;
	}

	.price_section>p {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.price_section input {
		width: 3.6708rem;
		height: 0.798rem;
		line-height: 0.798rem;
		float: left;
		background: #f5f5f5;
		border: 0.02667rem solid #c3c3c3;
		color: #9a9a9a;
		opacity: 1;
		box-sizing: border-box;
		font-size: 0.3458rem;
		text-align: center;
		border-radius: 0.8rem;
	}

	.price_section>p:nth-of-type(2) span {
		width: 0.3192rem;
		height: 0.032rem;
		background: #9a9a9a;
		display: block;
	}

	.submit>div {
		width: 50%;
		float: left;
		text-align: center;
		font-size: 0.4256rem;
	}

	.submit>div:nth-of-type(1) {
		color: #808080;
		background: #e9e9e9;
	}

	.submit>div:nth-of-type(2) {
		background: #74181b;
		color: #ffffff;
	}

	/* 遮罩层 */
	.van-overlay {
		z-index: 11 !important;
	}

	/* 筛选为空 */
	.noGoods {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 4rem 0;
		background: #f5f5f5;
	}

	.noGoods img {
		width: 3.99rem;
	}

	.noGoods p {
		font-size: 0.3192rem;
		color: #c3c3c3;
		margin-top: 0.2128rem;
	}
</style>
