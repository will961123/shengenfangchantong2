<template>
	<view class="houseListView">
		<view class="searchBox bg-white flex align-center">
			<view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-search"></text>
				<input type="text" value="" placeholder="请输入搜索内容" />
			</view>
			<text>搜索</text>
		</view>
		<view @click="gotoHouseDetail(item.louPanId || item.id||item.rentSaleShopId)" v-for="(item, index) in list" :key="index" class="item bg-white flex">
			<image :src="item.indexPic" mode="scaleToFill"></image>
			<view class="rightBox flex flex-direction justify-between">
				<view class="name">{{ item.louPanName }}</view>
				<view class="time flex align-center justify-between">
					<view>{{ title === '找租房' ? item.city : item.createTime }}</view>
					<view v-if="title === '买新房'" class="money text-red">{{ item.price }}元/平</view>
					<view v-else class="money text-red">{{ item.price }}万元</view>
				</view>
				<view class="textov1">
					<text>{{ item.houseType }}</text>
					<text class="size">{{ item.houseArea }}</text>
				</view>
				<view class="type">
					<view class="textov1">{{ item.lightSpot }}</view>
					<!-- <text v-for="(type, index) in item.type" :key="index">#{{ type }}</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '买新房',
			houseListPage: 1,
			list: []
		};
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		uni.setNavigationBarTitle({
			title: this.title
		});

		switch (this.title) {
			case '买新房':
				this.getNewHouseList();
				break;
			case '找租房':
				this.getAllRentHouse();
				break;
			case '买二手房':
				this.getAllSecondHandHouse();
				break;
				case '商铺':
					this.getAllRentSaleShop();
					break;
		}
	},
	onReachBottom() {
		switch (this.title) {
			case '买新房':
				this.getNewHouseList();
				break;
			case '找租房':
				this.getAllRentHouse();
				break;
			case '买二手房':
				this.getAllSecondHandHouse();
				break;
			case '商铺':
				this.getAllRentSaleShop();
				break;
		}
	},
	methods: {
		getAllRentSaleShop() {
			this.showLoading();
			this.request({
				url: '/rentSaleShop/getAll',
				data: {
					page: this.houseListPage,
					limit: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('商铺', res,res.data.data.records);
					if (res.data.code === 200) {
						this.houseListPage++;
						res.data.data.records = res.data.data.records.map(i => { 
							i.indexPic = i.indexPic ? '' : i.picUrlList ? (i.picUrlList[0] ? i.picUrlList[0].url : '') : '';
							i.louPanName = i.shopName;
							i.houseType = i.shopType;
							i.houseArea = i.mianji + 'm²';
							i.price = i.money
							i.lightSpot = i.address;
							return i;
						});
						this.list.push(...res.data.data.records);
						
					}
				}
			});
		},
		getAllSecondHandHouse() {
			this.showLoading();
			this.request({
				url: '/rentSaleHouse/getAllSecondHandHouse',
				data: {
					page: this.houseListPage,
					limit: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('二手房', res);
					if (res.data.code === 0) {
						this.houseListPage++;
						res.data.data = res.data.data.map(i => {
							i.createTime = i.year ? i.year.split('-')[0] : '年份未知';
							i.indexPic = i.indexPic ? '' : i.picUrls ? (i.picUrls[0] ? i.picUrls[0].picUrl : '') : '';
							i.louPanName = i.houseName;
							i.houseType = i.apartmentLayout;
							i.houseArea = i.mianji + 'm²';
							i.lightSpot = i.label;
							return i;
						});
						this.list.push(...res.data.data);
					}
				}
			});
		},
		getAllRentHouse() {
			this.showLoading();
			this.request({
				url: '/rentSaleHouse/getAllRentHouse',
				data: {
					page: this.houseListPage,
					limit: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('租房', res);
					if (res.data.code === 0) {
						this.houseListPage++;
						res.data.data = res.data.data.map(i => {
							i.createTime = i.year ? i.year.split('-')[0] : '年份未知';
							i.indexPic = i.indexPic ? '' : i.picUrls ? (i.picUrls[0] ? i.picUrls[0].picUrl : '') : '';
							i.louPanName = i.houseName;
							i.houseType = i.apartmentLayout;
							i.houseArea = i.mianji + 'm²';
							i.lightSpot = i.label;
							return i;
						});
						this.list.push(...res.data.data);
					}
				}
			});
		},
		getNewHouseList() {
			this.showLoading();
			this.request({
				url: '/LouPanInfo/getAllLouPan',
				data: {
					page: this.houseListPage,
					limit: 10
				},
				success: res => {
					uni.hideLoading();
					console.log('买新房', res);
					if (res.data.code === 0) {
						this.houseListPage++;
						res.data.data = res.data.data.map(i => {
							i.createTime = i.createTime.split('-')[0];
							return i;
						});
						this.list.push(...res.data.data);
					}
				}
			});
		},
		gotoHouseDetail(id) {
			uni.navigateTo({
				url: '/pages/index/houseDetail?title=' + this.title + '&id=' + id
			});
		}
	}
};
</script>

<style lang="scss">
.houseListView {
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
	.item {
		padding: 20rpx;
		border-bottom: 1rpx solid #ededed;
		&:last-child {
			border: none;
		}
		& > image {
			width: 300rpx;
			height: 220rpx;
			margin-right: 20rpx;
		}
		.rightBox {
			font-size: 30rpx;
			color: #999;
			width: calc(100% - 320rpx);
			.name,
			.time {
				color: #000;
			}
			.time .money {
				font-size: 34rpx;
				font-weight: 700;
			}
			.size {
				margin-left: 50rpx;
			}
		}
	}
}
</style>
