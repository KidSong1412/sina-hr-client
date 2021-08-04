import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class SignIn {
	static async Arrive (id, actual_time) {
		const result = await post('v1/interview/arrive', {
			id,
			actual_time
		})
		return result
	}
}