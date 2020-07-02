<template>
	<view class="newsView">
		<view class="section dayNewsBox bg-white">
			<view 
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
			</view>
			<view class="noMore">没有更多了</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayNewsList: [
					{title:'不能大涨更不许大跌，房价调控进入维稳模式。',createTime:'2020-06-20 14:20:20'},
					{title:'楼市焦虑蔓延，专家：房市上升空间已不大。',createTime:'2020-07-01 11:10:50'},
				]
			};
		}
	}
</script>

<style lang="scss">
.newsView {
	.dayNewsBox {
		.newsItem {
			padding: 20rpx 25rpx;
			border-bottom: 1rpx solid #e9e9e9;
			.title {
				color: #333333;
				font-size: 28rpx;
				margin-bottom: 10px;
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
}
</style>
