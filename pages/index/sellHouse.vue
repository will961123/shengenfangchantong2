<template>
	<view class="sellHouseView">
		<view class="section bg-white">
			<view class="item flex align-center">
				<view class="tit">所在区域</view>
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入所在区域" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">所属小区</view>
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入所属小区" /></view>
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
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入房屋名称" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">{{ title === '我要出租' ? '租金（单位：元）' : '售价（单位：万元）' }}</view>
				<view class="iptbox flex align-center"><input type="digit" value="" :placeholder="title === '我要出租' ? '请输入租金' : '请输入售价'" /></view>
			</view> 
			<view class="item flex align-center">
				<view class="tit">户型</view>
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入户型" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">年代</view>
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入年代" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">面积（单位：m²）</view>
				<view class="iptbox flex align-center"><input type="digit" value="" placeholder="请输入面积" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">楼层</view>
				<view class="iptbox flex align-center"><input type="number" value="" placeholder="请输入楼层" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">手机号</view>
				<view class="iptbox flex align-center"><input type="number" value="" placeholder="请输入手机号" /></view>
			</view>
			<view class="item flex align-center">
				<view class="tit">标签</view>
				<view class="iptbox flex align-center"><input type="text" value="" placeholder="请输入标签" /></view>
			</view>
			<view class="item item2">
				<view class="tit">房屋描述</view>
				<textarea value="" placeholder="请输入房屋描述" />
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

		<button class="cu-btn btn bg-green">提交</button>
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
			imgSrcList: []
		};
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		uni.setNavigationBarTitle({
			title: this.title
		});
	},
	methods: {
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
					uni.uploadFile({
						url: this.uploadUrl + '/admin/upload', //仅为示例，非真实的接口地址
						filePath: res.tempFilePaths[0],
						name: 'file',
						formData: {},
						success: res => {
							uni.hideLoading();
							let resoult = JSON.parse(res.data);
							console.log('上传图片', resoult);
							if (resoult.status === 1) {
								this.imgSrcList.push(resoult.url);
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
		bindPickerChange(e, type) {
			console.log(e.detail.value, type);
			switch (type) {
				case 1:
					this.decorationType = e.detail.value;
					break;
				case 2:
					this.useType = e.detail.value;
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
