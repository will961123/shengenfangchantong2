<template>
	<view class="myView">
		<view class="topBox   flex justify-between align-center">
			<view class="userBox flex  align-center">
				<image src="../../static/logo.png" mode="aspectFill"></image>
				<text>用户名</text>
			</view>
			<text class="cuIcon cuIcon-right"></text>
		</view>

		<view class="menuBox">
			<view class="item bg-white flex align-center">
				<!-- <image src="../../static/logo.png" mode="widthFix"></image> -->
				<text style="font-size: 42rpx;margin-right: 16rpx;" class=" cuIcon cuIcon-notice "></text>
				系统通知
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.myView {
	.topBox {
		height: 100px;
		padding: 0 40rpx;
		color: #000;
		background-color: #62b65d;
		.userBox {
			font-size: 28rpx;
			& > image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-right: 8rpx;
			}
		}
		.cuIcon {
			font-size: 48rpx;
		}
	}
	.menuBox {
		margin-top: 10px;
		.item {
			padding: 0 40rpx;
			line-height: 50px;
			& > image {
				width: 30rpx;
				margin-right: 16rpx;
			}
		}
	}
}
</style>
