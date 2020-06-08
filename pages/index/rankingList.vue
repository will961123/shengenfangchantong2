<template>
	<!-- 排行榜 -->
	<view class="rankingListView">
		<view class="sectionTitBox  bg-white">
			<text class="title">新开楼盘</text>
			<text class="desc">新开楼盘看这里</text>
		</view>
		<view class="topPicList bg-white ">
			<view v-for="(item, index) in newHouseList" :key="index" class="item">
				<image :src="item.pic" mode="aspectFill"></image>
				<view class="infoBox">{{ item.name }}</view>
			</view>
		</view>

		<!-- <view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view> -->
		<view class="sectionTitBox  bg-white">
			<text class="title">热搜排行</text>
			<text class="desc">热搜楼盘看这里</text>
		</view>

		<view v-for="(item, index) in hotList" :key="index" class="hotItem bg-white flex">
			<image :src="item.pic" mode="scaleToFill"></image>
			<view class="rightBox flex flex-direction justify-between">
				<view class="name">{{ item.name }}</view>
				<view class="time flex align-center justify-between">
					<view>{{ item.year }}</view>
					<view class="money text-red">{{ item.money }}元/平</view>
				</view>
				<view>
					<text>{{ item.size1 }}</text>
					<text class="size">{{ item.size2 }}m²</text>
				</view>
				<view class="type">
					<text v-for="(type, index) in item.type" :key="index">#{{ type }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			newHouseList: [
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					name: '山芋清辉'
				},
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					name: '山芋清辉'
				},
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					name: '山芋清辉'
				}
			],
			hotList: [
				{
					name: '山芋清辉',
					year: '2017',
					area: '宝安区',
					money: '77000',
					size1: '三室',
					size2: '90',
					type: ['普通住宅'],
					id: '123',
					pic: 'https://i.picsum.photos/id/482/750/350.jpg'
				},
				{
					name: '山芋清辉',
					year: '2017',
					area: '宝安区',
					money: '77000',
					size1: '三室',
					size2: '90',
					type: ['普通住宅'],
					id: '123',
					pic: 'https://i.picsum.photos/id/482/750/350.jpg'
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss">
.rankingListView {
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
	.topPicList {
		height: 365rpx;
		width: 100%;
		padding-left: 25rpx;
		white-space: nowrap;
		overflow-x: auto;
		padding-bottom: 25rpx;
		margin-bottom: 14px;
		.item {
			display: inline-block;
			width: 460rpx;
			height: 340rpx;
			position: relative;
			margin-right: 18rpx;
			border-radius: 16rpx;
			overflow: hidden;
			& > image {
				width: 100%;
				height: 100%;
			}
			.infoBox {
				width: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				color: #fff;
				font-size: 28rpx;
				text-align: center;
				line-height: 360rpx;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}
	.searchBox {
		margin-top: 14rpx;
		padding: 14rpx 20rpx;
		margin-bottom: 8px;
		height: 90rpx;
		.iptBox {
			height: 100%;
			background-color: #f1f1f1;
			flex: 1;
			padding: 0 20rpx;
			border-radius: 10rpx;
			& > input {
				font-size: 26rpx;
				flex: 1;
				height: 100%;
				margin-left: 20rpx;
			}
		}
		& > text {
			display: inline-block;
			margin-left: 30rpx;
			font-weight: 700;
			color: #666;
		}
	}
	.hotItem {
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
			flex: 1;
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
