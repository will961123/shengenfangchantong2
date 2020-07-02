<template>
	<view class="myView">
		<view class="topBox   flex justify-between align-center">
			<button v-if="!openId || !userInfo.avatarUrl" class="getuserinfo" @getuserinfo="getUserInfo" open-type="getUserInfo">登录</button>
			<view class="userBox flex  align-center">
				<image :src="userInfo.avatarUrl || '/static/logo.png'" mode="aspectFill"></image>
				<text>{{ userInfo.nickName || '请登录' }}</text>
			</view>
			<!-- <text class="cuIcon cuIcon-right"></text> -->
		</view>

		<view class="menuBox">
			<view @click="gotoSysNote" class="item bg-white flex align-center"> 
				<text style="font-size: 42rpx;margin-right: 16rpx;" class=" cuIcon cuIcon-notice "></text>
				系统通知
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {},
			userId: ''
		};
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		this.userId = this.getUserId();
	},
	onShareAppMessage() {
		return {
			title: '我的',
			path: '/pages/my/my?searchUserId=' + this.getUserId()
		};
	},
	methods: {
		gotoSysNote(){
			uni.navigateTo({
				url:'/pages/my/sysNote'
			})
		},
		getUserInfo(e) {
			console.log('按钮', e);
			this.showLoading();
			if (e.detail.errMsg === 'getUserInfo:ok') {
				uni.login({
					provider: 'weixin',
					success: code => {
						console.log('code', code);
						this.request({
							url: '/wx/code2session',
							data: {
								code: code.code
							},
							success: openId => {
								console.log('openId', openId);
								if (openId.statusCode === 200) {
									uni.setStorageSync('openId', openId.data.openid);
									this.openid = openId.data.openid;
									e.detail.userInfo.openId = this.openid;
									this.request({
										url: '/user/saveUserInfo',
										data: e.detail.userInfo,
										success: saveUser => {
											uni.hideLoading()
											// 1278259914808606722
											console.log('saveUser', saveUser);
											uni.setStorageSync('userInfo', e.detail.userInfo);
											uni.setStorageSync('userId', saveUser.data.data);
											this.userInfo = e.detail.userInfo;
											this.userId = saveUser.data.data;
										}
									});
									// return;
									// this.request({
									// 	url: '/user/userInfo',
									// 	data: {
									// 		openId: openId.data.openid
									// 	},
									// 	success: userInfo => {
									// 		uni.hideLoading();
									// 		console.log('服务器返回userInfo', userInfo);
									// 		console.log(userInfo.data.data);
									// 		if (userInfo.data.code === 200) {
									// 			uni.setStorageSync('userInfo', userInfo.data.data);
									// 			uni.setStorageSync('userId', userInfo.data.data.userId);
									// 			this.userInfo = userInfo.data.data;
									// 			this.userId = userInfo.data.data.userId;
									// 		}
									// 	}
									// });
								} else {
									uni.hideLoading();
									uni.showModal({
										title: '登录',
										content: openId.errMsg || '登录失败!',
										showCancel: false
									});
								}
							}
						});
					}
				});
			} else {
				uni.hideLoading();
				uni.showModal({
					title: '登录',
					content: '请允许授权登录！',
					showCancel: false
				});
			}
		}
	}
};
</script>

<style lang="scss">
.myView {
	.topBox {
		height: 100px;
		padding: 0 40rpx;
		color: #000;
		background-color: #62b65d;
		position: relative;
		.getuserinfo {
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
			background: transparent;
		}
		.userBox {
			font-size: 28rpx;
			& > image {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				margin-right: 8rpx;
			}
		}
		.cuIcon {
			font-size: 48rpx;
		}
	}
	.menuBox {
		margin-top: 10px;
		.item {
			padding: 0 40rpx;
			line-height: 50px;
			& > image {
				width: 30rpx;
				margin-right: 16rpx;
			}
		}
	}
}
</style>
