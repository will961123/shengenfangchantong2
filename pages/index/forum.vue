<template>
	<!-- 装修日记 装修攻略 论坛  -->
	<view class="forumView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view class="topBox">
			<view :style="[{ background: bgColor }]" class="bgDiv"></view>
			<view class="mcDiv flex align-center">
				<view :style="[{ background: bgColor }]" class="logoBox flex align-center justify-center"><image :src="logo" mode="widthFix"></image></view>
				<view class="infoBox text-white">
					<view class="tit">{{ title }}</view>
					<view class="numBox">
						<text style="margin-right: 24rpx;">话题 &nbsp;&nbsp;1</text>
						<text>回复 &nbsp;&nbsp;1</text>
					</view>
					<view>{{ title }}</view>
				</view>
			</view>
		</view>

		<view v-for="(item, index) in postList" :key="index" class="postList flex bg-white">
			<view class="headBox"><image :src="item.userHeadPic" mode="aspectFill"></image></view>
			<view style="width: calc(100% - 100rpx);">
				<view class="nameBox flex align-center">
					<text>{{ item.userName }}</text>
					<!-- <view v-show="item.postType1" class="type bg-blue">置顶</view>
					<view v-show="item.postType2" class="type bg-orange">精品</view> -->
				</view>
				<view class="title textov1 ">{{ item.title }}</view>
				<!-- 				<view class="title textov1 "><text class="text-blue">#{{item.postTypeText}}#</text>{{item.title}}</view> -->
				<view class="desc textov2">{{ item.desc }}</view>
				<view class="contentPic"><image :src="item.contentPic" mode="widthFix"></image></view>
				<view class="dateBox flex justify-between align-center">
					<view class="flex align-center">
						{{ item.date }}
						<image src="/static/eye.png" mode="widthFix"></image>
						{{ item.num }}
					</view>
					<text class="cuIcon cuIcon-commentfill text-blue"></text>
				</view>
				<view class="commentBox ">
					<view class="likeBox flex align-center">
						<text class="cuIcon cuIcon-like"></text>
						<image v-if="index < 6" v-for="(like, index) in item.likeList" :key="index" :src="like.pic" mode="aspectFill"></image>
						等{{ item.likeList.length }}人点赞
					</view>
					<view v-for="(commit, index) in item.commitList" :key="index" class="commitItem">
						<text>{{ commit.name }}:</text>
						<text>{{ commit.content }}</text>
					</view>
					<view class="moreComment text-blue">查看全部{{ item.allCommitLength }}条评论</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '装修日记',
			bgColor: '#ec6689',
			logo: '/static/indexmenu15.png',
			postList: [
				{
					userHeadPic: 'https://i.picsum.photos/id/740/750/350.jpg',
					userName: '华佳燕',
					postType1: true,
					postType2: true,
					postTypeText: '资讯',
					title: '绿地香港去年销售业绩未达目标未达目标未达目标',
					desc: '3.29,绿地香港矩形2018年业绩发布会。金源绿地香港在过去5年复合增长率高达复合增长率高达复合增长率高达',
					contentPic: 'https://i.picsum.photos/id/740/750/350.jpg',
					date: '2020-04-08',
					num: '999',
					likeList: [{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }, { name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }],
					commitList: [{ name: '老苏', content: '安监局ad精神上的' }, { name: '老苏', content: '安监局ad精神上的' }, { name: '老苏', content: '安监局ad精神上的' }],
					allCommitLength: 999
				},
				{
					userHeadPic: 'https://i.picsum.photos/id/740/750/350.jpg',
					userName: '华佳燕',
					postType1: true,
					postType2: true,
					postTypeText: '资讯',
					title: '绿地香港去年销售业绩未达目标未达目标未达目标',
					desc: '3.29,绿地香港矩形2018年业绩发布会。金源绿地香港在过去5年复合增长率高达复合增长率高达复合增长率高达',
					contentPic: 'https://i.picsum.photos/id/740/750/350.jpg',
					date: '2020-04-08',
					num: '999',
					likeList: [{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }, { name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }],
					commitList: [{ name: '老苏', content: '安监局ad精神上的' }, { name: '老苏', content: '安监局ad精神上的' }, { name: '老苏', content: '安监局ad精神上的' }],
					allCommitLength: 999
				}
			]
		};
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		switch (this.title) {
			case '装修日记':
				this.bgColor = '#ec6689';
				this.logo = '/static/indexmenu15.png';
				break;
			case '装修攻略':
				this.bgColor = '#70b436';
				this.logo = '/static/indexmenu16.png';
				break;
			case '装修报价':
				this.bgColor = '#6aaef4';
				this.logo = '/static/indexmenu20.png';
				break;

			case '资讯':
				this.bgColor = '#e3e4e4';
				this.logo = '/static/encyclopedia1.png';
				break;
			case '问答':
				this.bgColor = '#e3e4e4';
				this.logo = '/static/encyclopedia2.png';
				break;
			case '知识':
				this.bgColor = '#e3e4e4';
				this.logo = '/static/encyclopedia3.png';
				break;
			case '贷款':
				this.bgColor = '#e3e4e4';
				this.logo = '/static/encyclopedia4.png';
				break;
			case '经纪人':
				this.bgColor = '#e3e4e4';
				this.logo = '/static/encyclopedia5.png';
				break;
		}
		uni.setNavigationBarTitle({
			title: this.title
		});
	}
};
</script>

<style lang="scss">
.forumView {
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
	.topBox {
		position: relative;
		width: 100%;
		height: 220rpx;
		overflow: hidden;
		.bgDiv {
			width: 680rpx;
			height: 680rpx;
			border-radius: 50%;
			position: absolute;
			left: 50%;
			top: 50rpx;
			margin-left: -340rpx;
			background: #ec6689;
		}
		.mcDiv {
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			padding: 0 15rpx;
			.logoBox {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				background-color: #ec6689;
				margin-right: 24rpx;
				& > image {
					width: 70rpx;
				}
			}
			.infoBox {
				line-height: 1.8em;
				font-size: 24rpx;
				.tit {
					font-size: 32rpx;
				}
			}
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
		}
		.contentPic {
			& > image {
				width: 98%;
				display: block;
				margin: 0 auto;
				margin-top: 6rpx;
			}
		}
		.dateBox {
			font-size: 22rpx;
			color: #999;
			margin: 30rpx 0 20rpx 0;
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
