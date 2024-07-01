import request from '/@/utils/request';
export function listPatient(){
	return request({
		url: '/admin/listPatient',
		method: 'get',
		headers:{
			isToken:true,
		}
	})
}
export function getPatientByName(name:string){
	return request({
		url: '/admin/getPatientByName',
		method: 'get',
		headers:{
			isToken:true,
		},
		params:{name:name}
	})
}
export function addPatient(data:object){
	return request({
		url: '/admin/addPatient ',
		method: 'post',
		headers:{
			isToken:true,
		},

	})
}

export function updatePatient(data:object){
	return request({
		url: '/patient/updatePatient', //存疑
		method: 'post',
		headers:{
			isToken:true,
		},

	})
}

export function delPatient(userId:number|string){
	return request({
		url: '/admin/removePatient ',
		method: 'delete',
		headers:{
			isToken:true,
		},
		params:{id : userId}
	})
}
