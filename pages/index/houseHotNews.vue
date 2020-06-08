<template>
	<view class="houseHotNewsView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view class="bg-white">
			<view v-for="(item, index) in list" :key="index" class="newsItem flex justify-between">
				<view style="flex: 1;" class="flex flex-direction justify-between">
					<view class="title textov2">{{ item.title }}</view>
					<view class="dateBox">
						<text>{{ item.num }}评论</text>
						<text>{{ item.date }}</text>
					</view>
				</view>
				<image :src="item.pic" mode="aspectFill"></image>
			</view>
			<view class="noMore">没有更多了</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					title: '三四线城市房价的快速上涨既出乎意料又在情理之中。因为大家因为大家因为大家',
					num: 7,
					date: '2020-04-08',
					pic: 'https://i.picsum.photos/id/740/750/350.jpg'
				},
				{
					title: '三四线城市房价的快速上涨既出乎意料又在情理之中。因为大家因为大家因为大家',
					num: 7,
					date: '2020-04-08',
					pic: 'https://i.picsum.photos/id/740/750/350.jpg'
				}
			]
		};
	}
};
</script>

<style lang="scss">
.houseHotNewsView {
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
</style>
