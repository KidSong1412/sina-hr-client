<template>
	<view class="detail">
		<view class="base_info block_style">
			<view class="name">{{ info.name }}（{{ info.gender }}）</view>
			<view class="info">应聘部门：{{ info.application_department }}</view>
			<view class="info">应聘岗位：{{ info.application_position }}</view>
			<view class="info">面试安排：{{ getFormatDate(lastRecord.appointment_time) || '待预约' }}</view>
			<view class="info">面试官：{{ lastRecord.interview_name || '暂无' }}</view>
			<view>简历来源：{{ info.source || '待补充' }}</view>
		</view>
		<scroll-view scroll-x="true" :show-scrollbar="false" style="background: #ffffff;">
			<view class="interview_stream block_style">
			<template v-for="(item, index) of info.InterviewArrangement">
			<view class="interview_process" :key="item.id" v-show="item.actual_time">
				<view class="interview_layer">{{ interviewLayer(index) }}面<text :class="item.result == 1 ? 'succ' : 'err'">{{ getResult(item.result) }}</text></view>
				<view class="interview_time">{{ getFormatDate(item.appointment_time, false, true) }}</view>
			</view>
			<view class="iconfont" v-show="info.InterviewArrangement[index + 1]">&#xe6a8;</view>
			<view class="interview_process" v-show="!item.actual_time">
				<view class="interview_layer">待{{ interviewLayer(index) }}面</view>
				<view class="interview_time">{{ getFormatDate(item.appointment_time, false, true) }}</view>
			</view>
			</template>
			<view v-if="isAppointment" class="interview_signIn" @click="toAppointment()">预约面试</view>
			<view v-else class="interview_signIn" @click="toSignIn()">面试签到</view>
			</view>
		</scroll-view>
		<view class="detail_info">
			<view class="first_level_title">详细资料</view>
			<view class="detail_info_content block_style">
				<view>
					<view class="detail_info_style">
						<text>性别：</text>
						<text>{{ info.gender }}</text>
					</view>
					<view class="detail_info_style">
						<text>籍贯：</text>
						<text>{{ info.native_palace }}</text>
					</view>
					<view class="detail_info_style">
						<text>出生年月：</text>
						<text>{{ getFormatDate(info.date_of_birth, false) }}</text>
					</view>
					<view class="detail_info_style">
						<text>首次参加工作日期：</text>
						<text>{{ getFormatDate(info.date_of_work_first, false) }}</text>
					</view>
					<view class="detail_info_style">
						<text>最高学历：</text>
						<text>{{ info.highest_education }}</text>
					</view>
					<view class="detail_info_style">
						<text>毕业学校：</text>
						<text>{{ info.graduation_school }}</text>
					</view>
					<view class="detail_info_style">
						<text>毕业专业：</text>
						<text>{{ info.graduation_major }}</text>
					</view>
					<view class="detail_info_style">
						<text>毕业时间：</text>
						<text>{{ getFormatDate(info.date_graduation, false) }}</text>
					</view>
					<view class="detail_info_style">
						<text>最近任职工作单位：</text>
						<text>{{ info.recent_work }}</text>
					</view>
					<view class="detail_info_style">
						<text>手机：</text>
						<text>{{ info.phone }}</text>
					</view>
					<view class="detail_info_style">
						<text>邮箱：</text>
						<text>{{ info.email }}</text>
					</view>
				</view>
				<view class="btn">
					<button style="background: #169bd4; color: #ffffff;" @click="toEditInfo()">编辑资料</button>
				</view>
			</view>
		</view>
		<view class="interview_record" v-for="(item, index) of evaluates" :key="item.id">
			<view class="first_level_title">{{ interviewLayer(index) }}面记录</view>
			<view class="interview_record_content block_style">
				<view class="record_info_style">
					<text>面试官：</text>
					<text>{{ item.name }}</text>
				</view>
				<view class="record_info_style">
					<text>预约面试时间：</text>
					<text>{{ getFormatDate(item.appointment_time) }}</text>
				</view>
				<view class="record_info_style">
					<text>实际到达时间：</text>
					<text>{{ getFormatDate(item.actual_time) }}</text>
				</view>
				<view class="record_info_style">
					<text>工作经验：</text>
					<text>{{ item.work_experience }}</text>
				</view>
				<view class="record_info_style">
					<text>交流沟通能力：</text>
					<text>{{ item.communication }}</text>
				</view>
				<view class="record_info_style">
					<text>分析和解决问题能力：</text>
					<text>{{ item.analyze_and_slove }}</text>
				</view>
				<view class="record_info_style">
					<text>专业技能、学习能力：</text>
					<text>{{ item.profession }}</text>
				</view>
				<view class="record_info_style">
					<text>团队精神：</text>
					<text>{{ item.team_spirit }}</text>
				</view>
				<view class="record_info_style">
					<text>职业素质：</text>
					<text>{{ item.quality }}</text>
				</view>
				<view class="record_info_style">
					<text>与岗位的匹配程度：</text>
					<text>{{ item.matching }}</text>
				</view>
				<view class="record_info_style">
					<text>优点、可取之处：</text>
					<text>{{ item.advantage }}</text>
				</view>
				<view class="record_info_style">
					<text>缺点、需改进：</text>
					<text>{{ item.shortcoming }}</text>
				</view>
				<view class="record_info_style">
					<text>考察结果：</text>
					<text>{{ getResult(item.result) }}</text>
				</view>
			</view>
		</view>
		<view class="toEvaluate">
			<button style="background: #169bd4; color: #ffffff;" @click="toFillFeedback()">填写面试反馈</button>
		</view>
	</view>
