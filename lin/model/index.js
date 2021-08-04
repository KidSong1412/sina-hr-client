import _axios, { post, get, put } from '@/lin/plugin/axios'

export default class Index {
	static async getIndexData (username) {
		//获取全部简历
		const result = await get('v1/resume/all?interview_name=' + username)
		return result
	}
}