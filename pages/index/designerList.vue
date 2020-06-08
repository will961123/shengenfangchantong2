<template>
	<!-- 设计师 -->
	<view class="designerListView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view v-for="(item, index) in list" :key="index" class="videoItem flex bg-white">
			<image :src="item.pic" mode="aspectFill"></image>
			<view class="infoBox flex flex-direction justify-around">
				<view class="tit">{{ item.name }}</view>
				<view class="yearBox flex justify-between align-center">
					<text>{{ item.year }}年从业时间</text>
					<text>{{ item.money }}/m²</text>
				</view>
				<view>{{ item.company }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ pic: 'https://i.picsum.photos/id/740/750/350.jpg', company: '名雕高端装修', name: '张梅换', year: 5, money: '100-200' },
				{ pic: 'https://i.picsum.photos/id/740/750/350.jpg', company: '名雕高端装修', name: '张梅换', year: 3, money: '100-200' }
			]
		};
	}
};
</script>

<style lang="scss">
.designerListView {
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
			width: 200rpx;
			height: 200rpx;
			margin-right: 26rpx;
			border-radius: 50%;
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
