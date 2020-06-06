<template>
	<view class="indexView">
		<swiper class="bannerList" style="height: 135px;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in bannerList" :key="index"><image style="width: 100%;" :src="item" mode="scaleToFill"></image></swiper-item>
		</swiper>

		<swiper class="menuList bg-white square-dot will-dot radius" :indicator-dots="true" :autoplay="false">
			<swiper-item v-for="(page, index) in menuList" :key="index" class="radius flex flex-wrap  ">
				<view @click="navgater(item.page, item.name)" v-for="(item, index) in page" :key="index" class="item  flex flex-direction justify-center align-center ">
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

		<view class="section houseType bg-white flex justify-between">
			<view v-for="(item, index) in houseType" :key="index" class="item">
				<image :src="item.pic" mode="scaleToFill"></image>
				<view class="title textov1">{{ item.title }}</view>
				<view class="desc textov1">{{ item.desc }}</view>
			</view>
		</view>

		<view class="section encyclopedias bg-white">
			<view class="sectionTitBox">
				<text class="title">房产全百科</text>
				<text class="desc">专业的买房攻略</text>
			</view>
			<view class="itemBox flex justify-between">
				<view v-for="(item, index) in encyclopedias" :key="index" class="item flex flex-direction justify-between align-center">
					<image :src="item.icon" mode="widthFix"></image>
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bannerList: ['https://i.picsum.photos/id/482/750/350.jpg', 'https://i.picsum.photos/id/740/750/350.jpg'],
			menuList: [
				[
					{ name: '买新房', icon: '/static/indexmenu1.png', color: '#e95857', page: '/pages/index/houseList' },
					{ name: '买二手房', icon: '/static/indexmenu2.png', color: '#70b436', page: '/pages/index/houseList' },
					{ name: '找租房', icon: '/static/indexmenu3.png', color: '#f09a53', page: '/pages/index/houseList' },
					{ name: '商铺', icon: '/static/indexmenu4.png', color: '#f2ae56', page: '/pages/index/houseList' },
					{ name: '找小区', icon: '/static/indexmenu5.png', color: '#5ec7af', page: '/pages/index/houseList' },
					{ name: '我要卖房', icon: '/static/indexmenu6.png', color: '#619ef6', page: '/pages/index/sellHouse' },
					{ name: '我要出租', icon: '/static/indexmenu7.png', color: '#5bb9dd', page: '/pages/index/sellHouse' },
					{ name: '写字楼', icon: '/static/indexmenu8.png', color: '#ec5d7f' },
					{ name: '经纪人', icon: '/static/indexmenu9.png', color: '#d9c18e', page: '/pages/index/brokerList' },
					{ name: '房产公司', icon: '/static/indexmenu10.png', color: '#66acf4', page: '/pages/index/realCompanyList' }
				],
				[
					{ name: '业主论坛', icon: '/static/indexmenu11.png', color: '#ee9045' },
					{ name: '房市热讯', icon: '/static/indexmenu12.png', color: '#f2ae56' },
					{ name: '好视频', icon: '/static/indexmenu13.png', color: '#57b4d9' },
					{ name: '排行榜', icon: '/static/indexmenu14.png', color: '#e95857' },
					{ name: '装修日记', icon: '/static/indexmenu15.png', color: '#ec6689' },
					{ name: '装修攻略', icon: '/static/indexmenu16.png', color: '#70b436' },
					{ name: '装饰公司', icon: '/static/indexmenu17.png', color: '#619ef6' },
					{ name: '设计师', icon: '/static/indexmenu18.png', color: '#5ec7af' },
					{ name: '建材家具', icon: '/static/indexmenu19.png', color: '#d9c18e' },
					{ name: '装修报价', icon: '/static/indexmenu20.png', color: '#6aaef4' }
				]
			],
			houseType: [
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '活动优惠', desc: '参与活动即享更多优惠' },
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '综合体', desc: '都市生活商圈' },
				{ pic: 'https://i.picsum.photos/id/482/750/350.jpg', title: '品牌开发商', desc: '大品牌放心购' }
			],
			encyclopedias: [
				{ title: '资讯', icon: '/static/encyclopedia1.png' },
				{ title: '问答', icon: '/static/encyclopedia2.png' },
				{ title: '知识', icon: '/static/encyclopedia3.png' },
				{ title: '贷款', icon: '/static/encyclopedia4.png' },
				{ title: '经纪人', icon: '/static/encyclopedia5.png' }
			]
		};
	},
	onLoad() {},
	methods: {
		navgater(path, name) {
			uni.navigateTo({
				url: path + '?title=' + name
			});
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
			width: 20%;
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
</style>
