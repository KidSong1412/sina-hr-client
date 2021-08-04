import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Detail {
	static async getInfoById (id) {
		const result = await get('v1/resume/' + id)
		return result
	}
	static async getEvaluatesById (id) {
		const result = await get('v1/comment/getevaluates/' + id)
		return result
	}
}