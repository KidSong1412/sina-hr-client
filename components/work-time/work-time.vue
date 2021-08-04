<template>
	<view class="date_of_work_first same_line">
		<span class="title">首次参加工作日期：</span>
		<view class="select_items">
			<view :class="[isworkTip ? '' : 'sel_font_style']" @click="openCalendar">{{ isworkTip && date_of_work_first === '' ? '请选择工作年月' : date.year + '-' + date.month + '-' + date.day }}</view>
		</view>
		<select-timer @changeTime="changeTime" :visible="visible" @timeCofirm="timeCofirm"></select-timer>
	</view>
</template>

<script>
	import selectTimer from '@/components/select-timer/select-timer.vue'
	export default {
		name:"work-time",
		props: ['date_of_work_first'],
		data() {
			return {
				isworkTip: true,
				visible: false,
				date: {
					year: 0,
					month: 0,
					day: 0
				}
			};
		},
		mounted () {
			if (this.date_of_work_first) {
				const millisecond_date = this.date_of_work_first * 1000
				const year = new Date(millisecond_date).getFullYear()
				const month = new Date(millisecond_date).getMonth() + 1
				const day = new Date(millisecond_date).getDate()
				this.date.year = year
				this.date.month = month
				this.date.day = day
			}
		},
		watch: {
			date_of_work_first (newVal, oldVal) {
				if (newVal !== oldVal) {
					const millisecond_date = newVal * 1000
					const year = new Date(millisecond_date).getFullYear()
					const month = new Date(millisecond_date).getMonth() + 1
					const day = new Date(millisecond_date).getDate()
					this.date.year = year
					this.date.month = month
					this.date.day = day
				}
			}
		},
		methods: {
			openCalendar () {
				this.visible = true
			},
			changeTime (e) {
				this.date.year = e[0] + 1970;
				this.date.month = e[1] + 1;
				this.date.day = e[2] + 1;
			},
			timeCofirm (e) {
				this.$emit('getworkTime', this.date.year, this.date.month, this.date.day);
				this.visible = e[0]
				if (e[1] === 1) {
					this.isworkTip = false
				}
			}
		},
		components: {
			selectTimer
		}
	}
</script>

<style lang="scss" scoped>
	.date_of_work_first {
		font-size: 28rpx;
		color: #afafaf;
		.title {
			display: block;
			position: absolute;
			left: 20rpx;
			color: #848484;
		}
		.select_items {
			position: absolute;
			right: 20rpx;
			.sel_font_style {
				color: #333333;
			}
		}
	}
</style>
