import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Appointment {
	static async Order (id, appointment_time, lin_user_id, interview_name) {
		// static async Order (id, appointment_time) {
		const result = await post('v1/interview/order', {
			id,
			appointment_time,
			lin_user_id,
			interview_name
		})
		return result
	}
	static async getCurrentUserInf () {
		const result =  await get('cms/user/information')
		return result
	}
}