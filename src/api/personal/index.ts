import request from '/@/utils/request';
export function getInfo(){
	return request({
		url: '/user/getInfo',
		method: 'get',
		headers:{
			isToken:true,
		}
	})
}