<template>
	<view class="apply">
		<form @submit="formSubmit">
			<view class="name same_line">
				<span>姓名：</span>
				<view class="flex-fill">
					<input type="text" name="name" value="" placeholder="请输入姓名" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<view class="gender same_line">
				<span>性别：</span>
				<radio-group class="flex_radio" name="gender">
					<label>
						<radio value="男" checked="true" />男
					</label>
					<label>
						<radio value="女" checked="true" />女
					</label>
				</radio-group>
			</view>
			<view class="native_palace same_line">
				<span>籍贯：</span>
				<view class="flex_pick">
					<view class="content_list_label" :class="[ isaddrTip ? 'pickstyle' : 'defaultstyle' ]" @click="addressShow = true">{{ isaddrTip ? '点击选择地址' : address }}</view>
					<view class="content_list_content">
						<pickerAddress v-model="addressShow" @confirm="addresspick" />
					</view>
				</view>
			</view>
			<birth-time @getbirthTime="getbirthTime"></birth-time>
			<work-time @getworkTime="getworkTime"></work-time>
			<view class="highest_education same_line">
				<span>最高学历：</span>
				<picker mode="selector" @change="bingPickerEdumChange" :value="educationIndex" :range="educationArr">
					<view :class="[ educationIndex === '' ? 'pickstyle' : 'defaultstyle' ]">{{educationIndex !== '' ? educationArr[educationIndex] : '请选择最高学历'}}</view>
				</picker>
			</view>
			<view class="graduation_school same_line">
				<span>毕业学校：</span>
				<view class="flex-fill">
					<input type="text" name="graduation_school" value="" placeholder="请输入毕业学校" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<view class="graduation_major same_line">
				<span>毕业专业：</span>
				<view class="flex-fill">
					<input type="text" name="graduation_major" value="" placeholder="请输入专业名称" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<graduation-time @getgraduationTime="getgraduationTime"></graduation-time>
			<view class="recent_work same_line">
				<span>最近任职工作单位：</span>
				<view class="flex-fill">
					<input type="text" name="recent_work" value="" placeholder="请输入任职单位" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<view class="phone same_line">
				<span>手机：</span>
				<view class="flex-fill">
					<input type="tel" name="phone" value="" placeholder="请输入手机号" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<view class="email same_line">
				<span>邮箱：</span>
				<view class="flex-fill">
					<input type="email" name="email" value="" placeholder="请输入邮箱" placeholder-class="deep_placeholder_style">
				</view>
			</view>
			<view class="application_department same_line">
				<span>应聘部门：</span>
				<picker mode="selector" @change="bingPickerDepartChange" :value="application_department_index" :range="application_department" :range-key="application_department_key">
					<view :class="[ application_department_index === '' ? 'pickstyle' : 'defaultstyle' ]">{{application_department_index !== '' ? application_department[application_department_index]['name'] : '请选择应聘部门'}}</view>
				</picker>
			</view>
			<view class="application_position same_line">
				<span>应聘岗位：</span>
				<picker :disabled="isDisabled" mode="selector" @change="bingPickerPositChange" :value="application_position_index" :range="application_position" :range-key="application_position_key">
					<view :class="[ application_position_index === '' ? 'pickstyle' : 'defaultstyle' ]">{{application_position_index !== '' ? application_position[application_position_index]['name'] : '请选择应聘岗位'}}</view>
				</picker>
			</view>
			<view class="uni-btn">
				<button type="primary" hover-class="btn_style" form-type="submit">确认提交</button>
			</view>
		</form>
	</view>
</template>

