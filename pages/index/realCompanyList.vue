<template>
	<view class="realCompanyListView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>
		<view v-for="(item, index) in list" :key="index" class="item bg-white flex">
			<image :src="item.pic" mode="scaleToFill"></image>
			<view class="rightBox flex align-center  justify-between">
				<view class="infoBox   flex flex-direction justify-between">
					<view class="name">{{ item.name }}</view>
					<view class="area">{{ item.area }}</view>
				</view>
				<view class="phoneBox flex flex-direction align-center text-green">
					<text class="cuIcon cuIcon-phone"></text>
					<text>电话咨询</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '买新房',
			list: [
				{
					name: '山芋清辉',
					area: '宝安区',
					phone: '123',
					pic: 'https://i.picsum.photos/id/482/750/350.jpg'
				},
				{
					name: '山芋清辉',
					area: '宝安区',
					phone: '123',
					pic: 'https://i.picsum.photos/id/482/750/350.jpg'
				}
			]
		};
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		uni.setNavigationBarTitle({
			title: this.title
		});
	}
};
</script>

<style lang="scss">
.realCompanyListView {
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
	.item {
		padding: 20rpx;
		border-bottom: 1rpx solid #ededed;
		&:last-child {
			border: none;
		}
		& > image {
			width: 300rpx;
			height: 200rpx;
			margin-right: 20rpx;
		}
		.rightBox {
			font-size: 30rpx;
			color: #999;
			flex: 1;
			.infoBox {
				height: 160rpx;
				.name{
					font-size: 34rpx;
					color: #000;
					font-weight: 600;
				}
			}
			.phoneBox {
				.cuIcon {
					font-size: 48rpx;
					margin-bottom: 4px;
				}
			}
		}
	}
}
</style>
