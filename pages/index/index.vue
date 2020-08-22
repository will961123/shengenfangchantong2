<template>
	<view class="indexView">
		<swiper class="bannerList" style="height: 190px;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in bannerList" :key="index"><image style="width: 100%;" :src="item.picUrl" mode="scaleToFill"></image></swiper-item>
		</swiper>

		<swiper class="menuList bg-white   radius" :autoplay="false">
			<swiper-item v-for="(page, index) in menuList" :key="index" class="radius flex flex-wrap  ">
				<view
					@click="navgater"
					:data-path="item.page"
					:data-title="item.name"
					v-for="(item, index) in page"
					:key="index"
					class="item  flex flex-direction justify-center align-center "
				>
					<view :style="[{ background: item.color }]" class="iconBox flex align-center justify-center"><image :src="item.icon" mode="widthFix"></image></view>
					<text>{{ item.name }}</text>
				</view>
			</swiper-item>
		</swiper>

		<view class="noticeBox flex align-center bg-white">
			<view class="iconBox  text-center"><text class=" cuIcon cuIcon-notice text-green"></text></view>
			<swiper class="notice" :vertical="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item><view class="item textov1">不能大涨更不许大跌，房价调控进入维稳模式。</view></swiper-item>
				<swiper-item><view class="item textov1">楼市焦虑蔓延，专家：房市上升空间已不大。</view></swiper-item>
			</swiper>
		</view>

		<!-- <view class="section houseType bg-white flex justify-between">
			<view @click="navgater('/pages/index/houseList', '推荐')" v-for="(item, index) in houseType" :key="index" class="item">
				<image :src="item.pic" mode="scaleToFill"></image>
				<view class="title textov1">{{ item.title }}</view>
				<view class="desc textov1">{{ item.desc }}</view>
			</view>
		</view> -->

		<view class="section encyclopedias bg-white">
			<view class="sectionTitBox">
				<text class="title">房产全百科</text>
				<text class="desc">专业的买房攻略</text>
			</view>
			<view class="itemBox flex justify-between">
				<view
					@click="navgater"
					:data-path="item.path"
					:data-title="item.title"
					:data-type="item.type"
					v-for="(item, index) in encyclopedias"
					:key="index"
					class="item flex flex-direction justify-between align-center"
				>
					<image :src="item.icon" mode="widthFix"></image>
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>

		<view class="section dayNewsBox bg-white">
			<view class="sectionTitBox"><text class="title">每日要讯</text></view>
			<view
				@click="navgater"
				data-path="/pages/index/articleDetail"
				:data-title="item.id"
				v-for="(item, index) in dayNewsList"
				:key="index"
				class="newsItem flex justify-between"
			>
				<view style="flex: 1;" class="flex flex-direction justify-between">
					<view class="title textov2">{{ item.title }}</view>
					<view class="dateBox">
						<!-- <text>{{ item.num }}评论</text> -->
						<text>{{ item.createTime }}</text>
					</view>
				</view>
				<image :src="item.url" mode="aspectFill"></image>
			</view>
			<view class="noMore">没有更多了</view>
		</view>

		<view class="section guessYouLike bg-white">
			<view class="sectionTitBox"><text class="title">猜你喜欢</text></view>
			<!-- <view class="videoBox">
				<view class="titBox">
					<view class="tit">{{ guessYouLike.videoInfo.title }}</view>
					<view class="moneyBox flex justify-between align-center">
						<text>{{ guessYouLike.videoInfo.num }}分</text>
						<text class="money">{{ guessYouLike.videoInfo.money }}元/平</text>
					</view>
				</view>
				<video :src="guessYouLike.videoInfo.videoSrc" controls></video>
			</view> -->
			<view
				@click="navgater"
				data-path="/pages/index/houseDetail"
				data-title="新房"
				:data-id="item.louPanId"
				data-type="houseDetail"
				v-for="(item, index) in guessYouLike.list"
				:key="index"
				class="item bg-white flex"
			>
				<image :src="item.indexPic" mode="scaleToFill"></image>
				<view class="rightBox flex flex-direction justify-between">
					<view class="name">{{ item.louPanName }}</view>
					<view class="time flex align-center justify-between">
						<view>{{ item.createTime }}</view>
						<view class="money text-red">{{ item.price }}元/平</view>
					</view>
					<view class="textov1">
						<text>{{ item.houseType }}</text>
						<text class="size">{{ item.houseArea }}</text>
					</view>
					<view class="type ">
						<view class="textov1">{{ item.lightSpot }}{{ item.lightSpot }}</view>
						<!-- <text v-for="(type, index) in item.type" :key="index">#{{ type }}</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bannerList: [],
			// bannerList: [  'https://i.picsum.photos/id/957/750/350.jpg?hmac=YdAfSaOvsyFhv47TIsHp5O7-6H12ViGYipInnU3Z39o'],
			menuList: [
				[
					{ name: '新房', icon: '/static/indexmenu1.png', color: '#e95857', page: '/pages/index/houseList' },
					{ name: '二手房', icon: '/static/indexmenu2.png', color: '#70b436', page: '/pages/index/houseList' },
					{ name: '找租房', icon: '/static/indexmenu3.png', color: '#f09a53', page: '/pages/index/houseList' },
					{ name: '商铺', icon: '/static/indexmenu4.png', color: '#f2ae56', page: '/pages/index/houseList' },
					{ name: '写字楼', icon: '/static/indexmenu8.png', color: '#ec5d7f', page: '/pages/index/houseList' },
					// { name: '我要卖房', icon: '/static/indexmenu6.png', color: '#619ef6', page: '/pages/index/sellHouse' },
					// { name: '我要出租', icon: '/static/indexmenu7.png', color: '#5bb9dd', page: '/pages/index/sellHouse' },
					// { name: '出租商铺', icon: '/static/indexmenu5.png', color: '#5ec7af', page: '/pages/index/sellHouse' },
					// { name: '出租写字楼', icon: '/static/indexmenu10.png', color: '#ec5d7f', page: '/pages/index/sellHouse' },
					{ name: '经纪人', icon: '/static/indexmenu9.png', color: '#d9c18e', page: '/pages/index/brokerList' }
					
					
					// { name: '房产公司', icon: '/static/indexmenu10.png', color: '#66acf4', page: '/pages/index/realCompanyList' }
					// { name: '找小区', icon: '/static/indexmenu5.png', color: '#5ec7af', page: '/pages/index/houseList' },
					// { name: '写字楼', icon: '/static/indexmenu8.png', color: '#ec5d7f', page: '/pages/index/houseList' },
				]
				// [
				// 	{ name: '业主论坛', icon: '/static/indexmenu11.png', color: '#ee9045', page: '/pages/index/ownersForum' },
				// 	{ name: '房市热讯', icon: '/static/indexmenu12.png', color: '#f2ae56', page: '/pages/index/houseHotNews' },
				// 	{ name: '好视频', icon: '/static/indexmenu13.png', color: '#57b4d9', page: '/pages/index/goodVideo' },
				// 	{ name: '排行榜', icon: '/static/indexmenu14.png', color: '#e95857', page: '/pages/index/rankingList' },
				// 	{ name: '装修日记', icon: '/static/indexmenu15.png', color: '#ec6689', page: '/pages/index/forum' },
				// 	{ name: '装修攻略', icon: '/static/indexmenu16.png', color: '#70b436', page: '/pages/index/forum' },
				// 	{ name: '装饰公司', icon: '/static/indexmenu17.png', color: '#619ef6', page: '/pages/index/decorationCompany' },
				// 	{ name: '设计师', icon: '/static/indexmenu18.png', color: '#5ec7af', page: '/pages/index/designerList' },
				// 	{ name: '建材家具', icon: '/static/indexmenu19.png', color: '#d9c18e' },
				// 	{ name: '装修报价', icon: '/static/indexmenu20.png', color: '#6aaef4', page: '/pages/index/forum' }
				// ]
			],
			houseType: [
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '活动优惠', desc: '参与活动即享更多优惠' },
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '综合体', desc: '都市生活商圈' },
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '品牌开发商', desc: '大品牌放心购' }
			],
			encyclopedias: [
				// { title: '资讯', icon: '/static/encyclopedia1.png' },
				// { title: '问答', icon: '/static/encyclopedia2.png' },
				// { title: '知识', icon: '/static/encyclopedia3.png' },
				// { title: '贷款', icon: '/static/encyclopedia4.png' },
				// { title: '经纪人', icon: '/static/encyclopedia5.png' }
				// { title: '发布房聊', icon: '/static/encyclopedia1.png', path: '/pages/index/addArticle' },
				{ title: '资讯', icon: '/static/encyclopedia2.png', path: '/pages/news/news', type: 'tabbar' },
				// { title: '房贷计算器', icon: '/static/encyclopedia4.png' },
				{ title: '经纪人', icon: '/static/encyclopedia5.png', path: '/pages/index/brokerList' }
			],
			dayNewsList: [],
			guessYouLikePage: 1,
			guessYouLike: {
				videoInfo: {
					title: '卓越东部海岸',
					num: '4.1',
					money: '13700',
					videoSrc: ''
				},
				list: []
			}
		};
	},
	onLoad() {
		this.getdayNewsList();
		this.getGuessYouLike();
		this.getBannerList();
		this.getConfig()
	},
	onShareAppMessage() {
		return {
			title: '首页',
			path: '/pages/index/index?searchUserId=' + this.getUserId()
		};
	},
	onReachBottom() {
		this.getGuessYouLike();
	},
	methods: {
		getConfig(){ 
			this.request({
				url:'/microcosm/status',
				data:{},
				success:res=>{
					console.log('status',res)
					if(res.data.data === 'true'){
						uni.setStorageSync('status',true)
						this.encyclopedias.unshift({title: '发布房聊', icon: '/static/encyclopedia1.png', path: '/pages/index/addArticle'})
					}else{
						uni.setStorageSync('status',false)
					}
					
					// uni.setStorageSync('status',true)
				}
			}) 
		},
		getBannerList() {
			this.request({
				url: '/LouPanInfo/indexLunBo',
				data: {},
				success: res => {
					console.log('banner', res);
					if (res.data.code === 200) {
						this.bannerList = res.data.data;
					}
				}
			});
		},
		getdayNewsList() {
			this.request({
				url: '/LouPanInfo/selectArticleById',
				data: {},
				success: res => {
					console.log('每日要讯', res);
					if (res.data.code === 200) {
						this.dayNewsList = res.data.data;
					}
				}
			});
		},
		getGuessYouLike() {
			this.request({
				url: '/LouPanInfo/getAllLouPan',
				data: {
					page: this.guessYouLikePage,
					limit: 10
				},
				success: res => {
					console.log('猜您喜欢列表', res);
					if (res.data.code === 0) {
						this.guessYouLikePage++;
						res.data.data = res.data.data.map(i => {
							i.createTime = i.createTime.split('-')[0];
							return i;
						});
						this.guessYouLike.list.push(...res.data.data);
					}
				}
			});
		},
		navgater(e) {
			console.log(e);
			let path = e.currentTarget.dataset.path;
			let title = e.currentTarget.dataset.title;
			let type = e.currentTarget.dataset.type || '';
			if (type === 'tabbar') {
				uni.switchTab({
					url: path
				});
			} else if (type === 'houseDetail') {
				uni.navigateTo({
					url: path + '?title=' + title + '&id=' + e.currentTarget.dataset.id
				});
			} else {
				uni.navigateTo({
					url: path + '?title=' + title + '&id=' + title
				});
			}
		}
	}
};
</script>

