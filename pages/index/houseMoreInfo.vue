<template>
	<view>
		<view class="test">
			<view class="flexcity">
				<view class="name">{{ detail.louPanName }}</view>
				<view class="price ">均价 约{{ detail.price }}元/m²起</view>
				<image class="citybg" mode="widthFix" src="/static/citybg.png"></image>
			</view>

			<view class="weui-cells mb20 bra6">
				<view class="weui-cell ">
					<view class="weui-cell__bd">物业类型</view>
					<view class="weui-cell__ft">{{ detail.tenementNature }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">装修状况</view>
					<view class="weui-cell__ft">{{ detail.decorStyle }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">产权年限</view>
					<view class="weui-cell__ft">{{ detail.propertyRight }}年</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">开发商</view>
					<view class="weui-cell__ft">{{ detail.developer }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">项目地址</view>
					<view class="weui-cell__ft">{{ detail.address }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">咨询电话</view>
					<view class="weui-cell__ft">{{ detail.telephone }}</view>
				</view>
			</view>
			<view class="weui-cells mb20 bra6">
				<view class="weui-cell ">
					<view class="weui-cell__bd">销售状态</view>
					<view class="weui-cell__ft">{{ detail.saleStatus == 0 ? '预售' : '在售' }}</view>
				</view>
			</view>
			<view class="weui-cells mb20 bra6">
				<view class="weui-cell ">
					<view class="weui-cell__bd">占地面积</view>
					<view class="weui-cell__ft">{{ detail.floorSpace }}m²</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">建筑面积</view>
					<view class="weui-cell__ft">{{ detail.coveredArea }}m²</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">停车位</view>
					<view class="weui-cell__ft">{{ detail.truckSpace }}个</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">总户数</view>
					<view class="weui-cell__ft">{{ detail.houseAmount }}户</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">物业公司</view>
					<view class="weui-cell__ft">{{ detail.propertyMana }}</view>
				</view>
			</view>
			<view class="weui-cells mb20 bra6">
				<view class="weui-cell ">
					<view class="weui-cell__bd">交通</view>
					<view class="weui-cell__ft">{{ detail.traffic }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">学校</view>
					<view class="weui-cell__ft">{{ detail.school }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">医疗</view>
					<view class="weui-cell__ft">{{ detail.hospital }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">购物</view>
					<view class="weui-cell__ft">{{ detail.shopping }}</view>
				</view>
				<view class="weui-cell ">
					<view class="weui-cell__bd">餐饮</view>
					<view class="weui-cell__ft">{{ detail.restaurant }}</view>
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
			detail: {}
		};
	},
	onLoad(options) {
		if (options.id) {
			this.id = options.id;
			this.getDetail();
		}
	},
	onShareAppMessage() {
		return {
			title: '更多详情',
			path: '/pages/index/houseMoreInfo?id=' + this.id + '&searchUserId=' + this.getUserId()
		};
	},
	methods: {
		getDetail() {
			this.showLoading();
			this.request({
				url: '/LouPanInfo/detail',
				data: {
					louPanId: this.id
				},
				success: res => {
					uni.hideLoading();
					if (res.data.code === 200) {
						this.detail = res.data.data;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.weui-cell {
	justify-content: center;
	align-items: baseline;
	font-size: 28rpx;
	background: rgb(255, 255, 255);
	padding: 30rpx 40rpx;
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	&::before {
		right: 16px;
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
		color: rgba(0, 0, 0, 0.1);
		left: 16px;
	}
	&:last-child{
		&::before{
			border: none;
		}
	}
}


.weui-cell__bd {
	color: rgba(0, 0, 0, 0.5);
	font-size: 24rpx;
	width: 144rpx;
	flex: unset;
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
}
.weui-cell__ft {
	text-align: left;
	flex: 1;
	color: #000;
	font-size: 24rpx;
}

page {
	background-color: #fafbfc;
}

.bra6 {
	border-radius: 6rpx;
}

.mb20 {
	margin-bottom: 50rpx;
}

.elli {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.pinkRed {
	color: #d9172a;
}

.test {
	padding: 0 30rpx;
}

.name {
	padding: 40rpx 0 10rpx;
	font-weight: 700;
	font-size: 34rpx;
}

.price {
	margin-bottom: 50rpx;
	letter-spacing: 1px;
	font-size: 28rpx;
	position: relative;
	z-index: 2;
}

.flexcity {
	position: relative;
}

.citybg {
	width: 375rpx;
	position: absolute;
	right: 20rpx;
	bottom: -50rpx;
	z-index: 1;
}

.weui-cell {
	justify-content: center;
	align-items: baseline;
	font-size: 28rpx;
	background: rgb(255, 255, 255);
	padding: 30rpx 40rpx;
}

.weui-cells {
	/* 左上下右 */
	/* box-shadow: 2px 0 2px 0 #999,
	    0 2px 2px 0 #999,
	    0 0px 0px 0 #ff0,
	    -2px 0 2px 0 #999; */

	box-shadow: -5px 5px 19px 0px rgba(208, 206, 206, 0.6);
	border-radius: 6rpx;
}

.weui-cell__ft {
	text-align: left;
	/* flex: 0 0 80%; */
	flex: 1;
	color: #000;
	/* margin-left: 30rpx; */
	font-size: 24rpx;
}

.weui-cell__bd {
	color: rgba(0, 0, 0, 0.5);
	font-size: 24rpx;
	width: 144rpx;
	flex: unset;
}

.weui-cell::before {
	right: 16px;
}

.table {
	padding: 20rpx 0;
}

.th > view {
	color: rgba(0, 0, 0, 0.5);
}

.th > view,
.td > view {
	flex: 1;
	text-align: center;
}

.td,
.th {
	padding: 16rpx 16px;
	color: rgb(83, 71, 71);
}
</style>
