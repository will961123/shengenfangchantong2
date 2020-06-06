<template>
	<view class="brokerListView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view v-for="(item, index) in list" :key="index" class="item bg-white flex align-start">
			<image :src="item.pic" mode="aspectFill"></image>
			<view class="infoBox">
				<view class="nameBox flex justify-between align-center">
					<view class="left">
						<view class="name">{{ item.name }}</view>
						<view class="company">{{ item.company }}</view>
					</view>
					<view class="phoneBox"><text class="cuIcon cuIcon-phone"></text></view>
				</view>
				<view class="mainBusiness textOv1">
					主营
					<text v-for="(main, index) in item.mainBusiness" :key="index">{{ main }}&nbsp;</text>
				</view>
				<view class="year textOv1">服务平台{{ item.time }}年 近期带看{{ item.num }}次 服务{{ item.peopleNum }}人</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					pic: '/static/logo.png',
					name: '夏江川',
					company: '博悦恒大名都店',
					mainBusiness: ['郾城-郾城城区', '源汇-源汇城区', '源汇-源汇城区' ],
					time: '1-3',
					num: 2,
					peopleNum: 55
				},
				{
					pic: '/static/logo.png',
					name: '夏江川',
					company: '博悦恒大名都店',
					mainBusiness: ['郾城-郾城城区', '源汇-源汇城区'],
					time: '1-3',
					num: 2,
					peopleNum: 55
				}
			]
		};
	}
};
</script>

<style lang="scss">
.brokerListView {
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
		padding: 30rpx 25rpx;
		border-bottom: 1rpx solid #ededed;
		&:last-child {
			border-bottom: none;
		}
		& > image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
		.infoBox {
			flex: 1;
			font-size: 24rpx;
			line-height: 1.8em;
			color: #000;
			.nameBox {
				.name {
					font-size: 32rpx;
					font-weight: 700;
				}
				.phoneBox {
					border-radius: 50%;
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					background-color: rgba(106, 217, 147, 0.2);
					font-size: 40rpx;
					border-radius: 50;
					color: #63c35e;
				}
			}
		}
	}
}
</style>
