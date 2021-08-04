<template>
	<view class="analyse">
		<view class="base_info block_style">
			<view class="name">{{ info.name }}（{{ info.gender }}）</view>
			<view class="info">应聘部门：{{ info.application_department }}</view>
			<view class="info">应聘岗位：{{ info.application_position }}</view>
			<view class="info">面试官：{{ lastRecord.interview_name }}</view>
			<view class="info">预约面试时间：{{ getFormatDate(lastRecord.appointment_time) }}</view>
			<view class="info">实际到达时间：{{ getFormatDate(lastRecord.actual_time) }}</view>
		</view>
		<view class="analyse_detail">
			<view class="first_level_title">面试评析</view>
			<view class="analyse_form block_style">
				<view class="same_line">
					<span>工作经验：</span>
					<picker mode="selector" @change="bingPickerExperienceChange" :value="experienceIndex" :range="experienceArr">
						<view :class="[ experienceIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{experienceIndex !== '' ? experienceArr[experienceIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>交流沟通能力：</span>
					<picker mode="selector" @change="bingPickerCommunicationChange" :value="communicationIndex" :range="communicationArr">
						<view :class="[ communicationIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{communicationIndex !== '' ? communicationArr[communicationIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>分析和解决问题能力：</span>
					<picker mode="selector" @change="bingPickerSloveChange" :value="sloveIndex" :range="sloveArr">
						<view :class="[ sloveIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{sloveIndex !== '' ? sloveArr[sloveIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>专业技能、学习能力：</span>
					<picker mode="selector" @change="bingPickerProfessionChange" :value="professionIndex" :range="professionArr">
						<view :class="[ professionIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{professionIndex !== '' ? professionArr[professionIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>团队精神：</span>
					<picker mode="selector" @change="bingPickerSpiritChange" :value="spiritIndex" :range="spiritArr">
						<view :class="[ spiritIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{spiritIndex !== '' ? spiritArr[spiritIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>职业素质：</span>
					<picker mode="selector" @change="bingPickerQualityChange" :value="qualityIndex" :range="qualityArr">
						<view :class="[ qualityIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{qualityIndex !== '' ? qualityArr[qualityIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="same_line">
					<span>与岗位的匹配程度：</span>
					<picker mode="selector" @change="bingPickerMatchChange" :value="matchIndex" :range="matchArr">
						<view :class="[ matchIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{matchIndex !== '' ? matchArr[matchIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="area">
					<span style="color: #7e7e7e; font-size: 28rpx;">优点、可取之处：</span>
					<view class="text_area">
						<textarea @blur="bindAdvantageArea" style="width: 100%; height: 300rpx;" maxlength="-1" placeholder-style="color: #afafaf; font-size: 28rpx;" placeholder="请输入内容" />
					</view>
				</view>
				<view class="area">
					<span style="color: #7e7e7e; font-size: 28rpx;">缺点、需改进：</span>
					<view class="text_area">
						<textarea @blur="bindShortComingArea" style="width: 100%; height: 300rpx;" maxlength="-1" placeholder-style="color: #afafaf; font-size: 28rpx;" placeholder="请输入内容" />
					</view>
				</view>
				<view class="same_line" style="border-bottom: none;">
					<span>考察结果：</span>
					<picker mode="selector" @change="bingPickerResultChange" :value="resultIndex" :range="resultArr">
						<view :class="[ resultIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{resultIndex !== '' ? resultArr[resultIndex] : '请选择'}}</view>
					</picker>
				</view>
				<view class="uni-btn">
					<button type="primary" hover-class="btn_style" form-type="submit" @click="subAnalyse()">确认提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Detail from '@/lin/model/detail.js'
	import Appointment from '@/lin/model/appointment.js';
	import Analyse from '@/lin/model/analyse.js'
	export default {
		data() {
			return {
				experienceArr: ['不满意', '基本满意', '非常满意'],
				experienceIndex: '',
				communicationArr: ['不满意', '基本满意', '非常满意'],
				communicationIndex: '',
				sloveArr: ['不满意', '基本满意', '非常满意'],
				sloveIndex: '',
				professionArr: ['不满意', '基本满意', '非常满意'],
				professionIndex: '',
				spiritArr: ['不满意', '基本满意', '非常满意'],
				spiritIndex: '',
				qualityArr: ['不满意', '基本满意', '非常满意'],
				qualityIndex: '',
				matchArr: ['不满意', '基本满意', '非常满意'],
				matchIndex: '',
				advantage: '',
				shortcoming: '',
				resultArr: ['不通过', '通过'],
				resultIndex: '',
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
			bingPickerExperienceChange (e) {
				this.experienceIndex = e.target.value
			},
			bingPickerCommunicationChange (e) {
				this.communicationIndex = e.target.value
			},
			bingPickerSloveChange (e) {
				this.sloveIndex = e.target.value
			},
			bingPickerProfessionChange (e) {
				this.professionIndex = e.target.value
			},
			bingPickerSpiritChange (e) {
				this.spiritIndex = e.target.value
			},
			bingPickerQualityChange (e) {
				this.qualityIndex = e.target.value
			},
			bingPickerMatchChange (e) {
				this.matchIndex = e.target.value
			},
			bingPickerResultChange (e) {
				this.resultIndex = e.target.value
			},
			bindAdvantageArea (e) {
				this.advantage = e.detail.value
			},
			bindShortComingArea (e) {
				this.shortcoming = e.detail.value
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
			async subAnalyse () {
				// #ifdef H5
				const id = this.$route.query.id
				// #endif
				// #ifdef (APP-PLUS || MP-WEIXIN)
				const id = this.option.id
				// #endif
				const { id: userId, username } = await Appointment.getCurrentUserInf()
				const work_experience = this.experienceArr[this.experienceIndex] || ''
				const communication = this.communicationArr[this.communicationIndex] || ''
				const analyze_and_slove = this.sloveArr[this.sloveIndex] || ''
				const profession = this.professionArr[this.professionIndex] || ''
				const team_spirit = this.spiritArr[this.spiritIndex] || ''
				const quality = this.qualityArr[this.qualityIndex] || ''
				const matching = this.matchArr[this.matchIndex] || ''
				const advantage = this.advantage || ''
				const shortcoming = this.shortcoming || ''
				let result = this.resultArr[this.resultIndex] || ''
				if (result && result === '通过') {
					result = 1
				} else if (result && result === '不通过') {
					result = 2
				}
				// console.log(id)
				// console.log(userId)
				// console.log(username)
				// console.log(work_experience)
				// console.log(communication)
				// console.log(analyze_and_slove)
				// console.log(profession)
				// console.log(team_spirit)
				// console.log(team_spirit)
				// console.log(quality)
				// console.log(matching)
				// console.log(advantage)
				// console.log(shortcoming)
				// console.log(result)
				const analyseRes = await Analyse.toEvaluates({
					id: id,
					uid: userId,
					username: username,
					work_experience: work_experience,
					communication: communication,
					analyze_and_slove: analyze_and_slove,
					profession: profession,
					team_spirit: team_spirit,
					quality: quality,
					matching: matching,
					advantage: advantage,
					shortcoming: shortcoming,
					result: result
				})
				if (analyseRes.message === '提交成功') {
					uni.showToast({
					    title: '提交成功!',
					    duration: 2000
					});
				} else {
					uni.showToast({
					    title: '提交失败!',
					    duration: 2000
					});
				}
				// console.log(analyseRes)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.analyse {
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
		.same_line {
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 2rpx solid #d8d8d8;
			justify-content: space-between;
			span {
				font-size: 28rpx;
				color: #7e7e7e;
				display: flex;
				flex-basis: 300rpx;
			}
		}
		.base_info {
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
		.analyse_detail {
			.analyse_form {
				padding: 0 20rpx;
				overflow: hidden;
				.pickstyle {
					font-size: 28rpx;
					color: #afafaf;
				}
				.defaultstyle {
					font-size: 28rpx;
					color: #333333;
				}
				.uni-btn {
					margin-top: 30rpx;
					margin-bottom: 30rpx;
					.btn_style {
						background: #42b983;
					}
				}
			}
		}
	}
</style>
