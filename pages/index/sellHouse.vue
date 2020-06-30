<template>
	<view class="sellHouseView">
		<view v-if="title === '我要卖房' || title === '我要出租'">
			<view class="section bg-white">
				<view class="item flex align-center">
					<view class="tit">所在区域</view>
					<view class="iptbox flex align-center">
						<input :disabled="true" @click="openChooseAddress" type="text" v-model="formData.area" placeholder="请输入所在区域" />
					</view>
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
				<view class="item item2"><view class="tit">房屋照片</view></view>
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
		</view>

		<!-- 商铺 & 写字楼 -->
		<view v-else>
			<view v-if="formPage === 1">
				<view class="section bg-white">
					<view class="item item2">
						<view class="tit">
							<text v-if="title === '出租商铺'">商铺照片</text>
							<text v-else>写字楼照片</text>
						</view>
					</view>
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
				<view class="section bg-white">
					<view class="item flex align-center">
						<view class="tit">所在区域</view>
						<view class="iptbox flex align-center">
							<input :disabled="true" @click="openChooseAddress" type="text" v-model="formData.area" placeholder="请输入所在区域" />
						</view>
					</view>
					<view class="item flex align-center">
						<view class="tit">详细地址</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.address" placeholder="请输入详细地址" /></view>
					</view>
					<view class="item flex align-center">
						<view class="tit">
							<text v-if="title === '出租商铺'">商铺名</text>
							<text v-else>写字楼名</text>
						</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.shopName" placeholder="请输入商铺名" /></view>
					</view>
					<view class="item flex align-center">
						<view class="tit">开始楼层</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.floorStart" placeholder="请输入开始楼层" /></view>
					</view>
					<view class="item flex align-center">
						<view class="tit">结束楼层</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.floorEnd" placeholder="请输入结束楼层" /></view>
					</view>
					<view v-if="title === '出租商铺'" class="item flex align-center">
						<view class="tit">商铺类型</view>
						<picker @change="bindPickerChange($event, 5)" :range="shopTypeList">
							<input type="text" :disabled="true" :value="formData.shopType > -1 ? shopTypeList[formData.shopType] : ''" placeholder="请选择商铺类型" />
						</picker>
					</view>
					<view v-else class="item flex align-center">
						<view class="tit">写字楼类型</view>
						<picker @change="bindPickerChange($event, 10)" :range="officeBuildingTypeList">
							<input
								type="text"
								:disabled="true"
								:value="formData.officeBuildingType > -1 ? officeBuildingTypeList[formData.officeBuildingType] : ''"
								placeholder="请选择写字楼类型"
							/>
						</picker>
					</view>
					<view class="item flex align-center">
						<view class="tit">建筑面积(米)</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.mianji" placeholder="请输入建筑面积" /></view>
					</view>
					<view v-if="title === '出租商铺'">
						<view class="item flex align-center">
							<view class="tit">是否临街</view>
							<picker @change="bindPickerChange($event, 6)" :range="isLinjieList">
								<input type="text" :disabled="true" :value="formData.isLinjie > -1 ? isLinjieList[formData.isLinjie] : ''" placeholder="请选择是否临街" />
							</picker>
						</view>
						<view class="item flex align-center">
							<view class="tit">面宽(米)</view>
							<view class="iptbox flex align-center"><input type="text" v-model="formData.miankuan" placeholder="请输入面宽" /></view>
						</view>
						<view class="item flex align-center">
							<view class="tit">层高(米)</view>
							<view class="iptbox flex align-center"><input type="text" v-model="formData.cenggao" placeholder="请输入层高" /></view>
						</view>
						<view class="item flex align-center">
							<view class="tit">进深(米)</view>
							<view class="iptbox flex align-center"><input type="text" v-model="formData.jinshen" placeholder="请输入进深" /></view>
						</view>
						<view class="item flex align-center">
							<view class="tit">经营状态</view>
							<picker @change="bindPickerChange($event, 7)" :range="jingyingStatusList">
								<input
									type="text"
									:disabled="true"
									:value="formData.jingyingStatus > -1 ? jingyingStatusList[formData.jingyingStatus] : ''"
									placeholder="请选择经营状态"
								/>
							</picker>
						</view>
						<view class="item flex align-center">
							<view class="tit">经营行业</view>
							<picker @change="bindPickerChange($event, 8)" :range="jingyingHangyeList">
								<input
									type="text"
									:disabled="true"
									:value="formData.jingyingHangye > -1 ? jingyingHangyeList[formData.jingyingHangye] : ''"
									placeholder="请选择经营行业"
								/>
							</picker>
						</view>
					</view>
					<view v-else class="item item2">
						<view class="tit">房源描述</view>
						<textarea v-model="formData.houseDescribe" placeholder="请输入房源描述" />
					</view>
					<view v-if="title === '出租写字楼'" class="item item2">
						<view class="tit">写字楼配套</view>
						<view class="peitaoBox flex flex-wrap align-center">
							<view
								@click="changeOfficeBuildingPeitao(index)"
								v-for="(item, index) in officeBuildingPeitao"
								:key="index"
								:class="item.select ? 'select' : ''"
								class="peitaoItem"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="item flex align-center">
						<view class="tit">出租或出售</view>
						<picker @change="bindPickerChange($event, 9)" :range="saveTypeList">
							<input type="text" :disabled="true" :value="saveTypeList[formData.saveType]" placeholder="请选择出租或出售" />
						</picker>
					</view>
					<view v-if="formData.saveType === 0" class="item flex align-center">
						<view class="tit">租金(万元/月)</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.money" placeholder="请输入租金" /></view>
					</view>
					<view v-if="title === '出租商铺'" class="item flex align-center">
						<view class="tit">物业费(元/月)</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.wuyefei" placeholder="请输入物业费" /></view>
					</view>
					<view v-if="formData.saveType === 1" class="item flex align-center">
						<view class="tit">售价(万元/套)</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.money" placeholder="请输入售价" /></view>
					</view>
					<view class="item flex align-center">
						<view class="tit">联系人</view>
						<view class="iptbox flex align-center"><input type="text" v-model="formData.contact" placeholder="请输入联系人" /></view>
					</view>
					<view class="item flex align-center">
						<view class="tit">手机号</view>
						<view class="iptbox flex align-center"><input type="number" v-model="formData.phone" placeholder="请输入手机号" /></view>
					</view>
					<view v-if="title === '出租写字楼'" class="item flex align-center">
						<view class="tit">身份</view>
						<picker @change="bindPickerChange($event, 11)" :range="identityList">
							<input type="text" :disabled="true" :value="formData.identity > -1 ? identityList[formData.identity] : ''" placeholder="请选择身份" />
						</picker>
					</view>
				</view>
			</view>
		</view>

		<button v-if="title === '我要卖房' || title === '我要出租'" @click="saveHoustInfo" class="cu-btn btn bg-green">提交</button>
		<button v-else @click="saveShopInfo" class="cu-btn btn bg-green">提交</button>

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
			shopTypeList: ['商业街店铺', '写字楼配套', '社区底商', '临街门面', '档口摊位', '购物百货中心', '其他'], //商铺类型
			isLinjieList: ['是', '否'], // 是否临街
			jingyingStatusList: ['经营中', '空置中'], //经营状态
			saveTypeList: ['出租', '出售'],
			jingyingHangyeList: [
				'餐饮美食',
				'美容美发',
				'服饰鞋包',
				'休闲娱乐',
				'百货超市',
				'生活服务',
				'电器通讯',
				'汽修美容',
				'医疗器械',
				'家居建材',
				'教育培训',
				'酒店宾馆',
				'其他'
			], //经营行业

			officeBuildingTypeList: ['纯写字楼', '商业综合体', '商务公寓', '商务酒店'], // 写字楼类型
			officeBuildingPeitao: [
				{ name: '宽带', select: false },
				{ name: '水', select: true },
				{ name: '电', select: false },
				{ name: '电话', select: false },
				{ name: '中央空调', select: false },
				{ name: '电梯', select: false },
				{ name: '集中供暖', select: false },
				{ name: '办公家具', select: false },
				{ name: '免费车位', select: false },
				{ name: '员工餐厅', select: false },
				{ name: '安全监控', select: false }
			], // 写字楼配套
			identityList: ['经纪人', '个人'], // 发布者身份

			imgList: [],
			imgSrcList: [],
			formPage: 1,
			formData: {
				area: '河南省郑州市管城区', // 区域
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
				ids: '', // 图片

				shopType: -1, //商铺类型
				isLinjie: -1, //是否临街
				jingyingStatus: -1, //经营状态
				saveType: 0, //（0出租 1售卖）
				jingyingHangye: -1, //经营行业
				address: '商都路街道', //详细地址
				shopName: '悦之河精品酒店', //商铺名
				floorStart: '13',
				floorEnd: '18',
				miankuan: '110', //面宽
				cenggao: '3', //层高
				jinshen: '18', //进深
				money: '99999', //租金
				wuyefei: '66666', //物业费

				officeBuildingType: -1, //写字楼类型
				contact: '联系人', // 写字楼联系人
				identity: -1 //发布者身份
			},

			cityPickerValueDefault: [0, 0, 1],
			pickerText: ''
		};
	},
	onShow() {
		this.checkLogin().then(res=>{},err=>{
			 uni.showModal({
			 	title:'提示',
				content:'请先登录!',
				showCancel:false,
				success:res=>{
					uni.switchTab({
						url:'/pages/my/my'
					})
				}
			 })
		})
	},
	onLoad(options) {
		options.title ? (this.title = options.title) : '';
		uni.setNavigationBarTitle({
			title: this.title
		});
	},
	methods: {
		changeOfficeBuildingPeitao(idx) {
			this.officeBuildingPeitao[idx].select = !this.officeBuildingPeitao[idx].select;
		},
		// 发布商铺 || 发布写字楼
		saveShopInfo() {
			let formData = Object.assign({}, this.formData);
			let url = '/rentSaleShop/save';
			if (this.title === '出租商铺') {
				if (!formData.area) {
					this.showToast('请输入区域');
					return false;
				}
				if (!formData.address) {
					this.showToast('请输入详细地址');
					return false;
				}
				if (!formData.shopName) {
					this.showToast('请输入商铺名');
					return false;
				}
				if (formData.floorStart === '') {
					this.showToast('请输入开始楼层');
					return false;
				}
				if (formData.floorEnd === '') {
					this.showToast('请输入结束楼层');
					return false;
				}
				if (formData.floorStart > formData.floorEnd) {
					this.showToast('结束楼层不能比开始楼层高');
					return false;
				}
				formData.floor = formData.floorStart + '-' + formData.floorEnd;
				if (formData.shopType < 0) {
					this.showToast('请选择商铺类型');
					return false;
				}
				formData.shopType = this.shopTypeList[formData.shopType];
				if (!formData.mianji) {
					this.showToast('请输入面积');
					return false;
				}
				if (formData.isLinjie < 0) {
					this.showToast('请选择是否临街');
					return false;
				}
				// formData.isLinjie = formData.isLinjie === 0 ? true: false;
				formData.linjie = formData.isLinjie === 0 ? true : false;
				if (!formData.miankuan) {
					this.showToast('请输入面宽');
					return false;
				}
				if (!formData.cenggao) {
					this.showToast('请输入层高');
					return false;
				}
				if (!formData.jinshen) {
					this.showToast('请输入进深');
					return false;
				}
				if (formData.jingyingStatus < 0) {
					this.showToast('请选择经营状态');
					return false;
				}
				formData.jingyingStatus = this.jingyingStatusList[formData.jingyingStatus];
				if (formData.jingyingHangye < 0) {
					this.showToast('请选择经营行业');
					return false;
				}
				formData.jingyingHangye = this.jingyingHangyeList[formData.jingyingHangye];
				if (formData.saveType < 0) {
					this.showToast('请选择出租或出售');
					return false;
				}
				formData.saleType = formData.saveType;
				if (!formData.money && formData.saveType == 0) {
					this.showToast('请输入租金');
					return false;
				}
				if (!formData.money && formData.saveType == 1) {
					this.showToast('请输入售价');
					return false;
				}
				if (!formData.wuyefei) {
					this.showToast('请输入物业费');
					return false;
				}
				if (!formData.phone) {
					this.showToast('请输入手机号');
					return false;
				}
				// if (formData.identity < 0) {
				// 	this.showToast('请选择身份');
				// 	return false;
				// }
				formData.identity = this.identityList[formData.identity];
				if (!this.checkPhone(formData.phone)) {
					this.showToast('请输入正确手机号');
					return false;
				}
				if (this.imgSrcList.length <= 0) {
					this.showToast('请上传图片');
					return false;
				}
				formData.ids = this.imgSrcList.join(',');
			}
			// 发布写字楼
			else {
				url = '/rentSaleOffice/save';
				if (!formData.area) {
					this.showToast('请输入区域');
					return false;
				}
				if (!formData.address) {
					this.showToast('请输入详细地址');
					return false;
				}
				if (!formData.shopName) {
					this.showToast('请输入写字楼名');
					return false;
				}
				formData.title = formData.shopName;
				if (formData.floorStart === '') {
					this.showToast('请输入开始楼层');
					return false;
				}
				if (formData.floorEnd === '') {
					this.showToast('请输入结束楼层');
					return false;
				}
				if (formData.floorStart > formData.floorEnd) {
					this.showToast('结束楼层不能比开始楼层高');
					return false;
				}
				formData.floor = formData.floorStart + '-' + formData.floorEnd;
				if (formData.officeBuildingType < 0) {
					this.showToast('请选择写字楼类型');
					return false;
				}
				formData.officeType = this.officeBuildingTypeList[formData.officeBuildingType];
				if (!formData.mianji) {
					this.showToast('请输入面积');
					return false;
				}
				if (!formData.houseDescribe) {
					this.showToast('请输入描述');
					return false;
				}
				let peitao = [];
				for (let idx in this.officeBuildingPeitao) {
					if (this.officeBuildingPeitao[idx].select) {
						peitao.push(this.officeBuildingPeitao[idx].name);
					}
				}
				if (peitao.length <= 0) {
					this.showToast('请选择配套');
					return false;
				}
				formData.peitao = peitao.join(',');
				if (formData.saveType < 0) {
					this.showToast('请选择出租或出售');
					return false;
				}
				formData.saleType = formData.saveType;
				if (!formData.money && formData.saveType == 0) {
					this.showToast('请输入租金');
					return false;
				}
				if (!formData.money && formData.saveType == 1) {
					this.showToast('请输入售价');
					return false;
				}
				formData.officeDescribe = formData.houseDescribe;
				if (!formData.contact) {
					this.showToast('请输入联系人');
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
				if (formData.identity < 0) {
					this.showToast('请选择身份');
					return false;
				}
				formData.identity = this.identityList[formData.identity];
				if (this.imgSrcList.length <= 0) {
					this.showToast('请上传图片');
					return false;
				}
				formData.ids = this.imgSrcList.join(',');
			}

			console.log('formData', formData); 
			this.showLoading();
			this.request({
				url: url,
				data: formData,
				success: res => {
					uni.hideLoading();
					if (this.title === '出租商铺') {
						console.log('发布商铺', res);
					} else {
						console.log('发布写字楼', res);
					}

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
		// 发布房子 我要出租 我要出售
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
					// 我要出租
					let url = this.uploadUrl + '/rentSaleHouse/uploadRentPic';
					if (this.title === '我要卖房') {
						url = this.uploadUrl + '/rentSaleHouse/uploadSalePic';
					} else if (this.title === '出租商铺') {
						url = this.uploadUrl + '/rentSaleShop/upload';
					} else if (this.title === '出租写字楼') {
						url = this.uploadUrl + '/rentSaleOffice/upload';
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
		/**
		 * @param {Object} e
		 * @param {String} type
		 * 1装修类型
		 * 2用途
		 * 3年代
		 * 4地区
		 * 5商铺性质
		 * 6是否临街
		 * 7经营状态
		 * 8经营行业
		 * 9出租或出售
		 * 10写字楼类型
		 * 11写字楼发布者身份
		 */
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
				case 5:
					this.formData.shopType = e.detail.value;
					break;
				case 6:
					this.formData.isLinjie = e.detail.value;
					break;
				case 7:
					this.formData.jingyingStatus = e.detail.value;
					break;
				case 8:
					this.formData.jingyingHangye = e.detail.value;
					break;
				case 9:
					this.formData.saveType = e.detail.value;
					break;
				case 10:
					this.formData.officeBuildingType = e.detail.value;
					break;
				case 11:
					this.formData.identity = e.detail.value;
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
			.peitaoItem {
				border: 1rpx solid #999;
				line-height: 60rpx;
				padding: 0 16rpx;
				border-radius: 30rpx;
				margin-bottom: 8px;
				font-size: 28rpx;
				margin-right: 18rpx;
				min-width: 3em;
				text-align: center;
				&.select {
					background-color: red;
					color: #fff;
					border-color: transparent;
				}
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
