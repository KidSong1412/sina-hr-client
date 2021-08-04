import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Edit {
	static async editInfo (data) {
		const result = await post('v1/resume/edit', data)
		return result
	}
	static async getInfoById (id) {
		const result = await get('v1/resume/' + id)
		return result
	}
}