</template>

<script>
	import Detail from '@/lin/model/detail.js'
	export default {
		data() {
			return {
				isAppointment: true,
				info: {},
				lastRecord: {},
				evaluates: {},
				waitInterview: {},
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
					const { result: evaluates } = await Detail.getEvaluatesById(id)
					this.info = result
					this.evaluates = evaluates
					if (result.InterviewArrangement.length >= 1) {
						this.lastRecord = result.InterviewArrangement[result.InterviewArrangement.length - 1]
						if (this.lastRecord.actual_time) {
							this.isAppointment = true
						} else {
							this.isAppointment = false
							this.waitInterview = {
								layer: result.InterviewArrangement.length,
								time: result.InterviewArrangement[result.InterviewArrangement.length - 1]['appointment_time']
							}
						}
					}
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
			// console.log(id);
			const { result } = await Detail.getInfoById(id)
			const { result: evaluates } = await Detail.getEvaluatesById(id)
			this.info = result
			this.evaluates = evaluates
			if (result.InterviewArrangement.length >= 1) {
				this.lastRecord = result.InterviewArrangement[result.InterviewArrangement.length - 1]
				if (this.lastRecord.actual_time) {
					// console.log(11)
					this.isAppointment = true
				} else {
					// console.log(12)
					this.isAppointment = false
					this.waitInterview = {
						layer: result.InterviewArrangement.length,
						time: result.InterviewArrangement[result.InterviewArrangement.length - 1]['appointment_time']
					}
				}
			}
			// console.log(result)
			// console.log(evaluates)
			// console.log(result.InterviewArrangement.length)
		},
		async onPullDownRefresh () {
			// #ifdef H5
			const id = this.$route.query.id
			// #endif
			// #ifdef (APP-PLUS || MP-WEIXIN)
			const id = this.option.id
			// #endif
			const { result } = await Detail.getInfoById(id)
			const { result: evaluates } = await Detail.getEvaluatesById(id)
			this.info = result
			this.evaluates = evaluates
			if (result.InterviewArrangement.length >= 1) {
				this.lastRecord = result.InterviewArrangement[result.InterviewArrangement.length - 1]
				if (this.lastRecord.actual_time) {
					this.isAppointment = true
				} else {
					this.isAppointment = false
					this.waitInterview = {
						layer: result.InterviewArrangement.length,
						time: result.InterviewArrangement[result.InterviewArrangement.length - 1]['appointment_time']
					}
				}
			}
			uni.stopPullDownRefresh()
		},
		methods: {
			getFormatDate (date, hasDetail = true, isStream) {
				if (date) {
					const millisecond_date = date * 1000
					const year = new Date(millisecond_date).getFullYear()
					const month = new Date(millisecond_date).getMonth() + 1
					const day = new Date(millisecond_date).getDate()
					if (isStream) {
						return `${year}-${month}-${day}`
					}
					if (hasDetail) {
						const hours = new Date(millisecond_date).getHours()
						const minutes = String(new Date(millisecond_date).getMinutes()).padStart(2, 0)
						return `${year}年${month}月${day}日 ${hours}:${minutes}`
					} else {
						return `${year}年${month}月${day}日`
					}
				} else {
					return false
				}
			},
			interviewLayer (index) {
				switch (index) {
					case 0:
						return '一'
					break;
					case 1:
						return '二'
					break;
					case 2:
						return '三'
					break;
					case 3:
						return '四'
					break;
					case 4:
						return '五'
					break;
					case 5:
						return '六'
					break;
					default:
						return;
					break;
				}
			},
			getResult (result) {
				if (result == 1) {
					return '通过'
				} else if (result == 2) {
					return '不过'
				} else {
					return;
				}
			},
			toAppointment () {
				// #ifdef H5
				const id = this.$route.query.id
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				// #endif
				// #ifdef H5
				this.$router.push({ name: 'Appointment', query: { id: id } })
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				uni.navigateTo({
					url: '/pages/appointment/appointment?id=' + id
				})
				// #endif
			},
			toSignIn () {
				// #ifdef H5
				const id = this.$route.query.id
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				// #endif
				// #ifdef H5
				this.$router.push({ name: 'SignIn', query: { id: id } })
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				uni.navigateTo({
					url: '/pages/signIn/signIn?id=' + id
				})
				// #endif
			},
			toEditInfo () {
				// #ifdef H5
				const id = this.$route.query.id
				const trainee = this.$route.query.trainee
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				const trainee = this.option.trainee
				// #endif
				
				// #ifdef H5
				this.$router.push({ name: 'Edit', query: { id: id, trainee: trainee } })
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				uni.navigateTo({
					url: '/pages/edit/edit?id=' + id + '&trainee=' + trainee
				})
				// #endif
			},
			toFillFeedback () {
				// #ifdef H5
				const id = this.$route.query.id
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				// #endif
				
				// #ifdef H5
				this.$router.push({ name: 'Analyse', query: { id: id } })
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				uni.navigateTo({
					url: '/pages/analyse/analyse?id=' + id
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
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
			// height: 320rpx;
			overflow: hidden;
			font-size: 28rpx;
			padding: 30rpx 25rpx;
			box-sizing: border-box;
			margin-bottom: 25rpx;
			.name {
				font-size: 36rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}
			.info {
				margin-bottom: 10rpx;
			}
		}
		.interview_stream {
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 25rpx;
			font-size: 28rpx;
			.interview_process {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				.interview_layer {
					text {
						margin-left: 10rpx;
						&.succ {
							color: green;
						}
						&.err {
							color: red;
						}
					}
				}
			}
			.iconfont {
				font-size: 50rpx;
				color: #7f7f7f;
				margin: 0 20rpx;
				display: flex;
				align-items: center;
			}
			.interview_signIn {
				color: #ffffff;
				background: #119bd9;
				height: 80rpx;
				width: 80rpx;
				text-align: center;
				border-radius: 10rpx;
				margin-left: 20rpx;
				cursor: pointer;
				flex-shrink: 0;
			}
		}
		.detail_info {
			.detail_info_content {
				padding: 30rpx 25rpx;
				box-sizing: border-box;
				overflow: hidden;
				.detail_info_style {
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
				.btn {
					margin-top: 50rpx;
				}
			}
		}
		.interview_record {
			.interview_record_content {
				padding: 30rpx 25rpx;
				box-sizing: border-box;
				overflow: hidden;
				.record_info_style {
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
			}
		}
		.toEvaluate {
			margin-top: 50rpx;
			padding: 0 25rpx 30rpx;
		}
	}
</style>
