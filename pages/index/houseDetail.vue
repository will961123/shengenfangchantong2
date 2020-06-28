<template>
	<view>
		<view class="detail">
			<swiper indicator-dots="false" autoplay="true" class="imgSwiper" @click="gotoGouseDetailImg">
				<swiper-item v-for="(item, index) in houseInfo.picUrlList" :key="index" class="bra6">
					<image :src="item.picUrl" mode="aspectFill"></image>
					<view class="lengthBox">共{{ houseInfo.picUrlList.length }}张</view>
				</swiper-item>
			</swiper>
			<view style="padding:0 30rpx">
				<view v-if="title === '买新房'" class="content">
					<view class="houseInfo bra6">
						<view class="state">
							<text class="bra6 red">{{ houseInfo.saleStatus == '1' ? '在售' : '待售' }}</text>
							<text v-for="(item, index) in houseInfo.lightSpot" :key="index" class="bra6">{{ item }}</text>
						</view>
						<view style="padding:0  30rpx 30rpx 30rpx; background-color: #fdeaec;">
							<view class="projectName">
								<view>{{ houseInfo.louPanName }}</view>
								<text class="morebox" @click="goToMoreInfo">更多详情</text>
							</view>
							<view class="projectNameRemark grey">备案名：{{ houseInfo.louPanName }}</view>
							<view class="buyPeoples"></view>
							<view class="price">约{{ houseInfo.price }}元/m²起</view>
							<view @click="cellPhone" :data-phone="houseInfo.telephone" class="tel  " style="font-size:26rpx">
								<text class="grey">电话：</text>
								<text class="tel1">{{ houseInfo.telephone }}</text>
								<text style="float: right;font-size: 34rpx;" class="cuIcon cuIcon-phone text-red "></text>
							</view>
							<view style="display:flex;align-items:center;margin-top:8px;" class="address elli justify-between" @click="map">
								<view style="display:flex;align-items:center;">
									<view class="grey" style="font-size:26rpx">地址：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.address }}</view>
								</view>
								<text style="float: right;font-size: 34rpx;" class=" text-red cuIcon cuIcon-locationfill"></text>
							</view>
						</view>
					</view>
					<!-- 项目展示图片 -->
					<!-- <view class="videoEnter bra6 mb30"><image mode="aspectFill" :src="houseInfo.loupanAdPic"></image></view> -->
				</view>

				<view v-else-if="title === '买二手房' || title === '找租房'">
					<view class="content">
						<view class="houseInfo bra6">
							<view class="state">
								<text class="bra6 red">在售</text>
								<text class="bra6">{{ houseInfo.label }}</text>
							</view>
							<view style="padding:0  30rpx 30rpx 30rpx; background-color: #fdeaec;">
								<view class="projectName">
									<view>{{ houseInfo.housingEstate }}</view>
									<!-- <text class="morebox" @click="goToMoreInfo">更多详情</text> -->
								</view>
								<!-- <view class="projectNameRemark grey">备案名：{{ houseInfo.louPanName }}</view> -->
								<view class="buyPeoples"></view>
								<view class="price">{{ houseInfo.price }}万元/套</view>
								<view @click="cellPhone" :data-phone="houseInfo.phone" class="tel  " style="font-size:26rpx">
									<text class="grey">电话：</text>
									<text class="tel1">{{ houseInfo.phone }}</text>
									<text style="float: right;font-size: 34rpx;" class="cuIcon cuIcon-phone text-red "></text>
								</view>
								<view style="display:flex;align-items:center;margin-top:8px;" class="address elli justify-between" @click="map">
									<view style="display:flex;align-items:center;">
										<view class="grey" style="font-size:26rpx">地址：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.area }}</view>
									</view>
									<text style="float: right;font-size: 34rpx;" class=" text-red cuIcon cuIcon-locationfill"></text>
								</view>
							</view>
						</view>
						<view class="houseInfo houseInfo2 bra6">
							<view style="padding:10px  30rpx 10rpx 30rpx; background-color: #fdeaec;">
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">装修类型：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.decorationType }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">用途：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.useType }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">户型：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.apartmentLayout }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">年代：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.year }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">面积：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.mianji }}m²</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">楼层：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.floor }}</view>
								</view>
								<view style="display:flex; line-height: 26px;">
									<view class="grey" style="font-size:26rpx;">描述：</view>
									<view class="tel1 " style="font-size:26rpx;margin-top:0;flex:1">{{ houseInfo.houseDescribe }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view v-else>
					<view class="content">
						<view class="houseInfo bra6">
							<view class="state">
								<text class="bra6 red">{{ houseInfo.saleType ? '出售' : '出租' }}</text>
								<text class="bra6">{{ houseInfo.jingyingStatus }}</text>
							</view>
							<view style="padding:0  30rpx 30rpx 30rpx; background-color: #fdeaec;">
								<view class="projectName">
									<view>{{ houseInfo.louPanName }}</view>
								</view>
								<view class="buyPeoples"></view>
								<view class="price">
									{{ houseInfo.price }}万元/套
									<text v-if="!houseInfo.saleType">/月</text>
								</view>
								<view @click="cellPhone" :data-phone="houseInfo.phone" class="tel  " style="font-size:26rpx">
									<text class="grey">电话：</text>
									<text class="tel1">{{ houseInfo.phone }}</text>
									<text style="float: right;font-size: 34rpx;" class="cuIcon cuIcon-phone text-red "></text>
								</view>
								<view style="display:flex;align-items:center;margin-top:8px;" class="address elli justify-between" @click="map">
									<view style="display:flex;align-items:center; ;width: 80%;">
										<view class="grey" style="font-size:26rpx">地址：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.address }}</view>
									</view>
									<text style="float: right;font-size: 34rpx;" class=" text-red cuIcon cuIcon-locationfill"></text>
								</view>
							</view>
						</view>
						<view class="houseInfo houseInfo2 bra6">
							<view style="padding:10px  30rpx 10rpx 30rpx; background-color: #fdeaec;">
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">所在区域：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.area }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">详细地址：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.address }}</view>
								</view>
								<view v-if="title==='商铺'" style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">商铺名：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.shopName }}</view>
								</view>
								<view v-else style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">写字楼名：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.title }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">类型：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{houseInfo.saleType?'出售':'出租'}}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">起始楼层：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.floor }}</view>
								</view>
								<view v-if="title==='商铺'" style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">商铺类型：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.shopType }}</view>
								</view>
								<view v-else style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">写字楼类型：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.jingyingStatus }}</view>
								</view>
								<view style="display:flex;align-items:center;line-height: 26px;">
									<view class="grey" style="font-size:26rpx">建筑面积：</view>
									<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.mianji }}m²</view>
								</view>
								<view v-if="title==='商铺'" >
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">是否临街：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.isLinjie ? '是' : '否' }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">面宽：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.miankuan }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">层高：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.cenggao }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">进深：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.jinshen }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">经营状态：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.jingyingStatus }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">经营行业：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.jingyingHangye }}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">物业费：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{ houseInfo.wuyefei }}</view>
									</view>
								</view>
								
								<view v-if="title==='写字楼'">
									
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">联系人：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{houseInfo.contact}}</view>
									</view>
									<view style="display:flex;align-items:center;line-height: 26px;">
										<view class="grey" style="font-size:26rpx">发布者身份：</view>
										<view class="tel1 addressov1" style="font-size:26rpx;margin-top:0">{{houseInfo.identity}}</view>
									</view>
									<view   style="display:flex; line-height: 26px;">
										<view class="grey" style="font-size:26rpx;">描述：</view>
										<view class="tel1 " style="font-size:26rpx;margin-top:0;flex:1">{{ houseInfo.officeDescribe }}</view>
									</view>
									<view   style="display:flex; line-height: 26px;">
										<view class="grey" style="font-size:26rpx;">配套：</view>
										<view class="tel1 " style="font-size:26rpx;margin-top:0;flex:1">{{ houseInfo.peitao }}</view>
									</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>

				<!-- 户型区域 -->
				<view v-if="title === '买新房'" class="hx_detailBox" style="margin-bottom: 30rpx;border-radius: 6rpx;">
					<view class="hx_box">
						<view class="hx_title">户型推荐</view>
						<view class="hx_more" @click="gotoHouseTypeList">查看更多 ></view>
					</view>
					<swiper class="imgSwiper " style="margin-bottom: 30rpx;" display-mviewtiple-items="1.5" previous-margin="20rpx">
						<swiper-item
							v-for="(item, index) in houseInfo.layoutInfo"
							:key="index"
							class="swiperItem"
							style="border-radius: 6rpx;"
							@click="gotoHouseTypeDetail(item.layoutId)"
						>
							<view class="pic"><image :src="item.layoutPic" mode="aspectFill"></image></view>
							<view>
								<text class="tit">{{ item.layoutStructure }}</text>
							</view>
							<view class="area">建面（约）{{ item.layoutArea }}㎡</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- 新闻资讯 -->
				<view v-if="title === '买新房'" class="news bra6 mb30">
					<view class="hx_box"><view class="hx_title">企业新闻</view></view>
					<view>
						<view v-for="(item, index) in newsList" :key="index" class="li" @click="goToNewsInfo(item.id)">
							<view class="pic"><image :src="item.url" mode="aspectFill"></image></view>
							<view class="rightContent">
								<view class="title">{{ item.title }}</view>
								<view style="font-size: 22rpx;color:#666" class="singleInfo">{{ item.createTime }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 项目位置 -->
				<view class="projectAddress ">
					<view class="hx_box">
						<view class="hx_title">周边配套</view>
						<view class="hx_more" @click="map">查看更多</view>
					</view>
					<view class="addressBox">
						<image src="/static/house_address-min.jpg" mode="widthFix"></image>
						<view class="ad_address  drift" @click="map">
							<view class="name elli flex align-center justify-around">
								<text class="text-bold">{{ houseInfo.louPanName || houseInfo.housingEstate }}</text>
								<text style="font-size: 34rpx;" class="cuIcon text-red cuIcon-locationfill"></text>
							</view>
						</view>
					</view>
					<view class="tab">
						<view v-for="(item, index) in peitao" :key="index" :class="peitaoIdx === index ? 'tabItem active' : 'tabItem'" @click="changePeitaoIdx(index)">
							<view class="iconF"><image :src="item.pic" mode="widthFix"></image></view>
							<view class="name">{{ item.name }}</view>
						</view>
					</view>
					<view class="tabContent">
						<view v-for="(item, index) in peitaoList" :key="index" class="tabContentItem">
							<view class="name elli">{{ item.title }}</view>
							<view class="remote" style="font-size:#999;font-size:22rpx">{{ item._distance }}m</view>
						</view>
					</view>
					<view class="around bra6" @click="map">查看更多周边概况</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			title: '买新房',
			peitao: [
				{ pic: '/static/houseInfoPT1.png', name: '交通' },
				{ pic: '/static/houseInfoPT2.png', name: '学校' },
				{ pic: '/static/houseInfoPT3.png', name: '医疗' },
				{ pic: '/static/houseInfoPT4.png', name: '购物' },
				{ pic: '/static/houseInfoPT5.png', name: '餐饮' }
			],
			peitaoIdx: 0,
			peitaoList: [],
			houseInfo: {},
			newsList: [],
			location: {
				lng: '',
				lat: ''
			}
		};
	},
	onLoad(options) {
		if (options.id && options.title) {
			this.id = options.id;
			this.title = options.title;
			this.getDetail();
			this.title === '买新房' && this.getNewsList();
		}
	},
	methods: {
		gotoGouseDetailImg() {
			uni.navigateTo({
				url: '/pages/index/houseDetailImg?id=' + this.id
			});
		},
		goToMoreInfo() {
			uni.navigateTo({
				url: '/pages/index/houseMoreInfo?id=' + this.id
			});
		},
		gotoHouseTypeList() {
			uni.navigateTo({
				url: '/pages/index/moreHouseTypeList?id=' + this.id
			});
		},
		gotoHouseTypeDetail(id) {
			uni.navigateTo({
				url: '/pages/index/houseTypeDetail?id=' + id
			});
		},
		getNewsList() {
			this.request({
				url: '/LouPanInfo/selectArticleById',
				data: {
					louPanId: this.id
				},
				success: res => {
					console.log('新闻列表', res);
					if (res.data.code === 200) {
						this.newsList = res.data.data;
					}
				}
			});
		},
		getDetail() {
			this.showLoading();
			// 买新房
			let url = '/LouPanInfo/detail';
			let formData = {
				louPanId: this.id
			};
			if (this.title === '买新房') {
				url = '/LouPanInfo/detail';
				formData = {
					louPanId: this.id
				};
			} else if (this.title === '买二手房' || this.title === '找租房') {
				url = '/rentSaleHouse/detail';
				formData = {
					id: this.id
				};
			} else if (this.title === '商铺') {
				// 商铺
				url = '/rentSaleShop/detail';
				formData = {
					id: this.id
				};
			} else if (this.title === '写字楼') {
				// 商铺
				url = '/rentSaleOffice/detail';
				formData = {
					id: this.id
				};
			}
			this.request({
				url: url,
				data: formData,
				success: res => {
					uni.hideLoading();
					console.log('楼盘详情', res);
					if (this.title === '买新房' && res.data.code === 200) {
						res.data.data.lightSpot = res.data.data.lightSpot ? res.data.data.lightSpot.split(',') : [];
						this.houseInfo = res.data.data;
						this.getAround(this.peitao[0].name);
					} else if ((this.title === '买二手房' || this.title === '找租房') && res.data.code === 200) {
						res.data.data.picUrlList = res.data.data.picUrls;
						res.data.data.address = res.data.data.area + res.data.data.housingEstate;
						res.data.data.year = res.data.data.year ? res.data.data.year.split(' ')[0] : '年份未知';
						this.houseInfo = res.data.data;
						this.getAround(this.peitao[0].name);
					} else if (this.title === '商铺' && res.data.code === 200) {
						res.data.data.picUrlList = res.data.data.picUrlList.map(i => {
							i.picUrl = i.url;
							return i;
						});
						res.data.data.address = res.data.data.area + res.data.data.address + res.data.data.shopName;
						res.data.data.year = res.data.data.year ? res.data.data.year.split(' ')[0] : '年份未知';
						res.data.data.louPanName = res.data.data.shopName;
						res.data.data.price = res.data.data.money;
						this.houseInfo = res.data.data;
						this.getAround(this.peitao[0].name);
					} else if (this.title === '写字楼' && res.data.code === 200) {
						res.data.data.picUrlList = res.data.data.picUrlList.map(i => {
							i.picUrl = i.url;
							return i;
						});
						res.data.data.address = res.data.data.area + res.data.data.address + res.data.data.title;
						res.data.data.year = res.data.data.year ? res.data.data.year.split(' ')[0] : '年份未知';
						res.data.data.louPanName = res.data.data.title;
						res.data.data.price = res.data.data.money;
						
						res.data.data.jingyingStatus = res.data.data.officeType
						this.houseInfo = res.data.data;
						this.getAround(this.peitao[0].name);
					}
				}
			});
		},
		goToNewsInfo(id) {
			uni.navigateTo({
				url: '/pages/index/articleDetail?id=' + id
			});
		},
		map() {
			if (!this.location.lng) {
				this.qqmap.geocoder({
					// address: '河南省郑州市紫荆山公园',
					address: this.houseInfo.address,
					type: 'gcj02',
					success: res => {
						console.log('经纬度', res);
						let latitude = res.result.location.lat;
						let longitude = res.result.location.lng;
						this.location.lng = longitude;
						this.location.lat = latitude;
						uni.openLocation({
							type: 'gcj02',
							latitude: latitude,
							longitude: longitude,
							address: this.houseInfo.address
						});
					},
					fail: error => {
						console.error(error);
					}
				});
			} else {
				let latitude = this.location.lat;
				let longitude = this.location.lng;
				uni.openLocation({
					type: 'gcj02',
					latitude: latitude,
					longitude: longitude,
					address: this.houseInfo.address
				});
			}
		},
		getAround(keyword) {
			if (!this.location.lng) {
				this.qqmap.geocoder({
					// address: '河南省郑州市紫荆山公园',
					address: this.houseInfo.address,
					type: 'gcj02',
					success: res => {
						console.log('经纬度', res);
						let latitude = res.result.location.lat;
						let longitude = res.result.location.lng;
						this.location.lng = longitude;
						this.location.lat = latitude;
						this.qqmap.search({
							keyword,
							location: `${latitude},${longitude}`,
							success: res => {
								console.log('搜索周边', res);
								if (res.status === 0) {
									this.peitaoList = res.data;
								}
							},
							fail: err => {
								console.log('搜索周边err', err);
							}
						});
					},
					fail: error => {
						console.error(error);
					}
				});
			} else {
				let latitude = this.location.lat;
				let longitude = this.location.lng;
				this.qqmap.search({
					keyword,
					location: `${latitude},${longitude}`,
					success: res => {
						console.log('搜索周边', res);
						if (res.status === 0) {
							this.peitaoList = res.data;
						}
					},
					fail: err => {
						console.log('搜索周边err', err);
					}
				});
			}
		},
		changePeitaoIdx(idx) {
			this.peitaoIdx = idx;
			this.getAround(this.peitao[idx].name);
		},
		cellPhone(e) {
			let phoneNumber = e.currentTarget.dataset.phone;
			if (!phoneNumber) {
				uni.showModal({
					title: '提示',
					content: '暂未设置联系方式',
					showCancel: false
				});
				return false;
			}
			uni.makePhoneCall({
				phoneNumber: '' + phoneNumber
			});
		}
	}
};
</script>

