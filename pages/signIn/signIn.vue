<template>
	<view class="signIn">
		<view class="base_info block_style">
			<view class="name">{{ info.name }}（{{ info.gender }}）</view>
			<view class="info">应聘部门：{{ info.application_department }}</view>
			<view class="info">应聘岗位：{{ info.application_position }}</view>
			<view class="info">面试安排：{{ getFormatDate(lastRecord.appointment_time) || '待预约' }}</view>
			<view>简历来源：{{ info.source || '待补充' }}</view>
		</view>
		<view class="toSignIn">
			<view class="first_level_title">实际抵达时间</view>
			<view class="sign_in block_style">
				<view class="sign_in_style">
					<text>面试官：</text>
					<text>{{ lastRecord.interview_name }}</text>
				</view>
				<view class="sign_in_style">
					<text>预约面试时间：</text>
					<text>{{ getFormatDate(lastRecord.appointment_time) || '待预约' }}</text>
				</view>
				<view class="sign_in_style">
					<text>实际到达时间：</text>
					<text>
						<hTimePicker timeNum="0" sTime="0" cTime="23" interval="1" @changeTime="changeTime">
						  <view slot="pCon" class="changeTime">
						    {{signCont}}
						  </view>
						</hTimePicker>
					</text>
				</view>
				<view class="toSignBtn">
					<button style="background: #169bd4; color: #ffffff;" @click="toSign()">确认提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	import SignIn from '@/lin/model/signIn.js';
	import Detail from '@/lin/model/detail.js'
	export default {
		data() {
			return {
				signCont: '点击选择时间',
				info: {},
				lastRecord: {},
				option: {}
			}
		},
		onLoad (option) {
			this.option = option
		},
		watch: {
			'$route': {
				handler: async function (to, from) {
					// #ifdef H5
					const id = to.query.id
					// #endif
					// #ifdef (APP-PLUS || MP-WEIXIN)
					const id = this.option.id
					// #endif
					const { result } = await Detail.getInfoById(id)
					this.info = result
					this.lastRecord = result.InterviewArrangement[result.InterviewArrangement.length - 1]
				}
			}
		},
		async mounted () {
			// #ifdef H5
			const id = this.$route.query.id
			// #endif
			// #ifdef (APP-PLUS || MP-WEIXIN)
			const id = this.option.id
			// #endif
			const { result } = await Detail.getInfoById(id)
			this.info = result
			this.lastRecord = result.InterviewArrangement[result.InterviewArrangement.length - 1]
		},
		methods: {
			changeTime (val01, val02) {
				this.signCont = val01
			},
			async toSign () {
				const date = new Date(this.signCont).getTime() / 1000
				// #ifdef H5
				const id = this.$route.query.id
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				// #endif
				const { message } = await SignIn.Arrive(id, date)
				if (message === '编辑成功') {
					uni.showToast({
					    title: '签到成功',
					    duration: 2000
					});
				} else {
					uni.showToast({
					    title: '签到失败',
					    duration: 2000
					});
				}
			},
			getFormatDate (date) {
				if (date) {
					const millisecond_date = date * 1000
					const year = new Date(millisecond_date).getFullYear()
					const month = new Date(millisecond_date).getMonth() + 1
					const day = new Date(millisecond_date).getDate()
					const hours = new Date(millisecond_date).getHours()
					const minutes = String(new Date(millisecond_date).getMinutes()).padStart(2, 0)
					return `${year}年${month}月${day}日 ${hours}:${minutes}`
				} else {
					return false
				}
			}
		},
		components: {
			hTimePicker
		}
	}
</script>

<style lang="scss" scoped>
	.signIn {
		width: 750rpx;
		background: #f2f2f2;
		.block_style {
			background: #ffffff;
			color: #515151;
		}
		.first_level_title {
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			color: #7b7b7b;
			padding-left: 15rpx;
		}
		.base_info {
			height: 320rpx;
			overflow: hidden;
			font-size: 28rpx;
			padding: 30rpx 25rpx;
			box-sizing: border-box;
			.name {
				font-size: 36rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}
			.info {
				margin-bottom: 10rpx;
			}
		}
		.toSignIn {
			.sign_in {
				padding: 30rpx 25rpx;
				box-sizing: border-box;
				overflow: hidden;
				.sign_in_style {
					display: flex;
					font-size: 28rpx;
					margin-bottom: 10rpx;
					text:first-child {
						flex: 4;
						flex-shrink: 0;
						color: #848484;
					}
					text:last-child {
						flex: 6;
					}
				}
				.toSignBtn {
					margin-top: 50rpx;
					padding: 0 0 30rpx;
				}
			}
		}
	}
</style>
