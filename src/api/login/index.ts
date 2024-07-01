import request from '/@/utils/request';

export function getCode(){
	return request({
		url: '/code',
		method: 'get'
	})
}

export function login(data:object){
	return request({
		url: '/login',
		method: 'post',
		headers:{
			isToken:false
		},
		data

	})
}
export function logout(data:object){
	return request({
		url: '/userLogout',
		method: 'get',
		headers:{
			isToken:true
		},

	})
}