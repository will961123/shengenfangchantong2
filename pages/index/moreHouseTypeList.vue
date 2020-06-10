<template>
	<view class="moreHuXing">
		<view class="swiper-tab">
			<view v-for="(item, index) in tabList" :class="currentTab == index ? 'on swiper-tab-list' : 'swiper-tab-list'" @click="changeCurrentTab(index)" :key="index">
				{{ item.key | romm }} ({{ item.count }})
			</view>
		</view>

		<swiper :current="currentTab" class="swiper-box" duration="300" @change="swiperChange">
			<swiper-item class="swiperItem" v-for="(item, index) in tabList.length" :key="index">
				<view class="card-list" v-for="(item, index) in contentList" :data-index="item.layoutId" :key="index" @click="gotoHouseTypeDetail(item.layoutId)">
					<view class="card-list-li mb20">
						<view class="title">{{ item.layoutName || '户型' }}</view>
						<view class="area">建面约{{ item.layoutArea }}m²</view>
						<view class="detail">
							<view class="left">
								<view class="sale bra6">在售</view>
								<view class="imgbox"><image mode="aspectFill" :src="item.layoutPic"></image></view>
							</view>
							<view class="right">
								<view class="price">约{{ item.layoutPrice }}元/m²</view>
								<view class="tot">总价(每套)</view>
								<view class="apartment">高层{{ item.name }}户型</view>
								<view class="special">
									<view class="tips bra6" v-for="(type, index) in item.layoutLight" :key="index">{{ type }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			currentTab: 0,
			tabList: [],
			contentList: []
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getHouseTypeTabListById();
		}
	},
	filters: {
		romm(num) {
			if (num == 0) return '全部';
			if (num == 1) return '一室';
			if (num == 2) return '二室';
			if (num == 3) return '三室';
			if (num == 4) return '四室';
			if (num == 5) return '五室';
		}
	},
	methods: {
		gotoHouseTypeDetail(id) {
			uni.navigateTo({
				url: '/pages/index/houseTypeDetail?id=' + id
			});
		},
		getHouseTypeTabListById() {
			this.showLoading();
			this.request({
				url: '/LouPanInfo/layout',
				data: {
					louPanId: this.id
				},
				success: res => {
					uni.hideLoading();
					console.log('户型标题列表', res);
					if (res.data.code === 200) {
						this.tabList = res.data.data;
						this.getHouseTypeList(0);
					}
				}
			});
		},
		swiperChange(e) {
			console.log('swiperChange', e);
			if (e.detail.source === 'touch') {
				if (e.detail.current === this.currentTab) {
					return false;
				}
				this.getHouseTypeList(e.detail.current);
			}
		},
		changeCurrentTab(idx) {
			if (idx === this.currentTab) {
				return false;
			}
			this.getHouseTypeList(idx);
		},
		getHouseTypeList(index) {
			this.currentTab = index;
			var result;
			this.showLoading();
			this.request({
				url: '/LouPanInfo/layoutKey',
				data: {
					louPanId: this.id,
					key: this.tabList[this.currentTab].key
				},
				success: res => {
					uni.hideLoading();
					res.data.data = res.data.data.map(i => {
						i.layoutLight = i.layoutLight.split(',');
						return i;
					});
					this.contentList = res.data.data;

					console.log('户型列表', res);
				}
			});
		}
	}
};
</script>

<style lang="scss">
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

.moreHuXing {
	/* margin: 20rpx 50rpx; */
}

.swiper-tab {
	width: 100%;
	text-align: center;
	line-height: 66rpx;
	height: 66rpx;
	position: fixed;
	z-index: 99;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	padding: 0 20rpx;
}

.swiper-tab-list {
	font-size: 28rpx;
	display: inline-block;
	color: #777;
	padding: 0 20rpx;
	position: relative;
}
.swiper-tab-list::after {
	position: absolute;
	bottom: 0;
	left: 50%;
	margin-left: -10px;
	content: '';
	width: 20px;
	height: 4px;
	border-radius: 2px;
	background: transparent;

	transition: all 0.8s;
}
.on {
	color: #1381e8;
	font-weight: 700;
}

.swiper-tab-list {
	&.on {
		&::after {
			background: #1381e8;
		}
	}
}

.swiper-box {
	display: block;
	height: 100%;
	width: 100%;
	overflow: hidden;
	background-color: #f8f8f8;
	position: absolute;
	top: 80rpx;
}

/* .swiper-box view {
	  text-align: center;
	} */
.mb20 {
	margin-bottom: 12px;
}

.card-list-li {
	padding: 30rpx 40rpx;
	box-sizing: border-box;
	background-color: #fff;
}

.card-list-li .title {
	font-weight: 700;
	font-size: 38rpx;
}

.card-list-li .title {
	height: 60rpx;
	line-height: 60rpx;
}

.card-list-li .area {
	height: 70rpx;
	line-height: 70rpx;
	font-size: 26rpx;
	color: #666;
}

.detail {
	display: flex;
	align-items: center;
}

.detail .left {
	flex: 2;
	height: 164px;
	position: relative;
}

.detail .left .imgbox {
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
	border: 2rpx solid #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
}

.detail .left image {
	width: 96%;
	height: 136px;
}

.detail .right {
	flex: 1;
	margin-left: 20rpx;
}

.sale {
	position: absolute;
	background-color: red;
	color: white;
	padding: 4rpx 10rpx;
	font-size: 22rpx;
	top: 18rpx;
	left: 15rpx;
	z-index: 9;
}

.price {
	font-size: 34rpx;
	font-weight: 600;
	color: red;
}

.tot {
	font-size: 28rpx;
}

.apartment {
	font-size: 30rpx;
	font-weight: 600;
}
.special {
	margin-bottom: 5rpx;
}
.tips {
	padding: 5rpx 10rpx;
	background-color: #f4f4f5;
	font-size: 24rpx;
	color: rgb(127, 128, 131);
	margin-right: 4rpx;
	margin-top: 4px;
	text-align: center;
}
.swiperItem {
	overflow-y: scroll;
}
</style>
