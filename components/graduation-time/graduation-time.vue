<template>
	<view class="date_graduation same_line">
		<span class="title">毕业时间：</span>
		<view class="select_items">
			<view @click="openCalendar" :class="[isGradTip ? '' : 'sel_font_style']">{{ isGradTip && date_graduation === '' ? '请选择毕业时间' : date.year + '-' + date.month + '-' + date.day }}</view>
		</view>
		<select-timer @changeTime="changeTime" :visible="visible" @timeCofirm="timeCofirm"></select-timer>
	</view>
</template>

<script>
	import selectTimer from '@/components/select-timer/select-timer.vue'
	export default {
		name:"graduation-time",
		props: ['date_graduation'],
		data() {
			return {
				isGradTip: true,
				visible: false,
				date: {
					year: 0,
					month: 0,
					day: 0
				}
			};
		},
		mounted () {
			if (this.date_graduation) {
				const millisecond_date = this.date_graduation * 1000
				const year = new Date(millisecond_date).getFullYear()
				const month = new Date(millisecond_date).getMonth() + 1
				const day = new Date(millisecond_date).getDate()
				this.date.year = year
				this.date.month = month
				this.date.day = day
			}
		},
		watch: {
			date_graduation (newVal, oldVal) {
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
				this.$emit('getgraduationTime', this.date.year, this.date.month, this.date.day);
				this.visible = e[0]
				if (e[1] === 1) {
					this.isGradTip = false
				}
			}
		},
		components: {
			selectTimer
		}
	}
</script>

<style lang="scss" scoped>
	.date_graduation {
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
