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
export function editPhone(token:string,roleSign:string){
	return request({
		url: '/user/editPhone',
		method: 'post',
		headers:{
			isToken:true,
		},
		params:{token:token,roleSign:roleSign}
	})
}
export function editPassword(token:string,roleSign:string){
	return request({
		url: '/user/editPassword',
		method: 'post',
		headers:{
			isToken:true,
		},
		params:{token:token,roleSign:roleSign}
	})
}
export function editUserInfo(token:string,roleSign:string){
	return request({
		url: '/user/editUserInfo',
		method: 'post',
		headers:{
			isToken:true,
		},
		params:{token:token,roleSign:roleSign}
	})
}