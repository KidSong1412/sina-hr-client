<template>
	<view class="index">
		<view class="tabBar">
			<view class="title" @click="tabHandle(index)" :class="currentTab === index ? 'active' : ''" v-for="(item, index) in tabList" :key="index">{{item.title}}<span class="count">({{item.count}})</span></view>
		</view>
		<view class="seat"></view>
		<view class="tab_content">
			<swiper class="swiper" :current="currentSwiper" @change="swiperHandle">
				<swiper-item class="swiper_item">
					<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
						<view class="list_item" v-for="item of waiting_check" :key="item.id">
							<view>
								<view class="name">{{ item.name }}（{{ item.gender }}）</view>
								<view>应聘部门：{{ item.application_department }}</view>
								<view>应聘岗位：{{ item.application_position }}</view>
								<view>投递时间：{{ getFormatDate(item.create_time) }}</view>
								<view>简历来源：{{ item.source ? item.source : '待补充' }}</view>
							</view>
							<view class="btn" @click="toDetail(item.id, item.trainee)">
								<button class="mini-btn" type="default" size="mini" plain="true">当前情况</button>
							</view>
						</view>
						<view class="toBottom">
							------我是有底线的------
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper_item">
					<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
						<view class="list_item" v-for="item of waiting_interview" :key="item.id">
							<view>
								<view class="name">{{ item.name }}（{{ item.gender }}）</view>
								<view>应聘部门：{{ item.application_department }}</view>
								<view>应聘岗位：{{ item.application_position }}</view>
								<!-- <view>面试安排：2021年06月21日 13:00</view>
								<view>面试官：姓名</view> -->
								<view>投递时间：{{ getFormatDate(item.create_time) }}</view>
								<view>简历来源：{{ item.source ? item.source : '待补充' }}</view>
							</view>
							<view class="btn" @click="toDetail(item.id, item.trainee)">
								<button class="mini-btn" type="default" size="mini" plain="true">当前情况</button>
							</view>
						</view>
						<view class="toBottom">
							------我是有底线的------
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper_item">
					<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false">
						<view class="list_item" v-for="item of interviewed" :key="item.id">
							<view>
								<view class="name">{{ item.name }}（{{ item.gender }}）</view>
								<view>应聘部门：{{ item.application_department }}</view>
								<view>应聘岗位：{{ item.application_position }}</view>
								<!-- <view>面试安排：2021年06月21日 13:00</view>
								<view>面试官：姓名</view> -->
								<view>投递时间：{{ getFormatDate(item.create_time) }}</view>
								<view>简历来源：{{ item.source ? item.source : '待补充' }}</view>
							</view>
							<view class="btn" @click="toDetail(item.id, item.trainee)">
								<button class="mini-btn" type="default" size="mini" plain="true">当前情况</button>
							</view>
						</view>
						<view class="toBottom">
							------我是有底线的------
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Index from '@/lin/model/index.js'
	import Appointment from '@/lin/model/appointment.js';
	export default {
		data() {
			return {
				tabList: [
					{
						title: '待审核',
						count: 999
					},
					{
						title: '待面试',
						count: 555
					},
					{
						title: '已面试跟踪',
						count: 999
					}
				],
				currentTab: 0,
				currentSwiper: 0,
				waiting_check: [],
				waiting_interview: [],
				interviewed: [],
				all_waiting_check: [],
				all_waiting_interview: [],
				all_interviewed: [],
				waiting_check_total: 0,
				waiting_check_current_page: 1,
				waiting_interview_total: 0,
				waiting_interview_current_page: 1,
				interviewed_total: 0,
				interviewed_current_page: 1,
				count: 10
			}
		},
		async mounted () {
			// #ifdef H5
			var a = document.getElementsByClassName('uni-page-head-hd')[0]
			a.style.display = 'none';
			// #endif
			const { id: userId, username } = await Appointment.getCurrentUserInf()
			const { result: { interviewed, waiting_check, waiting_interview } } = await Index.getIndexData(username);
			// console.log(interviewed)
			// console.log(waiting_check)
			// console.log(waiting_interview)
			// this.waiting_check = waiting_check
			this.all_waiting_check = waiting_check
			this.waiting_check_total = waiting_check.length
			this.waiting_check = this.all_waiting_check.slice(0, this.waiting_check_current_page * this.count)
			// this.waiting_interview = waiting_interview
			this.all_waiting_interview = waiting_interview
			this.waiting_interview_total = waiting_interview.length
			this.waiting_interview = this.all_waiting_interview.slice(0, this.waiting_interview_current_page * this.count)
			// this.interviewed = interviewed
			this.all_interviewed = interviewed
			this.interviewed_total = interviewed.length
			this.interviewed = this.all_interviewed.slice(0, this.interviewed_current_page * this.count)
			this.tabList[0].count = waiting_check.length
			this.tabList[1].count = waiting_interview.length
			this.tabList[2].count = interviewed.length
		},
		methods: {
			tabHandle (index) {
				this.currentTab = index
				this.currentSwiper = index
			},
			swiperHandle (e) {
				this.currentTab = e.detail.current
			},
			getFormatDate (date) {
				const millisecond_date = date * 1000
				const year = new Date(millisecond_date).getFullYear()
				const month = new Date(millisecond_date).getMonth() + 1
				const day = new Date(millisecond_date).getDate()
				const hours = new Date(millisecond_date).getHours()
				const minutes = String(new Date(millisecond_date).getMinutes()).padStart(2, 0)
				return `${year}年${month}月${day}日 ${hours}:${minutes}`
			},
			toDetail (id, trainee) {
				// #ifdef H5
				this.$router.push({ name: 'Detail', query: { id: id, trainee: trainee } })
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				uni.navigateTo({
					url: '/pages/detail/detail?id=' + id + '&trainee=' + trainee
				})
				// #endif
				// console.log(id)
			}
		},
		async onPullDownRefresh () {
			const { id: userId, username } = await Appointment.getCurrentUserInf()
			const { result: { interviewed, waiting_check, waiting_interview } } = await Index.getIndexData(username);
			this.waiting_check = waiting_check
			this.waiting_interview = waiting_interview
			this.interviewed = interviewed
			this.tabList[0].count = waiting_check.length
			this.tabList[1].count = waiting_interview.length
			this.tabList[2].count = interviewed.length
			uni.stopPullDownRefresh()
		},
		onReachBottom () {
			if (this.waiting_check_total >= this.waiting_check.length && this.currentTab == 0) {
				// console.log(0)
				this.waiting_check_current_page += 1
				this.waiting_check = this.all_waiting_check.slice(0, this.waiting_check_current_page * this.count)
			}
			if (this.waiting_interview_total >= this.waiting_interview.length && this.currentTab == 1) {
				// console.log(1)
				this.waiting_interview_current_page += 1
				this.waiting_interview = this.all_waiting_interview.slice(0, this.waiting_interview_current_page * this.count)
			}
			if (this.interviewed_total >= this.interviewed.length && this.currentTab == 2) {
				// console.log(2)
				this.interviewed_current_page += 1
				this.interviewed = this.all_interviewed.slice(0, this.interviewed_current_page * this.count)
			}
			// console.log(3)
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		width: 750rpx;
		height: 100vh;
		background: #f2f2f2;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		.tabBar {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			background: #ffffff;
			font-size: 28rpx;
			display: flex;
			position: fixed;
			top: --status-bar-height;
			left: 0;
			right: 0;
			z-index: 999;
			.title {
				flex: 1;
				text-align: center;
				cursor: pointer;
				&.active {
					background: #C0C0C0;
					color: #ffffff;
				}
			}
		}
		.seat {
			height: 60rpx;
		}
		.tab_content {
			flex: 1;
			.swiper {
				height: 100%;
				.swiper_item {
					height: 100%;
					overflow: hidden;
					.scroll-Y {
						height: 100%;
						.list_item {
							height: 300rpx;
							background: #ffffff;
							margin-top: 20rpx;
							overflow: hidden;
							display: flex;
							justify-content: space-around;
							font-size: 28rpx;
							color: #515151;
							padding: 30rpx 0;
							box-sizing: border-box;
							.name {
								font-size: 36rpx;
								color: #333333;
								margin-bottom: 30rpx;
							}
							.mini-btn {
								font-size: 30rpx;
								color: #333333;
							}
						}
						.toBottom {
							width: 100%;
							padding: 30rpx 0;
							text-align: center;
							font-size: 30rpx;
							color: #C0C0C0;
						}
					}
				}
			}
		}
	}
</style>
