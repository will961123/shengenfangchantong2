<template>
	<!--导航滚动  -->
	<view class="test">
		<scroll-view class="tui-city-scroll" scroll-x="true" :scroll-into-view="'NAV' + status" scroll-with-animation="true">
			<text
				@click="getStatus(index)"
				:id="'NAV' + index"
				:class="index === status ? 'tui-nav-li tui-nav-active' : 'tui-nav-li'"
				:data-index="index"
				v-for="(item, index) in contentList"
				:key="index"
			>
				{{ item.name + '(' + item.count + ')' }}
			</text>
		</scroll-view>
		<!--列表滚动区  -->
		<view class="tui-fixed-y">
			<scroll-view class="tui-city-scroll-y" scroll-y="true" :scroll-into-view="'NAV' + status" scroll-with-animation="true">
				<view v-for="(item, index) in contentList" :key="index">
					<view :id="'NAV' + index" class="tui-list-head">{{ item.name }}</view>
					<view class="tui-list-li">
						<view class="tui-list-li-item" v-for="(item2, index) in item.list" :data-index="index" :key="index">
							<image class="bra6" :src="item2.picUrl" @click="preview" :data-src="item2.picUrl"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 0,
			contentList: [],
			imgList: []
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getImgList();
		}
	},
	methods: {
		preview(event) { 
			let currentUrl = event.currentTarget.dataset.src;
			uni.previewImage({
				current: currentUrl, // 当前显示图片的http链接
				urls: this.imgList // 需要预览的图片http链接列表
			});
		},
		getStatus(idx) {
			this.status = idx;
		},
		getImgList() {
			this.showLoading();
			this.request({
				url: '/LouPanInfo/getLouPanPic',
				data: {
					louPanId: this.id
				},
				success: res => {
					uni.hideLoading();
					console.log('图片', res);
					let result = res.data.data;
					let temp = [];
					for (var i = 0; i < result.length; i++) {
						for (var j = 0; j < result[i].list.length; j++) {
							temp.push(result[i].list[j].picUrl);
						}
					}
					this.contentList = res.data.data;
					this.imgList = temp;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.tui-city-scroll {
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	white-space: nowrap;
	border-bottom: 1rpx solid #f2f2f2;
	position: relative;
	z-index: 99999;
	text {
		height: 100rpx;
		line-height: 100rpx;
		width: 100%;
		white-space: nowrap;
		margin: 0 15rpx;
		font-size: 28rpx;
	}
}
.tui-nav-li {
	font-weight: 700;
	padding: 0 10rpx;
	position: relative;
	&:first-child {
		padding-left: 16rpx;
	}
}
.tui-nav-active {
	color: #366fcb;
	padding-bottom: 27rpx;
}
.tui-fixed-y {
	width: 100%;
	height: calc(100% - 50px);
	position: fixed;
	bottom: 0;
	left: 0;
}
page {
	width: 100%;
	height: auto;
	background-color: #fff;
}

.bra6 {
	border-radius: 6rpx;
}

.mb30 {
	margin-bottom: 30rpx;
}

.elli {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.pinkRed {
	color: #d9172a;
}

.tui-fixed-x {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
}

.tui-city-scroll {
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	white-space: nowrap;
	border-bottom: 1rpx solid #f2f2f2;
}

.tui-city-scroll text {
	height: 100rpx;
	line-height: 100rpx;
	width: 100%;
	white-space: nowrap;
	margin: 0 15rpx;
	font-size: 28rpx;
}

.tui-nav-li {
	font-size: 33rpx;
	font-weight: 700;
	padding: 0 10rpx;

	position: relative;
}

.tui-nav-li:first-child {
	padding-left: 16rpx;
}

.tui-nav-li:last-child {
	padding-right: 16rpx;
}

.tui-nav-active {
	color: #366fcb;
	/* border-bottom: 4rpx solid #366fcb; */
	padding-bottom: 27rpx;
}

.tui-nav-active::before {
	width: 20px;
	height: 3px;
	content: '';
	background-color: #366fcb;
	position: absolute;
	left: 50%;
	margin-left: -10px;
	bottom: -2px;
	border-radius: 2px;
}

.tui-city-scroll-y {
	margin: 0 20rpx;
	height: 100%;
	box-sizing: border-box;
}

.tui-list-head {
	height: 50px;
	line-height: 50px;
	font-size: 34rpx;
	font-weight: 700;
}

.tui-list-li-item {
	display: inline-block;
	width: 220rpx;
	margin: 4rpx 8rpx;
	height: 166rpx;
	background-size: cover;
}

.tui-list-li-item image {
	width: 100%;
	height: 100%;
	border-radius: 12rpx;
}
</style>