<style lang="scss">
:-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}

page {
	width: 100%;
	height: auto;
	background-color: #b60005;
}

.detail {
	overflow: hidden;
	padding: 0rpx 0rpx 30rpx;
}

/* 通用 */

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

/* 轮播代码 */

.imgSwiper {
	width: 100%;
	height: 400rpx;
}

.lengthBox {
	position: absolute;
	right: 30rpx;
	bottom: 100rpx;
	background: rgba(0, 0, 0, 0.5);
	color: #fff;
	font-size: 22rpx;
	padding: 2rpx 26rpx;
	border-radius: 22rpx;
}

.imgSwiper image {
	width: 100%;
	height: 100%;
}

.imgSwiper .demo-text-1 {
	position: relative;
	align-items: center;
	justify-content: center;
	background-color: #1aad19;
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

/* 房源信息 */

.houseInfo {
	margin-top: -40px;
	position: relative;
	overflow: hidden;
	border-radius: 8rpx;
	margin-bottom: 16px;
}
.houseInfo2 {
	margin-top: 20px;
	.addressov1 {
		width: auto !important;
		flex: 1;
	}
}

.houseInfo .grey {
	color: grey;
}

.houseInfo .state {
	overflow: hidden;
	background: rgba(255, 255, 255, 0.8);
	height: 40px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 0 0 0 30rpx;
}

.houseInfo .state text {
	float: left;
	font-size: 22rpx;
	border: 2rpx solid #d9172a;
	color: #d9172a;
	padding: 0 10rpx;
	margin-right: 10rpx;
}

.houseInfo .state text.red {
	background: #d9172a;
	color: #fff;
}

.houseInfo .projectName {
	font-size: 36rpx;
	font-weight: 700;
	line-height: 2em;
	letter-spacing: 2px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.houseInfo .projectName .morebox {
	display: inline-block;
	border: 2rpx solid #d9172a;
	color: #d9172a;
	padding: 0 10rpx;
	font-size: 22rpx;
	line-height: 1.8em;
	letter-spacing: 1px;
	height: 1.8em;
}

.houseInfo .price {
	font-size: 32rpx;
	color: #d9172a;
	font-weight: 500;
	margin-bottom: 8px;
	margin-top: 8px;
}

.houseInfo .addressov1 {
	display: inline-block;
	width: 95%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.houseInfo .projectNameRemark {
	font-size: 26rpx;
}

.houseInfo .buyPeoples {
	overflow: hidden;
}

.houseInfo .buyPeoples > view {
	display: inline-block;
}

.houseInfo .buyPeoples .img {
	width: 60rpx;
	height: 60rpx;
	background-size: 100% 100%;
	border-radius: 50%;
	border: 1rpx solid white;
	box-sizing: border-box;
}

.houseInfo .buyPeoples .special {
	vertical-align: super;
}

.houseInfo .buyPeoples .ml15 {
	margin-left: -15rpx;
}

.houseInfo .more01 {
	font-size: 28rpx;
	padding: 10rpx 6rpx;
	text-align: center;
	background: #f4f9ff;
	color: #609df0;
	margin-top: 20rpx;
}

.houseInfo .tel,
.houseInfo .address {
	font-size: 30rpx;
	position: relative;
}

.tel .icondianhua,
.address .icondizhi {
	position: absolute;
	right: 0;
	color: #d9172a;
}

.room {
	overflow: hidden;
}

.room button {
	width: auto;
	padding: 0;
	display: inline;
}

.room .left {
	width: 410rpx;
	height: 200rpx;
	background-color: white;
	float: left;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.room .right {
	width: 200rpx;
	height: 200rpx;
	/* background-color: white; */
	float: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.room .right > view {
	height: 90rpx;
	/* background: rgb(243, 230, 55); */
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.videoEnter {
	height: 80px;
	border-radius: 8px;
	overflow: hidden;
}

.videoEnter image {
	width: 100%;
	height: 100%;
}

.hx_detailBox {
	background-color: #f8e6e6;
}

.hx_detailBox .hx_box {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	/* color: white; */
}

.hx_detailBox .hx_box .hx_title {
	font-weight: bold;
	letter-spacing: 2px;
}

.hx_detailBox .hx_box .hx_more {
	font-size: 22rpx;
	color: grey;
}

/* 置业顾问 */

.zygw {
	background-color: white;
	padding: 20rpx;
}

.ztt_hdDetail {
	font-weight: 600;
	color: #000;
	/* line-height: 1.08rem; */
	padding: 10rpx;
	/* background: #fef8f5; */
	border-top-left-radius: 6rpx;
	border-top-right-radius: 6rpx;
	letter-spacing: 2px;
}

.ztt_zygwList {
	margin: 0rem 20rpx 0;
}

.ztt_zygwList .ztt_zygwListItem {
	border-top: 2rpx solid #eadddd;
	transform-origin: 0px 0px;
	opacity: 1;
	transform: scale(1, 1);
}

.ztt_zygwListItem {
	position: relative;
	padding: 30rpx 164rpx 30rpx 0;
	min-height: 70rpx;
}

.ztt_zygwListItem .head {
	float: left;
	width: 90rpx;
	height: 90rpx;
	margin-right: 34rpx;
	position: relative;
}

.ztt_zygwListItem .info text {
	font-size: 28rpx;
	color: #232426;
	margin-right: 6rpx;
	font-weight: 600;
}

.ztt_zygwListItem .lab {
	font-size: 24rpx;
	color: #7d8084;
	margin-top: -2rpx;
}

.ztt_zygwListItem .wxBtn {
	right: 100rpx;
}

.ztt_zygwListItem .btns {
	position: absolute;
	top: 40rpx;
	right: 16rpx;
	font-size: 0;
}

.ztt_imBtn,
.ztt_telBtn {
	display: inline-block;
	width: 64rpx;
	height: 64rpx;
	background-position: -64rpx -140rpx;
	background: url(https://housecollection.oss-cn-beijing.aliyuncs.com/xiaochengxu/564e8e5fbd3f5ed2345784d1213ea33.png) no-repeat;
	background-size: 560rpx auto;
}

.ztt_zygwListItem .head image {
	width: 100%;
	height: 100%;
	vertical-align: middle;
	border-radius: 50%;
}

.ztt_zygwListItem .wxBtn {
	right: 100rpx;
}

.ztt_imBtn {
	background-position: -65rpx -140rpx;
}

.ztt_telBtn {
	background-position: 0 -140rpx;
}

/* 轮播 */

.hx_detailBox .imgSwiper {
	padding: 16rpx 0 16rpx 32rpx;
	height: 440rpx;
	overflow: hidden;
	width: 626rpx;
}

.hx_detailBox .imgSwiper .swiperItem {
	display: inline-block;
	padding-right: 80rpx;
	width: 380rpx !important;
	vertical-align: top;
}

.hx_detailBox .imgSwiper .swiperItem .pic {
	height: 152px;
	box-sizing: border-box;
	border: 1px solid rgba(0, 0, 0, 0.15);
	position: relative;
	margin-bottom: 10rpx;
	display: flex;
	align-items: center;
	border-radius: 14rpx;
	overflow: hidden;
}

.hx_detailBox .imgSwiper .swiperItem .pic image {
	width: 100%;
	/* height: 100%; */
	height: 114px;
}

.hx_detailBox .imgSwiper .swiperItem .tit {
	font-weight: 600;
	letter-spacing: 2px;
	font-size: 28rpx;
}

.hx_detailBox .imgSwiper .swiperItem .area {
	font-size: 26rpx;
	color: grey;
}

.hx_detailBox .imgSwiper .swiperItem .labs {
	font-size: 0;
	margin-top: 6rpx;
	height: 36rpx;
	overflow: hidden;
}

.hx_detailBox .imgSwiper .swiperItem .labs text {
	font-size: 24rpx;
	color: #8f9aaf;
	margin: 0 12rpx 0 0;
	display: inline-block;
	padding: 0 8rpx;
	background-color: #f0f3fa;
}

/* 时间线 */

.timeline .hx_box {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 10rpx;
}

.timeline .hx_box .hx_title {
	font-weight: bold;
}

.timeline .hx_box .hx_more {
	font-size: 24rpx;
	color: grey;
}

.timeline {
	padding: 20rpx;
	background-color: #f8e6e6;
}

.timeline-item {
	position: relative;
}

.timeline-item-head {
	width: 24rpx;
	height: 24rpx;
	left: 14rpx;
	top: 8rpx;
	position: absolute;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.timeline-item-head .whiteBox {
	width: 10rpx;
	height: 10rpx;
	background: #fff;
	border-radius: 50%;
	position: relative;
	z-index: 3;
}

.timeline-item-color {
	background-color: #b60005;
}

.hide {
	display: none;
}

.timeline-item-tail {
	position: absolute;
	content: '';
	height: 100%;
	width: 4rpx;
	left: 25rpx;
	top: 10px;
	border-left: 2px dashed #b60005;
}

.timeline-item-content {
	padding: 0 0 0 50rpx;
	font-size: 28rpx;
}

.timeline-item-content .info {
	color: #888;
	background: #eeeff6;
	margin-right: 20rpx;
	padding: 20rpx;
	margin-top: 10px;
	margin-bottom: 10px;
}

.timeline-item-content .time {
	color: #333;
	font-size: 28rpx;
	font-weight: 600;
}

/* news */

.news {
	padding: 20rpx;
	background-color: #f8e6e6;
}

.news .hx_box {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 10rpx;
}

.news .hx_box .hx_title {
	font-weight: bold;
}

.news .hx_box .hx_more {
	font-size: 24rpx;
	color: grey;
}

.news .li {
	padding: 22rpx;
	display: flex;
	justify-content: space-around;
	background: #eeeff6;
	border-radius: 8rpx;
	overflow: hidden;
	margin-bottom: 10px;
}

.news .li .pic {
	/* float: left; */
	width: 180rpx;
	height: 130rpx;
	margin-right: 22rpx;
	/* flex: 1; */
}

.news .li .pic image {
	width: 180rpx;
	height: 130rpx;
	/* object-fit: cover; */
	border-radius: 8rpx;
}

.news .li .rightContent {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
	font-size: 28rpx;
}

.news .li .rightContent .title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	line-height: 1.2;
	font-size: 26rpx;
}

/* 广告 */

.advertisement {
	padding: 20rpx;
	background-color: #f8e6e6;
}

.advertisement .hx_box {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 10rpx;
}

.advertisement .hx_box .hx_title {
	font-weight: bold;
}

.advertisement .hx_box .hx_more {
	font-size: 24rpx;
	color: grey;
}

.advertisement .ad_img {
	height: 1200rpx;
	background-color: #f09292;
	& > image {
		width: 100%;
		height: 120rpx;
	}
}

/* 项目位置 */

.projectAddress {
	padding: 20rpx 20rpx 40rpx;
	background-color: #f8e6e6;
	border-radius: 6rpx;
	margin-bottom: 30rpx;
}

.projectAddress .hx_box {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 10rpx;
}

.projectAddress .hx_box .hx_title {
	font-weight: bold;
}

.projectAddress .hx_box .hx_more {
	font-size: 24rpx;
	color: grey;
}

.projectAddress .ad_img {
	height: 400rpx;
	background-color: #f09292;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.addressBox {
	position: relative;
}

.projectAddress .ad_address,
.addressBox .ad_address {
	position: absolute;
	width: 280rpx;
	background-color: #fff;
	padding: 12rpx 20rpx;
	border-radius: 10rpx;
	left: 50%;
	transform: translateX(-50%);
	top: 5%;
	font-size: 24rpx;
}

.projectAddress .ad_address .name,
.addressBox .ad_address .name {
	width: 250rpx;
	text-align: center;
}

.projectAddress .ad_address .icondizhi,
.name .icondizhi .addressBox .ad_address .icondizhi,
.name .icondizhi {
	top: 5rpx;
	right: 20rpx;
	color: #b60005;
	position: absolute;
}

.drift {
	animation: drift 1s infinite;
}

@keyframes drift {
	0% {
		transform: translateX(-50%) translateY(0);
	}

	50% {
		transform: translateX(-50%) translateY(3px);
	}

	100% {
		transform: translateX(-50%) translateY(0);
	}
}

/* tab */

.tab {
	display: flex;
	justify-content: space-around;
}

.tab .tabItem {
	text-align: center;
	padding: 10rpx 0;
	position: relative;
	color: rgb(82, 79, 79);
}

.tab .active {
	color: black;
}

.tab .tabItem .iconF {
	height: 60rpx;
	line-height: 60rpx;
	& > image {
		width: 40rpx;
	}
}

.tab .tabItem .iconfont {
	font-size: 40rpx;
}

.tab .tabItem .name {
	font-size: 24rpx;
	font-weight: 600;
}

.active::after {
	content: '';
	width: 34rpx;
	height: 2rpx;
	background: black;
	display: block;
	position: absolute;
	left: 10rpx;
	bottom: 0rpx;
}

.iconjiaotong {
	color: #13d9a1;
}

.iconxuexiao {
	color: #2b2ef1;
}

.iconxuexiao {
	color: #2b2ef1;
}

.iconyiliao {
	color: #ff6190;
}

.icongouwu {
	color: #fdb92c;
}

.iconcanyin {
	color: #3fbbff;
}

/* tabContent */

.tabContent {
	padding: 20rpx 0;
}

.tabContent .tabContentItem {
	display: flex;
	justify-content: space-between;
	padding: 6rpx 30rpx;
	font-size: 28rpx;
	color: rgb(46, 44, 44);
}

.tabContent .tabContentItem .remote {
	color: rgb(156, 147, 147);
}

.tabContent .tabContentItem .name {
	width: 300rpx;
	font-size: 24rpx;
}

.around {
	color: #b60005;
	border: 2rpx solid #b60005;
	text-align: center;
	padding: 15rpx 0;
	/* display: inline-block;  */
	font-size: 24rpx;
	font-weight: 600;
}

/* fixed */

.fixed {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: white;
	height: 100rpx;
	line-height: 100rpx;
}

.flex {
	display: flex;
	justify-content: space-around;
}

.flex .bgRed {
	height: 70rpx;
	line-height: 70rpx;
	margin: 15rpx 0;
	background: #b60005;
	padding: 0 60rpx;
	color: white;
}

.share {
	position: relative;
	display: flex;
	flex-direction: column;
}

.share > view {
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	color: #b60005;
}

.share .fenxiang {
	line-height: 30rpx;
}

.share .fenxiang button {
	background: none;
	width: 158rpx;
	padding: 0;
	color: #b60005;
	padding-top: 10rpx;
}

.share .fenxiang button view {
	font-size: 28rpx;
}

.btmChat {
	position: fixed;
	bottom: 0;
	width: 100%;
}

.showAnimate {
	z-index: 2;
	animation: showH 0.3s linear;
}

.btmChat .ztt_zygwList {
	max-height: 200px;
	overflow: scroll;
}

@keyframes showH {
	0% {
		transform: translateY(100%);
	}

	100% {
		transform: translateY(0%);
	}
}

.iconclose {
	position: absolute;
	right: 30rpx;
	top: 20rpx;
}

.mask {
	width: 100%;
	height: 100%;
	position: fixed;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
}
</style>
