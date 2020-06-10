<template>
	<view class="huxingDetail">
		<swiper :indicator-dots="false" indicator-color="orange" indicator-active-color="yellow" :autoplay="true" class="imgSwiper mb20">
			<swiper-item class="demo-text-1 bra6">
				<image mode="aspectFill" :src="detail.layoutPic" :data-src="detail.layoutPic" @click="previewImage"></image>
				<view class="lengthBox">共1张</view>
			</swiper-item>
		</swiper>
		<view class="content">
			<view class="mb20">
				<text class="huxing black">{{ detail.name }}</text>
				<text class="houseType">{{ detail.layoutStructure }}</text>
			</view>
			<view class="mb10 typeBox">
				<text class="state bra6">在售</text>
				<text class="type" v-for="(item, index) in detail.layoutLight" :key="index">{{ item }}</text>
			</view>
			<view class="mb10">
				<text class="total">
					约
					<text class="bigsize">{{ detail.layoutPrice }}元/m²</text>
				</text>
			</view>
			<view class="item mb10">
				建筑面积（约）:
				<text class="black">{{ detail.layoutArea }}m²</text>
			</view>
			<view class=" item mb10">
				户型分布：
				<text class="black">{{ detail.layoutFenbu }}</text>
			</view>
			<view class="item mb10">
				项目名称：
				<text class="black">{{ detail.loupanName }}</text>
			</view>
			<view class="black title">户型介绍</view>
			<view class="textinfo">{{ detail.layoutDes }}</view>
		</view>

		<view @click="fixedBox" class="fixedBox">
			<image mode="aspectFill" src="/static/indexmenu1.png"></image>
			<text>楼盘</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			detail: {}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getHouseTypeDetailById();
		}
	},
	methods: {
		getHouseTypeDetailById() {
			this.showLoading();
			this.request({
				url: '/LouPanInfo/layoutInfo',
				data: {
					layoutId: this.id
				},
				success: res => {
					uni.hideLoading();
					console.log('户型详情', res);
					if (res.data.code === 200) {
						res.data.data.layoutLight = res.data.data.layoutLight.split(',');
						this.detail = res.data.data;
					}
				}
			});
		},
		previewImage(e) {
			let current = e.target.dataset.src;
			uni.previewImage({
				current: current, // 当前显示图片的http链接
				urls: [this.detail.layoutPic] // 需要预览的图片http链接列表
			});
		},
		fixedBox(){
			uni.navigateBack({
				delta:1
			})
		}
	}
};
</script>

<style lang="scss">
page {
	color: rgb(117, 115, 115);
}
.huxingDetail {
	min-height: 100vh;
	background-color: #fff;
}
.bra6 {
	border-radius: 6rpx;
}

.mb10 {
	margin-bottom: 10rpx;
}

.mb20 {
	margin-bottom: 20rpx;
}

.elli {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.black {
	color: black;
}

.content {
	margin: 0 30rpx;
}

/* 轮播代码 */

.imgSwiper {
	width: 100%;
	height: 410rpx;
	/* position: relative; */
}

.lengthBox {
	position: absolute;
	right: 30rpx;
	bottom: 20rpx;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 22rpx;
	padding: 2rpx 26rpx;
	border-radius: 26rpx;
}

.imgSwiper image {
	width: 100%;
	height: 100%;
}

.imgSwiper .demo-text-1 {
	position: relative;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 36rpx;
}

.imgSwiper .demo-text-2 {
	position: relative;
	align-items: center;
	justify-content: center;
	background-color: #2782d7;
	color: #fff;
	font-size: 36rpx;
}

.imgSwiper .demo-text-3 {
	position: relative;
	align-items: center;
	justify-content: center;
	background-color: rgb(243, 230, 55);
	color: #fff;
	font-size: 36rpx;
}

.huxing {
	font-size: 42rpx;
	font-weight: 700;
}

.houseType {
	font-size: 26rpx;
	font-weight: 700;
	font-size: #000;
}

.state {
	font-size: 20rpx;
	/* width: 60rpx; */
	text-align: center;
	padding: 4rpx 10rpx;
	color: white;
	background-color: #ea4735;
	/* background-color: #b60005; */
}

.price {
	/* color: #ea4735; */
	color: orangered;
}

.title {
	font-size: 42rpx;
	font-weight: 700;
	margin-top: 20px;
}

.textinfo {
	font-size: 28rpx;
	color: #96989b;
	font-weight: 600;
	line-height: 1.6em;
}

.total {
	color: #ea4735;
	/* color: orange; */
	font-weight: 700;
}

.total .bigsize {
	font-size: 44rpx;
}

.item {
	font-size: 28rpx;
	color: #96989b;
	font-weight: 600;
}

.item .black {
	font-size: 28rpx;
}

.typeBox {
	display: flex;
	align-items: center;
}

.typeBox .type {
	display: inline-block;
	background: #f7f6f9;
	color: #adaeb0;
	font-size: 20rpx;
	padding: 3rpx 6rpx;
	border-radius: 6rpx;
	margin-left: 10rpx;
}

.fixedBox {
	background: #3d84ec;
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
	position: fixed;
	right: 20rpx;
	bottom: 30%;
	font-size: 20rpx;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.fixedBox > image {
	width: 36rpx;
	height: 36rpx;
}
</style>
