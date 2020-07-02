<template>
	<view class="addArticleView">
		<!-- <view class="section bg-white">
			<view class="iptBox flex"><input v-model="article.title" type="text" placeholder="请输入标题" /></view>
		</view> -->

		<view class="section bg-white">
			<view class="commitbox  ">
				<textarea v-model="article.content" placeholder="请输入内容" />
				<view class="cu-form-group" style="padding: 0;">
					<view class="grid col-3 grid-square flex-sub">
						<view class="solids" @tap="ChooseImage" v-if="imgList.length < 9"><text class="cuIcon-cameraadd"></text></view>
						<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @click.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="iptBox flex align-center">
				<text class="cuIcon cuIcon-phone"></text>
				<input type="number" v-model="article.phone" placeholder="电话号码" />
			</view> -->
			<view @click="chooseAddress" class="iptBox flex align-center">
				<text class="cuIcon-locationfill"></text>
				<input type="text" :disabled="true" v-model="article.address.address" placeholder="选择所在位置" />
			</view>
		</view>

		<button @click="saveArticle" class="cu-btn btn bg-green">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [],
			imgSrcList: [],
			location: {
				latitude: '',
				longitude: ''
			},
			article: {
				title: '',
				content: '',
				address: {
					latitude: '',
					longitude: '',
					address: ''
				},
				phone: ''
			}
		};
	},
	onShow() {
		this.checkLogin().then(
			res => {},
			err => {
				uni.showModal({
					title: '提示',
					content: '请先登录!',
					showCancel: false,
					success: res => {
						uni.switchTab({
							url: '/pages/my/my'
						});
					}
				});
			}
		);
	},
	methods: {
		saveArticle() {
			// let formData = this.article;
			// if (!formData.title) {
			// 	this.showToast('请填写标题');
			// 	return false;
			// }
			// if (!formData.content) {
			// 	this.showToast('请填写内容');
			// 	return false;
			// }
			// if (!formData.phone) {
			// 	this.showToast('请填写电话');
			// 	return false;
			// }
			// if (!this.checkPhone(formData.phone)) {
			// 	this.showToast('请填写正确的电话');
			// 	return false;
			// }
			let formData = {
				content: this.article.content,
				address: this.article.address.address,
				ids: this.imgSrcList.join(','),
				userId:this.getUserId()
			};
			if (!formData.content) {
				this.showToast('请填写内容');
				return false;
			}
			console.log(formData);
			this.showLoading();
			this.request({
				url: '/microcosm/save',
				data: formData,
				success: res => {
					uni.hideLoading();
					console.log('保存文章', res);
					if (res.data.code === 200) {
						uni.showModal({
							title: '发布房聊',
							content: '发布成功!',
							showCancel: false,
							success: res => {
								uni.switchTab({
									url: '/pages/roomChat/roomChat'
								});
							}
						});
					} else {
						uni.showModal({
							title: '发布房聊',
							content: res.data.message || '发布失败!',
							showCancel: false
						});
					}
				}
			});
		},
		getLocation() {
			uni.getSetting({
				success: setting => {
					console.log('查看权限', setting);
					if (setting.authSetting['scope.userLocation'] == false) {
						uni.showModal({
							title: '授权定位信息',
							content: '请允许授权信息!',
							success: res => {
								if (res.confirm) {
									uni.openSetting({
										success: res => {
											console.log('打开授权设置页面res', res);
										},
										fail: err => {
											console.log('打开授权设置页面err', err);
										}
									});
								}
							}
						});
					} else {
						uni.getLocation({
							type: 'gcj02',
							success: res => {
								console.log('申请经纬度', res);
								this.location = res;
								this.chooseAddress();
							},
							fail: err => {
								console.log('申请经纬度失败', err);
							}
						});
					}
				},
				fail: err => {
					console.log('查看权限失败', err);
				}
			});
		},
		chooseAddress() {
			if (this.location.latitude && this.location.longitude) {
				console.log('缓存经纬度', this.location);
				uni.chooseLocation({
					latitude: this.location.latitude,
					longitude: this.location.longitude,
					success: res => {
						console.log('打开地图res', res);
						this.article.address = res;
					},
					fail: err => {
						console.log('打开地图err', err);
					}
				});
				return false;
			} else {
				this.getLocation();
			}
		},
		ChooseImage() {
			if (this.imgList.length >= 9) {
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
					let url = this.uploadUrl + '/microcosm/upload';
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
		}
	}
};
</script>

<style lang="scss">
.addArticleView {
	font-size: 28rpx;
	color: #000;
	.section {
		padding: 0 25rpx;
		.iptBox {
			border-bottom: 1rpx solid #ededed;
			height: 34px;
			& > input {
				height: 100%;
				flex: 1;
			}
			& > text {
				margin-right: 14rpx;
			}
		}
		.commitbox {
			border-bottom: 1rpx solid #ededed;
			& > textarea {
				width: 100%;
				height: 140px;
				padding-top: 25rpx;
				margin-bottom: 10px;
			}
		}
	}
	.btn {
		width: calc(100% - 50rpx);
		height: 80rpx;
		line-height: 80rpx;
		display: block;
		margin: 0 auto;
		margin-top: 20px;
	}
}
</style>
