<template>
	<view class="sellHouseView">
		<view class="section bg-white">
			<view class="item flex align-center">
				<view class="tit">所在区域</view>
				<view class="iptbox flex align-center"><input :disabled="true" @click="openChooseAddress" type="text" v-model="formData.area" placeholder="请输入所在区域" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">所属小区</view>
				<view class="iptbox flex align-center"><input type="text" v-model="formData.housingEstate" placeholder="请输入所属小区" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">装修类型</view>
				<picker @change="bindPickerChange($event, 1)" :range="decorationTypeList">
					<input type="text" :disabled="true" :value="decorationType > -1 ? decorationTypeList[decorationType] : ''" placeholder="请选择装修类型" />
				</picker>
			</view>
			<view class="item flex align-center">
				<view class="tit">用途</view>
				<picker @change="bindPickerChange($event, 2)" :range="useTypeList">
					<input type="text" :disabled="true" :value="useType > -1 ? useTypeList[useType] : ''" placeholder="请选择用途" />
				</picker>
			</view>
		</view>

		<view class="section bg-white">
			<view class="item flex align-center">
				<view class="tit">房屋名称</view>
				<view class="iptbox flex align-center"><input type="text" v-model="formData.houseName" placeholder="请输入房屋名称" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">{{ title === '我要出租' ? '租金（单位：元）' : '售价（单位：万元）' }}</view>
				<view class="iptbox flex align-center"><input type="digit" v-model="formData.price" :placeholder="title === '我要出租' ? '请输入租金' : '请输入售价'" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">户型</view>
				<view class="iptbox flex align-center"><input type="text" v-model="formData.apartmentLayout" placeholder="请输入户型" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">年代</view>
				<picker mode="date" @change="bindPickerChange($event, 3)"><input type="text" :disabled="true" v-model="formData.year" placeholder="请输入年代" /></picker>
				<!-- <view class="iptbox flex align-center"><input type="text" v-model="formData.year" placeholder="请输入年代" /></view> -->
			</view>
			<view class="item flex align-center">
				<view class="tit">面积（单位：m²）</view>
				<view class="iptbox flex align-center"><input type="digit" v-model="formData.mianji" placeholder="请输入面积" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">楼层</view>
				<view class="iptbox flex align-center"><input type="number" v-model="formData.floor" placeholder="请输入楼层" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">手机号</view>
				<view class="iptbox flex align-center"><input type="number" v-model="formData.phone" placeholder="请输入手机号" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">标签</view>
				<view class="iptbox flex align-center"><input type="text" v-model="formData.label" placeholder="请输入标签" /></view>
			</view>
			<view class="item item2">
				<view class="tit">房屋描述</view>
				<textarea v-model="formData.houseDescribe" placeholder="请输入房屋描述" />
			</view>
		</view>

		<view class="section bg-white">
			<view class="item item2"><view class="tit">房屋封面</view></view>
			<view class="commitbox  ">
				<view class="cu-form-group" style="padding: 0;">
					<view class="grid col-4 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<button @click="saveHoustInfo" class="cu-btn btn bg-green">提交</button>

		<sunui-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="bindPickerChange($event, 4)" themeColor="#007AFF"></sunui-address>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '我要卖房',
			decorationTypeList: ['毛坯', '精装'],
			decorationType: -1,
			useTypeList: ['住宅', '商铺'],
			useType: -1,
			imgList: [],
			imgSrcList: [],
			formData: {
				area: '区域', // 区域
				housingEstate: '所属小区', //所属小区
				decorationType: '装修类型', //装修类型
				useType: '用途', //用途
				houseName: '房屋名字', //房屋名字
				price: '88.8', //房屋售价
				apartmentLayout: '户型', //户型
				year: '', //年代
				mianji: '110', //面积
				floor: '13', //楼层
				phone: '15999999999', //手机号
				label: '标签', //标签
				houseDescribe: '描述', //描述
				ids: '' // 图片
			},

			cityPickerValueDefault: [0, 0, 1],
			pickerText: ''
		};
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		uni.setNavigationBarTitle({
			title: this.title
		});
	},
	methods: {
		onConfirm(e) {
			console.log(e);
		},
		saveHoustInfo() {
			let formData = this.formData;
			if (!formData.area) {
				this.showToast('请输入区域');
				return false;
			}
			if (!formData.housingEstate) {
				this.showToast('请输入所属小区');
				return false;
			}
			if (this.decorationType < 0) {
				this.showToast('请选择装修类型');
				return false;
			}
			if (this.useType < 0) {
				this.showToast('请选择装用途');
				return false;
			}
			formData.decorationType = this.decorationTypeList[this.decorationType];
			formData.useType = this.useTypeList[this.useType];
			formData.rentSaleType = this.title === '我要卖房' ? 0 : 1;
			if (!formData.houseName) {
				this.showToast('请输入房屋名称');
				return false;
			}
			if (!formData.price) {
				this.showToast('请输入房屋价格');
				return false;
			}
			if (!formData.apartmentLayout) {
				this.showToast('请输入户型');
				return false;
			}
			if (!formData.year) {
				this.showToast('请输入年代');
				return false;
			}
			if (!formData.mianji) {
				this.showToast('请输入面积');
				return false;
			}
			if (!formData.floor) {
				this.showToast('请输入楼层');
				return false;
			}
			if (!formData.phone) {
				this.showToast('请输入手机号');
				return false;
			}
			if (!this.checkPhone(formData.phone)) {
				this.showToast('请输入正确手机号');
				return false;
			}
			if (!formData.label) {
				this.showToast('请输入标签');
				return false;
			}
			if (!formData.houseDescribe) {
				this.showToast('请输入描述');
				return false;
			}
			if (this.imgSrcList.length <= 0) {
				this.showToast('请上传图片');
				return false;
			}
			formData.ids = this.imgSrcList.join(',');
			console.log('formData', formData);
			this.showLoading();
			this.request({
				url: '/rentSaleHouse/save',
				data: formData,
				success: res => {
					uni.hideLoading();
					console.log('save-type-' + this.title, res);
					if (res.data.code === 200) {
						uni.showModal({
							title: '发布结果',
							content: '发布成功！',
							showCancel: false,
							success: res => {
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						});
					} else {
						uni.showModal({
							title: '发布结果',
							content: res.data.message || '发布失败！',
							showCancel: false
						});
					}
				}
			});
		},
		ChooseImage() {
			if (this.imgList.length > 3) {
				return;
			}
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					} else {
						this.imgList = res.tempFilePaths;
					}
					this.showLoading();
					let url = this.uploadUrl + '/rentSaleHouse/uploadRentPic';
					if (this.title === '我要卖房') {
						url = this.uploadUrl + '/rentSaleHouse/uploadSalePic';
					}
					uni.uploadFile({
						url: url,
						filePath: res.tempFilePaths[0],
						name: 'files',
						formData: {},
						success: res => {
							uni.hideLoading();
							let resoult = JSON.parse(res.data);
							console.log('上传图片', resoult);
							if (resoult.code === 200) {
								this.imgSrcList.push(...resoult.data);
								console.log(this.imgSrcList);
							} else {
								this.showToast(resoult.info);
							}
						},
						fail: err => {
							console.log(err);
						}
					});
				}
			});
		},
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		DelImg(e) {
			this.imgList.splice(e.currentTarget.dataset.index, 1);
			this.imgSrcList.splice(e.currentTarget.dataset.index, 1);
		},
		openChooseAddress() {
			this.cityPickerValueDefault = [0, 0, 1];
			this.$refs.simpleAddress.open();
		},
		bindPickerChange(e, type) {
			console.log(e, type);
			switch (type) {
				case 1:
					this.decorationType = e.detail.value;
					break;
				case 2:
					this.useType = e.detail.value;
					break;
				case 3:
					this.formData.year = e.detail.value;
					break;
				case 4:
					this.formData.area = e.label;
					break;
			}
		}
	}
};
</script>

<style lang="scss">
.sellHouseView {
	padding-bottom: 40px;
	.section {
		margin-bottom: 14px;
		.item {
			border-bottom: 1rpx solid #ededed;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #000;
			padding: 0 25rpx;
			&:last-child {
				border-bottom: none;
			}
			.iptbox {
				flex: 1;
				height: 100%;
				input {
					text-align: right;
					font-size: 28rpx;
					color: #000;
					flex: 1;
					border: none;
					height: 100%;
				}
			}
			picker {
				flex: 1;
			}
			picker input {
				width: 100%;
				border: none;
				text-align: right;
				font-size: 28rpx;
				color: #000;
			}
		}
		.item2 {
			height: auto;
			textarea {
				font-size: 28rpx;
				color: #000;
				height: 80px;
			}
		}
	}

	.commitbox {
		border-bottom: 1rpx solid #ededed;
		padding: 25rpx;
	}

	.btn {
		width: calc(100% - 50rpx);
		height: 80rpx;
		line-height: 80rpx;
		display: block;
		margin: 0 auto;
	}
}
</style>
