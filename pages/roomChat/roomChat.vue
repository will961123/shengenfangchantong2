<template>
	<view class="roomChatView">
		<view  v-if="!status" class="newsItem bg-white flex justify-between">
			<view style="flex: 1;" class="flex flex-direction justify-between">
				<view class="title textov2">春暖花开，一起去游玩吧</view>
				<view class="dateBox"><text>2020:08:08 21:21:21</text></view>
			</view>
			<image src="http://housecollection.oss-cn-beijing.aliyuncs.com/loupan-picture/infoPic/1587866609511_108.jpg" mode="aspectFill"></image>
		</view>

		<view v-else @click="gotoPostDetail" :data-id="item.microcosmId" v-for="(item, index) in postList" :key="index" class="postList flex bg-white">
			<view class="headBox"><image :src="item.userInfo.avatar_url" mode="aspectFill"></image></view>
			<view style="width: calc(100% - 100rpx);">
				<view class="nameBox flex align-center">
					<text>{{ item.userInfo.nick_name }}</text>
					<!-- <view v-show="item.postType1" class="type bg-blue">置顶</view>
					<view v-show="item.postType2" class="type bg-orange">精品</view> -->
				</view>
				<!-- <view class="title textov1 ">{{ item.title }}</view> -->
				<!-- view class="title textov1 "><text class="text-blue">#{{item.postTypeText}}#</text>{{item.title}}</view> -->
				<view class="desc textov2">{{ item.content }}</view>
				<!-- <view class="contentPic"><image :src="item.contentPic" mode="widthFix"></image></view> -->
				<view v-if="item.picUrlList.length > 0" class="cu-form-group" style="padding: 0;">
					<view class="grid col-3 grid-square flex-sub">
						<view class="bg-img" v-for="(img, idx) in item.picUrlList" :key="idx" :data-url="item.url"><image :src="img.url" mode="aspectFill"></image></view>
					</view>
				</view>
				<view v-if="item.address" class="addressBox text-gray">{{ item.address }}</view>
				<view class="dateBox flex justify-between align-center">
					<view class="flex align-center">
						{{ item.createTime.split(' ')[0] }}
						<!-- <image src="/static/eye.png" mode="widthFix"></image> -->
						<!-- {{ item.num }} -->
					</view>
					<text class="cuIcon cuIcon-commentfill text-blue"></text>
				</view>

				<view class="commentBox ">
					<view class="likeBox flex align-center">
						<text class="cuIcon cuIcon-like"></text>
						<image v-if="index < 6" v-for="(like, index) in item.five" :key="index" :src="like.avatarUrl" mode="aspectFill"></image>
						等{{ item.supportCount }}人点赞
					</view>
					<view v-if="index < 5" v-for="(commit, index) in item.first" :key="index" class="commitItem">
						<text class="text-blue">{{ commit.nickName }}:</text>
						<text>{{ commit.content }}</text>
					</view>
					<view v-if="item.first.length > 5" class="moreComment text-blue">查看全部{{ item.first.length }}条评论</view>
				</view>
			</view>
		</view>

		<!-- <will-nodata v-if="postList.length == 0" tittle="暂未开放"></will-nodata> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			postList: [],
			page: 1,
			status:false
		};
	},
	onShow() {
		this.page = 1;
		this.postList = [];
		this.getPostList();
	},
	onLoad() {
		let status =  uni.getStorageSync('status')
		if(status === true){
			this.status = true
		}
		console.log(status);
	},
	onShareAppMessage() {
		return {
			title: '房聊',
			path: '/pages/roomChat/roomChat?searchUserId=' + this.getUserId()
		};
	},
	onReachBottom() {
		this.getPostList();
	},
	methods: {
		gotoPostDetail(e) {
			let id = e.currentTarget.dataset.id;
			uni.navigateTo({
				url: '/pages/roomChat/roomChatDetail?id=' + id
			});
		},
		getPostList() {
			this.showLoading();
			this.request({
				url: '/microcosm/getAll',
				data: {
					page: this.page,
					limit: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('帖子列表', res);
					if (res.data.code === 0) {
						this.page++;
						this.postList.push(...res.data.data);
						console.log(this.postList);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.roomChatView {
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
	.postList {
		padding: 20rpx 25rpx;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 14px;
		.headBox {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20rpx;
			& > image {
				width: 100%;
				height: 100%;
			}
		}
		.nameBox {
			font-size: 32rpx;
			color: #000;
			.type {
				display: inline-block;
				line-height: 36rpx;
				font-size: 22rpx;
				padding: 0 8rpx;
				margin-left: 8rpx;
			}
		}
		.title {
			font-size: 34rpx;
			margin-top: 8rpx;
			margin-bottom: 16rpx;
		}
		.desc {
			font-size: 28rpx;
			color: #666;
			margin-bottom: 10px;
		}
		.contentPic {
			& > image {
				width: 98%;
				display: block;
				margin: 0 auto;
				margin-top: 6rpx;
			}
		}
		.addressBox {
			font-size: 24rpx;
			margin-top: 30rpx;
		}
		.dateBox {
			font-size: 22rpx;
			color: #999;
			margin: 10rpx 0 20rpx 0;
			image {
				width: 30rpx;
				margin: 0 8rpx 0 18rpx;
			}
			.cuIcon {
				font-size: 38rpx;
			}
		}
		.commentBox {
			background-color: #f5f5f5;
			.likeBox {
				font-size: 24rpx;
				color: #999;
				padding: 18rpx 14rpx;
				border-bottom: 1rpx solid #ededed;
				.cuIcon {
					font-size: 44rpx;
					margin-right: 14rpx;
				}
				& > image {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}
			}
			.commitItem {
				padding: 0 18rpx;
				line-height: 1.8em;
			}
			.moreComment {
				padding: 0 18rpx;
				line-height: 1.8em;
			}
		}
	}
}
</style>
