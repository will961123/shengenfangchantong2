<template>
	<view class="newsView">
		<view class="section dayNewsBox bg-white">
			<view
				@click="navgater"
				data-path="/pages/index/articleDetail"
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
				<image :src="item.url" mode="aspectFill"></image>
			</view>
			<view class="noMore">没有更多了</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dayNewsList: []
		};
	},
	onLoad() {
		this.getdayNewsList();
	},
	onShareAppMessage() {
		return {
			title: '有料',
			path: '/pages/news/news?searchUserId=' + this.getUserId()
		};
	},
	methods: {
		getdayNewsList() {
			this.request({
				url: '/LouPanInfo/selectArticleById',
				data: {},
				success: res => {
					console.log('每日要讯', res);
					if (res.data.code === 200) {
						this.dayNewsList = res.data.data;
					}
				}
			});
		},
		navgater(e) {
			console.log(e);
			let path = e.currentTarget.dataset.path;
			let title = e.currentTarget.dataset.title;
			uni.navigateTo({
				url: path + '?title=' + title + '&id=' + title
			});
		}
	}
};
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
