import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Apply {
	static async subData (data) {
		const result = await post('v1/apply', data)
		return result;
	}
	static async getRegularData () {
		const result = await get('v1/apply/regularpost')
		return result;
	}
	static async getInternshipData () {
		const result = await get('v1/apply/internshippost')
		return result
	}
}