<template>
	<!-- 装饰公司 -->
	<view class="decorationCompanyView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view v-for="(item,index) in list" :key="index" class="videoItem flex bg-white">
			<image :src="item.pic" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-around">
				<view class="tit">{{item.title}}</view>
				<view class="startBox flex align-center">
					<image v-for="(start,index) in 5" :key="index" class="start" :src="index>=item.start?'/static/start.png':'/static/start1.png'" mode="widthFix"></image>
					{{item.num}}
					<image class="eye" src="/static/eye.png" mode="widthFix"></image>
					{{item.see}}
				</view>
				<view >宝安区</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ pic: 'https://i.picsum.photos/id/740/750/350.jpg', title: '名雕高端装修', start: 5, num: '10.0', see: 999 },
				{ pic: 'https://i.picsum.photos/id/740/750/350.jpg', title: '名雕高端装修', start: 3, num: '10.0', see: 999 }
			]
		};
	}
};
</script>

<style lang="scss">
.decorationCompanyView {
	.searchBox {
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

	.videoItem {
		padding: 24rpx 20rpx;
		border-bottom: 1rpx solid #ededed;
		& > image {
			width: 250rpx;
			height: 190rpx;
			margin-right: 26rpx;
			border-radius: 8rpx;
		}
		.infoBox {
			flex: 1;
			font-size: 30rpx;
			.tit {
				font-size: 34rpx;
				color: #666;
				font-weight: 700;
			}
			.startBox {
				color: #999;
				font-size: 24rpx;
				.start {
					margin-right: 8rpx;
					width: 24rpx;
				}
				.eye {
					margin-left: 40rpx;
					margin-right: 6rpx;
					width: 24rpx;
				}
			}
		}
	}
}
</style>
