<template>
	<!-- 业主论坛 -->
	<view class="ownersForumView">
		<view class="topPicList bg-white ">
			<view v-for="(item, index) in topPicList" :key="index" class="item">
				<image :src="item.pic" mode="aspectFill"></image>
				<view class="infoBox">{{ item.desc }}</view>
			</view>
		</view>

		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>

		<view class="sortBox bg-white flex justify-around">
			<view @click="changeSortType(0)" :class="sortType === 0 ? 'item select' : 'item'">最热话题</view>
			<view @click="changeSortType(1)" :class="sortType === 1 ? 'item select' : 'item'">最新发表</view>
			<view @click="changeSortType(2)" :class="sortType === 2 ? 'item select' : 'item'">距离最近</view>
			<view @click="changeSortType(3)" :class="sortType === 3 ? 'item select' : 'item'">最热回复</view>
		</view>

		<view  v-for="(item,index) in postList" :key="index" class="postList flex bg-white">
			<view class="headBox"><image :src="item.userHeadPic" mode="aspectFill"></image></view>
			<view style="width: calc(100% - 100rpx);">
				<view class="nameBox flex align-center">
					<text>{{item.userName}}</text>
					<view v-show="item.postType1" class="type bg-blue">置顶</view>
					<view v-show="item.postType2" class="type bg-orange">精品</view>
				</view>
				<view class="title textov1 "><text class="text-blue">#{{item.postTypeText}}#</text>{{item.title}}</view>
				<view class="desc textov2">{{item.desc}}</view>
				<view class="contentPic"><image :src="item.contentPic" mode="widthFix"></image></view>
				<view class="dateBox flex justify-between align-center">
					<view class="flex align-center">
						{{item.date}}
						<image src="/static/eye.png" mode="widthFix"></image>
						{{item.num}}
					</view>
					<text class="cuIcon cuIcon-commentfill text-blue"></text>
				</view>
				<view class="commentBox ">
					<view class="likeBox flex align-center">
						<text class="cuIcon cuIcon-like"></text>
						<image v-if="index<6"  v-for="(like,index) in item.likeList" :key="index" :src="like.pic" mode="aspectFill"></image>
						等{{item.likeList.length}}人点赞
					</view>
					<view v-for="(commit,index) in item.commitList" :key="index" class="commitItem">
						<text>{{commit.name}}:</text>
						<text>{{commit.content}}</text>
					</view>
					<view class="moreComment text-blue">查看全部{{item.allCommitLength}}条评论</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topPicList: [
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					desc: '好房'
				},
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					desc: '好房'
				},
				{
					pic: 'https://i.picsum.photos/id/740/750/350.jpg',
					desc: '好房'
				}
			],
			sortType: 0,
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
					likeList: [{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' },{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }]
					,commitList:[
						{name:'老苏',content:'安监局ad精神上的'},
						{name:'老苏',content:'安监局ad精神上的'},
						{name:'老苏',content:'安监局ad精神上的'}
					],
					allCommitLength:999
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
					likeList: [{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' },{ name: '1', pic: 'https://i.picsum.photos/id/740/750/350.jpg' }]
					,commitList:[
						{name:'老苏',content:'安监局ad精神上的'},
						{name:'老苏',content:'安监局ad精神上的'},
						{name:'老苏',content:'安监局ad精神上的'}
					],
					allCommitLength:999
				}
			]
		};
	},
	methods: {
		changeSortType(type) {
			if (this.sortType === type) {
				return false;
			}
			this.sortType = type;
		}
	}
};
</script>

<style lang="scss">
.ownersForumView {
	.topPicList {
		height: 365rpx;
		width: 100%;
		padding-left: 25rpx;
		white-space: nowrap;
		overflow-x: auto;
		padding-bottom: 25rpx;
		.item {
			display: inline-block;
			width: 460rpx;
			height: 340rpx;
			position: relative;
			margin-right: 18rpx;
			border-radius: 16rpx;
			overflow: hidden;
			& > image {
				width: 100%;
				height: 100%;
			}
			.infoBox {
				width: 100%;
				background-color: rgba(0, 0, 0, 0.4);
				color: #fff;
				font-size: 28rpx;
				text-align: center;
				line-height: 360rpx;
				position: absolute;
				left: 0;
				top: 0;
			}
		}
	}
	.searchBox {
		margin-top: 14rpx;
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
	.sortBox {
		border-bottom: 1rpx solid #ededed;
		line-height: 90rpx;
		.item {
			position: relative;
			&::after {
				position: absolute;
				transition: all 0.8s;
				width: 0rpx;
				height: 2px;
				bottom: 1px;
				left: 50%;
				margin-left: -20rpx;
				content: '';
			}
			&.select {
				color: #39b54a;
			}
			&.select::after {
				width: 50rpx;
				background-color: #39b54a;
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
