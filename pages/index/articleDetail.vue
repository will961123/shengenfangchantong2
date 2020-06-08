<template>
	<!-- 资讯详情 -->
	<view class="articleDetailView ">
		<view class="bg-white" style="padding: 30rpx 25rpx;" >
			<view class="articleTit">三四线城市房价的快速上涨及出乎意料又在情理之中。因为大量的购房需求仍然存在，但是并没有被刺激</view>
			<view class="dateBox flex justify-between">
				<view class="type">特价房</view>
				<view class="date">2020-04-08 18:18:18</view>
			</view>
			<image class="contentPic" src="https://i.picsum.photos/id/740/750/350.jpg" mode="widthFix"></image>
			<view class="contentDesc">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis quaerat nobis quas nisi unde ipsa dolorem cupiditate possimus sunt sit laudantium eos sequi
				dolor. Facere ab assumenda recusandae error aliquid molestiae aut sunt iste possimus earum repudiandae eum dolor beatae atque porro doloremque labore ipsa.
				Cupiditate sequi quas architecto laboriosam.
			</view>

			<view class="adVIew flex align-center justify-between">
				<view class="left flex align-center">
					<image src="/static/logo.png" mode=""></image>
					<view class="flex flex1 flex-direction justify-between">
						<view class="name">藤原房产</view>
						<view class="desc">回复“藤原房产”关注公众号</view>
					</view>
				</view>
				<button class="btn cu-btn bg-red">互动</button>
			</view>
			<view class="seeNum">
				阅读 620
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: ''
		};
	},
	onLoad(options) {
		options.id ? (this.id = options.id) : '';
	}
};
</script>

<style lang="scss">
.articleDetailView { 
	.articleTit {
		font-size: 38rpx;
		font-weight: 700;
		color: #000;
	}
	.dateBox {
		font-size: 24rpx;
		color: #999;
		margin-top: 34rpx;
		margin-bottom: 60rpx;
		.type {
			display: inline-block;
			color: #666;
			background-color: #eeeeee;
			padding: 4rpx;
		}
	}
	.contentPic {
		width: 100%;
	}
	.contentDesc {
		font-size: 34rpx;
		color: #666;
	}
	.adVIew {
		background-color: #f8f8f8;
		padding: 24rpx 30rpx;

		margin-top: 80px;
		.left {
			color: #999;
			font-size: 20rpx;
			& > image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.name {
				color: #000;
				font-size: 30rpx;
				margin-bottom: 14rpx;
			}
		}
		.btn {
			padding: 0;
			line-height: 40rpx;
			border-radius: 40rpx;
			color: #fff;
			width: 120rpx;
		}
	}
	.seeNum{
		margin-top: 20px;
		color: #999;
		font-size: 24rpx;
	}
}
</style>
