import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Analyse {
	static async toEvaluates (data) {
		const result = await post('v1/comment', data)
		return result
	}
}