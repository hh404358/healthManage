import request from '/@/utils/request';
export function listEscorts(){
	return request({
		url: '/admin/listEscorts',
		method: 'get',
		headers:{
			isToken:true,
		}
	})
}
export function getEscorts(eCity:string,eServiceType:string){
	return request({
		url: '/admin/getEscorts',
		method: 'get',
		headers:{
			isToken:true,
		},
		params:{eCity:eCity,eServiceType:eServiceType}
	})
}
export function addEscort(data:object){
	return request({
		url: '/admin/addEscort ',
		method: 'post',
		headers:{
			isToken:true,
		},
		
	})
}

export function updateEscort(data:object){
	return request({
		url: '/patient/updateEscort',
		method: 'put',
		headers:{
			isToken:true,
		},
		
	})
}
export function removeEscort(eNo:number){
	return request({
		url: '/admin/removeEscort ',
		method: 'delete',
		headers:{
			isToken:true,
		},
		params:{eNo:eNo}
	})
}
