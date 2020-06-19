<template>
	<view class="roomChatDetailView">
		<view v-if="postDetail.userInfo" class="postList flex bg-white">
			<view class="headBox"><image :src="postDetail.userInfo.avatar_url" mode="aspectFill"></image></view>
			<view style="width: calc(100% - 100rpx);">
				<view class="nameBox flex align-center">
					<text>{{ postDetail.userInfo.nick_name }}</text>
				</view>
				<view class="desc textov2">{{ postDetail.content }}</view>
				<view v-if="postDetail.picUrlList.length > 0" class="cu-form-group" style="padding: 0;">
					<view class="grid col-3 grid-square flex-sub">
						<view class="bg-img" v-for="(img, idx) in postDetail.picUrlList" :key="idx" @tap="ViewImage" :data-url="img.url">
							<image :src="img.url" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view v-if="postDetail.address" class="addressBox text-gray">
					{{ postDetail.address }}
				</view>
				<view class="dateBox flex justify-between align-center">
					<view class="flex align-center">{{ postDetail.createTime.split(' ')[0] }}</view>
					<text
						@click="showAddComment"
						:data-type="1"
						:data-name="postDetail.userInfo.nick_name"
						:data-id="postDetail.microcosmId"
						class="cuIcon cuIcon-commentfill text-blue"
					></text>
				</view>
				<view class="commentBox ">
					<view class="likeBox flex align-center">
						<text class="cuIcon cuIcon-like"></text>
						<image v-if="index < 6" v-for="(like, index) in postDetail.likeList" :key="index" :src="like.pic" mode="aspectFill"></image>
						等{{ 1 }}人点赞
					</view>
					<view
						@click="showAddComment"
						:data-type="2"
						:data-name="commit.nickName"
						:data-id="commit.firstId"
						hover-class="commitItemHover"
						v-for="(commit, index) in postDetail.first"
						:key="index"
						class="commitItem "
					>
						<view class="first  ">
							<text style="margin-right: 0.8em" class="text-blue">{{ commit.nickName }}:</text>
							<text>{{ commit.content }}</text>
						</view>
						<view class="two" v-for="(two, index) in commit.two" :key="index">
							<text>
								<text class="uname text-blue">{{ two.nickName }}</text>
								<text style="margin: 0 6rpx;">回复</text>
								<text style="margin-right: 0.8em" class="uname text-blue">{{ commit.nickName }}:</text>
							</text>
							<text>{{ two.content }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view @click="addComment = false" v-show="addComment" class="addCommitMc">
			<view @click.stop="() => {}" class="contentBox">
				<view class="menuBox flex justify-between">
					<text @click="addComment = false">取消</text>
					<text @click="saveComment" class="text-blue">发表</text>
				</view>
				<textarea v-model="newCommentText" value="" :placeholder="newCommentPlaceholder" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			postDetail: {},
			addComment: false,
			newCommentPlaceholder: '',
			newCommentText: '',
			commentId: '',
			commentType: '1',
			imgList: []
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getDetail();
		}
	},
	methods: {
		showAddComment(e) {
			let commentUserName = e.currentTarget.dataset.name;
			let commentId = e.currentTarget.dataset.id;
			let type = e.currentTarget.dataset.type;
			this.commentId = commentId;
			this.commentType = type;
			this.newCommentPlaceholder = '回复给' + commentUserName;
			this.addComment = true;
			console.log(commentUserName, commentId, type);
		},
		getDetail() {
			this.showLoading();
			this.request({
				url: '/microcosm/detail',
				data: {
					microcosmId: this.id
				},
				success: res => {
					uni.hideLoading();
					console.log('post detail', res);
					if (res.data.code === 200) {
						this.postDetail = res.data.data;
						this.imgList = this.postDetail.picUrlList.map(i => {
							return i.url;
						});
					}
				}
			});
		},
		saveComment() {
			let url = '/microcosm/firstSave';
			let formData = {
				microcosmId: this.id,
				userId: this.getUserId(),
				content: this.newCommentText
			};
			if (this.commentType === '2') {
				formData.firstId = this.commentId;
				url = '/microcosm/twoSave';
			}
			this.request({
				url: url,
				data: formData,
				success: res => {
					uni.hideLoading();
					console.log('发表' + this.commentType + '级评论', res);
					if (res.data.code === 200) {
						this.commentId = '';
						this.newCommentText = '';
						this.newCommentPlaceholder = '';
						this.commentType = '1';
						this.addComment = false;
						this.getDetail();
						uni.showModal({
							title: '发表评论',
							content: '发表成功!',
							showCancel: false,
							success: res => {}
						});
					} else {
						uni.showModal({
							title: '发表评论',
							content: res.data.message || '发表失败!',
							showCancel: false,
							success: res => {}
						});
					}
				}
			});
		},
		ViewImage(e) { 
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		}
	}
};
</script>

<style lang="scss">
.roomChatDetailView {
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
		.addressBox{
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
				padding: 0 18rpx 10rpx 18rpx;
				line-height: 1.8em;
				margin-bottom: 10px;
				border-bottom: 1rpx solid #ededed;
			}
			.commitItem:last-child {
				border-bottom: none;
			}
			.commitItemHover {
				background-color: #b0b0b0;
				opacity: 0.8;
			}
			.moreComment {
				padding: 0 18rpx;
				line-height: 1.8em;
			}
		}
	}
	.addCommitMc {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
		font-size: 28rpx;
		.contentBox {
			position: absolute;
			left: 0;
			bottom: 0;
			background-color: #fff;
			width: 100%;
			padding: 8px 25rpx 6px 25rpx;
			.menuBox {
				margin-bottom: 12px;
			}
			textarea {
				font-size: 28rpx;
				color: #000;
			}
		}
	}
}
</style>