<script>
    import pickerAddress from '@/components/liudx-pickerAddress/index.vue'
	import birthTime from '@/components/birth-time/birth-time.vue'
	import workTime from '@/components/work-time/work-time.vue'
	import graduationTime from '@/components/graduation-time/graduation-time.vue'
	import Apply from '@/lin/model/apply.js'
    export default {
        data() {
            return {
                addressShow: false,
                form: {
                    province: '',
                    city: '',
                    area: '',
                },
				native_palace: '',
				isaddrTip: true,
                address: '',
				date_of_birth: '',
				date_of_work_first: '',
				date_graduation: '',
				educationArr: ['大专', '本科', '研究生', '博士'],
				educationIndex: '',
				application_department: [],
				application_department_key: '',
				application_department_index: '',
				application_position: [],
				all_application_position: [],
				application_position_key: '',
				application_position_index: '',
				flag: true,
				isDisabled: true
            }
        },
		watch: {
			application_department_index (newVal, oldVal) {
				if (newVal !== oldVal && this.application_position.length != 0) {
					this.isDisabled = false
				}
			}
		},
        async mounted() {
			const { result } = await Apply.getInternshipData();
			// console.log(result);
			//有实习岗位的部门
			let currentDepartment = []
			for (let i = 0; i < result.department.length; i++) {
				for (let j =0; j < result.post.length; j++) {
					if (result.department[i]['id'] == result.post[j]['departments_id']) {
						currentDepartment.push(result.department[i])
					}
				}
			}
			this.application_department = Array.from(new Set(currentDepartment))
			// this.application_department = result.department
			this.application_department_key = 'name'
			this.application_position = result.post
			this.all_application_position = result.post
			this.application_position_key = 'name'
			// console.log(this.application_department[1]['id'])
        },
        methods: {
            addresspick(obj) {
                let arr = [ 'province', 'city', 'area'];
                let place = '';
                arr.map(key => {
                    this.form[key] = obj[key].AreaId
                    place += obj[key].AreaName
                })
				this.native_palace = place
                this.address = place
				this.isaddrTip = false
            },
			bingPickerEdumChange (e) {
				this.educationIndex = e.target.value
			},
			bingPickerDepartChange (e) {
				this.application_department_index = e.target.value
				this.application_position_index = ''
				let currentPosition = []
				this.application_position = this.all_application_position
				if (this.application_department_index >= 0) {
					for (let i = 0; i < this.application_position.length; i++) {
						if (this.application_position[i].departments_id == this.application_department[this.application_department_index]['id']) {
							currentPosition.push(this.application_position[i])
						}
					}
					this.application_position = currentPosition
				}
			},
			bingPickerPositChange (e) {
				this.application_position_index = e.target.value
			},
			getbirthTime (birthYear, birthMonth, birthDay) {
				this.date_of_birth = new Date(birthYear+"-"+birthMonth.toString().padStart(2, '0')+"-"+birthDay.toString().padStart(2, '0')) / 1000
			},
			getworkTime (workYear, workMonth, workDay) {
				this.date_of_work_first = new Date(workYear+"-"+workMonth.toString().padStart(2, '0')+"-"+workDay.toString().padStart(2, '0')) / 1000
			},
			getgraduationTime (graYear, graMonth, graDay) {
				this.date_graduation = new Date(graYear+"-"+graMonth.toString().padStart(2, '0')+"-"+graDay.toString().padStart(2, '0')) / 1000
			},
			formSubmit: async function(e) {
				var userReg = /^[\u4e00-\u9fa5]{2,4}$/;
				var mobileReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				var formData = e.detail.value;
				var native_palace = this.native_palace || ''
				var highest_education = this.educationArr[this.educationIndex] || ''
				var date_of_birth = this.date_of_birth || ''
				var date_of_work_first = this.date_of_work_first || ''
				var date_graduation = this.date_graduation || ''
				if (this.application_department_index >= 0) {
					var application_department = this.application_department[this.application_department_index]['name']
				}
				var application_position
				if (this.application_position_index >= 0 && this.application_position.length != 0) {
					application_position = this.application_position[this.application_position_index]['name']
				}
				// console.log(application_department === undefined)
				// console.log(application_position)
				// console.log(native_palace)
				// console.log(highest_education)
				// console.log(date_of_birth)
				// console.log(date_of_work_first)
				// console.log(graduation_school)
				// console.log(date_graduation)
				// console.log(application_department)
				// console.log(application_position)
				for (var key in formData) {
					if (formData[key] === '' && key !== 'recent_work') {
						uni.showModal({
							content: '内容不能为空，请认真填写1！',
							showCancel: false
						})
						return;
					}
				}
				if (native_palace === '' || date_of_birth === '' || date_of_work_first === '' || date_graduation === '' || application_department === undefined || application_position === undefined) {
					uni.showModal({
						content: '内容不能为空，请认真填写2！',
						showCancel: false
					})
					return;
				}
				if (!userReg.test(formData.name)) {
					uni.showModal({
						content: '请正确输入姓名！',
						showCancel: false
					})
					return;
				}
				if (!mobileReg.test(formData.phone)) {
					uni.showModal({
						content: '请正确输入手机号！',
						showCancel: false
					})
					return;
				}
				if (!emailReg.test(formData.email)) {
					uni.showModal({
						content: '请正确输入邮箱！',
						showCancel: false
					})
					return;
				}
				if (this.flag){
					const result = await Apply.subData({
						name: formData.name,
						gender: formData.gender,
						native_palace: native_palace,
						date_of_birth: date_of_birth,
						date_of_work_first: date_of_work_first,
						highest_education: highest_education,
						graduation_school: formData.graduation_school,
						graduation_major: formData.graduation_major,
						date_graduation: date_graduation,
						recent_work: formData.recent_work,
						phone: formData.phone,
						email: formData.email,
						application_department: application_department,
						application_position: application_position,
						trainee: 2
					})
					console.log(result)
					if (result.code === 0) {
						this.flag = false;
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
				} else {
					uni.showToast({
					    title: '禁止频繁提交',
					    duration: 2000
					});
				}
				let that = this
				setTimeout(function () {
					that.flag = true;
				}, 5000)
			}
        },
        components: {
            pickerAddress,
			birthTime,
			workTime,
			graduationTime
        }
    }
</script>

<style lang="scss" scoped>
	.apply {
		width: 750rpx;
		padding: 0 20rpx;
		overflow: hidden;
		box-sizing: border-box;
		.same_line {
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 2rpx solid #d8d8d8;
			span {
				font-size: 28rpx;
				color: #848484;
				display: flex;
				flex: 4;
			}
			.flex-fill {
				flex: 6;
				input {
					width: 100%;
					height: 100%;
					line-height: 100%;
					font-size: 28rpx;
					color: #333333;
					text-align: right;
					.deep_placeholder_style {
						color: #afafaf;
					}
				}
			}
			.flex_pick {
				flex: 7.5;
				text-align: right;
			}
			label {
				font-size: 28rpx;
				color: #333333;
				margin-left: 20rpx;
				radio {
					transform: scale(0.7);
				}
			}
			.pickstyle {
				font-size: 28rpx;
				color: #afafaf;
			}
			.defaultstyle {
				font-size: 28rpx;
				color: #333333;
			}
		}
		.uni-btn {
			margin-top: 50rpx;
			.btn_style {
				background: #42b983;
			}
		}
	}
</style>
