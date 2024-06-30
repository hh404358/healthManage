import request from '/@/utils/request';
export function listServiceType(){
	return request({
		url: '/admin/listServiceType',
		method: 'get',
		headers:{
			isToken:true,
		}
	})
}
export function getService(){
	return request({
		url: '/admin/getService',
		method: 'get',
		headers:{
			isToken:true,
		},
	})
}
export function addServiceType(data:object){
	return request({
		url: '/admin/addServiceType ',
		method: 'post',
		headers:{
			isToken:true,
		},
		data
	})
}

export function updateServiceType(data:object){
	return request({
		url: '/patient/updateServiceType',
		method: 'put',
		headers:{
			isToken:true,
		},
		data
	})
}
export function removeServiceType(stNo:number){
	return request({
		url: '/admin/removeServiceType',
		method: 'delete',
		headers:{
			isToken:true,
		},
		params:{stNo:stNo}
	})
}