<style lang="scss">
.indexView {
	padding-bottom: 20px;
}
.section {
	margin-top: 14px;
}
.sectionTitBox {
	padding: 0 25rpx;
	line-height: 80rpx;
	border: 1rpx solid #f5f5f5;
	.title {
		font-size: 34rpx;
		font-weight: 700;
		color: #000;
	}
	.desc {
		font-size: 30rpx;
		color: #666666;
		margin-left: 8px;
	}
}
.menuList {
	padding-top: 25px;
	height: 460rpx;
	border-bottom: 1rpx solid #f5f5f5;
	swiper-item {
		height: 100%;
		align-content: flex-start;
		.item {
			width: 33%;
			margin-bottom: 20px;
			.iconBox {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-bottom: 10px;
				& > image {
					width: 50rpx;
				}
			}
		}
	}
}
.noticeBox {
	height: 40px;
	.iconBox {
		width: 34px;
		font-size: 22px;
		margin-right: 6px;
	}
	.notice {
		flex: 1;
		height: 100%;
		swiper-item {
			height: 100%;
			line-height: 40px;
			color: #8c8c8c;
			font-size: 28rpx;
		}
	}
}

.houseType {
	padding: 25rpx 25rpx 30rpx 25rpx;
	.item {
		width: 220rpx;
		border: 4rpx solid #f5f4f5;
		border-radius: 6rpx;
		padding: 8rpx;
		& > image {
			width: 100%;
			height: 120rpx;
		}
		.title {
			font-size: 28rpx;
			color: #484c52;
			margin-top: 6px;
		}
		.desc {
			font-size: 24rpx;
			color: #676c73;
			margin-top: 4px;
			margin-bottom: 8px;
		}
	}
}
.encyclopedias {
	.itemBox {
		padding: 20px 0;
		.item {
			flex: 1;
			& > image {
				width: 70rpx;
			}
			& > text {
				font-size: 28rpx;
				color: #666;
				margin-top: 10px;
			}
		}
	}
}
.dayNewsBox {
	.newsItem {
		padding: 20rpx 25rpx;
		border-bottom: 1rpx solid #e9e9e9;
		.title {
			color: #333333;
			font-size: 28rpx;
		}
		.dateBox {
			font-size: 24rpx;
			color: #999;
			margin-right: 10rpx;
			& > text {
			}
		}
		& > image {
			width: 250rpx;
			height: 200rpx;
			margin-left: 20rpx;
		}
	}
	.noMore {
		line-height: 100rpx;
		font-size: 28rpx;
		color: #666;
		text-align: center;
	}
}
.guessYouLike {
	.videoBox {
		padding-bottom: 25rpx;
		border-bottom: 1rpx solid #ededed;
		.titBox {
			padding: 0 25rpx;
			.tit {
				font-size: 28rpx;
				color: #666;
				line-height: 2em;
				padding-top: 10rpx;
			}
			.moneyBox {
				font-size: 24rpx;
				color: #999;
				margin-bottom: 14rpx;
				.money {
					font-size: 29rpx;
					color: #f53530;
					font-weight: 700;
				}
			}
		}
		video {
			width: 100%;
			height: 320rpx;
		}
	}
	.item {
		padding: 20rpx;
		border-bottom: 1rpx solid #ededed;
		&:last-child {
			border: none;
		}
		& > image {
			width: 300rpx;
			height: 220rpx;
			margin-right: 20rpx;
		}
		.rightBox {
			font-size: 30rpx;
			color: #999;
			width: calc(100% - 320rpx);
			.name,
			.time {
				color: #000;
			}
			.time .money {
				font-size: 34rpx;
				font-weight: 700;
			}
			.size {
				margin-left: 50rpx;
			}
		}
	}
}
</style>
